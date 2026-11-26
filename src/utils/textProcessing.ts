// ==================== МОДУЛЬ 1: Шихов — регистр букв ====================
export interface LetterStat {
  letter: string;
  count: number;
  case: 'upper' | 'lower';
}

export function countLetterCases(text: string): LetterStat[] {
  const stats: Map<string, { count: number; case: 'upper' | 'lower' }> = new Map();

  for (const char of text) {
    if (/[a-zA-Zа-яА-ЯёЁ]/.test(char)) {
      const isUpper = char === char.toUpperCase();
      const key = char;
      if (stats.has(key)) {
        stats.get(key)!.count++;
      } else {
        stats.set(key, { count: 1, case: isUpper ? 'upper' : 'lower' });
      }
    }
  }

  const result: LetterStat[] = Array.from(stats.entries()).map(([letter, data]) => ({
    letter,
    count: data.count,
    case: data.case,
  }));

  // Сортировка по возрастанию количества
  result.sort((a, b) => a.count - b.count);
  return result;
}

// ==================== МОДУЛЬ 2: Нестеров — длины слов ====================
export interface WordLengthsResult {
  totalWords: number;
  lengths: number[];
}

export function getWordLengths(text: string): WordLengthsResult {
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const lengths = words.map(w => w.length);
  // Сортировка по убыванию
  lengths.sort((a, b) => b - a);
  return { totalWords: words.length, lengths };
}

// ==================== МОДУЛЬ 3: Габбасов — пробелы ====================
export function removeSpaces(text: string): { result: string; positions: number[] } {
  const positions: number[] = [];
  let result = '';
  for (let i = 0; i < text.length; i++) {
    if (text[i] === ' ') {
      positions.push(i);
    } else {
      result += text[i];
    }
  }
  return { result, positions };
}

export function restoreSpaces(text: string, positions: number[]): string {
  let result = '';
  let posIndex = 0;
  for (let i = 0; i < text.length + positions.length; i++) {
    if (posIndex < positions.length && i === positions[posIndex]) {
      result += ' ';
      posIndex++;
    }
    if (i - posIndex < text.length) {
      result += text[i - posIndex];
    }
  }
  return result;
}

// ==================== МОДУЛЬ 4: Нурисламов — знаки препинания ====================
export interface PunctuationStat {
  symbol: string;
  count: number;
}

export function countPunctuation(text: string): PunctuationStat[] {
  const stats: Map<string, number> = new Map();
  const punctuation = /[.,!?;:—–\-()"«»\[\]{}\/\\@#$%^&*+=~`]/;

  // Считаем пробелы
  let spaceCount = 0;
  for (const char of text) {
    if (char === ' ') {
      spaceCount++;
    } else if (punctuation.test(char)) {
      stats.set(char, (stats.get(char) || 0) + 1);
    }
  }

  const result: PunctuationStat[] = Array.from(stats.entries()).map(([symbol, count]) => ({
    symbol,
    count,
  }));

  if (spaceCount > 0) {
    result.push({ symbol: ' ', count: spaceCount });
  }

  // Сортировка по возрастанию
  result.sort((a, b) => a.count - b.count);
  return result;
}

// ==================== МОДУЛЬ 5: Зиганшин — реверс символов в словах ====================
export function reverseCharsInWords(text: string): string {
  return text.replace(/\S+/g, (word) => word.split('').reverse().join(''));
}

// ==================== МОДУЛЬ 6: Могильников — лишние пробелы ====================
export function removeExtraSpaces(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

// ==================== МОДУЛЬ 7: Миних — частота букв ====================
export interface LetterFrequency {
  letter: string;
  count: number;
}

export function countLetterFrequency(text: string): LetterFrequency[] {
  const stats: Map<string, number> = new Map();
  const lowerText = text.toLowerCase();

  for (const char of lowerText) {
    if (/[a-zA-Zа-яё]/.test(char)) {
      stats.set(char, (stats.get(char) || 0) + 1);
    }
  }

  const result: LetterFrequency[] = Array.from(stats.entries()).map(([letter, count]) => ({
    letter,
    count,
  }));

  // Сортировка по убыванию
  result.sort((a, b) => b.count - a.count);
  return result;
}

// ==================== МОДУЛЬ 8: Знаменский — предложения ====================
export interface SentenceInfo {
  text: string;
  length: number;
}

export interface SentencesResult {
  count: number;
  sentences: SentenceInfo[];
}

export function analyzeSentences(text: string): SentencesResult {
  // Разбиваем по . ! ? …
  const parts = text.split(/(?<=[.!?…])\s*/);
  const sentences: SentenceInfo[] = [];

  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.length > 0) {
      sentences.push({ text: trimmed, length: trimmed.length });
    }
  }

  // Сортировка по возрастанию длины
  sentences.sort((a, b) => a.length - b.length);

  return { count: sentences.length, sentences };
}

// ==================== МОДУЛЬ 9: Ржавитин — реверс слов в предложениях ====================
export function reverseWordsInSentences(text: string): string {
  // Разбиваем текст на предложения по знакам препинания
  const result: string[] = [];
  const regex = /([^.!?\…]+)([.!?\…]+)?/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const sentenceBody = match[1].trim();
    const punctuation = match[2] || '';

    if (sentenceBody) {
      const words = sentenceBody.split(/\s+/);
      const reversed = words.reverse().join(' ');
      result.push(reversed + punctuation);
    }
  }

  return result.join(' ');
}

// ==================== Утилиты для файлов ====================
export function downloadTextFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function readTextFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Ошибка чтения файла'));
    reader.readAsText(file, 'UTF-8');
  });
}