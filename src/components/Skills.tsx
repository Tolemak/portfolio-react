import React, { useState } from 'react';
import { skills } from '../data/skills';
import { experience } from '../data/experience';
import Modal from './Modal';
import type { SkillItem } from '../data/skills';

const Skills: React.FC = () => {
  const [modalSkill, setModalSkill] = useState<SkillItem | null>(null);

  // Helper: znajdź doświadczenia, gdzie skill był użyty
  const getExperienceWithSkill = (slug: string) =>
    experience.filter((exp) => exp.skills.includes(slug));

  return (
    <section id="skills" className="skills-section">
      <h2>Umiejętności</h2>
      <div className="skills-list">
        {skills.map((skill) => (
          <div
            key={skill.slug}
            className="skill-item fancy-card"
            style={{ borderColor: skill.color }}
            onClick={() => setModalSkill(skill)}
            tabIndex={0}
            role="button"
            onKeyDown={e => { if (e.key === 'Enter') setModalSkill(skill); }}
          >
            <div className="skill-logo-wrap">
              <img src={skill.logo} alt={skill.name} className="skill-logo" />
            </div>
            <div className="skill-info">
              <strong>{skill.name}</strong>
              <span className="skill-category">{skill.category}</span>
              <p className="skill-desc">{skill.description}</p>
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
              <strong>Używane w doświadczeniach:</strong>
              <ul>
                {getExperienceWithSkill(modalSkill.slug).map((exp) => (
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
        .skills-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2.2rem;
          margin-top: 2.5rem;
        }
        .skill-item.fancy-card {
          background: rgba(30,40,60,0.85);
          border-radius: 1.2rem;
          border: 2.5px solid;
          box-shadow: 0 4px 32px 0 rgba(31,38,135,0.18);
          padding: 2.2rem 1.5rem 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: transform 0.18s, box-shadow 0.18s, border-color 0.18s;
          position: relative;
        }
        .skill-item.fancy-card:hover, .skill-item.fancy-card:focus {
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 8px 48px 0 rgba(31,38,135,0.28);
          border-color: #fff;
          outline: none;
        }
        .skill-logo-wrap {
          background: #fff;
          border-radius: 50%;
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.1rem;
          box-shadow: 0 2px 12px 0 rgba(0,0,0,0.10);
        }
        .skill-logo {
          width: 44px;
          height: 44px;
          object-fit: contain;
        }
        .skill-info {
          text-align: center;
        }
        .skill-category {
          font-size: 0.95em;
          color: #aaa;
        }
        .skill-desc {
          margin-top: 0.7em;
          font-size: 1.05em;
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
      `}</style>
    </section>
  );
};

export default Skills;
