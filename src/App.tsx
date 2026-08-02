import { ArrowUpRight, BrainCircuit, Layers3, MapPin, Server, Terminal } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

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

type Copy = {
  documentLang: string;
  role: string;
  skip: string;
  home: string;
  themeLabel: string;
  languageLabel: string;
  themeNames: Record<ThemeId, string>;
  location: string;
  introIndex: string;
  introTitle: [string, string];
  introCopy: string;
  backendIndex: string;
  backendTitle: string;
  backend: [ReactNode, ReactNode];
  mlIndex: string;
  mlTitle: string;
  ml: [ReactNode, ReactNode];
  infrastructureIndex: string;
  infrastructureTitle: string;
  infrastructure: [ReactNode, ReactNode];
  approachIndex: string;
  approachTitle: string;
  approach: Array<{ title: string; body: string }>;
  stackIndex: string;
  stackTitle: string;
  stackGroups: [string, string, string];
  projectsIndex: string;
  projectsTitle: string;
  projects: [string, string];
  linksIndex: string;
  linksTitle: string;
  quote: string;
  showQuote: string;
  hideQuote: string;
  projectLink: (name: string) => string;
};

const copy: Record<Locale, Copy> = {
  ru: {
    documentLang: 'ru', role: 'разработчик', skip: 'К содержанию', home: 'tessych, в начало страницы', themeLabel: 'Варианты оформления', languageLabel: 'Язык',
    themeNames: { aoi: 'Aoi', kumo: 'Kumo', yozora: 'Yozora' }, location: 'Новосибирск', introIndex: '01 / ОБО МНЕ', introTitle: ['От идеи', 'до сервиса.'],
    introCopy: 'Проектный backend и fullstack-разработчик. Превращаю идеи в аккуратные сервисы: от архитектуры и данных до развёртывания.',
    backendIndex: '02 / РАЗРАБОТКА', backendTitle: 'Backend-разработка',
    backend: ['Проектирую надёжные масштабируемые архитектуры. Основной фокус — производительные REST API, микросервисы на Go и Python, а также gRPC.', 'Работаю с PostgreSQL, Redis и MongoDB; критичный код покрываю unit-тестами.'],
    mlIndex: '03 / ИССЛЕДОВАНИЯ', mlTitle: 'ML и алгоритмы',
    ml: ['Решаю математически сложные задачи и создаю модели на Python с PyTorch и TensorFlow.', 'Олимпиадный бэкграунд помогает находить точные решения на C++ в строгих ограничениях по времени.'],
    infrastructureIndex: '04 / ИНФРАСТРУКТУРА', infrastructureTitle: 'Инфраструктура',
    infrastructure: ['Настраиваю полный цикл развёртывания и поддержки: веб-серверы, балансировку через Nginx и контейнеры через Docker Compose.', 'Для локальной разработки настраиваю безопасное туннелирование через Ngrok.'],
    approachIndex: '05 / ПОДХОД', approachTitle: 'Как подхожу к задачам',
    approach: [{ title: 'Начинаю со структуры', body: 'Продумываю архитектуру, модель данных и границы сервисов до того, как задача превращается в код.' }, { title: 'Берегу критичные места', body: 'Покрываю unit-тестами логику, от которой зависит поведение системы.' }, { title: 'Довожу до среды', body: 'Контейнеризирую сервисы и настраиваю инфраструктуру, чтобы решение можно было уверенно запустить.' }],
    stackIndex: '06 / ИНСТРУМЕНТЫ', stackTitle: 'Стек', stackGroups: ['Языки и фреймворки', 'Базы данных и инфраструктура', 'Протоколы и ML'],
    projectsIndex: '07 / КЕЙСЫ', projectsTitle: 'Избранные кейсы', projects: ['Система удалённого администрирования с акцентом на производительность и безопасность.', 'Семантический поиск по репозиторию с векторными эмбеддингами и Monaco Editor.'],
    linksIndex: '08 / ССЫЛКИ', linksTitle: 'Больше обо мне', quote: 'Противник не сможет узнать твой следующий ход если ты и сам его не знаешь', showQuote: 'Показать цитату', hideQuote: 'Скрыть цитату', projectLink: (name) => `Открыть GitHub tessych для проекта ${name} в новой вкладке`,
  },
  en: {
    documentLang: 'en', role: 'developer', skip: 'Skip to content', home: 'tessych, back to top', themeLabel: 'Visual themes', languageLabel: 'Language',
    themeNames: { aoi: 'Aoi', kumo: 'Kumo', yozora: 'Yozora' }, location: 'Novosibirsk', introIndex: '01 / ABOUT', introTitle: ['From an idea', 'to a service.'],
    introCopy: 'Project-focused backend and full-stack developer. I turn ideas into considered services, from architecture and data through deployment.',
    backendIndex: '02 / BUILD', backendTitle: 'Backend engineering',
    backend: ['I design reliable, scalable architectures with a focus on high-performance REST APIs, Go and Python microservices, and gRPC.', 'I work with PostgreSQL, Redis, and MongoDB, and cover critical logic with unit tests.'],
    mlIndex: '03 / RESEARCH', mlTitle: 'ML and algorithms',
    ml: ['I solve mathematically complex problems and build models with Python, PyTorch, and TensorFlow.', 'My competitive programming background helps me find precise C++ solutions under strict time limits.'],
    infrastructureIndex: '04 / OPERATIONS', infrastructureTitle: 'Infrastructure',
    infrastructure: ['I set up the full delivery and support cycle: web servers, Nginx load balancing, and Docker Compose containers.', 'For local development, I configure secure service tunnelling through Ngrok.'],
    approachIndex: '05 / PRINCIPLES', approachTitle: 'How I approach work',
    approach: [{ title: 'Start with structure', body: 'I think through architecture, data models, and service boundaries before a task turns into code.' }, { title: 'Protect critical paths', body: 'I cover the logic that drives system behaviour with unit tests.' }, { title: 'Carry it into production', body: 'I containerise services and configure infrastructure so a solution can be run with confidence.' }],
    stackIndex: '06 / TOOLKIT', stackTitle: 'Stack', stackGroups: ['Languages and frameworks', 'Data and infrastructure', 'Protocols and ML'],
    projectsIndex: '07 / SHOWCASE', projectsTitle: 'Selected work', projects: ['A remote administration system with a focus on performance and security.', 'Semantic repository search with vector embeddings and Monaco Editor.'],
    linksIndex: '08 / LINKS', linksTitle: 'More about me', quote: 'Your opponent cannot know your next move if you do not know it yourself.', showQuote: 'Show quote', hideQuote: 'Hide quote', projectLink: (name) => `Open tessych GitHub for ${name} in a new tab`,
  },
  ja: {
    documentLang: 'ja', role: 'システム開発者', skip: '本文へ移動', home: 'tessych、ページの先頭へ', themeLabel: 'テーマ', languageLabel: '言語',
    themeNames: { aoi: '藍', kumo: '雲', yozora: '夜空' }, location: 'ノヴォシビルスク', introIndex: '01 / 自己紹介', introTitle: ['アイデアから', 'サービスまで。'],
    introCopy: 'プロジェクト志向のバックエンド・フルスタック開発者です。設計とデータからデプロイまで、アイデアを整ったサービスにします。',
    backendIndex: '02 / 開発', backendTitle: 'バックエンド開発',
    backend: ['信頼性と拡張性を備えたアーキテクチャを設計します。高速な REST API、Go・Python のマイクロサービス、gRPC が主な領域です。', 'PostgreSQL、Redis、MongoDB を扱い、重要なロジックはユニットテストで守ります。'],
    mlIndex: '03 / 研究', mlTitle: 'ML・アルゴリズム',
    ml: ['数学的に複雑な課題を解き、Python、PyTorch、TensorFlow でモデルを開発します。', '競技プログラミングの経験を生かし、厳しい時間制約でも C++ で精度の高い解を探します。'],
    infrastructureIndex: '04 / 運用', infrastructureTitle: 'インフラ',
    infrastructure: ['Web サーバー、Nginx による負荷分散、Docker Compose のコンテナまで、デリバリーと運用の一連を整えます。', 'ローカル開発では Ngrok を使った安全なトンネリングを設定します。'],
    approachIndex: '05 / 方針', approachTitle: '仕事の進め方',
    approach: [{ title: '構造から考える', body: 'コードを書く前に、アーキテクチャ、データモデル、サービス境界を考えます。' }, { title: '重要な部分を守る', body: 'システムの振る舞いを左右するロジックはユニットテストでカバーします。' }, { title: '動く環境まで届ける', body: 'サービスをコンテナ化し、安心して起動できるようインフラを整えます。' }],
    stackIndex: '06 / 道具', stackTitle: '技術スタック', stackGroups: ['言語・フレームワーク', 'データベース・インフラ', 'プロトコル・ML'],
    projectsIndex: '07 / 事例', projectsTitle: '主なプロジェクト', projects: ['性能と安全性を重視したリモート管理システム。', 'ベクトル埋め込みと Monaco Editor を用いたリポジトリの意味検索。'],
    linksIndex: '08 / 連絡', linksTitle: 'もっと知る', quote: '男の子であることは性別の問題。男であることは時間の問題。クズであることは、もはや問題ですらない。', showQuote: '引用を表示', hideQuote: '引用を閉じる', projectLink: (name) => `${name} の tessych GitHub を新しいタブで開く`,
  },
};

const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.12 } } };
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
      <div className="layout-wrapper">
        <header className="site-header">
          <div className="wordmark-group"><a className="wordmark" href="#top" aria-label={text.home}>tessych<span>.</span></a><span className="wordmark-jp" lang="ja">テッシー</span></div>
          <div className="header-controls">
            <nav className="theme-switcher" aria-label={text.themeLabel}>{themes.map((item) => <button aria-pressed={theme === item.id} className="theme-option" key={item.id} onClick={() => setTheme(item.id)} title={item.label} type="button"><span aria-hidden="true" className={`theme-swatch ${item.id}`} /><span className="theme-name">{text.themeNames[item.id]}</span></button>)}</nav>
            <nav className="language-switcher" aria-label={text.languageLabel}>{locales.map((item) => <button aria-label={item.name} aria-pressed={locale === item.id} className="language-option" key={item.id} lang={item.id} onClick={() => { setLocale(item.id); setIsQuoteOpen(false); }} type="button">{item.short}</button>)}</nav>
          </div>
        </header>

        <motion.section className="intro" id="top" initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.2, 0, 0, 1] }}>
          <div className="intro-meta"><span>{text.introIndex}</span><span className="location"><MapPin aria-hidden="true" size={15} /> {text.location}</span></div>
          <h1>{text.introTitle[0]}<br />{text.introTitle[1]}</h1>
          <p className="intro-copy">{text.introCopy}</p>
          <p className="intro-jp" lang="ja">考える。つくる。届ける。</p>
        </motion.section>

        <motion.main className="content-grid" id="content" variants={containerVariants} initial="hidden" animate="visible">
          <motion.section variants={itemVariants} className="profile-portrait" aria-label={text.role}>
            <img src="/image.jpg" alt="" />
            <button aria-controls="easter-quote" aria-expanded={isQuoteOpen} aria-label={isQuoteOpen ? text.hideQuote : text.showQuote} className="quote-trigger" onClick={() => setIsQuoteOpen((isOpen) => !isOpen)} title={text.showQuote} type="button">言</button>
            {isQuoteOpen && <blockquote className="portrait-quote" id="easter-quote" lang={text.documentLang}><p>{text.quote}</p></blockquote>}
            <span className="portrait-stamp" lang="ja" aria-hidden="true">テッシー</span>
          </motion.section>
          <ExperiencePanel index={text.backendIndex} icon={<Terminal aria-hidden="true" size={21} />} title={text.backendTitle} paragraphs={text.backend} className="backend-panel" />
          <ExperiencePanel index={text.mlIndex} icon={<BrainCircuit aria-hidden="true" size={21} />} title={text.mlTitle} paragraphs={text.ml} className="ml-panel" />
          <ExperiencePanel index={text.infrastructureIndex} icon={<Server aria-hidden="true" size={21} />} title={text.infrastructureTitle} paragraphs={text.infrastructure} className="infrastructure-panel" />

          <motion.section variants={itemVariants} className="approach-panel"><span className="section-index">{text.approachIndex}</span><h2>{text.approachTitle}</h2><ol className="approach-list">{text.approach.map((item, index) => <li key={item.title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></li>)}</ol></motion.section>
          <motion.section variants={itemVariants} className="stack-panel"><span className="section-index">{text.stackIndex}</span><h2><Layers3 aria-hidden="true" size={21} /> {text.stackTitle}</h2><div className="stack-layout"><StackGroup title={text.stackGroups[0]} tags={['Go', 'Python', 'C++', 'Rust', 'React']} /><StackGroup title={text.stackGroups[1]} tags={['PostgreSQL', 'Redis', 'MongoDB', 'ChromaDB', 'Docker Compose', 'Nginx']} /><StackGroup title={text.stackGroups[2]} tags={['REST API', 'gRPC', 'FastAPI', 'WebSockets', 'PyTorch', 'TensorFlow']} /></div></motion.section>
          <motion.section variants={itemVariants} className="projects-panel"><div className="section-heading"><span className="section-index">{text.projectsIndex}</span><h2>{text.projectsTitle}</h2></div><div className="projects-layout"><Project name="TimRAT" description={text.projects[0]} linkLabel={text.projectLink('TimRAT')} tags={['Rust', 'Go']} /><Project name="Semantic Code Search" description={text.projects[1]} linkLabel={text.projectLink('Semantic Code Search')} tags={['Python', 'FastAPI', 'Go', 'ChromaDB']} /></div></motion.section>
          <motion.footer variants={itemVariants} className="contact-panel"><div><span className="section-index">{text.linksIndex}</span><h2>{text.linksTitle}</h2></div><a href="https://github.com/tessych" target="_blank" rel="noopener noreferrer" className="contact-link">GitHub <ArrowUpRight aria-hidden="true" size={19} /></a></motion.footer>
        </motion.main>
      </div>
    </div>
  );
}

function ExperiencePanel({ index, icon, title, paragraphs, className }: { index: string; icon: ReactNode; title: string; paragraphs: [ReactNode, ReactNode]; className: string }) {
  return <motion.section variants={itemVariants} className={`expertise-panel ${className}`}><span className="section-index">{index}</span><h2>{icon} {title}</h2><div className="prose"><p>{paragraphs[0]}</p><p>{paragraphs[1]}</p></div></motion.section>;
}

function StackGroup({ title, tags }: { title: string; tags: string[] }) {
  return <div className="stack-category"><h3>{title}</h3><div className="stack-tags">{tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div></div>;
}

function Project({ name, description, linkLabel, tags }: { name: string; description: string; linkLabel: string; tags: string[] }) {
  return <article className="project-item"><div className="project-header"><h3>{name}</h3><a href="https://github.com/tessych" target="_blank" rel="noopener noreferrer" className="icon-link" aria-label={linkLabel}><ArrowUpRight aria-hidden="true" size={19} /></a></div><p>{description}</p><div className="stack-tags project-tags">{tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div></article>;
}

export default App;
