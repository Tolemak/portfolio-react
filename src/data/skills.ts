// Skills data migrated from Svelte version
export interface SkillItem {
  slug: string;
  color: string;
  description: string;
  logo: string;
  name: string;
  category: string;
}

export const skills: SkillItem[] = [
  {
    slug: 'js',
    color: 'yellow',
    description: `JavaScript UX Specialist, Data Preloading Maestro, Interactive Frontend Developer, Efficient Data Loader`,
    logo: 'js.png',
    name: 'Javascript',
    category: 'pro-lang'
  },
  {
    slug: 'php',
    color: 'blue',
    description: `PHP REST API Architect, Data Preprocessing Prodigy, API Integration Expert, SQL Data Pipeline Maestro`,
    logo: 'php.svg',
    name: 'PHP',
    category: 'pro-lang'
  },
  {
    slug: 'python',
    color: 'blue',
    description: `Python Data Wizard, Automation Script Guru`,
    logo: 'python.png',
    name: 'Python',
    category: 'pro-lang'
  }
  // ...add more skills as needed
];
