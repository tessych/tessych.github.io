import { ArrowUpRight, Check, Code2, Copy as CopyIcon, MapPin, Send } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

const themes = [
  { id: 'kurosawa', label: 'Куросава' },
  { id: 'kumo', label: 'Облако' },
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
type StackItem = { name: string; role: string; desc: string; year: string };
type StackCategory = { title: string; note: string; items: StackItem[] };

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
  stackCategories: StackCategory[];
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
    themeNames: { kurosawa: 'Kurosawa', kumo: 'Kumo' },
    sectionsLabel: 'Разделы сайта',
    nav: ['Обо мне', 'В работе', 'Стек', 'Контакты'],
    location: 'Новосибирск',
    heroTitle: ['Привет, я', 'tessych.'],
    roleLine: 'backend-разработчик & offensive security (red team)',
    introCopy: 'Проектирую устойчивый бэкенд и распределенные сервисы с пониманием архитектуры атак: от надежных API и баз данных до анализа защищенности и промышленной эксплуатации.',
    githubLabel: 'GitHub',
    telegramLabel: 'Telegram',
    copiedLabel: 'Скопировано!',
    copyTgLabel: 'Скопировать ник Telegram @tessychlove',
    aboutIndex: '01 / ОБО МНЕ',
    aboutTitle: 'Люблю, когда сложное становится понятным и надежным.',
    about: [
      'Мне интересны задачи на стыке архитектуры бэкенда и информационной безопасности: понимать устройство данных, векторы атак и поведение сервиса под нагрузкой.',
      'Опыт в Red Team и веб-пентесте научил смотреть на систему глазами атакующего: лучшие архитектурные решения рождаются там, где безопасность заложена в модель сервиса с первого дня.',
      'В промышленной разработке ценю инженерную строгость и предсказуемость: ясные контракты данных, отказоустойчивость под нагрузкой и код без оверинжиниринга.',
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
        title: 'Промышленная разработка & Системы',
        paragraphs: [
          'Разрабатываю сервисы с расчетом на реальную эксплуатацию: продуманное кэширование, минимизация накладных расходов и надежная обработка сбоев.',
          'Основной стек бэкенда — Go; для системной производительности и контроля ресурсов применяю C++; Python использую для прикладного ML и автоматизации.',
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
        title: 'Надежная эксплуатация',
        body: 'Собираю окружение в Docker Compose и настраиваю Nginx так, чтобы сервис функционировал стабильно и предсказуемо.',
      },
    ],
    stackIndex: '04 / ИНСТРУМЕНТЫ',
    stackTitle: 'То, чем пользуюсь в работе',
    stackCategories: [
      {
        title: 'Backend & Core',
        note: 'Языки бэкенда, системная логика и прикладной ML.',
        items: [
          { name: 'Go', role: 'Microservices & Concurrency', desc: 'Основной язык бэкенда: высоконагруженные REST и gRPC сервисы, конкурентные воркеры и обработка потоков.', year: '2025' },
          { name: 'C++', role: 'Systems & Performance', desc: 'Системное программирование, алгоритмическая строгость и эффективный контроль ресурсов памяти.', year: '2024' },
          { name: 'Python', role: 'Applied ML & Automation', desc: 'Прикладной ML, работа с эмбеддингами, базовая интеграция моделей и скрипты автоматизации.', year: '2023' },
          { name: 'TypeScript', role: 'Web & Interfaces', desc: 'Типизированные внутренние веб-панели, клиентские интерфейсы и WebSocket-клиенты.', year: '2024' },
        ],
      },
      {
        title: 'Data & Storage',
        note: 'Модели данных, транзакции, кэширование и векторный поиск.',
        items: [
          { name: 'PostgreSQL', role: 'Relational & ACID', desc: 'Проектирование реляционных схем, транзакции, индексы и оптимизация сложных запросов под нагрузкой.', year: '2025' },
          { name: 'MongoDB', role: 'Document Store', desc: 'Документоориентированные коллекции для гибких структур и событийных данных.', year: '2025' },
          { name: 'Redis', role: 'In-Memory Cache', desc: 'Кэширование горячих данных, сессионные хранилища и распределенные очереди.', year: '2026' },
          { name: 'ChromaDB', role: 'Vector Search & ML', desc: 'Векторная база данных для семантического поиска и работы с ML-эмбеддингами.', year: '2026' },
        ],
      },
      {
        title: 'Offensive Security',
        note: 'Анализ защищенности веб-приложений, моделирование угроз и Red Team.',
        items: [
          { name: 'Burp Suite', role: 'Web Pentest', desc: 'Анализ защищенности веб-приложений, фаззинг API, выявление логических уязвимостей и IDOR.', year: '2024' },
          { name: 'Threat Modeling', role: 'Security Architecture', desc: 'Моделирование векторов атак и проектирование устойчивости на уровне бизнес-логики.', year: '2024' },
          { name: 'Network Analysis', role: 'Traffic & Protocols', desc: 'Анализ сетевого трафика, исследование заголовков, дампов пакетов и сетевых уязвимостей.', year: '2024' },
        ],
      },
      {
        title: 'Infrastructure & Protocols',
        note: 'Контейнеризация, сетевые протоколы и эксплуатация сервисов.',
        items: [
          { name: 'Docker Compose', role: 'Containerization', desc: 'Изоляция окружений, мультистейдж сборка и воспроизводимое развертывание сервисов.', year: '2025' },
          { name: 'Linux & Bash', role: 'System Internals', desc: 'Низкоуровневая диагностика, скриптинг, аудит процессов и harden-настройка окружения.', year: '2023' },
          { name: 'Nginx', role: 'Reverse Proxy & Edge', desc: 'Маршрутизация запросов, SSL/TLS терминация, балансировка и защита от спама.', year: '2025' },
          { name: 'gRPC & WebSockets', role: 'Protocols', desc: 'Двунаправленный real-time стриминг и бинарные контракты Protobuf.', year: '2025' },
        ],
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
    themeNames: { kurosawa: 'Kurosawa', kumo: 'Kumo' },
    sectionsLabel: 'Site sections',
    nav: ['About', 'Approach', 'Stack', 'Contact'],
    location: 'Novosibirsk',
    heroTitle: ["Hi, I'm", 'tessych.'],
    roleLine: 'backend developer & offensive security (red team)',
    introCopy: 'Building resilient backend services and distributed systems with an attacker-informed mindset: from robust APIs and databases to offensive security analysis and reliable production operation.',
    githubLabel: 'GitHub',
    telegramLabel: 'Telegram',
    copiedLabel: 'Copied!',
    copyTgLabel: 'Copy Telegram handle @tessychlove',
    aboutIndex: '01 / ABOUT',
    aboutTitle: 'I like making complex systems clear, resilient, and secure.',
    about: [
      'I focus on the intersection of backend engineering and offensive security: understanding data models, attack surfaces, and system behavior under stress.',
      'My background in Red Teaming and web pentesting taught me to evaluate software from an attacker perspective: solid security begins at the design level, not as an afterthought.',
      'In production engineering, I value predictability and rigor: well-defined data contracts, fault tolerance under stress, and code without overengineering.',
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
        title: 'Production Engineering & Systems',
        paragraphs: [
          'Engineering services built for real-world operations: smart caching, low resource overhead, and graceful degradation during failures.',
          'Primary backend stack is Go; using C++ for low-level performance and resource control; leveraging Python for applied ML tasks and automation.',
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
        title: 'Reliable Production Operations',
        body: 'I configure Docker Compose and Nginx so services run predictably and repeatably in production environments.',
      },
    ],
    stackIndex: '04 / TOOLKIT',
    stackTitle: 'What I reach for every day',
    stackCategories: [
      {
        title: 'Backend & Core',
        note: 'Backend languages, core system logic, and applied ML.',
        items: [
          { name: 'Go', role: 'Microservices & Concurrency', desc: 'Primary backend language: high-throughput REST and gRPC services, concurrent workers, and streaming pipelines.', year: '2025' },
          { name: 'C++', role: 'Systems & Performance', desc: 'Low-level systems programming, strict memory efficiency, and deterministic execution.', year: '2024' },
          { name: 'Python', role: 'Applied ML & Automation', desc: 'Applied machine learning, vector embeddings, model integrations, and security automation scripts.', year: '2023' },
          { name: 'TypeScript', role: 'Web & Interfaces', desc: 'Type-safe internal tooling panels, management dashboards, and WebSocket clients.', year: '2024' },
        ],
      },
      {
        title: 'Data & Storage',
        note: 'Data modeling, transaction safety, caching, and state management.',
        items: [
          { name: 'PostgreSQL', role: 'Relational & ACID', desc: 'Schema architecture, transactional integrity, index optimization, and high-load tuning.', year: '2025' },
          { name: 'MongoDB', role: 'Document Store', desc: 'Document collections and schema patterns for flexible, event-driven pipelines.', year: '2025' },
          { name: 'Redis', role: 'In-Memory Cache', desc: 'Hot-data caching, session persistence, distributed state, and message brokering.', year: '2026' },
          { name: 'ChromaDB', role: 'Vector Search & ML', desc: 'Vector database for embeddings storage, similarity lookup, and semantic search.', year: '2026' },
        ],
      },
      {
        title: 'Offensive Security',
        note: 'Web application security assessments, threat modeling, and Red Teaming.',
        items: [
          { name: 'Burp Suite', role: 'Web Pentest', desc: 'Web pentesting, API fuzzing, threat modeling, and uncovering architectural flaws.', year: '2024' },
          { name: 'Threat Modeling', role: 'Security Architecture', desc: 'Evaluating attack surfaces and building defensive invariants directly into business logic.', year: '2024' },
          { name: 'Network Analysis', role: 'Traffic & Protocols', desc: 'Traffic inspection, packet capture analysis, header auditing, and protocol vulnerability testing.', year: '2024' },
        ],
      },
      {
        title: 'Infrastructure & Protocols',
        note: 'Containerization, networking protocols, and reliable service operations.',
        items: [
          { name: 'Docker Compose', role: 'Containerization', desc: 'Service isolation, multi-stage container builds, and reproducible staging environments.', year: '2025' },
          { name: 'Linux & Bash', role: 'System Internals', desc: 'OS-level debugging, shell scripting, audit logging, and server hardening.', year: '2023' },
          { name: 'Nginx', role: 'Reverse Proxy & Edge', desc: 'Traffic routing, SSL/TLS termination, rate limiting, and reverse proxy security.', year: '2025' },
          { name: 'gRPC & WebSockets', role: 'Protocols', desc: 'Bidirectional real-time streaming and binary Protobuf contracts.', year: '2025' },
        ],
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
    themeNames: { kurosawa: '黒澤', kumo: '雲' },
    sectionsLabel: 'サイトのセクション',
    nav: ['自己紹介', '仕事の進め方', '技術', '連絡'],
    location: 'ノヴォシビルスク',
    heroTitle: ['はじめまして、', 'tessychです。'],
    roleLine: 'バックエンド開発者・オフェンシブセキュリティ（Red Team）',
    introCopy: '攻撃者の視点を持って堅牢なバックエンドと分散システムを設計。信頼性の高いAPIやDB設計から、セキュリティ診断、本番環境の安定稼働まで。',
    githubLabel: 'GitHub',
    telegramLabel: 'Telegram',
    copiedLabel: 'コピー完了！',
    copyTgLabel: 'Telegramユーザー名 @tessychlove をコピー',
    aboutIndex: '01 / 自己紹介',
    aboutTitle: '複雑なシステムを、明快で安全な形にするのが好きです。',
    about: [
      'バックエンド設計とセキュリティの交差点にある課題に惹かれます。データ構造、攻撃対象領域、負荷時の挙動まで見据えます。',
      'Red TeamとWeb診断の経験から、攻撃者の思考でシステムを評価。真の堅牢性は、後付けではなく設計段階から組み込まれます。',
      '商用開発において重視するのは予測可能性と技術的規律です。明確なデータ規約、高負荷時の耐障害性、過剰設計のない堅実なコードを追求します。',
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
        title: '商用開発・システム設計',
        paragraphs: [
          '実運用を想定したサービス構築：適切なキャッシング、オーバーヘッドの最小化、障害発生時の安全なフォールバック設計。',
          'バックエンドの主力はGo。リソース制御や高速処理にはC++、応用MLや自動化にはPythonを活用します。',
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
    stackCategories: [
      {
        title: 'バックエンド・コア',
        note: '分散システムの基盤となる言語、コアロジック、応用ML。',
        items: [
          { name: 'Go', role: 'Microservices & Concurrency', desc: '主力バックエンド言語：高スループットなREST/gRPCサービス、並行ワーカー、ストリーミング。', year: '2025' },
          { name: 'C++', role: 'Systems & Performance', desc: '厳密なメモリ制御、アルゴリズムの厳格性、低オーバーヘッドなシステムプログラミング。', year: '2024' },
          { name: 'Python', role: 'Applied ML & Automation', desc: '応用機械学習（ML）、ベクトル埋め込み、モデル連携、自動化スクリプト。', year: '2023' },
          { name: 'TypeScript', role: 'Web & Interfaces', desc: '型安全な内部管理ツール、ダッシュボード、WebSocketクライアントの実装。', year: '2024' },
        ],
      },
      {
        title: 'データ・ストレージ',
        note: 'データモデリング、トランザクション、キャッシュ、ベクトル検索。',
        items: [
          { name: 'PostgreSQL', role: 'Relational & ACID', desc: '正規化スキーマ設計、トランザクション保護、インデックス最適化と負荷チューニング。', year: '2025' },
          { name: 'MongoDB', role: 'Document Store', desc: 'イベント駆動型パイプラインに適したドキュメント型コレクション。', year: '2025' },
          { name: 'Redis', role: 'In-Memory Cache', desc: 'ホットデータキャッシュ、セッション管理、Pub/Subによる高速な状態共有。', year: '2026' },
          { name: 'ChromaDB', role: 'Vector Search & ML', desc: 'ML埋め込みの保存、類似度検索、セマンティック検索パイプライン。', year: '2026' },
        ],
      },
      {
        title: 'オフェンシブセキュリティ',
        note: 'Webアプリケーション脆弱性診断、脅威モデリング、Red Team。',
        items: [
          { name: 'Burp Suite', role: 'Web Pentest', desc: 'Web脆弱性診断、APIファジング、脅威モデリング、認可ロジック（IDOR）の検証。', year: '2024' },
          { name: 'Threat Modeling', role: 'Security Architecture', desc: '攻撃対象領域の分析と、ビジネスロジック層での構造的防御の設計。', year: '2024' },
          { name: 'Network Analysis', role: 'Traffic & Protocols', desc: 'パケット解析、通信ヘッダーの監査、ネットワーク層の検証。', year: '2024' },
        ],
      },
      {
        title: 'インフラ・プロトコル',
        note: 'コンテナ環境、ネットワーク通信規約、安定した本番運用。',
        items: [
          { name: 'Docker Compose', role: 'Containerization', desc: '環境の分離、マルチステージビルド、再現性の高い開発・本番デプロイ。', year: '2025' },
          { name: 'Linux & Bash', role: 'System Internals', desc: '低レイヤーの診断、Shellスクリプト自動化、サーバーセキュリティ堅牢化。', year: '2023' },
          { name: 'Nginx', role: 'Reverse Proxy & Edge', desc: 'リバースプロキシ、SSL/TLS終端、レートリミット、ロードバランシング。', year: '2025' },
          { name: 'gRPC & WebSockets', role: 'Protocols', desc: '双方向リアルタイム通信とProtobufによるバイナリ通信規約。', year: '2025' },
        ],
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

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.2, 0, 0, 1] } },
};

function App() {
  const [theme, setTheme] = useState<ThemeId>(() => {
    try {
      const saved = localStorage.getItem('tessych-theme') as ThemeId | null;
      if (saved && (saved === 'kurosawa' || saved === 'kumo')) return saved;
    } catch {
      // ignore
    }
    return 'kurosawa';
  });

  const [activeStackCategory, setActiveStackCategory] = useState(0);

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
            <div className="hero-meta-bar" aria-label={`${text.location} local time`}>
              <span className="meta-status">
                <span className="status-dot" aria-hidden="true" />
                <span className="status-tag">NSK</span>
              </span>
              <span className="meta-sep" aria-hidden="true">/</span>
              <span className="meta-item meta-location">
                <MapPin aria-hidden="true" size={12} /> {text.location}
              </span>
              <span className="meta-sep" aria-hidden="true">/</span>
              <time className="meta-item meta-time">
                {novosibirskTime ? `${novosibirskTime} UTC+7` : 'UTC+7'}
              </time>
            </div>
            <div className="hero-mech-tag" aria-hidden="true">
              <span className="mech-indicator" />
              <span>SYS_INIT // RED_TEAM_NODE_01</span>
              <span className="mech-divider">/</span>
              <span className="mech-jp">システム稼働中</span>
            </div>
            <h1>
              <span className="hero-greeting">{text.heroTitle[0]}</span>
              <br />
              <span className="terminal-prompt" aria-label="tessych">
                <span className="terminal-prefix" aria-hidden="true">~/</span>
                <span className="terminal-name">tessych</span>
                <span className="terminal-cursor" aria-hidden="true" />
              </span>
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
              <span className="mech-bracket top-left" aria-hidden="true" />
              <span className="mech-bracket top-right" aria-hidden="true" />
              <span className="mech-bracket bottom-left" aria-hidden="true" />
              <span className="mech-bracket bottom-right" aria-hidden="true" />
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
          variants={sectionVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="section-label">
            {text.aboutIndex}
          </div>
          <div className="about-body">
            <h2>{text.aboutTitle}</h2>
            <div>
              {text.about.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          className="areas-section"
          variants={sectionVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="section-heading">
            <span className="section-label">{text.areasIndex}</span>
            <h2>{text.areasTitle}</h2>
          </div>
          <div className="areas-list">
            {text.areas.map((area, index) => (
              <article className="area-item" key={index}>
                <h3>{area.title}</h3>
                <p>{area.paragraphs[0]}</p>
                <p>{area.paragraphs[1]}</p>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="focus-section"
          id="approach"
          variants={sectionVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="section-heading">
            <span className="section-label">{text.focusIndex}</span>
            <h2>{text.focusTitle}</h2>
          </div>
          <ol className="focus-list">
            {text.focus.map((item, index) => (
              <li key={index}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </motion.section>

        <motion.section
          className="stack-section"
          id="stack"
          variants={sectionVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="section-heading">
            <span className="section-label">{text.stackIndex}</span>
            <h2>{text.stackTitle}</h2>
          </div>
          <div className="aweny-stack-grid">
            <div className="stack-tabs" role="tablist" aria-label={text.stackTitle}>
              {text.stackCategories.map((cat, idx) => (
                <button
                  type="button"
                  role="tab"
                  key={idx}
                  aria-selected={activeStackCategory === idx}
                  className={`stack-tab-btn ${activeStackCategory === idx ? 'is-active' : ''}`}
                  onClick={() => setActiveStackCategory(idx)}
                >
                  <span className="stack-tab-head">
                    <span className="stack-tab-line" aria-hidden="true" />
                    <span className="stack-tab-title">{cat.title}</span>
                  </span>
                  <span className="stack-tab-note">{cat.note}</span>
                </button>
              ))}
            </div>
            <div className="stack-items-container" role="tabpanel">
              <ul className="stack-items-list">
                {text.stackCategories[activeStackCategory]?.items.map((item, index) => (
                  <li className="stack-item-row" key={`${activeStackCategory}-${index}`}>
                    <div className="stack-item-info">
                      <div className="stack-item-header">
                        <span className="stack-item-name">{item.name}</span>
                        <span className="stack-item-role">{item.role}</span>
                      </div>
                      <p className="stack-item-desc">{item.desc}</p>
                    </div>
                    <span className="stack-item-year" aria-label={`Experience since ${item.year}`}>
                      {item.year}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>
      </main>

      <motion.footer
        className="contact-section"
        id="contact"
        variants={sectionVariants}
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <span className="section-label">{text.linksIndex}</span>
        <div className="contact-content">
          <div className="contact-intro">
            <h2>{text.linksTitle}</h2>
            <p>{text.linksCopy}</p>
          </div>
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
        </div>
      </motion.footer>
    </div>
  );
}

export default App;
