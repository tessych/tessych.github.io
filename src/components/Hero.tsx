import { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check, Code2, Copy as CopyIcon, Mail, MapPin, Send } from 'lucide-react';
import type { Copy } from '../types';
import { useNovosibirskTime } from '../hooks/useNovosibirskTime';
import { useClipboard } from '../hooks/useClipboard';

interface HeroProps {
  copy: Copy;
}

export function Hero({ copy }: HeroProps) {
  const time = useNovosibirskTime();
  const { isCopied: isTgCopied, copy: copyTg } = useClipboard();
  const shouldReduceMotion = useReducedMotion();

  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  // 3D Portrait interaction
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

  return (
    <motion.section
      className="hero"
      id="top"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.2, 0, 0, 1] }}
    >
      <div className="hero-copy">
        <div className="hero-meta-bar" aria-label={`${copy.location} local time`}>
          <span className="meta-status">
            <span className="status-dot" aria-hidden="true" />
            <span className="status-tag">NSK</span>
          </span>
          <span className="meta-sep" aria-hidden="true">/</span>
          <span className="meta-item meta-location">
            <MapPin aria-hidden="true" size={12} /> {copy.location}
          </span>
          <span className="meta-sep" aria-hidden="true">/</span>
          <time className="meta-item meta-time">
            {time ? `${time} UTC+7` : 'UTC+7'}
          </time>
        </div>

        <h1>
          <span className="hero-greeting">{copy.heroTitle[0]}</span>
          <br />
          <span className="terminal-prompt" aria-label="tessych">
            <span className="terminal-prefix" aria-hidden="true">~/</span>
            <span className="terminal-name">tessych</span>
            <span className="terminal-cursor" aria-hidden="true" />
          </span>
        </h1>

        <p className="hero-role">{copy.roleLine}</p>
        <p className="hero-intro">{copy.introCopy}</p>

        <div className="hero-actions">
          <a
            href="https://t.me/tessychlove"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-link hero-link--primary"
            aria-label="Telegram @tessychlove"
          >
            <Send aria-hidden="true" size={16} />
            {copy.telegramLabel}
          </a>

          <button
            type="button"
            className="hero-link hero-link--secondary hero-copy-button"
            onClick={() => copyTg('@tessychlove')}
            aria-label={copy.copyTgLabel}
            title={copy.copyTgLabel}
          >
            {isTgCopied ? <Check aria-hidden="true" size={15} /> : <CopyIcon aria-hidden="true" size={15} />}
            <span>{isTgCopied ? copy.copiedLabel : '@tessychlove'}</span>
          </button>

          <a
            href="mailto:me@tessych.cfd"
            className="hero-link hero-link--secondary"
            aria-label="me@tessych.cfd"
          >
            <Mail aria-hidden="true" size={16} />
            me@tessych.cfd
          </a>

          <a
            href="https://github.com/tessych"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-link hero-link--secondary"
            aria-label={copy.githubLabel}
          >
            <Code2 aria-hidden="true" size={16} />
            {copy.githubLabel}
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
          aria-label={isQuoteOpen ? copy.hideQuote : copy.showQuote}
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
            aria-label={isQuoteOpen ? copy.hideQuote : copy.showQuote}
            className="quote-trigger"
            onClick={(e) => {
              e.stopPropagation();
              handleToggleQuote();
            }}
            title={copy.showQuote}
            type="button"
          >
            言
          </button>

          {isQuoteOpen && (
            <blockquote className="portrait-quote" id="easter-quote" lang={copy.documentLang}>
              <p>{copy.quote}</p>
            </blockquote>
          )}

          <span className="portrait-stamp" lang="ja" aria-hidden="true">
            テッシー
          </span>
        </motion.div>
      </div>
    </motion.section>
  );
}
