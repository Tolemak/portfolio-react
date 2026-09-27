import { describe, expect, it } from 'vitest';
import { projects } from './projects';
import { PROJECT_PLANETS, orbitPosition, planetExtent, planetFor, planetsWithProjects } from './projectPlanets';

describe('project planets', () => {
  it('gives every project exactly one planet', () => {
    expect(projects.map((p) => p.slug).sort()).toEqual(PROJECT_PLANETS.map((p) => p.slug).sort());
  });

  it('keeps orbits apart so planets never touch', () => {
    const sorted = [...PROJECT_PLANETS].sort((a, b) => a.orbit - b.orbit);
    sorted.slice(1).forEach((planet, i) => {
      const inner = sorted[i];
      expect(planet.orbit - inner.orbit).toBeGreaterThan(planetExtent(planet) + planetExtent(inner));
    });
  });

  it('pairs planets with their projects in orbit order', () => {
    const pairs = planetsWithProjects();
    expect(pairs.map(({ planet, project }) => [planet.slug, project.slug])).toEqual(
      PROJECT_PLANETS.map((p) => [p.slug, p.slug]),
    );
  });

  it('counts the ring into the planet extent', () => {
    const ringed = PROJECT_PLANETS.find((p) => p.ring)!;
    expect(planetExtent(ringed)).toBeGreaterThan(ringed.radius);
  });

  it('finds a planet by slug', () => {
    expect(planetFor('mathema')?.surface).toBe('notebook');
    expect(planetFor('nope')).toBeUndefined();
  });

  it('moves along a flat circle of the orbit radius', () => {
    const planet = PROJECT_PLANETS[0];
    const [x, y, z] = orbitPosition(planet, 3);
    expect(y).toBe(0);
    expect(Math.hypot(x, z)).toBeCloseTo(planet.orbit);
    expect(orbitPosition(planet, 0)).toEqual([Math.cos(planet.phase) * planet.orbit, 0, Math.sin(planet.phase) * planet.orbit]);
  });
});
