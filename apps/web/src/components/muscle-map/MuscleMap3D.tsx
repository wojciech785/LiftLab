import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { MuscleGroupOption } from "@lift-lab/shared-types";
import { body, regions, type Shape } from "./figure";

const BODY = "#dfd2b9", IDLE = "#d9a48c", HOVER = "#c87a5c", ACTIVE = "#b34d25";

function Primitive({ shape, color, name, onClick, onHover }: { shape: Shape; color: string; name?: string; onClick?: () => void; onHover?: (on: boolean) => void }) {
  const rotation = shape.kind === "capsule" ? shape.rotation : undefined;
  const scale = shape.kind === "box" ? undefined : shape.scale;
  return <mesh name={name} position={shape.position} rotation={rotation} scale={scale}
    onClick={onClick ? event => { event.stopPropagation(); onClick(); } : undefined}
    onPointerOver={onHover ? event => { event.stopPropagation(); onHover(true); } : undefined}
    onPointerOut={onHover ? () => onHover(false) : undefined}>
    {shape.kind === "sphere" && <sphereGeometry args={[shape.radius, 32, 20]} />}
    {shape.kind === "capsule" && <capsuleGeometry args={[shape.radius, shape.length, 8, 20]} />}
    {shape.kind === "box" && <boxGeometry args={shape.size} />}
    <meshStandardMaterial color={color} roughness={0.75} />
  </mesh>;
}

type Props = { groups: (MuscleGroupOption & { meshId: string })[]; selected: string; onSelect: (slug: string) => void };

/** Prototype 3D muscle explorer built from primitives. Decorative for assistive tech; the select is the accessible control. */
export default function MuscleMap3D({ groups, selected, onSelect }: Props) {
  const [hovered, setHovered] = useState("");
  const [facing, setFacing] = useState<"front" | "back">("front");
  useEffect(() => { document.body.style.cursor = hovered ? "pointer" : ""; return () => { document.body.style.cursor = ""; }; }, [hovered]);
  return <div className="muscle-map-3d">
    <div className="muscle-map-3d__canvas" aria-hidden="true">
      <Canvas camera={{ position: [0, 0.9, 3.1], fov: 35 }} dpr={[1, 2]}>
        <ambientLight intensity={1.1} />
        <directionalLight position={[2, 3, 3]} intensity={1.6} />
        <directionalLight position={[-2, 2, -3]} intensity={0.8} />
        <group rotation={[0, facing === "back" ? Math.PI : 0, 0]}>
          {body.map((shape, i) => <Primitive key={i} shape={shape} color={BODY} />)}
          {groups.map(group => (regions[group.meshId] ?? []).map((shape, i) =>
            <Primitive key={`${group.meshId}-${i}`} name={group.meshId} shape={shape}
              color={group.slug === selected ? ACTIVE : hovered === group.slug ? HOVER : IDLE}
              onClick={() => onSelect(group.slug === selected ? "" : group.slug)}
              onHover={on => setHovered(on ? group.slug : "")} />))}
        </group>
        <OrbitControls target={[0, 0.84, 0]} enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 1.8} />
      </Canvas>
    </div>
    <div className="muscle-map-3d__controls">
      <button type="button" aria-pressed={facing === "front"} onClick={() => setFacing("front")}>Front</button>
      <button type="button" aria-pressed={facing === "back"} onClick={() => setFacing("back")}>Back</button>
      <span>Drag to rotate · tap a highlighted area</span>
    </div>
  </div>;
}
