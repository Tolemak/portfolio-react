import React, { useState } from 'react';
import { projects } from '../data/projects';
import { skills } from '../data/skills';
import Modal from './Modal';
import type { SkillItem } from '../data/skills';

const Projects: React.FC = () => {
  const [modalSkill, setModalSkill] = useState<SkillItem | null>(null);

  // Helper: znajdź skill po slug
  const getSkillBySlug = (slug: string) => skills.find((s) => s.slug === slug);

  return (
    <section id="projects" className="projects-section">
      <h2>Projekty</h2>
      <div className="projects-list">
        {projects.map((project) => (
          <div key={project.slug} className="project-card fancy-card" style={{ borderColor: project.color }}>
            <div className="project-header">
              <img src={`/logos/${project.logo}`} alt={project.name} className="project-logo" />
              <h3>{project.name}</h3>
            </div>
            <p className="project-short">{project.shortDescription}</p>
            <div className="project-links">
              {project.links.map((link) => (
                <a key={link.to} href={link.to} target="_blank" rel="noopener noreferrer">{link.label}</a>
              ))}
            </div>
            <div className="project-skills">
              <strong>Stack:</strong>{' '}
              {project.skills.map((slug) => {
                const skill = getSkillBySlug(slug);
                if (!skill) return null;
                return (
                  <span
                    key={slug}
                    className="skill-tag"
                    style={{ borderColor: skill.color, color: skill.color }}
                    onClick={() => setModalSkill(skill)}
                    tabIndex={0}
                    role="button"
                    onKeyDown={e => { if (e.key === 'Enter') setModalSkill(skill); }}
                  >
                    <img src={skill.logo} alt={skill.name} className="skill-tag-logo" />
                    {skill.name}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={!!modalSkill} onClose={() => setModalSkill(null)}>
        {modalSkill && (
          <div className="modal-skill-details">
            <div className="modal-skill-header">
              <img src={modalSkill.logo} alt={modalSkill.name} className="modal-skill-logo" />
              <div>
                <h3>{modalSkill.name}</h3>
                <span className="modal-skill-category">{modalSkill.category}</span>
              </div>
            </div>
            <p>{modalSkill.description}</p>
          </div>
        )}
      </Modal>
      <style>{`
        .projects-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 2.2rem;
          margin-top: 2.5rem;
        }
        .project-card.fancy-card {
          background: rgba(30,40,60,0.85);
          border-radius: 1.2rem;
          border: 2.5px solid;
          box-shadow: 0 4px 32px 0 rgba(31,38,135,0.18);
          padding: 2.2rem 1.5rem 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          transition: transform 0.18s, box-shadow 0.18s, border-color 0.18s;
          position: relative;
        }
        .project-card.fancy-card:hover, .project-card.fancy-card:focus {
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 8px 48px 0 rgba(31,38,135,0.28);
          border-color: #fff;
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
          color: #61dafb;
          margin-right: 1.2em;
          text-decoration: underline;
          font-weight: 500;
        }
        .project-skills {
          margin-top: 0.5em;
        }
        .skill-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5em;
          border: 1.5px solid;
          border-radius: 1em;
          padding: 0.2em 0.7em 0.2em 0.4em;
          margin: 0 0.3em 0.3em 0;
          font-size: 0.98em;
          background: rgba(255,255,255,0.07);
          cursor: pointer;
          transition: background 0.15s, box-shadow 0.15s;
          box-shadow: 0 1px 6px 0 rgba(0,0,0,0.08);
        }
        .skill-tag-logo {
          width: 1.3em;
          height: 1.3em;
          object-fit: contain;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 1px 4px 0 rgba(0,0,0,0.10);
        }
        .skill-tag:hover, .skill-tag:focus {
          background: rgba(255,255,255,0.18);
          box-shadow: 0 2px 12px 0 rgba(0,0,0,0.13);
          outline: none;
        }
        .modal-skill-header {
          display: flex;
          align-items: center;
          gap: 1.2rem;
        }
        .modal-skill-logo {
          width: 48px;
          height: 48px;
          border-radius: 0.5em;
          background: #fff;
          object-fit: contain;
          box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
        }
        .modal-skill-category {
          font-size: 0.95em;
          color: #aaa;
        }
      `}</style>
    </section>
  );
};

export default Projects;
