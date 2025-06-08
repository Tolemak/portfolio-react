import React from 'react';
import type { SkillItem } from '../data/skills';

interface SkillTagProps {
  skill: SkillItem;
  onClick: (skill: SkillItem) => void;
}

const SkillTag: React.FC<SkillTagProps> = ({ skill, onClick }) => (
  <span
    className="skill-tag"
    style={{ borderColor: skill.color, color: skill.color }}
    onClick={() => onClick(skill)}
    tabIndex={0}
    role="button"
    aria-label={`${skill.name} (${skill.category})`}
    onKeyDown={e => { if (e.key === 'Enter') onClick(skill); }}
  >
    <img src={skill.logo} alt="" className="skill-tag-logo" aria-hidden="true" />
    {skill.name}
  </span>
);

export default SkillTag;
