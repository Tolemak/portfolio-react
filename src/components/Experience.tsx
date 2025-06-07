import React, { useState } from 'react';
import { experience } from '../data/experience';
import { skills } from '../data/skills';
import type { SkillItem } from '../data/skills';
import Modal from './Modal';
import { useT } from '../data/i18n';

const Experience: React.FC = () => {
  const [modalSkill, setModalSkill] = useState<SkillItem | null>(null);
  const t = useT();

  // Helper: znajdź skill po slug
  const getSkillBySlug = (slug: string) => skills.find((s) => s.slug === slug);

  return (
    <section id="experience" className="experience-section">
      <h2>{t.experience.title}</h2>
      <div className="experience-list">
        {experience.map((item) => (
          <div key={item.slug} className="experience-item fancy-card" style={{ borderColor: item.color }}>
            <div className="experience-header">
              <strong>{item.name}</strong> <span>({item.company})</span>
            </div>
            <div className="experience-period-location">
              <span>{item.location}</span>
              <span>
                {item.period.from.getFullYear()} - {item.period.to ? item.period.to.getFullYear() : 'obecnie'}
              </span>
            </div>
            <div className="experience-description">{item.description}</div>
            <div className="experience-skills">
              <strong>{t.experience.stack}</strong>{' '}
              {item.skills.map((slug) => {
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
            <div className="modal-skill-used-in">
              <strong>{t.experience.usedIn}</strong>
              <ul>
                {experience.filter((exp) => exp.skills.includes(modalSkill.slug)).map((exp) => (
                  <li key={exp.slug}>
                    <span style={{ color: exp.color }}>{exp.name}</span> <span>({exp.company})</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
      <style>{`
        .experience-section {
          background: none !important;
          max-width: 900px;
          margin: 4rem auto;
          padding: 2.5rem 2rem;
        }
        .experience-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 2.2rem;
          margin-top: 2.5rem;
        }
        .experience-item.fancy-card {
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
        }
        .experience-item.fancy-card:hover, .experience-item.fancy-card:focus {
          background: rgba(227,241,255,0.92);
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 8px 48px 0 rgba(31,38,135,0.18);
          border-color: #1976d2;
          outline: none;
        }
        .experience-header {
          font-size: 1.25em;
          font-family: 'Orbitron', 'Montserrat', sans-serif;
          letter-spacing: 0.01em;
        }
        .experience-period-location {
          display: flex;
          gap: 1.2em;
          color: #1976d2;
          font-size: 1em;
        }
        .experience-description {
          margin: 0.7em 0 0.5em 0;
          font-size: 1.08em;
          color: #222b3a;
        }
        .experience-skills {
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
          background: #f5faff;
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
          background: #e3f1ff;
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
        .modal-skill-used-in ul {
          margin: 0.5em 0 0 1em;
          padding: 0;
        }
        .modal-skill-used-in li {
          margin-bottom: 0.2em;
        }
        @media (prefers-color-scheme: dark) {
          .experience-item.fancy-card {
            background: rgba(35,43,58,0.92) !important;
            color: #e3eaf7;
            box-shadow: 0 4px 32px 0 rgba(31,38,135,0.18);
          }
          .experience-item.fancy-card:hover, .experience-item.fancy-card:focus {
            background: rgba(34,48,74,0.98) !important;
            border-color: #fff;
          }
          .experience-description {
            color: #e3eaf7;
          }
        }
      `}</style>
    </section>
  );
};

export default Experience;
