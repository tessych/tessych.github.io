import { THEMES, LOCALES, type ThemeId, type Locale, type Copy } from '../types';

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
        <nav className="theme-switcher" aria-label={copy.themeLabel}>
          {THEMES.map((item) => (
            <button
              key={item.id}
              type="button"
              className="theme-option"
              aria-pressed={theme === item.id}
              onClick={() => onThemeChange(item.id)}
              title={item.label}
            >
              <span aria-hidden="true" className={`theme-swatch ${item.id}`} />
              <span className="theme-name">{copy.themeNames[item.id]}</span>
            </button>
          ))}
        </nav>

        <nav className="language-switcher" aria-label={copy.languageLabel}>
          {LOCALES.map((item) => (
            <button
              key={item.id}
              type="button"
              className="language-option"
              aria-label={item.name}
              aria-pressed={locale === item.id}
              lang={item.id}
              onClick={() => onLocaleChange(item.id)}
            >
              {item.short}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
