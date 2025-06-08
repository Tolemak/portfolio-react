import React, { useState } from 'react';
import { education } from '../data/education';
import { skills } from '../data/skills';
import SkillModal from './SkillModal';
import SkillTag from './SkillTag';
import type { SkillItem } from '../data/skills';
import { useT } from '../data/i18n';

const schoolLogos: Record<string, string> = {
  'Gdańsk University of Technology': '/logos/Logo_Gdańsk_University_of_Technology.svg.png',
  // Add the correct filename for WSB if you have it, otherwise fallback:
  'The Gdańsk School of Banking': '/logos/no-img.svg',
};

const Education: React.FC = () => {
  const t = useT();
  const [modalSkill, setModalSkill] = useState<SkillItem | null>(null);

  // Helper: znajdź skill po nazwie (case-insensitive)
  const getSkillByName = (name: string) => skills.find((s) => s.name.toLowerCase() === name.toLowerCase());

  return (
    <section id="education" className="education-section">
      <h2>{t.education.title}</h2>
      <div className="education-list">
        {education.map((item) => (
          <div key={item.slug} className="education-item fancy-card" style={{ borderColor: '#61dafb' }}>
            <div className="education-header">
              <img src={schoolLogos[item.organization] || '/logos/no-img.svg'} alt={item.organization} className="education-logo" />
              <div>
                <span className="education-degree">{(t.education.degree as Record<string, string>)[item.degree] || item.degree}</span>
                <span className="education-organization">{(t.about.schools as Record<string, string>)[item.organization] || item.organization}</span>
              </div>
            </div>
            <div className="education-period-location">
              <span>{item.location}</span>
              <span>
                {item.period.from.getFullYear()} - {item.period.to.getFullYear()}
              </span>
            </div>
            <div className="education-subjects">
              <strong>{t.education.subjects}</strong>{' '}
              {item.subjects.map((subject, idx) => {
                const skill = getSkillByName(subject);
                return skill ? (
                  <SkillTag key={subject} skill={skill} onClick={setModalSkill} />
                ) : (
                  <span key={subject + idx}>{subject}{idx < item.subjects.length - 1 ? ', ' : ''}</span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <SkillModal skill={modalSkill} isOpen={!!modalSkill} onClose={() => setModalSkill(null)} />
    </section>
  );
};

export default Education;
