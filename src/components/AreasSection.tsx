import { motion, useReducedMotion } from 'framer-motion';
import type { Copy } from '../types';
import { sectionVariants } from '../data/animations';

interface AreasSectionProps {
  copy: Copy;
}

export function AreasSection({ copy }: AreasSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      className="areas-section"
      variants={sectionVariants}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="section-heading">
        <span className="section-label">{copy.areasIndex}</span>
        <h2>{copy.areasTitle}</h2>
      </div>

      <div className="spec-cards-grid">
        {copy.areas.map((area, index) => (
          <article className="spec-card" key={index}>
            <div className="spec-card-header">
              <span className="spec-card-mod">{area.mod}</span>
              <span className="spec-card-corner" aria-hidden="true">■</span>
            </div>
            <h3>{area.title}</h3>
            <div className="spec-card-text">
              <p>{area.paragraphs[0]}</p>
              <p>{area.paragraphs[1]}</p>
            </div>
            <div className="spec-card-skills" aria-label="Skills">
              {area.skills.map((skill, sIdx) => (
                <span className="spec-skill-pill" key={sIdx}>
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </motion.section>
  );
}
