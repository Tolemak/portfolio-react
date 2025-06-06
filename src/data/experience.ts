// Experience data migrated from Svelte version
export interface ExperienceItem {
  slug: string;
  company: string;
  description: string;
  contract: string;
  type: string;
  location: string;
  period: { from: Date; to: Date };
  skills: string[];
  name: string;
  color: string;
  links: { to: string; label: string }[];
  logo: string;
  shortDescription: string;
}

export const experience: ExperienceItem[] = [
  {
    slug: 'software-freelance-junior',
    company: 'Self-employed',
    description: 'Development and maintenance of a web application combining ERP and CRM. Creating new functionalities and integrations with REST API in response to customer needs.',
    contract: 'FullTime',
    type: 'Software Development',
    location: 'Home',
    period: { from: new Date(2020, 8, 1), to: new Date() },
    skills: ['html', 'css', 'js', 'php', 'sql', 'symfony', 'bootstrap', 'twig', 'python'],
    name: 'Web Developer',
    color: 'green',
    links: [],
    logo: '',
    shortDescription: 'Creating awesome applications for customers.'
  }
];
