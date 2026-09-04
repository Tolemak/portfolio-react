import React, { useMemo, useRef, useState } from 'react';
import { motion, useScroll } from 'motion/react';
import { experience } from '../data/experience';
import { skills } from '../data/skills';
import type { SkillItem } from '../data/skills';
import SkillModal from './SkillModal';
import SkillTag from './SkillTag';
import Reveal from './Reveal';
import { useT } from '../data/i18n';

const CONFIDENTIAL_SKILL_COUNT = 6;

function shuffled<T>(items: T[]): T[] {
  const pool = [...items];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
}

const Experience: React.FC = () => {
  const [modalSkill, setModalSkill] = useState<SkillItem | null>(null);
  const t = useT();
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 85%', 'end 65%'],
  });

  const decorativeSkills = useMemo(() => shuffled(skills).slice(0, CONFIDENTIAL_SKILL_COUNT), []);

  const sortedExperience = useMemo(
    () => [...experience].sort((a, b) => b.period.from.getTime() - a.period.from.getTime()),
    []
  );

  const tiles = t.experience.tiles as Record<string, { desc: string; name: string }>;
  const getSkillBySlug = (slug: string) => skills.find((s) => s.slug === slug);
  const getExperienceDesc = (item: typeof experience[number]) =>
    tiles[item.slug]?.desc ?? item.description;

  return (
    <section id="experience" className="experience-section">
      <h2>{t.experience.title}</h2>
      <div className="timeline" ref={timelineRef}>
        <div className="timeline-track" />
        <motion.div className="timeline-track-fill" style={{ scaleY: scrollYProgress }} />
        <div className="timeline-items">
          {sortedExperience.map((item, idx) => (
            <Reveal key={item.slug} delay={idx * 0.05} className="timeline-item">
              <span className="timeline-dot" style={{ background: item.color, borderColor: item.color }} />
              <div className="timeline-content fancy-card" style={{ borderColor: item.color }}>
                <div className="experience-header">
                  <strong>{tiles[item.slug]?.name ?? item.name}</strong>
                  {' '}<span>({item.company})</span>
                </div>
                <div className="experience-period-location">
                  <span>{item.location}</span>
                  <span>
                    {item.period.from.getFullYear()} – {item.period.to ? item.period.to.getFullYear() : t.experience.current}
                  </span>
                </div>
                <div className={`experience-description${item.confidential ? ' is-blurred' : ''}`}>
                  {getExperienceDesc(item)}
                </div>
                <div className={`experience-skills${item.confidential ? ' is-blurred' : ''}`}>
                  <strong>{t.experience.stack}</strong>{' '}
                  {item.confidential
                    ? decorativeSkills.map((skill) => (
                      <span
                        key={skill.slug}
                        className="skill-tag skill-tag--decorative"
                        style={{ borderColor: skill.color, color: skill.color }}
                      >
                        <img src={skill.logo} alt="" className="skill-tag-logo" aria-hidden="true" />
                        {skill.name}
                      </span>
                    ))
                    : item.skills.map((slug) => {
                      const skill = getSkillBySlug(slug);
                      if (!skill) return null;
                      return <SkillTag key={slug} skill={skill} onClick={setModalSkill} />;
                    })}
                </div>
                {item.links.length > 0 && (
                  <div className="experience-links">
                    {item.links.map((link) => (
                      <a
                        key={link.to}
                        href={link.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="experience-link"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <SkillModal skill={modalSkill} isOpen={!!modalSkill} onClose={() => setModalSkill(null)} />
    </section>
  );
};

export default Experience;
