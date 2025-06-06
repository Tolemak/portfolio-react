// Education data migrated from Svelte version
export interface EducationItem {
  degree: string;
  description: string;
  location: string;
  logo: string;
  name: string;
  organization: string;
  period: { from: Date; to: Date };
  shortDescription: string;
  slug: string;
  subjects: string[];
}

export const education: EducationItem[] = [
  {
    degree: 'Bachelor degree of biomedical engineering',
    description: '',
    location: 'Poland, Gdańsk',
    logo: '', // You can map to logo asset if needed
    name: '',
    organization: 'Gdańsk University of Technology',
    period: { from: new Date(2017, 10, 1), to: new Date(2021, 2, 1) },
    shortDescription: '',
    slug: 'dummy-education-item',
    subjects: ['Apps Development', 'Algebra', 'Biomedicine']
  },
  {
    degree: 'Master degree of IT project management',
    description: '',
    location: 'Poland, Gdańsk',
    logo: '',
    name: '',
    organization: 'The Gdańsk School of Banking',
    period: { from: new Date(2021, 3, 1), to: new Date(2022, 9, 1) },
    shortDescription: '',
    slug: 'dummy-education-item-2',
    subjects: ['IT Managment', 'CRM', 'ITIL']
  }
];
