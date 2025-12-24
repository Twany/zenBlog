export type Locale = 'en' | 'zh';

export type LocalizedString = {
  en: string;
  zh: string;
};

export type Experiment = {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  color: 'cyan' | 'blue' | 'lime' | 'orange';
  techStack?: string[];
};

export type Note = {
  id: string;
  date: string;
  content: LocalizedString;
  tags?: string[];
  image?: string;
};
