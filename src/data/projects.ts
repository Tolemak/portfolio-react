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
    logo: '/logos/symfony.svg',
    name: 'File Actions',
    period: { from: new Date('2025-04-01') },
    skills: ['php','symfony','bootstrap','js', 'ts', 'html', 'css'],
    type: 'Web Application'
  },
  {
    slug: 'old-portfolio',
    color: '#1976d2',
    description:
      'Moje poprzednie portfolio, dostępne pod adresem old-portfolio.tolemak.pl. Projekt powstał w oparciu o inne technologie niż obecna wersja. Kod źródłowy znajduje się na moim GitHubie jako repozytorium "portfolio".',
    shortDescription:
      'Stare portfolio – zobacz poprzednią wersję strony.',
    links: [
      { to: 'https://old-portfolio.tolemak.pl', label: 'Live Demo' },
      { to: 'https://github.com/Tolemak/portfolio', label: 'GitHub' }
    ],
    logo: '/logos/react.svg',
    name: 'Stare Portfolio',
    period: { from: new Date('2022-01-01') },
    skills: ['js', 'css', 'html'],
    type: 'Portfolio'
  }
];
