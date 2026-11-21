import { useState } from 'react';
import { ArrowDown, Mail, MapPin } from 'lucide-react';
import type { Copy, ThemeId } from '../types';
import { useNovosibirskTime } from '../hooks/useNovosibirskTime';
import { MusicPlayer } from './MusicPlayer';
import portrait from '../assets/hanekawa-cutout.png';
import kumoPortrait from '../assets/hanekawa-kumo-cutout.png';

const portraits = {
  kurosawa: { src: portrait, width: 1375, height: 1144 },
  kumo: { src: kumoPortrait, width: 1199, height: 1312 },
} satisfies Record<ThemeId, { src: string; width: number; height: number }>;

interface HeroProps {
  copy: Copy;
  theme: ThemeId;
}

export function Hero({ copy, theme }: HeroProps) {
  const time = useNovosibirskTime();
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <div className="hero-meta-bar">
          <MapPin aria-hidden="true" size={14} />
          <span>{copy.location}</span>
          <span className="meta-sep" aria-hidden="true">/</span>
          <time className="meta-time">{time ? `${time} UTC+7` : 'UTC+7'}</time>
        </div>

        <h1>tessych</h1>
        <p className="hero-role">{copy.roleLine}</p>
        <p className="hero-intro">{copy.introCopy}</p>

        <div className="hero-actions">
          <a href="#approach" className="hero-link">
            {copy.approachAction}
            <ArrowDown aria-hidden="true" size={16} />
          </a>
          <a href="#contact" className="hero-link hero-link--secondary">
            <Mail aria-hidden="true" size={16} />
            {copy.contactAction}
          </a>
        </div>

        <MusicPlayer labels={copy.player} />
      </div>

      <figure className="hero-portrait">
        <img
          {...portraits[theme]}
          alt={copy.portraitAlt}
          fetchPriority="high"
        />
        <figcaption className="portrait-caption">
          <span lang="ja">ブラック羽川</span>
          <button
            type="button"
            className="quote-trigger"
            aria-controls="easter-quote"
            aria-expanded={isQuoteOpen}
            aria-label={isQuoteOpen ? copy.hideQuote : copy.showQuote}
            onClick={() => setIsQuoteOpen(!isQuoteOpen)}
          >
            <span lang="ja">言</span>
          </button>
        </figcaption>
        <blockquote className="portrait-quote" id="easter-quote" hidden={!isQuoteOpen}>
          <p>{copy.quote}</p>
        </blockquote>
      </figure>
    </section>
  );
}
