import React, { useState } from 'react';
import { experience } from '../data/experience';
import { skills } from '../data/skills';
import type { SkillItem } from '../data/skills';
import SkillModal from './SkillModal';
import SkillTag from './SkillTag';
import { useT } from '../data/i18n';

const Experience: React.FC = () => {
  const [modalSkill, setModalSkill] = useState<SkillItem | null>(null);
  const t = useT();

  // Helper: znajdź skill po slug
  const getSkillBySlug = (slug: string) => skills.find((s) => s.slug === slug);

  // Helper do tłumaczenia opisu doświadczenia
  const getExperienceDesc = (item: typeof experience[number]) => {
    // Spróbuj pobrać tłumaczenie z t.experience["tiles"][item.slug]?.desc
    // Jeśli nie istnieje, zwróć item.description
    // @ts-expect-error: tiles może nie istnieć
    return t.experience && t.experience["tiles"] && t.experience["tiles"][item.slug]?.desc ? t.experience["tiles"][item.slug].desc : item.description;
  };

  return (
    <section id="experience" className="experience-section">
      <h2>{t.experience.title}</h2>
      <div className="experience-list">
        {experience.map((item) => (
          <div key={item.slug} className="experience-item fancy-card" style={{ borderColor: item.color }}>
            <div className="experience-header">
              <strong>{((t.experience.tiles as Record<string, {desc:string;name:string}>)[item.slug]?.name || item.name)}</strong> <span>({item.company})</span>
            </div>
            <div className="experience-period-location">
              <span>{item.location}</span>
              <span>
                {item.period.from.getFullYear()} - {item.period.to ? item.period.to.getFullYear() : 'obecnie'}
              </span>
            </div>
            <div className="experience-description">
              {getExperienceDesc(item)}
            </div>
            <div className="experience-skills">
              <strong>{t.experience.stack}</strong>{' '}
              {item.skills.map((slug) => {
                const skill = getSkillBySlug(slug);
                if (!skill) return null;
                return (
                  <SkillTag key={slug} skill={skill} onClick={setModalSkill} />
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <SkillModal skill={modalSkill} isOpen={!!modalSkill} onClose={() => setModalSkill(null)} />
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
