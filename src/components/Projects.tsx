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

  // Helper: znajdź skill po slug
  const getSkillBySlug = (slug: string) => skills.find((s) => s.slug === slug);

  return (
    <section id="projects" className="projects-section">
      <h2>{t.projects.title}</h2>
      <div className="projects-list">
        {projects.map((project) => (
          <div key={project.slug} className="project-card fancy-card" style={{ borderColor: project.color }}>
            <div className="project-header">
              <img src={`/logos/${project.logo}`} alt={project.name} className="project-logo" />
              <h3>{project.name}</h3>
            </div>
            <p className="project-short">{(t.projects.tiles as Record<string, { short: string; desc: string }>)[project.name]?.short || project.shortDescription}</p>
            <div className="project-links">
              {project.links.map((link) => (
                <a key={link.to} href={link.to} target="_blank" rel="noopener noreferrer">{link.label}</a>
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
      <style>{`
        .projects-section {
          background: none !important;
          max-width: 900px;
          margin: 4rem auto;
          padding: 2.5rem 2rem;
        }
        .projects-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 2.2rem;
          margin-top: 2.5rem;
        }
        .project-card.fancy-card {
          background: rgba(255,255,255,0.85);
          border-radius: 1.2rem;
          border: 2.5px solid;
          box-shadow: 0 4px 32px 0 rgba(31,38,135,0.10);
          padding: 2.2rem 1.5rem 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          transition: transform 0.18s, box-shadow 0.18s, border-color 0.18s, background 0.18s;
          position: relative;
          color: inherit;
        }
        .project-card.fancy-card:hover, .project-card.fancy-card:focus {
          background: rgba(227,241,255,0.92);
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 8px 48px 0 rgba(31,38,135,0.18);
          border-color: #1976d2;
          outline: none;
        }
        .project-header {
          display: flex;
          align-items: center;
          gap: 1.2em;
        }
        .project-logo {
          width: 48px;
          height: 48px;
          object-fit: contain;
          background: #fff;
          border-radius: 0.5em;
          box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
        }
        .project-short {
          margin: 0.7em 0 0.5em 0;
          font-size: 1.08em;
        }
        .project-links {
          margin-bottom: 0.5em;
        }
        .project-links a {
          color: #1976d2;
          margin-right: 1.2em;
          text-decoration: underline;
          font-weight: 500;
        }
        .project-skills {
          margin-top: 0.5em;
        }
        .project-desc {
          margin-top: 0.7em;
          font-size: 1.05em;
          color: #222b3a;
        }
        @media (prefers-color-scheme: dark) {
          .project-card.fancy-card {
            background: rgba(35,43,58,0.92) !important;
            color: #e3eaf7;
            box-shadow: 0 4px 32px 0 rgba(31,38,135,0.18);
          }
          .project-card.fancy-card:hover, .project-card.fancy-card:focus {
            background: rgba(34,48,74,0.98) !important;
            border-color: #fff;
          }
          .project-desc {
            color: #e3eaf7;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
