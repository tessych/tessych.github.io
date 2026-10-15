import { ArrowUpRight, Check, Code2, Copy as CopyIcon, MapPin, Send } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

const themes = [
  { id: 'aoi', label: 'Индиго' },
  { id: 'kumo', label: 'Облако' },
  { id: 'yozora', label: 'Сумерки' },
] as const;

const locales = [
  { id: 'ru', short: 'RU', name: 'Русский' },
  { id: 'en', short: 'EN', name: 'English' },
  { id: 'ja', short: '日', name: '日本語' },
] as const;

type ThemeId = (typeof themes)[number]['id'];
type Locale = (typeof locales)[number]['id'];
type FocusItem = { title: string; body: string };
type AreaItem = { title: string; paragraphs: [string, string] };
type StackGroup = { title: string; note: string; tags: string[] };

type Copy = {
  documentLang: string;
  role: string;
  skip: string;
  home: string;
  themeLabel: string;
  languageLabel: string;
  themeNames: Record<ThemeId, string>;
  sectionsLabel: string;
  nav: [string, string, string, string];
  location: string;
  heroTitle: [string, string];
  roleLine: string;
  introCopy: string;
  githubLabel: string;
  telegramLabel: string;
  copiedLabel: string;
  copyTgLabel: string;
  aboutIndex: string;
  aboutTitle: string;
  about: [string, string, string];
  areasIndex: string;
  areasTitle: string;
  areas: [AreaItem, AreaItem, AreaItem];
  focusIndex: string;
  focusTitle: string;
  focus: [FocusItem, FocusItem, FocusItem];
  stackIndex: string;
  stackTitle: string;
  stackGroups: [StackGroup, StackGroup, StackGroup];
  linksIndex: string;
  linksTitle: string;
  linksCopy: string;
  quote: string;
  showQuote: string;
  hideQuote: string;
  projectLink: string;
};

const copy: Record<Locale, Copy> = {
  ru: {
    documentLang: 'ru',
    role: 'backend & offensive security',
    skip: 'К содержанию',
    home: 'tessych, в начало страницы',
    themeLabel: 'Варианты оформления',
    languageLabel: 'Язык',
    themeNames: { aoi: 'Aoi', kumo: 'Kumo', yozora: 'Yozora' },
    sectionsLabel: 'Разделы сайта',
    nav: ['Обо мне', 'В работе', 'Стек', 'Контакты'],
    location: 'Новосибирск',
    heroTitle: ['Привет, я', 'tessych.'],
    roleLine: 'backend-разработчик & offensive security (red team)',
    introCopy: 'Проектирую устойчивый бэкенд и сервисы с пониманием архитектуры атак: от олимпиадных алгоритмов и API до анализа защищенности и запуска.',
    githubLabel: 'GitHub',
    telegramLabel: 'Telegram',
    copiedLabel: 'Скопировано!',
    copyTgLabel: 'Скопировать ник Telegram @tessychlove',
    aboutIndex: '01 / ОБО МНЕ',
    aboutTitle: 'Люблю, когда сложное становится понятным и надежным.',
    about: [
      'Мне интересны задачи на стыке архитектуры бэкенда и информационной безопасности: понимать устройство данных, векторы атак и поведение сервиса под нагрузкой.',
      'Опыт в Red Team и веб-пентесте научил смотреть на систему глазами атакующего: лучшие решения рождаются там, где безопасность заложена в модель сервиса с первого дня.',
      'Олимпиадное программирование воспитало дисциплину: люблю точные алгоритмы, жесткие ограничения по ресурсам и код, который не делает ничего лишнего.',
    ],
    areasIndex: '02 / НАПРАВЛЕНИЯ',
    areasTitle: 'Чем занимаюсь',
    areas: [
      {
        title: 'Backend & Архитектура',
        paragraphs: [
          'Делаю REST и gRPC сервисы на Go и Python, проектирую масштабируемые API и взаимодействие по WebSockets.',
          'Перед реализацией выстраиваю модель данных и границы сервисов, чтобы система развивалась без накопления архитектурного долга.',
        ],
      },
      {
        title: 'Offensive Security & Red Team',
        paragraphs: [
          'Провожу анализ защищенности веб-приложений и моделирование угроз, выявляя логические и структурные уязвимости.',
          'Знание практических техник эксплуатации помогает проектировать сервисы, защищенные на уровне бизнес-логики.',
        ],
      },
      {
        title: 'Алгоритмы & Системы',
        paragraphs: [
          'Решаю задачи, требующие математической базы, оптимальных структур данных и эффективного использования ресурсов.',
          'Использую C++ и Rust для производительных системных компонентов; Python — для быстрой аналитики и автоматизации.',
        ],
      },
    ],
    focusIndex: '03 / В РАБОТЕ',
    focusTitle: 'На что обращаю внимание',
    focus: [
      {
        title: 'Сначала контекст и модель угроз',
        body: 'Разбираюсь в данных, бизнес-логике и потенциальных векторах атак. Архитектура рождается из требований, а не из привычки.',
      },
      {
        title: 'Устойчивость к сбоям',
        body: 'Покрываю критическую логику тестами, валидирую граничные случаи и изолирую внешние зависимости.',
      },
      {
        title: 'Довести до надежного запуска',
        body: 'Собираю окружение в Docker Compose и настраиваю Nginx так, чтобы сервис функционировал стабильно и предсказуемо.',
      },
    ],
    stackIndex: '04 / ИНСТРУМЕНТЫ',
    stackTitle: 'То, чем пользуюсь в работе',
    stackGroups: [
      {
        title: 'Языки & Среда',
        note: 'Инструменты разработки и системной логики.',
        tags: ['Go', 'Python', 'C++', 'Rust', 'TypeScript', 'React'],
      },
      {
        title: 'Данные & Поиск',
        note: 'Хранилища, кэширование и работа с данными.',
        tags: ['PostgreSQL', 'Redis', 'MongoDB', 'ChromaDB'],
      },
      {
        title: 'Инфраструктура & Безопасность',
        note: 'Контейнеризация, сетевые протоколы и инструментарий анализа.',
        tags: ['Docker Compose', 'Linux', 'Nginx', 'REST API', 'gRPC', 'WebSockets', 'Burp Suite'],
      },
    ],
    linksIndex: '05 / СВЯЗЬ',
    linksTitle: 'Всегда открыт к диалогу.',
    linksCopy: 'Код и репозитории — на GitHub. Для вопросов, обсуждения проектов и идей — пишите в Telegram.',
    quote: 'Противник не сможет узнать твой следующий ход, если ты и сам его не знаешь.',
    showQuote: 'Показать цитату',
    hideQuote: 'Скрыть цитату',
    projectLink: 'Открыть профиль tessych на GitHub в новой вкладке',
  },
  en: {
    documentLang: 'en',
    role: 'backend & offensive security',
    skip: 'Skip to content',
    home: 'tessych, back to top',
    themeLabel: 'Visual themes',
    languageLabel: 'Language',
    themeNames: { aoi: 'Aoi', kumo: 'Kumo', yozora: 'Yozora' },
    sectionsLabel: 'Site sections',
    nav: ['About', 'Approach', 'Stack', 'Contact'],
    location: 'Novosibirsk',
    heroTitle: ["Hi, I'm", 'tessych.'],
    roleLine: 'backend developer & offensive security (red team)',
    introCopy: 'Building resilient backend services with an attacker-informed mindset: from competitive algorithms to security analysis and reliable deployment.',
    githubLabel: 'GitHub',
    telegramLabel: 'Telegram',
    copiedLabel: 'Copied!',
    copyTgLabel: 'Copy Telegram handle @tessychlove',
    aboutIndex: '01 / ABOUT',
    aboutTitle: 'I like making complex systems clear, resilient, and secure.',
    about: [
      'I focus on the intersection of backend engineering and offensive security: understanding data models, attack surfaces, and system behavior under stress.',
      'My background in Red Teaming and web pentesting taught me to evaluate software from an attacker perspective: solid security begins at the design level, not as an afterthought.',
      'Competitive programming shaped my approach: I value rigorous algorithms, tight resource constraints, and code that does no more than it needs to.',
    ],
    areasIndex: '02 / AREAS',
    areasTitle: 'What I work on',
    areas: [
      {
        title: 'Backend & Architecture',
        paragraphs: [
          'Building REST and gRPC services in Go and Python, architecting scalable APIs and real-time streaming via WebSockets.',
          'I design data schemas and service boundaries early on to prevent architectural debt as systems scale.',
        ],
      },
      {
        title: 'Offensive Security & Red Team',
        paragraphs: [
          'Performing web application security assessments and threat modeling to uncover logical and architectural flaws.',
          'Hands-on offensive knowledge enables me to build software with structural defenses built directly into the business logic.',
        ],
      },
      {
        title: 'Algorithms & Systems',
        paragraphs: [
          'Solving engineering challenges requiring strong mathematics, algorithmic efficiency, and low resource overhead.',
          'Leveraging C++ and Rust for high-performance systems; Python for rapid tooling, automation, and analytics.',
        ],
      },
    ],
    focusIndex: '03 / APPROACH',
    focusTitle: 'What I pay attention to',
    focus: [
      {
        title: 'Context & Threat Model First',
        body: 'I analyze the data flow, business rules, and attack vectors before coding. Architecture should reflect context, not habit.',
      },
      {
        title: 'Resilience Under Pressure',
        body: 'I write unit and integration tests for critical business logic, validating edge cases and isolating external failure modes.',
      },
      {
        title: 'Ship Reliably to Production',
        body: 'I configure Docker Compose and Nginx so services run predictably and repeatably in production environments.',
      },
    ],
    stackIndex: '04 / TOOLKIT',
    stackTitle: 'What I reach for every day',
    stackGroups: [
      {
        title: 'Languages & Core',
        note: 'Languages and libraries for primary services and logic.',
        tags: ['Go', 'Python', 'C++', 'Rust', 'TypeScript', 'React'],
      },
      {
        title: 'Data & Storage',
        note: 'Databases, caching layers, and search engines.',
        tags: ['PostgreSQL', 'Redis', 'MongoDB', 'ChromaDB'],
      },
      {
        title: 'Infrastructure & Security',
        note: 'Containerization, networking protocols, and analysis tools.',
        tags: ['Docker Compose', 'Linux', 'Nginx', 'REST API', 'gRPC', 'WebSockets', 'Burp Suite'],
      },
    ],
    linksIndex: '05 / CONTACT',
    linksTitle: 'Open to interesting conversations.',
    linksCopy: 'Explore code and repositories on GitHub. Reach out on Telegram for discussions, collaborations, and projects.',
    quote: 'Your opponent cannot know your next move if you do not know it yourself.',
    showQuote: 'Show quote',
    hideQuote: 'Hide quote',
    projectLink: 'Open the tessych GitHub profile in a new tab',
  },
  ja: {
    documentLang: 'ja',
    role: 'バックエンド・セキュリティ',
    skip: '本文へ移動',
    home: 'tessych、ページの先頭へ',
    themeLabel: 'テーマ',
    languageLabel: '言語',
    themeNames: { aoi: '藍', kumo: '雲', yozora: '夜空' },
    sectionsLabel: 'サイトのセクション',
    nav: ['自己紹介', '仕事の進め方', '技術', '連絡'],
    location: 'ノヴォシビルスク',
    heroTitle: ['はじめまして、', 'tessychです。'],
    roleLine: 'バックエンド開発者・オフェンシブセキュリティ（Red Team）',
    introCopy: '攻撃者の視点を持って堅牢なバックエンドを設計。競技プログラミングのアルゴリズムから、脆弱性診断、本番稼働まで。',
    githubLabel: 'GitHub',
    telegramLabel: 'Telegram',
    copiedLabel: 'コピー完了！',
    copyTgLabel: 'Telegramユーザー名 @tessychlove をコピー',
    aboutIndex: '01 / 自己紹介',
    aboutTitle: '複雑なシステムを、明快で安全な形にするのが好きです。',
    about: [
      'バックエンド設計とセキュリティの交差点にある課題に惹かれます。データ構造、攻撃対象領域、負荷時の挙動まで見据えます。',
      'Red TeamとWeb診断の経験から、攻撃者の思考でシステムを評価。真の堅牢性は、後付けではなく設計段階から組み込まれます。',
      '競技プログラミングは私の基礎です。厳密なアルゴリズム、明確な制約、無駄のないコードを大切にしています。',
    ],
    areasIndex: '02 / 領域',
    areasTitle: '取り組んでいること',
    areas: [
      {
        title: 'バックエンド・アーキテクチャ',
        paragraphs: [
          'GoとPythonでREST/gRPCサービスを開発し、WebSocketsを用いたリアルタイム通信も実装。',
          '初期段階でデータモデルとサービス境界を整理し、将来のスケールに耐えうる設計を徹底します。',
        ],
      },
      {
        title: 'オフェンシブセキュリティ・Red Team',
        paragraphs: [
          'Webアプリケーションの脆弱性診断と脅威モデリングを行い、構造的な欠陥を特定。',
          '実践的な攻撃手法への深い理解を活かし、ビジネスロジック層から安全なコードを構築します。',
        ],
      },
      {
        title: 'アルゴリズム・システム',
        paragraphs: [
          '数学的思考と高効率なアルゴリズムが求められるシステム課題に対応。',
          '速度とリソース効率が重要な領域にはC++やRustを選択し、自動化や分析にはPythonを活用します。',
        ],
      },
    ],
    focusIndex: '03 / 仕事の進め方',
    focusTitle: '大切にしていること',
    focus: [
      {
        title: '文脈と脅威モデルをまず見極める',
        body: 'データフローと潜在的な攻撃ベクトルを把握してから実装へ。設計は慣習ではなく文脈から導きます。',
      },
      {
        title: '負荷と障害への耐性',
        body: '重要なビジネスロジックをテストで保護し、境界値や外部依存の障害を想定して実装します。',
      },
      {
        title: '安定した本番起動',
        body: 'Docker ComposeとNginxを適切に構成し、本番環境でも再現性高く安定稼働させます。',
      },
    ],
    stackIndex: '04 / 技術',
    stackTitle: '日常的に活用する技術',
    stackGroups: [
      {
        title: '言語・コア',
        note: '主要なサービス開発とシステムロジック。',
        tags: ['Go', 'Python', 'C++', 'Rust', 'TypeScript', 'React'],
      },
      {
        title: 'データ・検索',
        note: 'データベース、キャッシュ、ベクトル検索。',
        tags: ['PostgreSQL', 'Redis', 'MongoDB', 'ChromaDB'],
      },
      {
        title: 'インフラ・セキュリティ',
        note: 'コンテナ環境、ネットワークプロトコル、解析ツール。',
        tags: ['Docker Compose', 'Linux', 'Nginx', 'REST API', 'gRPC', 'WebSockets', 'Burp Suite'],
      },
    ],
    linksIndex: '05 / 連絡',
    linksTitle: 'いつでも気軽にご連絡ください。',
    linksCopy: 'コードとリポジトリはGitHubにあります。ご相談やプロジェクトのお話はTelegramまでどうぞ。',
    quote: '男の子であることは性別の問題。男であることは時間の問題。クズであることは、もはや問題ですらない。',
    showQuote: '引用を表示',
    hideQuote: '引用を閉じる',
    projectLink: 'tessychのGitHubプロフィールを新しいタブで開く',
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.2, 0, 0, 1] } },
};

function App() {
  const [theme, setTheme] = useState<ThemeId>(() => {
    try {
      const saved = localStorage.getItem('tessych-theme') as ThemeId | null;
      if (saved && (saved === 'aoi' || saved === 'kumo' || saved === 'yozora')) return saved;
    } catch {
      // ignore
    }
    return 'aoi';
  });

  const [locale, setLocale] = useState<Locale>(() => {
    try {
      const saved = localStorage.getItem('tessych-locale') as Locale | null;
      if (saved && (saved === 'ru' || saved === 'en' || saved === 'ja')) return saved;
    } catch {
      // ignore
    }
    return 'ru';
  });

  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [novosibirskTime, setNovosibirskTime] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const text = copy[locale];

  const handleCopyTelegram = async () => {
    try {
      await navigator.clipboard.writeText('@tessychlove');
    } catch {
      const el = document.createElement('textarea');
      el.value = '@tessychlove';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      el.remove();
    }
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1800);
  };

  const [isGlitching, setIsGlitching] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 220, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 220, mass: 0.5 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);

  const handlePortraitMouseMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || e.pointerType === 'touch') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handlePortraitMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleToggleQuote = () => {
    setIsQuoteOpen((prev) => !prev);
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 450);
  };

  useEffect(() => {
    const updateTime = () => {
      try {
        const formatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Novosibirsk',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        setNovosibirskTime(formatter.format(new Date()));
      } catch {
        // fallback
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.lang = text.documentLang;
    document.title = `tessych - ${text.role}`;
  }, [text.documentLang, text.role]);

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
    setIsQuoteOpen(false);
    try {
      localStorage.setItem('tessych-locale', newLocale);
    } catch {
      // ignore
    }
  };

  return (
    <div className="app-shell" data-theme={theme}>
      <a className="skip-link" href="#content">
        {text.skip}
      </a>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label={text.home}>
          tessych<span>.</span>
        </a>
        <nav className="site-nav" aria-label={text.sectionsLabel}>
          <a href="#about">{text.nav[0]}</a>
          <a href="#approach">{text.nav[1]}</a>
          <a href="#stack">{text.nav[2]}</a>
          <a href="#contact">{text.nav[3]}</a>
        </nav>
        <div className="header-controls">
          <nav className="theme-switcher" aria-label={text.themeLabel}>
            {themes.map((item) => (
              <button
                aria-pressed={theme === item.id}
                className="theme-option"
                key={item.id}
                onClick={() => handleThemeChange(item.id)}
                title={item.label}
                type="button"
              >
                <span aria-hidden="true" className={`theme-swatch ${item.id}`} />
                <span className="theme-name">{text.themeNames[item.id]}</span>
              </button>
            ))}
          </nav>
          <nav className="language-switcher" aria-label={text.languageLabel}>
            {locales.map((item) => (
              <button
                aria-label={item.name}
                aria-pressed={locale === item.id}
                className="language-option"
                key={item.id}
                lang={item.id}
                onClick={() => handleLocaleChange(item.id)}
                type="button"
              >
                {item.short}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main id="content">
        <motion.section
          className="hero"
          id="top"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.2, 0, 0, 1] }}
        >
          <div className="hero-copy">
            <div className="hero-status-pill">
              <span className="status-dot" aria-hidden="true" />
              <span className="hero-location-text">
                <MapPin aria-hidden="true" size={13} /> {text.location}
              </span>
              <span className="status-divider" aria-hidden="true">·</span>
              <time className="hero-time" aria-label={`${text.location} local time`}>
                {novosibirskTime ? `${novosibirskTime} UTC+7` : 'UTC+7'}
              </time>
            </div>
            <h1>
              {text.heroTitle[0]}
              <br />
              {text.heroTitle[1]}
            </h1>
            <p className="hero-role">{text.roleLine}</p>
            <p className="hero-intro">{text.introCopy}</p>
            <div className="hero-actions">
              <a
                href="https://t.me/tessychlove"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-link hero-link--primary"
                aria-label="Telegram @tessychlove"
              >
                <Send aria-hidden="true" size={16} />
                {text.telegramLabel}
              </a>
              <button
                type="button"
                className="hero-link hero-link--secondary hero-copy-button"
                onClick={handleCopyTelegram}
                aria-label={text.copyTgLabel}
                title={text.copyTgLabel}
              >
                {isCopied ? <Check aria-hidden="true" size={15} /> : <CopyIcon aria-hidden="true" size={15} />}
                <span>{isCopied ? text.copiedLabel : '@tessychlove'}</span>
              </button>
              <a
                href="https://github.com/tessych"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-link hero-link--secondary"
                aria-label={text.githubLabel}
              >
                <Code2 aria-hidden="true" size={16} />
                {text.githubLabel}
                <ArrowUpRight aria-hidden="true" size={16} />
              </a>
            </div>
          </div>
          <div className="hero-portrait-wrapper">
            <motion.div
              className={`hero-portrait ${isGlitching ? 'is-scanning' : ''}`}
              onPointerMove={handlePortraitMouseMove}
              onPointerLeave={handlePortraitMouseLeave}
              style={shouldReduceMotion ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
              onClick={handleToggleQuote}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleToggleQuote();
                }
              }}
              aria-label={isQuoteOpen ? text.hideQuote : text.showQuote}
            >
              <img src="/image.jpg" alt="tessych portrait" />
              <div className="portrait-scanline" aria-hidden="true" />
              <button
                aria-controls="easter-quote"
                aria-expanded={isQuoteOpen}
                aria-label={isQuoteOpen ? text.hideQuote : text.showQuote}
                className="quote-trigger"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleQuote();
                }}
                title={text.showQuote}
                type="button"
              >
                言
              </button>
              {isQuoteOpen && (
                <blockquote className="portrait-quote" id="easter-quote" lang={text.documentLang}>
                  <p>{text.quote}</p>
                </blockquote>
              )}
              <span className="portrait-stamp" lang="ja" aria-hidden="true">
                テッシー
              </span>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          className="about-section"
          id="about"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="section-label" variants={itemVariants}>
            {text.aboutIndex}
          </motion.div>
          <motion.div className="about-body" variants={itemVariants}>
            <h2>{text.aboutTitle}</h2>
            <div>
              {text.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          className="areas-section"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="section-heading" variants={itemVariants}>
            <span className="section-label">{text.areasIndex}</span>
            <h2>{text.areasTitle}</h2>
          </motion.div>
          <div className="areas-list">
            {text.areas.map((area) => (
              <motion.article className="area-item" key={area.title} variants={itemVariants}>
                <h3>{area.title}</h3>
                <p>{area.paragraphs[0]}</p>
                <p>{area.paragraphs[1]}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="focus-section"
          id="approach"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="section-heading" variants={itemVariants}>
            <span className="section-label">{text.focusIndex}</span>
            <h2>{text.focusTitle}</h2>
          </motion.div>
          <ol className="focus-list">
            {text.focus.map((item, index) => (
              <motion.li key={item.title} variants={itemVariants}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </motion.section>

        <motion.section
          className="stack-section"
          id="stack"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="section-heading" variants={itemVariants}>
            <span className="section-label">{text.stackIndex}</span>
            <h2>{text.stackTitle}</h2>
          </motion.div>
          <div className="stack-list">
            {text.stackGroups.map((group) => (
              <motion.article className="stack-group" key={group.title} variants={itemVariants}>
                <div>
                  <h3>{group.title}</h3>
                  <p>{group.note}</p>
                </div>
                <div className="stack-tags">
                  {group.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>
      </main>

      <motion.footer
        className="contact-section"
        id="contact"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: [0.2, 0, 0, 1] }}
      >
        <span className="section-label">{text.linksIndex}</span>
        <h2>{text.linksTitle}</h2>
        <p>{text.linksCopy}</p>
        <div className="contact-actions">
          <a
            href="https://t.me/tessychlove"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link contact-link--telegram"
            aria-label="Telegram @tessychlove"
          >
            <Send aria-hidden="true" size={17} /> Telegram (@tessychlove){' '}
            <ArrowUpRight aria-hidden="true" size={17} />
          </a>
          <button
            type="button"
            className="contact-link contact-copy-button"
            onClick={handleCopyTelegram}
            aria-label={text.copyTgLabel}
            title={text.copyTgLabel}
          >
            {isCopied ? <Check aria-hidden="true" size={17} /> : <CopyIcon aria-hidden="true" size={17} />}
            <span>{isCopied ? text.copiedLabel : '@tessychlove'}</span>
            <span className="visually-hidden" aria-live="polite">
              {isCopied ? text.copiedLabel : ''}
            </span>
          </button>
          <a
            href="https://github.com/tessych"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
            aria-label={text.projectLink}
          >
            <Code2 aria-hidden="true" size={17} /> GitHub <ArrowUpRight aria-hidden="true" size={17} />
          </a>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;
