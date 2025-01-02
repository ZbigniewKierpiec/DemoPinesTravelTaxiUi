
export interface Country {
  id: number;
  name: string;
  flag: string;
  lang:string;
}
export   const Countries: Country[] = [
  {
    id: 1,
    flag: 'https://flagpedia.net/data/flags/w580/gb.webp',
    name: 'English',
    lang: 'eng',
  },
  {
    id: 2,
    flag: 'https://flagpedia.net/data/flags/w580/es.webp',
    name: 'Spanish',
    lang: 'esp',
  },
  {
    id: 3,
    flag: 'https://flagpedia.net/data/flags/w580/fr.webp',
    name: 'French',
    lang: 'fr',
  },
  {
    id: 4,
    flag: 'https://flagpedia.net/data/flags/w580/de.webp',
    name: 'German',
    lang: 'de',
  },
  {
    id: 5,
    flag: 'https://flagpedia.net/data/flags/w580/it.webp',
    name: 'Italian',
    lang: 'ita',
  },
  {
    id: 6,
    flag: 'https://flagpedia.net/data/flags/w580/pl.webp',
    name: 'Polish',
    lang: 'pl',
  },
];
