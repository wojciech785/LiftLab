// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { BodyMap, mapMuscleGroups } from "./BodyMap";

const groups = [
  { name: "Quadriceps", slug: "quadriceps", meshId: "quadriceps" },
  { name: "Shoulders", slug: "shoulders", meshId: "shoulders" },
  { name: "Test fixture", slug: "mcp-test-quadriceps", meshId: "mcp-test-quadriceps" },
  { name: "No mesh", slug: "no-mesh", meshId: null },
];
afterEach(cleanup);

describe("BodyMap", () => {
  it("only maps groups whose meshId has a region", () => {
    const { mapped, unmapped } = mapMuscleGroups(groups);
    expect(mapped.map(group => group.slug)).toEqual(["quadriceps", "shoulders"]);
    expect(unmapped.map(group => group.slug)).toEqual(["mcp-test-quadriceps", "no-mesh"]);
  });
  it("is hidden from assistive technology and draws regions on each relevant view", () => {
    const { container } = render(<BodyMap groups={groups} highlighted={["shoulders"]} />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("aria-hidden")).toBe("true");
    expect(container.querySelectorAll('[data-mesh="shoulders"]')).toHaveLength(2);
    expect(container.querySelectorAll('[data-mesh="quadriceps"]')).toHaveLength(1);
    expect(container.querySelector('[data-mesh="mcp-test-quadriceps"]')).toBeNull();
    expect(container.querySelectorAll(".body-map__region.is-active")).toHaveLength(2);
  });
  it("toggles selection when interactive", () => {
    const onSelect = vi.fn();
    const { container, rerender } = render(<BodyMap groups={groups} highlighted={[]} onSelect={onSelect} />);
    fireEvent.click(container.querySelector('[data-mesh="quadriceps"]')!);
    expect(onSelect).toHaveBeenLastCalledWith("quadriceps");
    rerender(<BodyMap groups={groups} highlighted={["quadriceps"]} onSelect={onSelect} />);
    fireEvent.click(container.querySelector('[data-mesh="quadriceps"]')!);
    expect(onSelect).toHaveBeenLastCalledWith("");
  });
  it("renders nothing when no group can be mapped", () => {
    const { container } = render(<BodyMap groups={[groups[3]]} highlighted={[]} />);
    expect(container.innerHTML).toBe("");
  });
});
