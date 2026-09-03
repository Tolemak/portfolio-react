import React, { useState } from 'react';
import { skills } from '../data/skills';
import SkillModal from './SkillModal';
import type { SkillItem } from '../data/skills';
import { useT, useLang } from '../data/i18n';

const Skills: React.FC = () => {
  const [modalSkill, setModalSkill] = useState<SkillItem | null>(null);
  const t = useT();
  const { lang } = useLang();

  const getSkillDesc = (slug: string, fallback: string | { pl: string; en: string }) => {
    if (typeof fallback === 'object' && fallback !== null) {
      return fallback[lang] || Object.values(fallback)[0];
    }
    const descs = t.skills?.descs as Record<string, string> | undefined;
    return descs?.[slug] || fallback;
  };

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
            <h3 className="skills-category-title">
              {t.skills.categories[cat as keyof typeof t.skills.categories] || cat}
            </h3>
            <div className="skills-category-list">
              {items.map((skill) => (
                <div
                  key={skill.slug}
                  className="skill-item fancy-card"
                  style={{ borderColor: skill.color }}
                  tabIndex={0}
                  role="button"
                  aria-label={`${skill.name} - ${t.skills.categories[skill.category as keyof typeof t.skills.categories] || skill.category}`}
                  onClick={() => setModalSkill(skill)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setModalSkill(skill); }}
                >
                  <div className="skill-logo-wrap">
                    <img src={skill.logo} alt="" className="skill-logo" loading="lazy" aria-hidden="true" />
                  </div>
                  <div className="skill-info">
                    <strong>{skill.name}</strong>
                    <span className="skill-category">
                      {t.skills.categories[skill.category as keyof typeof t.skills.categories] || skill.category}
                    </span>
                    <p className="skill-desc">{getSkillDesc(skill.slug, skill.description)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <SkillModal skill={modalSkill} isOpen={!!modalSkill} onClose={() => setModalSkill(null)} />
    </section>
  );
};

export default Skills;
