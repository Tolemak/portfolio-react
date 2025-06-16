import React, { useState } from 'react';
import { projects } from '../data/projects';
import { skills } from '../data/skills';
import SkillModal from './SkillModal';
import SkillTag from './SkillTag';
import type { SkillItem } from '../data/skills';
import { useT } from '../data/i18n';

const Projects: React.FC = () => {
  const [modalSkill, setModalSkill] = useState<SkillItem | null>(null);
  const t = useT();

  const sortedProjects = [...projects].sort((a, b) => {
    const dateAFrom = new Date(a.period.from).getTime();
    const dateBFrom = new Date(b.period.from).getTime();
    const dateATo = a.period.to ? new Date(a.period.to).getTime() : Infinity; // Ongoing projects get a very large 'to' date
    const dateBTo = b.period.to ? new Date(b.period.to).getTime() : Infinity; // Ongoing projects get a very large 'to' date

    // Sort by 'to' date primarily (newest, so ongoing projects come first)
    if (dateBTo !== dateATo) {
      return dateBTo - dateATo;
    }
    // If 'to' dates are the same (e.g., both ongoing or same end date), sort by 'from' date (newest first)
    return dateBFrom - dateAFrom;
  });

  // Helper: znajdź skill po slug
  const getSkillBySlug = (slug: string) => skills.find((s) => s.slug === slug);

  return (
    <section id="projects" className="projects-section">
      <h2>{t.projects.title}</h2>
      <div className="projects-list">
        {sortedProjects.map((project) => (
          <div key={project.slug} className="project-card fancy-card" style={{ borderColor: project.color }}>
            <div className="project-header">
              <img src={project.logo} alt={project.name} className="project-logo" loading="lazy" />
              <h3>{project.name}</h3>
            </div>
            <p className="project-date">{new Date(project.period.from).toLocaleDateString('default', { month: '2-digit', year: 'numeric' })}</p>
            <p className="project-short">{(t.projects.tiles as Record<string, { short: string; desc: string }>)[project.name]?.short || project.shortDescription}</p>
            <div className="project-links">
              {project.links.map((link) => (
                <a key={link.to} href={link.to} target="_blank" rel="noopener noreferrer" aria-label={link.label + ' – ' + project.name}>{link.label}</a>
              ))}
            </div>
            <div className="project-skills">
              <strong>{t.projects.stack}</strong>{' '}
              {project.skills.map((slug) => {
                const skill = getSkillBySlug(slug);
                if (!skill) return null;
                return (
                  <SkillTag key={slug} skill={skill} onClick={(skill) => setModalSkill(skill)} />
                );
              })}
            </div>
            <div className="project-desc">
              {(t.projects.tiles as Record<string, { short: string; desc: string }>)[project.name]?.desc || project.description}
            </div>
          </div>
        ))}
      </div>
      <SkillModal skill={modalSkill} isOpen={!!modalSkill} onClose={() => setModalSkill(null)} />
    </section>
  );
};

export default Projects;
