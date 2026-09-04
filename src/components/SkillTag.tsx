import React from 'react';
import { motion } from 'motion/react';
import type { SkillItem } from '../data/skills';

interface SkillTagProps {
  skill: SkillItem;
  onClick: (skill: SkillItem) => void;
}

const SkillTag: React.FC<SkillTagProps> = ({ skill, onClick }) => (
  <motion.span
    className="skill-tag"
    style={{ borderColor: skill.color, color: skill.color }}
    onClick={() => onClick(skill)}
    tabIndex={0}
    role="button"
    aria-label={`${skill.name} (${skill.category})`}
    onKeyDown={e => { if (e.key === 'Enter') onClick(skill); }}
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.94 }}
    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
  >
    <img src={skill.logo} alt="" className="skill-tag-logo" aria-hidden="true" />
    {skill.name}
  </motion.span>
);

export default SkillTag;
