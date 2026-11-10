/**
 * Primitive 3D figure for the muscle explorer (prototype, original, CC0).
 * Units are roughly metres; the figure stands on y=0 facing +z.
 * Region keys are MuscleGroup.meshId values and must match the 2D body map.
 */
export type Vec3 = [number, number, number];
export type Shape =
  | { kind: "sphere"; radius: number; position: Vec3; scale?: Vec3 }
  | { kind: "capsule"; radius: number; length: number; position: Vec3; scale?: Vec3; rotation?: Vec3 }
  | { kind: "box"; size: Vec3; position: Vec3 };

const mirror = (make: (x: number) => Shape): Shape[] => [make(-1), make(1)];

export const body: Shape[] = [
  { kind: "sphere", radius: 0.11, position: [0, 1.6, 0] },
  { kind: "capsule", radius: 0.05, length: 0.06, position: [0, 1.47, 0] },
  { kind: "capsule", radius: 0.17, length: 0.32, position: [0, 1.2, 0], scale: [1, 1, 0.6] },
  { kind: "sphere", radius: 0.16, position: [0, 0.93, 0], scale: [1.05, 0.7, 0.7] },
  ...mirror(s => ({ kind: "capsule", radius: 0.075, length: 0.3, position: [0.09 * s, 0.66, 0] })),
  ...mirror(s => ({ kind: "capsule", radius: 0.055, length: 0.3, position: [0.09 * s, 0.27, 0] })),
  ...mirror(s => ({ kind: "capsule", radius: 0.05, length: 0.24, position: [0.245 * s, 1.2, 0], rotation: [0, 0, 0.12 * s] })),
  ...mirror(s => ({ kind: "capsule", radius: 0.042, length: 0.22, position: [0.275 * s, 0.9, 0.02], rotation: [0, 0, 0.06 * s] })),
];

export const regions: Record<string, Shape[]> = {
  chest: mirror(s => ({ kind: "sphere", radius: 0.075, position: [0.07 * s, 1.31, 0.075], scale: [1.1, 0.7, 0.45] })),
  core: [{ kind: "box", size: [0.15, 0.22, 0.03], position: [0, 1.07, 0.092] }],
  back: [{ kind: "box", size: [0.27, 0.27, 0.03], position: [0, 1.24, -0.092] }],
  shoulders: mirror(s => ({ kind: "sphere", radius: 0.068, position: [0.205 * s, 1.38, 0] })),
  glutes: mirror(s => ({ kind: "sphere", radius: 0.08, position: [0.075 * s, 0.9, -0.07], scale: [1, 1, 0.7] })),
  quadriceps: mirror(s => ({ kind: "capsule", radius: 0.06, length: 0.2, position: [0.09 * s, 0.68, 0.04], scale: [1, 1, 0.8] })),
  calves: mirror(s => ({ kind: "capsule", radius: 0.045, length: 0.13, position: [0.09 * s, 0.31, -0.028], scale: [1, 1, 0.8] })),
};
