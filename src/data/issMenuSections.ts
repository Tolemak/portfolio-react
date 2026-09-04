export interface IssMenuSection {
  key: string;
  path: string;
}

export const ISS_MENU_SECTIONS: readonly IssMenuSection[] = [
  { key: 'about', path: '/about' },
  { key: 'skills', path: '/skills' },
  { key: 'projects', path: '/projects' },
  { key: 'education', path: '/education' },
  { key: 'experience', path: '/experience' },
];

export const getSectionPath = (key: string): string => {
  const section = ISS_MENU_SECTIONS.find((s) => s.key === key);
  if (!section) throw new Error(`Unknown ISS menu section: ${key}`);
  return section.path;
};
