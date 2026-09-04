import { describe, it, expect } from 'vitest';
import { skills } from './skills';
import { experience } from './experience';
import { projects } from './projects';

const skillSlugs = new Set(skills.map((s) => s.slug));

function findUnknownSkillRefs(items: { slug: string; skills: string[] }[]): string[] {
  return items.flatMap((item) =>
    item.skills
      .filter((slug) => !skillSlugs.has(slug))
      .map((slug) => `${item.slug} -> "${slug}"`)
  );
}

describe('data integrity', () => {
  it('skills.ts has no duplicate slugs', () => {
    const slugs = skills.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('every skill slug referenced in experience.ts exists in skills.ts', () => {
    expect(findUnknownSkillRefs(experience)).toEqual([]);
  });

  it('every skill slug referenced in projects.ts exists in skills.ts', () => {
    expect(findUnknownSkillRefs(projects)).toEqual([]);
  });
});
