import notesData from './notes.json';

export interface Note {
  id: string;
  date: string;
  content: {
    en: string;
    zh: string;
  };
  tags: string[];
  image?: string;
}

export const notes: Note[] = notesData.notes;
