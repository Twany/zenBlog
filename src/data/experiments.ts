import experimentsData from './experiments.json';

export interface Experiment {
  id: string;
  title: { en: string; zh: string };
  description: { en: string; zh: string };
  color: 'cyan' | 'blue' | 'lime' | 'orange';
  techStack: string[];
}

const experimentColors = ['cyan', 'blue', 'lime', 'orange'] as const;

const isExperimentColor = (value: string): value is Experiment['color'] =>
  experimentColors.includes(value as Experiment['color']);

export const experiments: Experiment[] = experimentsData.experiments.map((experiment) => {
  if (!isExperimentColor(experiment.color)) {
    throw new Error(`Unsupported experiment color: ${experiment.color}`);
  }

  return {
    ...experiment,
    color: experiment.color,
  };
});
