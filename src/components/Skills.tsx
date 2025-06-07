import React, { useState } from 'react';
import { skills } from '../data/skills';
import { experience } from '../data/experience';
import Modal from './Modal';
import type { SkillItem } from '../data/skills';
import { useT } from '../data/i18n';

const Skills: React.FC = () => {
  const [modalSkill, setModalSkill] = useState<SkillItem | null>(null);
  const t = useT();
  const lang: 'pl' | 'en' = (window.localStorage.getItem('lang') as 'pl' | 'en') || 'en';

  // Helper: znajdź doświadczenia, gdzie skill był użyty
  const getExperienceWithSkill = (slug: string) =>
    experience.filter((exp) => exp.skills.includes(slug));

  // Helper do tłumaczenia opisu umiejętności
  const getSkillDesc = (slug: string, fallback: string | {pl:string;en:string}) => {
    if (typeof fallback === 'object' && fallback !== null) {
      return fallback[lang] || Object.values(fallback)[0];
    }
    // @ts-expect-error: tiles może nie istnieć
    return t.skills && t.skills["descs"] && t.skills["descs"][slug] ? t.skills["descs"][slug] : fallback;
  };

  // Grupowanie po kategorii
  const grouped = Object.entries(
    skills.reduce<Record<string, SkillItem[]>>((acc, skill) => {
      acc[skill.category] = acc[skill.category] || [];
      acc[skill.category].push(skill);
      return acc;
    }, {})
  );

  return (
    <section id="skills" className="skills-section">
      <h2>{t.skills.title}</h2>
      <div className="skills-list">
        {grouped.map(([cat, items]) => (
          <div key={cat} className="skills-category">
            <h3 className="skills-category-title">{t.skills.categories[cat as keyof typeof t.skills.categories] || cat}</h3>
            <div className="skills-category-list">
              {items.map((skill) => (
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
                    <span className="skill-category">{t.skills.categories[skill.category as keyof typeof t.skills.categories] || skill.category}</span>
                    <p className="skill-desc">{getSkillDesc(skill.slug, skill.description)}</p>
                  </div>
                </div>
              ))}
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
                <span className="modal-skill-category">{t.skills.categories[modalSkill.category as keyof typeof t.skills.categories] || modalSkill.category}</span>
              </div>
            </div>
            <p>{getSkillDesc(modalSkill.slug, modalSkill.description)}</p>
            <div className="modal-skill-used-in">
              <strong>{t.skills.usedIn}</strong>
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
        .skills-section {
          background: none !important;
          max-width: 900px;
          margin: 4rem auto;
          padding: 2.5rem 2rem;
        }
        .skills-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2.2rem;
          margin-top: 2.5rem;
        }
        .skill-item.fancy-card {
          background: rgba(255,255,255,0.85);
          border-radius: 1.2rem;
          border: 2.5px solid;
          box-shadow: 0 4px 32px 0 rgba(31,38,135,0.10);
          padding: 2.2rem 1.5rem 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: transform 0.18s, box-shadow 0.18s, border-color 0.18s, background 0.18s;
          position: relative;
          color: inherit;
        }
        .skill-item.fancy-card:hover, .skill-item.fancy-card:focus {
          background: rgba(227,241,255,0.92);
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 8px 48px 0 rgba(31,38,135,0.18);
          border-color: #1976d2;
          outline: none;
        }
        .skill-desc {
          color: #222b3a;
        }
        @media (prefers-color-scheme: dark) {
          .skill-item.fancy-card {
            background: rgba(35,43,58,0.92) !important;
            color: #e3eaf7;
            box-shadow: 0 4px 32px 0 rgba(31,38,135,0.18);
          }
          .skill-item.fancy-card:hover, .skill-item.fancy-card:focus {
            background: rgba(34,48,74,0.98) !important;
            border-color: #fff;
          }
          .skill-desc {
            color: #e3eaf7;
          }
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
          color: #1976d2;
          margin-top: 0.5em;
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
        .skills-category {
          margin-bottom: 3rem;
        }
        .skills-category-title {
          font-size: 1.5rem;
          margin-bottom: 1.2rem;
          position: relative;
          display: inline-block;
        }
        .skills-category-title:after {
          content: '';
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: -4px;
          left: 0;
          background: linear-gradient(to right, transparent, #0070f3, transparent);
        }
        .skills-category-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 2.2rem;
        }
      `}</style>
    </section>
  );
};

export default Skills;
