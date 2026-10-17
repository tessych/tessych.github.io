import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check, Code2, Copy as CopyIcon, Mail, Send } from 'lucide-react';
import type { Copy } from '../types';
import { useClipboard } from '../hooks/useClipboard';
import { sectionVariants } from '../data/animations';

interface ContactSectionProps {
  copy: Copy;
}

export function ContactSection({ copy }: ContactSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const { isCopied: isTgCopied, copy: copyTg } = useClipboard();
  const { isCopied: isEmailCopied, copy: copyEmail } = useClipboard();

  return (
    <motion.footer
      className="contact-section"
      id="contact"
      variants={sectionVariants}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <span className="section-label">{copy.linksIndex}</span>

      <div className="contact-hub-wrapper">
        <div className="contact-hub-intro">
          <h2>{copy.linksTitle}</h2>
          <p className="contact-hub-copy">{copy.linksCopy}</p>
        </div>

        <div className="contact-channels-grid">
          {/* Telegram Card */}
          <div className="contact-channel-card">
            <div className="channel-card-head">
              <div className="channel-card-brand">
                <Send aria-hidden="true" size={17} />
                <span className="channel-name">{copy.telegramLabel}</span>
              </div>
              <span className="channel-tag">{copy.contactTelegramTag}</span>
            </div>
            <div className="channel-address">@tessychlove</div>
            <div className="channel-actions">
              <a
                href="https://t.me/tessychlove"
                target="_blank"
                rel="noopener noreferrer"
                className="channel-btn channel-btn--primary"
                aria-label="Telegram @tessychlove"
              >
                <span>{copy.contactTelegramAction}</span>
                <ArrowUpRight aria-hidden="true" size={15} />
              </a>
              <button
                type="button"
                className="channel-btn channel-btn--secondary"
                onClick={() => copyTg('@tessychlove')}
                aria-label={copy.copyTgLabel}
              >
                {isTgCopied ? <Check aria-hidden="true" size={15} /> : <CopyIcon aria-hidden="true" size={15} />}
                <span>{isTgCopied ? copy.copiedLabel : copy.telegramLabel}</span>
              </button>
            </div>
          </div>

          {/* Email Card */}
          <div className="contact-channel-card">
            <div className="channel-card-head">
              <div className="channel-card-brand">
                <Mail aria-hidden="true" size={17} />
                <span className="channel-name">{copy.emailLabel}</span>
              </div>
              <span className="channel-tag">{copy.contactEmailTag}</span>
            </div>
            <div className="channel-address">me@tessych.cfd</div>
            <div className="channel-actions">
              <a
                href="mailto:me@tessych.cfd"
                className="channel-btn channel-btn--primary"
                aria-label="me@tessych.cfd"
              >
                <span>{copy.contactEmailAction}</span>
                <ArrowUpRight aria-hidden="true" size={15} />
              </a>
              <button
                type="button"
                className="channel-btn channel-btn--secondary"
                onClick={() => copyEmail('me@tessych.cfd')}
                aria-label={copy.copyEmailLabel}
              >
                {isEmailCopied ? <Check aria-hidden="true" size={15} /> : <CopyIcon aria-hidden="true" size={15} />}
                <span>{isEmailCopied ? copy.copiedLabel : copy.emailLabel}</span>
              </button>
            </div>
          </div>

          {/* GitHub Card */}
          <div className="contact-channel-card">
            <div className="channel-card-head">
              <div className="channel-card-brand">
                <Code2 aria-hidden="true" size={17} />
                <span className="channel-name">{copy.githubLabel}</span>
              </div>
              <span className="channel-tag">{copy.contactGithubTag}</span>
            </div>
            <div className="channel-address">github.com/tessych</div>
            <div className="channel-actions">
              <a
                href="https://github.com/tessych"
                target="_blank"
                rel="noopener noreferrer"
                className="channel-btn channel-btn--primary"
                aria-label={copy.projectLink}
              >
                <span>{copy.contactGithubAction}</span>
                <ArrowUpRight aria-hidden="true" size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
