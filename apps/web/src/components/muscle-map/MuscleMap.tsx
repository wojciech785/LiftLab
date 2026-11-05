import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

type Props = { selected: string; onSelect: (muscle: string) => void };
const muscles = [
  { id: "chest", position: [0, 0.65, 0] as const, color: "#d47a5f" },
  { id: "back", position: [0, 0.05, -0.15] as const, color: "#5f91d4" },
  { id: "legs", position: [0, -0.8, 0] as const, color: "#7ab980" }
];

function MuscleNode({ id, position, color, selected, onSelect }: { id: string; position: readonly [number, number, number]; color: string; selected: boolean; onSelect: (id: string) => void }) {
  return <mesh position={position} onClick={() => onSelect(id)} scale={selected ? 1.13 : 1}>
    <sphereGeometry args={[id === "legs" ? 0.5 : 0.65, 28, 28]} />
    <meshStandardMaterial color={color} emissive={selected ? color : "#000000"} emissiveIntensity={selected ? 0.35 : 0} />
  </mesh>;
}

export function MuscleMap({ selected, onSelect }: Props) {
  return <div className="muscle-map" aria-hidden="true"><Canvas camera={{ position: [0, 0, 4.4], fov: 42 }}>
    <ambientLight intensity={1.3} /><directionalLight position={[3, 5, 4]} intensity={2} />
    {muscles.map((muscle) => <MuscleNode key={muscle.id} {...muscle} selected={selected === muscle.id} onSelect={onSelect} />)}
    <OrbitControls enablePan={false} minDistance={3.5} maxDistance={5} />
  </Canvas></div>;
}
