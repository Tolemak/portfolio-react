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
    slug: 'favourite-computer-systems-developer',
    company: 'Favourite Computer Systems',
    description: 'Development and maintenance of web applications for clients of Favourite Computer Systems. Creating new functionalities and integrations with REST API in response to customer needs.',
    contract: 'FullTime',
    type: 'Software Development',
    location: 'Gdańsk', // Możesz zaktualizować, jeśli inna lokalizacja
    period: { from: new Date(2020, 8, 1), to: new Date() }, // Zakładam, że data początkowa jest ta sama
    skills: ['html', 'css', 'js', 'php', 'sql', 'symfony', 'bootstrap', 'twig', 'python', 'ts'], // Usunięto 'react'
    name: 'Software Developer',
    color: 'blue', // Możesz zmienić kolor
    links: [{ to: 'https://www.favourite.pl/', label: 'Strona firmy' }],
    logo: 'no-img.svg', // Placeholder, możesz zmienić na logo firmy
    shortDescription: 'Developing and maintaining web applications at Favourite Computer Systems.'
  }
];
