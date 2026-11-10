// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import geometry from "../body-map/geometry.json";
import { regions } from "./figure";

vi.mock("./MuscleMap3D", () => ({ default: ({ groups }: { groups: { meshId: string }[] }) => <div data-testid="map-3d">{groups.map(group => group.meshId).join(",")}</div> }));
const groups = [{ name: "Chest", slug: "chest", meshId: "chest" }, { name: "Fixture", slug: "fixture", meshId: "mcp-test-quadriceps" }];
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks(); vi.resetModules(); });

describe("muscle explorer", () => {
  it("defines the same meshId regions in 2D and 3D", () => {
    expect(Object.keys(regions).sort()).toEqual(Object.keys(geometry.regions).sort());
  });
  it("falls back to the 2D map without WebGL and offers no 3D toggle", async () => {
    const { MusclePicker } = await import("./MusclePicker");
    const { container } = render(<MusclePicker groups={groups} selected="" onSelect={() => {}} />);
    expect(container.querySelector(".body-map")).not.toBeNull();
    expect(screen.queryByRole("button", { name: "3D" })).toBeNull();
  });
  it("loads the 3D view when WebGL is available and can switch to 2D", async () => {
    vi.stubGlobal("WebGLRenderingContext", function WebGLRenderingContext() {});
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({} as RenderingContext);
    const { MusclePicker } = await import("./MusclePicker");
    const user = userEvent.setup();
    const { container } = render(<MusclePicker groups={groups} selected="" onSelect={() => {}} />);
    expect((await screen.findByTestId("map-3d")).textContent).toBe("chest");
    expect(screen.getByRole("button", { name: "3D" }).getAttribute("aria-pressed")).toBe("true");
    await user.click(screen.getByRole("button", { name: "2D" }));
    expect(screen.queryByTestId("map-3d")).toBeNull();
    expect(container.querySelector(".body-map")).not.toBeNull();
  });
});
