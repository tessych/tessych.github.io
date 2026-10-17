import { motion, useReducedMotion } from 'framer-motion';
import type { Copy } from '../types';
import { sectionVariants } from '../data/animations';

interface AboutSectionProps {
  copy: Copy;
}

export function AboutSection({ copy }: AboutSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      className="about-section"
      id="about"
      variants={sectionVariants}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="section-label">{copy.aboutIndex}</div>
      <div className="about-grid">
        <div className="about-headline-col">
          <h2>{copy.aboutTitle}</h2>
          <div className="about-accent-line" aria-hidden="true" />
        </div>
        <div className="about-takeaways-col">
          {copy.aboutTakeaways.map((item, index) => (
            <div className="about-takeaway-item" key={index}>
              <div className="about-takeaway-header">
                <span className="about-takeaway-tag">{item.tag}</span>
                <span className="about-takeaway-title">{item.title}</span>
              </div>
              <p className="about-takeaway-body">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
