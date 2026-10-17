import { useEffect, useState } from 'react';
import type { ThemeId, Locale } from './types';
import { COPY } from './data/locales';
import { SkipLink } from './components/SkipLink';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { AreasSection } from './components/AreasSection';
import { ApproachSection } from './components/ApproachSection';
import { StackSection } from './components/StackSection';
import { ContactSection } from './components/ContactSection';

export default function App() {
  const [theme, setTheme] = useState<ThemeId>(() => {
    try {
      const saved = localStorage.getItem('tessych-theme') as ThemeId | null;
      if (saved === 'kurosawa' || saved === 'kumo') return saved;
    } catch {
      // ignore storage errors
    }
    return 'kurosawa';
  });

  const [locale, setLocale] = useState<Locale>(() => {
    try {
      const saved = localStorage.getItem('tessych-locale') as Locale | null;
      if (saved === 'ru' || saved === 'en' || saved === 'ja') return saved;
    } catch {
      // ignore storage errors
    }
    return 'ru';
  });

  const currentCopy = COPY[locale] ?? COPY.ru;

  useEffect(() => {
    document.documentElement.lang = currentCopy.documentLang;
    document.title = `tessych — ${currentCopy.role}`;
  }, [currentCopy.documentLang, currentCopy.role]);

  const handleThemeChange = (newTheme: ThemeId) => {
    setTheme(newTheme);
    try {
      localStorage.setItem('tessych-theme', newTheme);
    } catch {
      // ignore
    }
  };

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);
    try {
      localStorage.setItem('tessych-locale', newLocale);
    } catch {
      // ignore
    }
  };

  return (
    <div className="app-shell" data-theme={theme}>
      <SkipLink label={currentCopy.skip} />

      <Header
        theme={theme}
        locale={locale}
        copy={currentCopy}
        onThemeChange={handleThemeChange}
        onLocaleChange={handleLocaleChange}
      />

      <main id="content">
        <Hero copy={currentCopy} />
        <AboutSection copy={currentCopy} />
        <AreasSection copy={currentCopy} />
        <ApproachSection copy={currentCopy} />
        <StackSection copy={currentCopy} />
      </main>

      <ContactSection copy={currentCopy} />
    </div>
  );
}
