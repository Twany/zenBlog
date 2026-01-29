import experimentsData from './experiments.json';

export interface Experiment {
  id: string;
  title: { en: string; zh: string };
  description: { en: string; zh: string };
  color: 'cyan' | 'blue' | 'lime' | 'orange';
  techStack: string[];
}

export const experiments: Experiment[] = experimentsData.experiments;
