import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Copy } from '../types';
import { sectionVariants } from '../data/animations';

interface StackSectionProps {
  copy: Copy;
}

export function StackSection({ copy }: StackSectionProps) {
  const [activeCategory, setActiveCategory] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const currentCategory = copy.stackCategories[activeCategory] ?? copy.stackCategories[0];

  return (
    <motion.section
      className="stack-section"
      id="stack"
      variants={sectionVariants}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="section-heading">
        <span className="section-label">{copy.stackIndex}</span>
        <h2>{copy.stackTitle}</h2>
      </div>

      <div className="aweny-stack-grid">
        <div className="stack-tabs" role="tablist" aria-label={copy.stackTitle}>
          {copy.stackCategories.map((cat, idx) => (
            <button
              type="button"
              role="tab"
              key={idx}
              aria-selected={activeCategory === idx}
              className={`stack-tab-btn ${activeCategory === idx ? 'is-active' : ''}`}
              onClick={() => setActiveCategory(idx)}
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
            {currentCategory?.items.map((item, index) => (
              <li className="stack-item-row" key={`${activeCategory}-${index}`}>
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
  );
}
