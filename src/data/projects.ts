// Projects data migrated from Svelte version
export interface ProjectItem {
  slug: string;
  color: string;
  description: string;
  shortDescription: string;
  links: { to: string; label: string }[];
  logo: string;
  name: string;
  period: { from: Date; to?: Date };
  skills: string[];
  type: string;
}

export const projects: ProjectItem[] = [
  {
    slug: 'file-actions',
    color: '#4caf50',
    description:
      'FileActions_BackendDemo is a demonstration project showcasing a full-stack application with a primary focus on backend development using PHP and the Symfony framework. It highlights best practices, clean architecture, and integration with modern tools and technologies.',
    shortDescription:
      'Batch file operations in your browser. Resive, convert, compress, and maybe more.',
    links: [
      { to: 'http://file-actions.tolemak.pl/', label: 'Live Demo' },
      { to: 'https://github.com/Tolemak/FileActions_BackendDemo', label: 'GitHub' }
    ],
    logo: 'symfony.svg',
    name: 'File Actions',
    period: { from: new Date('2025-04-01') },
    skills: ['php','symfony','bootstrap','js', 'ts', 'html', 'css'],
    type: 'Web Application'
  }
];
