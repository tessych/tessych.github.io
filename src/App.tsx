import { Terminal, Server, MapPin, Brain, LayoutGrid, FolderOpen } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useEffect } from 'react';
import type { MouseEvent, ReactNode } from 'react';

function useSpinningTitle() {
  useEffect(() => {
    const steps = "/-\\|";
    const FPS = 2;
    const frameInterval = 1000 / FPS;
    let step = 0;
    let lastTimestep = 0;
    let animationFrameId: number;

    function animation(timestamp: number) {
      if (lastTimestep + frameInterval < timestamp) {
        document.title = `${steps[step++]} tessych`;
        step %= steps.length;
        lastTimestep = timestamp;
      }
      animationFrameId = window.requestAnimationFrame(animation);
    }

    animationFrameId = window.requestAnimationFrame(animation);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);
}

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function SpotlightCard({ children, className = "", variants }: { children: ReactNode, className?: string, variants?: Variants }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      variants={variants}
      className={`glass-bento-card ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="spotlight-layer"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.08),
              transparent 80%
            )
          `,
        }}
      />
      <div className="card-content-wrapper">
        {children}
      </div>
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

function App() {
  useSpinningTitle();
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  useEffect(() => {
    function handleMouseMove(e: globalThis.MouseEvent) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className="global-spotlight"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.06),
              transparent 80%
            )
          `,
        }}
      />
      <div className="bg-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <div className="layout-wrapper">
        <motion.header 
          className="header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="header-top">
            <h1 className="title">tessych</h1>
            <div className="location">
              <MapPin size={16} />
              <span>Новосибирск</span>
            </div>
          </div>
          <p className="bio">
            Превращаю сложные идеи в элегантный код.<br />
            Предпочитаю задачи из проектного программирования (кейсы).<br />
            Чаще всего занимаю роли Fullstack или Backend разработчика.
          </p>
        </motion.header>

        <motion.main 
          className="bento-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          <SpotlightCard variants={itemVariants} className="card-backend">
            <span className="mono-label">Experience // 01</span>
            <h3 className="card-title">
              <Terminal size={20} className="card-icon" />
              Backend Разработка
            </h3>
            <div className="card-content">
              <p className="card-text">
                Проектирование и разработка надежных масштабируемых архитектур. Основной упор делаю на создание производительных <span className="text-highlight">REST API</span> и микросервисов с использованием <span className="text-highlight">Go</span> и <span className="text-highlight">Python</span>, а также работу с <span className="text-highlight">gRPC</span>.
              </p>
              <p className="card-text">
                Глубоко погружен в проектирование баз данных: уверенно работаю с реляционными (<span className="text-highlight">PostgreSQL</span>) и NoSQL решениями (<span className="text-highlight">Redis</span>, <span className="text-highlight">MongoDB</span>). Строго слежу за качеством через настройку <span className="text-highlight">Unit-тестов</span> для покрытия критичного кода.
              </p>
            </div>
          </SpotlightCard>

          <SpotlightCard variants={itemVariants} className="card-ml">
            <span className="mono-label">Experience // 02</span>
            <h3 className="card-title">
              <Brain size={20} className="card-icon" />
              ML & Олимпиады
            </h3>
            <div className="card-content">
              <p className="card-text">
                Специализируюсь на математически сложных задачах. Использую <span className="text-highlight">Python</span> (<span className="text-highlight">PyTorch</span>, <span className="text-highlight">TensorFlow</span>) для разработки моделей машинного обучения.
              </p>
              <p className="card-text">
                Имею сильный алгоритмический бэкграунд: решаю олимпиадные задачи на <span className="text-highlight">C++</span> с жесткой оптимизацией под строгие лимиты времени (TL).
              </p>
            </div>
          </SpotlightCard>

          <SpotlightCard variants={itemVariants} className="card-infra">
            <span className="mono-label">Experience // 03</span>
            <h3 className="card-title">
              <Server size={20} className="card-icon" />
              Инфраструктура
            </h3>
            <div className="card-content">
              <p className="card-text">
                Обеспечиваю полный цикл развертывания и поддержки проектов. Уверенно настраиваю веб-серверы и балансировку через <span className="text-highlight">Nginx</span>.
              </p>
              <p className="card-text">
                Контейнеризирую сервисы с помощью <span className="text-highlight">Docker Compose</span> и настраиваю безопасное туннелирование локальных сервисов через <span className="text-highlight">Ngrok</span>.
              </p>
            </div>
          </SpotlightCard>

          <SpotlightCard variants={itemVariants} className="card-stack">
            <span className="mono-label">Technologies</span>
            <h3 className="card-title">
              <LayoutGrid size={20} className="card-icon" />
              Стек Технологий
            </h3>
            <div className="card-content stack-layout">
              
              <div className="stack-category">
                <span className="stack-category-name">Языки & Фреймворки</span>
                <div className="stack-tags">
                  <span className="tag">Go</span>
                  <span className="tag">Python</span>
                  <span className="tag">C++</span>
                  <span className="tag">React</span>
                </div>
              </div>

              <div className="stack-category">
                <span className="stack-category-name">БД & Инфраструктура</span>
                <div className="stack-tags">
                  <span className="tag">PostgreSQL</span>
                  <span className="tag">Redis</span>
                  <span className="tag">MongoDB</span>
                  <span className="tag">Docker Compose</span>
                  <span className="tag">Nginx</span>
                </div>
              </div>

              <div className="stack-category">
                <span className="stack-category-name">Специфика & ML</span>
                <div className="stack-tags">
                  <span className="tag">REST API</span>
                  <span className="tag">gRPC</span>
                  <span className="tag">PyTorch</span>
                  <span className="tag">TensorFlow</span>
                </div>
              </div>

            </div>
          </SpotlightCard>

          <SpotlightCard variants={itemVariants} className="card-projects">
            <span className="mono-label">Showcase</span>
            <h3 className="card-title">
              <FolderOpen size={20} className="card-icon" />
              Избранные Кейсы
            </h3>
            <div className="card-content projects-layout">
              <div className="project-item">
                <div className="project-header">
                  <h4>TimRAT</h4>
                  <div className="project-links">
                    <a href="https://github.com/tessych" target="_blank" rel="noopener noreferrer" className="icon-link"><GithubIcon size={18} /></a>
                  </div>
                </div>
                <p style={{ marginTop: '0.25rem' }}>Система удаленного администрирования (Remote Administration Tool) с фокусом на производительность и безопасность.</p>
                <div className="stack-tags" style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                  <span className="tag">Rust</span>
                  <span className="tag">Go</span>
                </div>
              </div>

              <div className="project-item">
                <div className="project-header">
                  <h4>Semantic Code Search</h4>
                  <div className="project-links">
                    <a href="https://github.com/tessych" target="_blank" rel="noopener noreferrer" className="icon-link"><GithubIcon size={18} /></a>
                  </div>
                </div>
                <p style={{ marginTop: '0.25rem' }}>Умный семантический поиск по кодовой базе репозитория с использованием векторных эмбеддингов и Monaco Editor.</p>
                <div className="stack-tags" style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                  <span className="tag">Python</span>
                  <span className="tag">FastAPI</span>
                  <span className="tag">Go</span>
                  <span className="tag">ChromaDB</span>
                </div>
              </div>

              <div className="project-item">
                <div className="project-header">
                  <h4>Multi-Agent Dev Assistant</h4>
                  <div className="project-links">
                    <a href="https://github.com/tessych" target="_blank" rel="noopener noreferrer" className="icon-link"><GithubIcon size={18} /></a>
                  </div>
                </div>
                <p style={{ marginTop: '0.25rem' }}>Интерактивный симулятор команды ИИ-агентов (Planner, Coder, Tester, Reviewer) с песочницей исполнения кода.</p>
                <div className="stack-tags" style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                  <span className="tag">React</span>
                  <span className="tag">Go</span>
                  <span className="tag">Python</span>
                  <span className="tag">WebSockets</span>
                </div>
              </div>

              <div className="project-item">
                <div className="project-header">
                  <h4>Smart Doc Query Engine (RAG)</h4>
                  <div className="project-links">
                    <a href="https://github.com/tessych" target="_blank" rel="noopener noreferrer" className="icon-link"><GithubIcon size={18} /></a>
                  </div>
                </div>
                <p style={{ marginTop: '0.25rem' }}>Интеллектуальная вопросно-ответная система по документам со сплит-экраном и точными интерактивными сносками.</p>
                <div className="stack-tags" style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                  <span className="tag">React</span>
                  <span className="tag">Python</span>
                  <span className="tag">FastAPI</span>
                  <span className="tag">ChromaDB</span>
                </div>
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard variants={itemVariants} className="card-contact">
            <div>
              <h3 className="card-title" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                Готов к сотрудничеству
              </h3>
              <p className="card-content" style={{ color: 'var(--text-secondary)' }}>
                Открыт к новым интересным проектам и кейсам.
              </p>
            </div>
            <a href="https://github.com/tessych" target="_blank" rel="noopener noreferrer" className="contact-btn">
              <GithubIcon size={20} />
              <span>GitHub Profile</span>
            </a>
          </SpotlightCard>

        </motion.main>
      </div>
    </>
  );
}

export default App;