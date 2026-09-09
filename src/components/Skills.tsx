import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { skills } from '../data/skills';
import SkillModal from './SkillModal';
import Reveal from './Reveal';
import type { SkillItem } from '../data/skills';
import { useT, useLang } from '../data/i18n';

const categoryVariants = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: 'auto' },
  exit: { opacity: 0, height: 0 },
};

const Skills: React.FC = () => {
  const [modalSkill, setModalSkill] = useState<SkillItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
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

  const visibleGroups = activeCategory ? grouped.filter(([cat]) => cat === activeCategory) : grouped;

  return (
    <section id="skills" className="skills-section">
      <h2>{t.skills.title}</h2>
      <div className="skills-filter" role="tablist" aria-label={t.skills.title}>
        <button
          className={`skills-filter-btn${activeCategory === null ? ' active' : ''}`}
          role="tab"
          aria-selected={activeCategory === null}
          onClick={() => setActiveCategory(null)}
        >
          {t.skills.all}
        </button>
        {grouped.map(([cat]) => (
          <button
            key={cat}
            className={`skills-filter-btn${activeCategory === cat ? ' active' : ''}`}
            role="tab"
            aria-selected={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
          >
            {t.skills.categories[cat as keyof typeof t.skills.categories] || cat}
          </button>
        ))}
      </div>
      <div className="skills-list">
        <AnimatePresence initial={false}>
          {visibleGroups.map(([cat, items]) => (
            <motion.div
              key={cat}
              layout
              variants={categoryVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="skills-category"
            >
              <h3 className="skills-category-title">
                {t.skills.categories[cat as keyof typeof t.skills.categories] || cat}
              </h3>
              <div className="skills-category-list">
                {items.map((skill, idx) => (
                  <Reveal key={skill.slug} delay={idx * 0.04}>
                    <div
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
                        <p className="skill-desc">{getSkillDesc(skill.slug, skill.description)}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <SkillModal skill={modalSkill} isOpen={!!modalSkill} onClose={() => setModalSkill(null)} />
    </section>
  );
};

export default Skills;
