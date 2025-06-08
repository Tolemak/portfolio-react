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
            {item.links && item.links.length > 0 && (
              <div className="experience-links">
                {item.links.map((link) => (
                  <a key={link.to} href={link.to} target="_blank" rel="noopener noreferrer" className="experience-link">
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <SkillModal skill={modalSkill} isOpen={!!modalSkill} onClose={() => setModalSkill(null)} />
    </section>
  );
};

export default Experience;
