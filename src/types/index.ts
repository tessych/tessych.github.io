export const LOCALES = [
  { id: 'ru', name: 'Русский' },
  { id: 'en', name: 'English' },
  { id: 'ja', name: '日本語' },
] as const;

export type ThemeId = 'kurosawa' | 'kumo';

export type Locale = (typeof LOCALES)[number]['id'];
export type LocaleOption = (typeof LOCALES)[number];

export type AboutTakeaway = {
  tag: string;
  title: string;
  body: string;
};

export type AreaItem = {
  mod: string;
  title: string;
  paragraphs: [string, string];
  skills: string[];
};

export type FocusItem = {
  step: string;
  badge: string;
  title: string;
  body: string;
};

export type StackItem = {
  name: string;
  role: string;
  desc: string;
  year: string;
};

export type StackCategory = {
  title: string;
  note: string;
  items: StackItem[];
};

export type Copy = {
  documentLang: string;
  role: string;
  skip: string;
  home: string;
  lightTheme: string;
  languageLabel: string;
  sectionsLabel: string;
  nav: [string, string, string, string];
  location: string;
  approachAction: string;
  contactAction: string;
  portraitAlt: string;
  player: {
    label: string;
    play: string;
    pause: string;
    previous: string;
    next: string;
    queue: string;
    seek: string;
    volume: string;
    unavailable: string;
    error: string;
  };
  roleLine: string;
  introCopy: string;
  githubLabel: string;
  telegramLabel: string;
  emailLabel: string;
  copyEmailLabel: string;
  copiedLabel: string;
  copyTgLabel: string;
  aboutIndex: string;
  aboutTitle: string;
  aboutTakeaways: [AboutTakeaway, AboutTakeaway, AboutTakeaway];
  areasIndex: string;
  areasTitle: string;
  areas: [AreaItem, AreaItem, AreaItem];
  focusIndex: string;
  focusTitle: string;
  focus: [FocusItem, FocusItem, FocusItem];
  stackIndex: string;
  stackTitle: string;
  stackCategories: StackCategory[];
  linksIndex: string;
  linksTitle: string;
  linksCopy: string;
  contactTelegramTag: string;
  contactTelegramAction: string;
  contactEmailTag: string;
  contactEmailAction: string;
  contactGithubTag: string;
  contactGithubAction: string;
  quote: string;
  showQuote: string;
  hideQuote: string;
  projectLink: string;
};
