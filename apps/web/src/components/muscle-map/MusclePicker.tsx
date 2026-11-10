import { lazy, Suspense, useState } from "react";
import type { MuscleGroupOption } from "@lift-lab/shared-types";
import { BodyMap, mapMuscleGroups } from "../body-map/BodyMap";

const MuscleMap3D = lazy(() => import("./MuscleMap3D"));

/** True when the browser can create a WebGL context. */
export function supportsWebGL(): boolean {
  if (typeof window === "undefined" || typeof window.WebGLRenderingContext === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch { return false; }
}

type Props = { groups: MuscleGroupOption[]; selected: string; onSelect: (slug: string) => void };

/** 3D explorer when WebGL is available (loaded on demand), 2D body map otherwise or on request. */
export function MusclePicker({ groups, selected, onSelect }: Props) {
  const [webgl] = useState(supportsWebGL);
  const [view, setView] = useState<"3d" | "2d">(() => webgl ? "3d" : "2d");
  const { mapped } = mapMuscleGroups(groups);
  if (!mapped.length) return null;
  const flat = <><BodyMap groups={groups} highlighted={selected ? [selected] : []} onSelect={onSelect} /><p className="body-map-hint">Tap a highlighted area, or use the muscle group list.</p></>;
  return <div className="muscle-picker">
    {webgl && <div className="view-toggle" role="group" aria-label="Body map view">
      <button type="button" aria-pressed={view === "3d"} onClick={() => setView("3d")}>3D</button>
      <button type="button" aria-pressed={view === "2d"} onClick={() => setView("2d")}>2D</button>
    </div>}
    {view === "3d" ? <Suspense fallback={flat}><MuscleMap3D groups={mapped} selected={selected} onSelect={onSelect} /></Suspense> : flat}
  </div>;
}
