import { Moon, Sun } from 'lucide-react';
import { LOCALES, type ThemeId, type Locale, type Copy } from '../types';

interface HeaderProps {
  theme: ThemeId;
  locale: Locale;
  copy: Copy;
  onThemeChange: (theme: ThemeId) => void;
  onLocaleChange: (locale: Locale) => void;
}

export function Header({
  theme,
  locale,
  copy,
  onThemeChange,
  onLocaleChange,
}: HeaderProps) {
  const isLight = theme === 'kumo';

  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label={copy.home}>
        tessych<span>.</span>
      </a>

      <nav className="site-nav" aria-label={copy.sectionsLabel}>
        <a href="#about">{copy.nav[0]}</a>
        <a href="#approach">{copy.nav[1]}</a>
        <a href="#stack">{copy.nav[2]}</a>
        <a href="#contact">{copy.nav[3]}</a>
      </nav>

      <div className="header-controls">
        <button
          type="button"
          className="theme-toggle"
          aria-label={copy.lightTheme}
          aria-pressed={isLight}
          title={copy.lightTheme}
          onClick={() => onThemeChange(isLight ? 'kurosawa' : 'kumo')}
        >
          {isLight ? <Moon aria-hidden="true" size={19} /> : <Sun aria-hidden="true" size={19} />}
        </button>

        <label className="visually-hidden" htmlFor="site-language">{copy.languageLabel}</label>
        <select
          className="language-select"
          id="site-language"
          name="language"
          value={locale}
          onChange={(event) => {
            const language = LOCALES.find(({ id }) => id === event.currentTarget.value);
            if (language) onLocaleChange(language.id);
          }}
        >
          {LOCALES.map((item) => (
            <option key={item.id} value={item.id} lang={item.id}>{item.name}</option>
          ))}
        </select>
      </div>
    </header>
  );
}
