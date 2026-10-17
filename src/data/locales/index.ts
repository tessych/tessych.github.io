import type { Copy, Locale } from '../../types';
import { ru } from './ru';
import { en } from './en';
import { ja } from './ja';

export const COPY: Record<Locale, Copy> = {
  ru,
  en,
  ja,
};

export { ru, en, ja };
