import { describe, it, expect } from 'vitest';
import { formatDate, formatDateLong } from './date';

describe('date utilities', () => {
  const testDate = new Date('2024-06-15');

  describe('formatDate', () => {
    it('formats date in English', () => {
      const result = formatDate(testDate, 'en');
      expect(result).toMatch(/Jun/);
      expect(result).toMatch(/15/);
      expect(result).toMatch(/2024/);
    });

    it('formats date in Chinese', () => {
      const result = formatDate(testDate, 'zh');
      expect(result).toMatch(/2024/);
    });
  });

  describe('formatDateLong', () => {
    it('formats date with full month name in English', () => {
      const result = formatDateLong(testDate, 'en');
      expect(result).toMatch(/June/);
      expect(result).toMatch(/15/);
      expect(result).toMatch(/2024/);
    });

    it('formats date in Chinese', () => {
      const result = formatDateLong(testDate, 'zh');
      expect(result).toMatch(/2024/);
    });
  });
});
