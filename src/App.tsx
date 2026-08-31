import { ArrowUpRight, Code2, MapPin } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
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
    documentLang: 'ru', role: 'разработчик', skip: 'К содержанию', home: 'tessych, в начало страницы', themeLabel: 'Варианты оформления', languageLabel: 'Язык',
    themeNames: { aoi: 'Aoi', kumo: 'Kumo', yozora: 'Yozora' }, sectionsLabel: 'Разделы сайта', nav: ['Обо мне', 'В работе', 'Стек', 'Контакты'], location: 'Новосибирск', heroTitle: ['Привет, я', 'tessych.'],
    roleLine: 'backend и fullstack-разработчик', introCopy: 'От MVP до готового продукта: разбираюсь в задаче, собираю сервис и довожу его до запуска.', githubLabel: 'Открыть GitHub',
    aboutIndex: '01 / ОБО МНЕ', aboutTitle: 'Люблю, когда сложное становится понятным.',
    about: ['Мне интересны задачи, в которых нужно собрать не отдельную функцию, а целую систему: понять данные, границы сервисов и то, что будет с проектом после первого запуска.', 'Основное направление - backend. Иногда беру fullstack-задачи, когда полезно пройти весь путь самому: от интерфейса до сервера и окружения.', 'Олимпиадное программирование сильно повлияло на мой подход: люблю точные решения, понятные ограничения и код, который не делает больше, чем нужно.'],
    areasIndex: '02 / НАПРАВЛЕНИЯ', areasTitle: 'Чем занимаюсь',
    areas: [{ title: 'Backend', paragraphs: ['Делаю REST API, сервисы на Go и Python, работаю с gRPC и WebSockets.', 'Перед реализацией продумываю модель данных, границы сервисов и то, как система будет развиваться дальше.'] }, { title: 'Алгоритмы и ML', paragraphs: ['Решаю задачи, в которых нужна математика, алгоритмика или работа с моделями.', 'Для этого использую Python и TensorFlow; когда важна скорость, обращаюсь к C++.'] }, { title: 'Инфраструктура', paragraphs: ['Настраиваю то, что нужно проекту после написания кода: окружение, контейнеры и веб-серверы.', 'Работаю с Docker Compose и Nginx, чтобы сервис можно было запустить и поддерживать без лишней ручной работы.'] }],
    focusIndex: '03 / В РАБОТЕ', focusTitle: 'На что обращаю внимание',
    focus: [{ title: 'Сначала понять', body: 'Сначала разбираюсь в задаче и данных. Архитектура появляется из контекста, а не из привычки.' }, { title: 'Оставить рабочим', body: 'Критичную логику покрываю тестами, чтобы новые изменения не ломали уже сделанное.' }, { title: 'Довести до запуска', body: 'Собираю окружение и контейнеры так, чтобы сервис работал не только на моём компьютере.' }],
    stackIndex: '04 / ИНСТРУМЕНТЫ', stackTitle: 'То, чем пользуюсь каждый день',
    stackGroups: [{ title: 'Сервис', note: 'Языки и фреймворки для основной работы.', tags: ['Go', 'Python', 'C++', 'Rust', 'React'] }, { title: 'Данные', note: 'Хранение, очереди и поиск.', tags: ['PostgreSQL', 'Redis', 'MongoDB', 'ChromaDB'] }, { title: 'Среда', note: 'Всё, что помогает запустить и поддерживать проект.', tags: ['Docker Compose', 'Nginx', 'REST API', 'gRPC', 'FastAPI', 'WebSockets', 'TensorFlow'] }],
    linksIndex: '05 / СВЯЗЬ', linksTitle: 'Смотреть, что я делаю.', linksCopy: 'Проекты, код и то, над чем сейчас работаю - в GitHub.', quote: 'Противник не сможет узнать твой следующий ход если ты и сам его не знаешь', showQuote: 'Показать цитату', hideQuote: 'Скрыть цитату', projectLink: 'Открыть профиль tessych на GitHub в новой вкладке',
  },
  en: {
    documentLang: 'en', role: 'developer', skip: 'Skip to content', home: 'tessych, back to top', themeLabel: 'Visual themes', languageLabel: 'Language',
    themeNames: { aoi: 'Aoi', kumo: 'Kumo', yozora: 'Yozora' }, sectionsLabel: 'Site sections', nav: ['About', 'Approach', 'Stack', 'Contact'], location: 'Novosibirsk', heroTitle: ["Hi, I'm", 'tessych.'],
    roleLine: 'backend and full-stack developer', introCopy: 'From MVP to a finished product: I unpack the problem, build the service, and carry it through to launch.', githubLabel: 'Open GitHub',
    aboutIndex: '01 / ABOUT', aboutTitle: 'I like making complex things easier to understand.',
    about: ['I am drawn to work that means building more than an isolated feature: understanding the data, the boundaries between services, and what happens after a project first goes live.', 'Backend is my main focus. I also take on full-stack work when it makes sense to follow the whole path myself, from interface to server and its environment.', 'Competitive programming shaped how I work: I value precise solutions, clear constraints, and code that does no more than it needs to.'],
    areasIndex: '02 / AREAS', areasTitle: 'What I work on',
    areas: [{ title: 'Backend', paragraphs: ['I build REST APIs and services with Go and Python, and work with gRPC and WebSockets.', 'Before implementation, I think through the data model, service boundaries, and how a system can grow from there.'] }, { title: 'Algorithms and ML', paragraphs: ['I work on problems that call for mathematics, algorithms, or models.', 'I use Python and TensorFlow; when speed matters, I reach for C++.'] }, { title: 'Infrastructure', paragraphs: ['I set up what a project needs after the code is written: its environment, containers, and web servers.', 'I work with Docker Compose and Nginx so a service can be run and maintained without needless manual work.'] }],
    focusIndex: '03 / APPROACH', focusTitle: 'What I pay attention to',
    focus: [{ title: 'Understand first', body: 'I start with the problem and the data. Architecture should come from context, not habit.' }, { title: 'Keep it working', body: 'I test critical logic so new changes do not break the work already in place.' }, { title: 'Take it to launch', body: 'I set up the environment and containers so a service works beyond my own machine.' }],
    stackIndex: '04 / TOOLKIT', stackTitle: 'What I reach for every day',
    stackGroups: [{ title: 'Services', note: 'Languages and frameworks for the main work.', tags: ['Go', 'Python', 'C++', 'Rust', 'React'] }, { title: 'Data', note: 'Storage, queues, and search.', tags: ['PostgreSQL', 'Redis', 'MongoDB', 'ChromaDB'] }, { title: 'Environment', note: 'Everything that helps run and maintain a project.', tags: ['Docker Compose', 'Nginx', 'REST API', 'gRPC', 'FastAPI', 'WebSockets', 'TensorFlow'] }],
    linksIndex: '05 / CONTACT', linksTitle: 'See what I am working on.', linksCopy: 'Projects, code, and current work live on GitHub.', quote: 'Your opponent cannot know your next move if you do not know it yourself.', showQuote: 'Show quote', hideQuote: 'Hide quote', projectLink: 'Open the tessych GitHub profile in a new tab',
  },
  ja: {
    documentLang: 'ja', role: '開発者', skip: '本文へ移動', home: 'tessych、ページの先頭へ', themeLabel: 'テーマ', languageLabel: '言語',
    themeNames: { aoi: '藍', kumo: '雲', yozora: '夜空' }, sectionsLabel: 'サイトのセクション', nav: ['自己紹介', '仕事の進め方', '技術', '連絡'], location: 'ノヴォシビルスク', heroTitle: ['はじめまして、', 'tessychです。'],
    roleLine: 'バックエンド・フルスタック開発者', introCopy: 'MVPから完成したプロダクトまで。課題を理解し、サービスをつくり、起動まで届けます。', githubLabel: 'GitHubを開く',
    aboutIndex: '01 / 自己紹介', aboutTitle: '複雑なものを、わかりやすくするのが好きです。',
    about: ['ひとつの機能だけでなく、システム全体を組み立てる仕事に惹かれます。データ、サービスの境界、最初のリリース後にプロジェクトがどう動くかまで考えます。', '主な領域はバックエンドです。UIからサーバー、実行環境まで自分で一貫して見る意味があるときは、フルスタックの仕事もします。', '競技プログラミングは、私の仕事の進め方に大きく影響しました。正確な解、明確な制約、必要以上のことをしないコードを大切にしています。'],
    areasIndex: '02 / 領域', areasTitle: '取り組んでいること',
    areas: [{ title: 'バックエンド', paragraphs: ['Go と Python で REST API とサービスをつくり、gRPC や WebSockets も扱います。', '実装の前に、データモデル、サービスの境界、その先の拡張性を考えます。'] }, { title: 'アルゴリズム・ML', paragraphs: ['数学、アルゴリズム、モデルが必要な課題に取り組みます。', 'Python と TensorFlow を使い、速度が重要なときは C++ を選びます。'] }, { title: 'インフラ', paragraphs: ['コードを書いた後に必要になる環境、コンテナ、Webサーバーを整えます。', 'Docker Compose と Nginx を使い、手作業を増やさずサービスを起動・運用できるようにします。'] }],
    focusIndex: '03 / 仕事の進め方', focusTitle: '大切にしていること',
    focus: [{ title: 'まず理解する', body: '課題とデータを最初に見ます。アーキテクチャは習慣ではなく、文脈から生まれるものです。' }, { title: '動く状態を守る', body: '重要なロジックをテストし、新しい変更で既存の動作を壊さないようにします。' }, { title: '起動まで届ける', body: '自分の環境以外でもサービスが動くように、環境とコンテナを整えます。' }],
    stackIndex: '04 / 技術', stackTitle: '毎日使うもの',
    stackGroups: [{ title: 'サービス', note: '主な開発で使う言語とフレームワーク。', tags: ['Go', 'Python', 'C++', 'Rust', 'React'] }, { title: 'データ', note: '保存、キュー、検索。', tags: ['PostgreSQL', 'Redis', 'MongoDB', 'ChromaDB'] }, { title: '環境', note: 'プロジェクトを起動・運用するためのもの。', tags: ['Docker Compose', 'Nginx', 'REST API', 'gRPC', 'FastAPI', 'WebSockets', 'TensorFlow'] }],
    linksIndex: '05 / 連絡', linksTitle: 'つくっているものを見る。', linksCopy: 'プロジェクト、コード、今取り組んでいるものはGitHubにあります。', quote: '男の子であることは性別の問題。男であることは時間の問題。クズであることは、もはや問題ですらない。', showQuote: '引用を表示', hideQuote: '引用を閉じる', projectLink: 'tessychのGitHubプロフィールを新しいタブで開く',
  },
};

const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.08 } } };
const itemVariants: Variants = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.2, 0, 0, 1] } } };

function App() {
  const [theme, setTheme] = useState<ThemeId>('aoi');
  const [locale, setLocale] = useState<Locale>('ru');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const text = copy[locale];

  useEffect(() => {
    document.documentElement.lang = text.documentLang;
    document.title = `tessych - ${text.role}`;
  }, [text.documentLang, text.role]);

  return (
    <div className="app-shell" data-theme={theme}>
      <a className="skip-link" href="#content">{text.skip}</a>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label={text.home}>tessych<span>.</span></a>
        <nav className="site-nav" aria-label={text.sectionsLabel}><a href="#about">{text.nav[0]}</a><a href="#approach">{text.nav[1]}</a><a href="#stack">{text.nav[2]}</a><a href="#contact">{text.nav[3]}</a></nav>
        <div className="header-controls">
          <nav className="theme-switcher" aria-label={text.themeLabel}>{themes.map((item) => <button aria-pressed={theme === item.id} className="theme-option" key={item.id} onClick={() => setTheme(item.id)} title={item.label} type="button"><span aria-hidden="true" className={`theme-swatch ${item.id}`} /><span className="theme-name">{text.themeNames[item.id]}</span></button>)}</nav>
          <nav className="language-switcher" aria-label={text.languageLabel}>{locales.map((item) => <button aria-label={item.name} aria-pressed={locale === item.id} className="language-option" key={item.id} lang={item.id} onClick={() => { setLocale(item.id); setIsQuoteOpen(false); }} type="button">{item.short}</button>)}</nav>
        </div>
      </header>

      <main id="content">
        <motion.section className="hero" id="top" initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.2, 0, 0, 1] }}>
          <div className="hero-copy">
            <p className="hero-location"><MapPin aria-hidden="true" size={15} /> {text.location}</p>
            <h1>{text.heroTitle[0]}<br />{text.heroTitle[1]}</h1>
            <p className="hero-role">{text.roleLine}</p>
            <p className="hero-intro">{text.introCopy}</p>
            <a href="https://github.com/tessych" target="_blank" rel="noopener noreferrer" className="hero-link">{text.githubLabel}<ArrowUpRight aria-hidden="true" size={18} /></a>
          </div>
          <div className="hero-portrait">
            <img src="/image.jpg" alt="" />
            <button aria-controls="easter-quote" aria-expanded={isQuoteOpen} aria-label={isQuoteOpen ? text.hideQuote : text.showQuote} className="quote-trigger" onClick={() => setIsQuoteOpen((isOpen) => !isOpen)} title={text.showQuote} type="button">言</button>
            {isQuoteOpen && <blockquote className="portrait-quote" id="easter-quote" lang={text.documentLang}><p>{text.quote}</p></blockquote>}
            <span className="portrait-stamp" lang="ja" aria-hidden="true">テッシー</span>
          </div>
        </motion.section>

        <motion.section className="about-section" id="about" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <motion.div className="section-label" variants={itemVariants}>{text.aboutIndex}</motion.div>
          <motion.div className="about-body" variants={itemVariants}><h2>{text.aboutTitle}</h2><div>{text.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></motion.div>
        </motion.section>

        <motion.section className="areas-section" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <motion.div className="section-heading" variants={itemVariants}><span className="section-label">{text.areasIndex}</span><h2>{text.areasTitle}</h2></motion.div>
          <div className="areas-list">{text.areas.map((area) => <motion.article className="area-item" key={area.title} variants={itemVariants}><h3>{area.title}</h3><p>{area.paragraphs[0]}</p><p>{area.paragraphs[1]}</p></motion.article>)}</div>
        </motion.section>

        <motion.section className="focus-section" id="approach" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <motion.div className="section-heading" variants={itemVariants}><span className="section-label">{text.focusIndex}</span><h2>{text.focusTitle}</h2></motion.div>
          <ol className="focus-list">{text.focus.map((item, index) => <motion.li key={item.title} variants={itemVariants}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></motion.li>)}</ol>
        </motion.section>

        <motion.section className="stack-section" id="stack" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <motion.div className="section-heading" variants={itemVariants}><span className="section-label">{text.stackIndex}</span><h2>{text.stackTitle}</h2></motion.div>
          <div className="stack-list">{text.stackGroups.map((group) => <motion.article className="stack-group" key={group.title} variants={itemVariants}><div><h3>{group.title}</h3><p>{group.note}</p></div><div className="stack-tags">{group.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div></motion.article>)}</div>
        </motion.section>
      </main>

      <motion.footer className="contact-section" id="contact" initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, ease: [0.2, 0, 0, 1] }}>
        <span className="section-label">{text.linksIndex}</span><h2>{text.linksTitle}</h2><p>{text.linksCopy}</p>
        <a href="https://github.com/tessych" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label={text.projectLink}><Code2 aria-hidden="true" size={19} /> GitHub <ArrowUpRight aria-hidden="true" size={18} /></a>
      </motion.footer>
    </div>
  );
}

export default App;
