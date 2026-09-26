import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { useT } from '../data/i18n';
import { experience } from '../data/experience';
import { projects } from '../data/projects';
import { education } from '../data/education';
import type { SkillItem } from '../data/skills';

interface SkillModalProps {
  skill: SkillItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const SkillModal: React.FC<SkillModalProps> = ({ skill, isOpen, onClose }) => {
  const t = useT();
  const [displaySkill, setDisplaySkill] = useState<SkillItem | null>(skill);

  useEffect(() => {
    if (skill) setDisplaySkill(skill);
  }, [skill]);

  if (!displaySkill) return null;

  const slug = displaySkill.slug;
  const skillName = displaySkill.name.toLowerCase();
  const usedInExperience = experience.filter((exp) => exp.skills.includes(slug));
  const usedInProjects = projects.filter((proj) => proj.skills.includes(slug));
  const usedInEducation = education.filter((edu) =>
    edu.subjects.some((s) => s.toLowerCase().includes(skillName))
  );
  const isUsed = usedInExperience.length + usedInProjects.length + usedInEducation.length > 0;

  const tiles = t.experience.tiles as Record<string, { name: string }>;
  const projectNames = t.projects.names as Record<string, string>;
  const degrees = t.education.degree as Record<string, string>;
  const schools = t.about.schools as Record<string, string>;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-skill-details">
        <div className="modal-skill-header">
          <img src={displaySkill.logo} alt={displaySkill.name} className="modal-skill-logo" />
          <div>
            <h3>{displaySkill.name}</h3>
            <span className="modal-skill-category">
              {t.skills.categories[displaySkill.category as keyof typeof t.skills.categories] || displaySkill.category}
            </span>
          </div>
        </div>
        {isUsed && (
          <div className="modal-skill-used-in">
            <strong>{t.skills.usedIn}</strong>
            <ul>
              {usedInExperience.map((exp) => (
                <li key={exp.slug}>
                  <span style={{ color: exp.color }}>{tiles[exp.slug]?.name ?? exp.name}</span>{' '}
                  <span>({exp.company})</span>
                </li>
              ))}
              {usedInProjects.map((proj) => (
                <li key={proj.slug}>
                  <span style={{ color: proj.color }}>{projectNames[proj.name] || proj.name}</span>{' '}
                  <span>({t.skills.project})</span>
                </li>
              ))}
              {usedInEducation.map((edu) => (
                <li key={edu.slug}>
                  <span style={{ color: 'var(--accent)' }}>{degrees[edu.degree] || edu.degree}</span>{' '}
                  <span>({schools[edu.organization] || edu.organization})</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SkillModal;
