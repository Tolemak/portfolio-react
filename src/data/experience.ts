export interface ExperienceItem {
  slug: string;
  company: string;
  description: string;
  contract: string;
  type: string;
  location: string;
  period: { from: Date; to?: Date };
  skills: string[];
  name: string;
  color: string;
  links: { to: string; label: string }[];
  logo: string;
  shortDescription: string;
  confidential?: boolean;
}

export const experience: ExperienceItem[] = [
  {
    slug: 'favourite-computer-systems-developer',
    company: 'Favourite Computer Systems',
    description: 'Development and maintenance of web applications for clients of Favourite Computer Systems. Creating new functionalities and integrations with REST API in response to customer needs.',
    contract: 'FullTime',
    type: 'Software Development',
    location: 'Gdańsk',
    period: { from: new Date(2020, 8, 1), to: new Date(2025, 9, 30) },
    skills: ['html', 'css', 'js', 'php', 'sql', 'symfony', 'bootstrap', 'twig', 'python', 'ts'],
    name: 'Software Developer',
    color: 'blue',
    links: [{ to: 'https://www.favourite.pl/', label: 'Strona firmy' }],
    logo: 'no-img.svg',
    shortDescription: 'Developing and maintaining web applications at Favourite Computer Systems.'
  },
  {
    slug: 'wskz-backend-developer',
    company: 'WSKZ',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    contract: 'FullTime',
    type: 'Software Development',
    location: 'Polska',
    period: { from: new Date(2025, 9, 1) },
    skills: [],
    name: 'Backend Developer',
    color: '#64748b',
    links: [{ to: 'https://wskz.pl', label: 'Strona firmy' }],
    logo: 'no-img.svg',
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    confidential: true
  }
];
