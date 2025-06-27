import React from 'react';
import Modal from './Modal';
import { useT } from '../data/i18n';
import { experience } from '../data/experience';
import { projects } from '../data/projects';
import { education } from '../data/education';
import { skills } from '../data/skills';
import type { SkillItem } from '../data/skills';

interface SkillModalProps {
  skill: SkillItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const SkillModal: React.FC<SkillModalProps> = ({ skill, isOpen, onClose }) => {
  const t = useT();
  const lang: 'pl' | 'en' = (window.localStorage.getItem('lang') as 'pl' | 'en') || 'en';

  if (!skill) return null;

  const getExperienceWithSkill = (slug: string) =>
    experience.filter((exp) => exp.skills.includes(slug));

  const getProjectsWithSkill = (slug: string) =>
    projects.filter((proj) => proj.skills.includes(slug));

  const getEducationWithSkill = (slug: string) =>
    education.filter((edu) =>
      (edu.subjects && edu.subjects.some((s) => s.toLowerCase().includes(skills.find(sk => sk.slug === slug)?.name.toLowerCase() || slug.toLowerCase()))));

  const getSkillDesc = (slug: string, fallback: string | {pl:string;en:string}) => {
    if (typeof fallback === 'object' && fallback !== null) {
      return fallback[lang] || Object.values(fallback)[0];
    }
    return (t.skills?.descs as Record<string, string>)?.[slug] || fallback;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-skill-details">
        <div className="modal-skill-header">
          <img src={skill.logo} alt={skill.name} className="modal-skill-logo" />
          <div>
            <h3>{skill.name}</h3>
            <span className="modal-skill-category">{t.skills.categories[skill.category as keyof typeof t.skills.categories] || skill.category}</span>
          </div>
        </div>
        <p>{getSkillDesc(skill.slug, skill.description)}</p>
        <div className="modal-skill-used-in">
          <strong>{lang === 'pl' ? 'Używane' : 'Used'}</strong>
          <ul>
            {getExperienceWithSkill(skill.slug).map((exp) => (
              <li key={exp.slug}>
                <span style={{ color: exp.color }}>{exp.name}</span> <span>({exp.company})</span>
              </li>
            ))}
            {getProjectsWithSkill(skill.slug).map((proj) => (
              <li key={proj.slug}>
                <span style={{ color: proj.color }}>{proj.name}</span> <span>(Project)</span>
              </li>
            ))}
            {getEducationWithSkill(skill.slug).map((edu) => (
              <li key={edu.slug}>
                <span style={{ color: '#1976d2' }}>{(t.education.degree as Record<string, string>)[edu.degree] || edu.degree}</span> <span>({(t.about.schools as Record<string, string>)[edu.organization] || edu.organization})</span>
              </li>
            ))}
          </ul>
        </div>
        <style>{`
          .modal-skill-logo {
            width: 2.2em;
            height: 2.2em;
            border-radius: 0.5em;
            background: #fff;
            object-fit: contain;
            box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
            margin-right: 0.5em;
          }
        `}</style>
      </div>
    </Modal>
  );
};

export default SkillModal;
