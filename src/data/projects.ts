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
    name: 'Old Portfolio',
    period: { from: new Date('2022-01-01') },
    skills: ['js', 'css', 'html'],
    type: 'Portfolio'
  },
  {
    slug: 'mathema',
    color: '#3498db',
    description:
      'Mathema to interaktywna aplikacja internetowa stworzona, aby pomóc użytkownikom ćwiczyć i doskonalić umiejętności matematyczne. Aplikacja prezentuje użytkownikom różnorodne zadania matematyczne z różnych kategorii i pozwala im sprawdzać swoją wiedzę w trybie interaktywnym lub przeglądać zestawy zadań. Użytkownicy mogą również śledzić swoje postępy i przeglądać wyniki w globalnej tabeli liderów.',
    shortDescription: 'Interaktywna aplikacja do nauki matematyki.',
    links: [
      { to: 'https://mathema.tolemak.pl/', label: 'Live Demo' },
      { to: 'https://github.com/Tolemak/mathema', label: 'GitHub' }
    ],
    logo: '/logos/react.svg',
    name: 'Mathema',
    period: { from: new Date('2025-06-01') },
    skills: ['react', 'vite', 'ts', 'react-router', 'css'],
    type: 'Web Application'
  },
  {
    slug: 'current-portfolio',
    color: '#6A0DAD',
    description:
      'Moje obecne portfolio, które właśnie przeglądasz. Zbudowane przy użyciu nowoczesnych technologii webowych, aby zaprezentować moje umiejętności i projekty w interaktywny i responsywny sposób.',
    shortDescription:
      'Interaktywne portfolio prezentujące moje projekty i umiejętności.',
    links: [
      { to: 'https://github.com/Tolemak/portfolio-react', label: 'GitHub' }
    ],
    logo: '/logos/react.svg',
    name: 'Current Portfolio',
    period: { from: new Date('2025-06-01') },
    skills: ['react', 'vite', 'ts', 'css', 'eslint'],
    type: 'Portfolio'
  }
];
