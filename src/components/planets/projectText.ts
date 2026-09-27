import { useT } from '../../data/i18n';
import type { ProjectItem } from '../../data/projects';

/** A project's name, type and one-line summary in the current language. */
export function useProjectText(project: ProjectItem) {
  const t = useT();
  const names = t.projects.names as Record<string, string>;
  const types = t.projects.types as Record<string, string>;
  const tiles = t.projects.tiles as Record<string, { short: string } | undefined>;
  return {
    name: names[project.name] || project.name,
    type: types[project.type] || project.type,
    short: tiles[project.name]?.short || project.shortDescription,
  };
}
