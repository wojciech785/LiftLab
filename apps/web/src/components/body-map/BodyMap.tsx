import type { MuscleGroupOption } from "@lift-lab/shared-types";
import geometry from "./geometry.json";

type View = "front" | "back";
type Region = Partial<Record<View, string[]>>;
const regions: Record<string, Region> = geometry.regions;
const views: View[] = ["front", "back"];

/** Splits CMS muscle groups into those the map can draw (by meshId) and the rest. */
export function mapMuscleGroups(groups: MuscleGroupOption[]) {
  const mapped: (MuscleGroupOption & { meshId: string })[] = [];
  const unmapped: MuscleGroupOption[] = [];
  for (const group of groups) {
    if (group.meshId && Object.hasOwn(regions, group.meshId)) mapped.push({ ...group, meshId: group.meshId });
    else unmapped.push(group);
  }
  return { mapped, unmapped };
}

type Props = {
  groups: MuscleGroupOption[];
  /** Slugs drawn as highlighted. */
  highlighted: string[];
  /** When given, regions are clickable and toggle selection. */
  onSelect?: (slug: string) => void;
};

/**
 * Front/back body diagram keyed by MuscleGroup.meshId. Decorative for assistive
 * technology (aria-hidden): every map interaction has an equivalent accessible
 * control or text list next to it.
 */
export function BodyMap({ groups, highlighted, onSelect }: Props) {
  const { mapped } = mapMuscleGroups(groups);
  if (!mapped.length) return null;
  return <svg className={`body-map${onSelect ? " is-interactive" : ""}`} viewBox={geometry.viewBox} aria-hidden="true" focusable="false">
    {views.map(view => <g key={view} transform={`translate(${geometry.views[view]} 0)`}>
      <g className="body-map__figure">{geometry.figure.map((d, i) => <path key={i} d={d} />)}</g>
      {mapped.map(group => {
        const parts = regions[group.meshId][view];
        if (!parts) return null;
        const active = highlighted.includes(group.slug);
        return <g key={group.meshId} data-mesh={group.meshId} className={`body-map__region${active ? " is-active" : ""}`}
          onClick={onSelect ? () => onSelect(active ? "" : group.slug) : undefined}>
          <title>{group.name}</title>
          {parts.map((d, i) => <path key={i} d={d} />)}
        </g>;
      })}
    </g>)}
  </svg>;
}
