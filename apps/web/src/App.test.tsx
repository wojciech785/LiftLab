// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { getArticle, getArticles, getExercise, getExercises, getMuscleGroups } from "./api/client";

vi.mock("./api/client", () => ({ getExercise: vi.fn(), getExercises: vi.fn(), getMuscleGroups: vi.fn(), getArticle: vi.fn(), getArticles: vi.fn(), getProgramme: vi.fn(), getProgrammes: vi.fn(), PAGE_SIZE: 12 }));
const item = { title: "Squat", slug: "squat", difficulty: "beginner" as const, primaryMuscle: "quadriceps" };
beforeEach(() => {
  window.history.replaceState(null, "", "/");
  vi.mocked(getExercises).mockResolvedValue([item]);
  vi.mocked(getMuscleGroups).mockResolvedValue([{ name: "Quadriceps", slug: "quadriceps" }]);
  vi.mocked(getExercise).mockResolvedValue({ ...item, summary: "A test exercise", instructions: "Move with control.", modality: "bodyweight", durationMinutes: 5, primaryMuscles: [{ name: "Quadriceps", slug: "quadriceps" }], equipment: [] });
});
afterEach(() => { cleanup(); vi.resetAllMocks(); });

describe("exercise browser", () => {
  it("filters the library from the body map and keeps the list control in sync", async () => {
    vi.mocked(getMuscleGroups).mockResolvedValue([{ name: "Quadriceps", slug: "quadriceps", meshId: "quadriceps" }, { name: "Chest", slug: "chest", meshId: "chest" }]);
    const { container } = render(<App />);
    await screen.findByRole("button", { name: /View exercise: Squat/ });
    fireEvent.click(container.querySelector('.body-map [data-mesh="chest"]')!);
    await waitFor(() => expect(getExercises).toHaveBeenLastCalledWith("en", "chest", 0, expect.any(AbortSignal)));
    expect((screen.getByRole("combobox", { name: "Muscle group" }) as HTMLSelectElement).value).toBe("chest");
    fireEvent.click(container.querySelector('.body-map [data-mesh="chest"]')!);
    await waitFor(() => expect(getExercises).toHaveBeenLastCalledWith("en", "", 0, expect.any(AbortSignal)));
  });
  it("shows the selected muscle group's licensed illustration", async () => {
    const user = userEvent.setup();
    vi.mocked(getMuscleGroups).mockResolvedValue([{ name: "Quadriceps", slug: "quadriceps", illustration: { url: "https://cdn.example.test/quads.svg", altText: "Front view with the thighs highlighted", rightsSource: "Original Lift Lab illustration, CC0" } }]);
    render(<App />);
    await screen.findByRole("button", { name: /View exercise: Squat/ });
    expect(screen.queryByRole("img")).toBeNull();
    await user.selectOptions(screen.getByRole("combobox", { name: "Muscle group" }), "quadriceps");
    expect(await screen.findByRole("img", { name: "Front view with the thighs highlighted" })).toHaveProperty("src", "https://cdn.example.test/quads.svg");
    expect(screen.getByText(/Original Lift Lab illustration, CC0/)).toBeTruthy();
  });
  it("opens an article from navigation and follows its related exercise link", async () => {
    const user = userEvent.setup();
    vi.mocked(getArticles).mockResolvedValue([{title:'Guide',slug:'guide',excerpt:'Read this guide'}]);
    vi.mocked(getArticle).mockResolvedValue({title:'Guide',slug:'guide',excerpt:'Overview',author:null,heroAsset:null,contentBlocks:[],relatedExercises:[{title:'Squat',slug:'squat'}],relatedProgrammes:[]});
    render(<App />);
    await user.click(screen.getByRole('link',{name:'articles'}));
    await user.click(await screen.findByRole('link',{name:'Guide'}));
    await screen.findByRole('heading',{name:'Guide',level:1});
    await user.click(screen.getByRole('link',{name:'Squat'}));
    await screen.findByText('Move with control.');
    expect(window.location.hash).toBe('#/exercises/squat');
    expect(getExercise).toHaveBeenLastCalledWith('squat','en',expect.any(AbortSignal));
  });
  it("loads published exercises, changes muscle/locale, and restores focus after closing detail", async () => {
    const user = userEvent.setup();
    render(<App />);
    const open = await screen.findByRole("button", { name: /View exercise: Squat/ });
    await user.click(open);
    await screen.findByText("Move with control.");
    expect(document.activeElement).toBe(screen.getByRole("heading", { name: "Squat", level: 2 }));
    await user.click(screen.getByRole("button", { name: "Close details" }));
    expect(document.activeElement).toBe(open);
    await user.selectOptions(screen.getByLabelText("Muscle group"), "quadriceps");
    await waitFor(() => expect(getExercises).toHaveBeenLastCalledWith("en", "quadriceps", 0, expect.any(AbortSignal)));
    await user.selectOptions(screen.getByLabelText("Content language"), "cs");
    await waitFor(() => expect(getExercises).toHaveBeenLastCalledWith("cs", "quadriceps", 0, expect.any(AbortSignal)));
  });
  it("shows an honest empty state", async () => {
    vi.mocked(getExercises).mockResolvedValue([]);
    render(<App />);
    expect(await screen.findByText(/library is getting ready/)).toBeTruthy();
    expect(screen.queryByRole("button", { name: /View exercise/ })).toBeNull();
  });
  it("recovers from an API failure using retry", async () => {
    const user = userEvent.setup();
    vi.mocked(getExercises).mockRejectedValueOnce(new Error("unavailable"));
    render(<App />);
    await screen.findByRole("alert");
    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(await screen.findByRole("button", { name: /View exercise: Squat/ })).toBeTruthy();
  });
  it("uses the lookahead record to paginate without displaying it", async () => {
    const user = userEvent.setup();
    vi.mocked(getExercises).mockResolvedValueOnce(Array.from({ length: 13 }, (_, i) => ({ ...item, slug: `squat-${i}`, title: `Squat ${i}` })));
    render(<App />);
    await screen.findByRole("button", { name: "Next" });
    expect(screen.getAllByRole("button", { name: /View exercise/ }).length).toBe(12);
    await user.click(screen.getByRole("button", { name: "Next" }));
    await waitFor(() => expect(getExercises).toHaveBeenLastCalledWith("en", "", 12, expect.any(AbortSignal)));
  });
  it("ignores a stale response after locale changes", async () => {
    const user = userEvent.setup();
    let resolveOld!: (items: typeof item[]) => void;
    vi.mocked(getExercises).mockImplementationOnce(() => new Promise(resolve => { resolveOld = resolve; }));
    render(<App />);
    await user.selectOptions(screen.getByLabelText("Content language"), "cs");
    await screen.findByRole("button", { name: /View exercise: Squat/ });
    resolveOld([{ ...item, title: "Stale title" }]);
    await waitFor(() => expect(screen.queryByText("Stale title")).toBeNull());
  });
});
