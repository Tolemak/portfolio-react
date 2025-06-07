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
    onKeyDown={e => { if (e.key === 'Enter') onClick(skill); }}
  >
    <img src={skill.logo} alt={skill.name} className="skill-tag-logo" />
    {skill.name}
    <style>{`
      .skill-tag-logo {
        width: 1em;
        height: 1em;
        object-fit: contain;
        background: #fff;
        border-radius: 50%;
        box-shadow: 0 1px 4px 0 rgba(0,0,0,0.10);
        margin-right: 0.3em;
      }
      .skill-tag {
        display: inline-flex;
        align-items: center;
        gap: 0.4em;
        border: 1.5px solid;
        border-radius: 1em;
        padding: 0.18em 0.6em 0.18em 0.35em;
        margin: 0 0.25em 0.25em 0;
        font-size: 0.97em;
        background: rgba(255,255,255,0.07);
        cursor: pointer;
        transition: background 0.15s, box-shadow 0.15s;
        box-shadow: 0 1px 6px 0 rgba(0,0,0,0.08);
      }
      .skill-tag:hover, .skill-tag:focus {
        background: rgba(25,118,210,0.13);
        box-shadow: 0 2px 12px 0 rgba(0,0,0,0.13);
        outline: none;
      }
      @media (prefers-color-scheme: dark) {
        .skill-tag {
          background: rgba(35,43,58,0.18) !important;
          color: #e3eaf7;
        }
      }
    `}</style>
  </span>
);

export default SkillTag;
