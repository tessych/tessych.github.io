import { motion, useReducedMotion } from 'framer-motion';
import type { Copy } from '../types';
import { sectionVariants } from '../data/animations';

interface ApproachSectionProps {
  copy: Copy;
}

export function ApproachSection({ copy }: ApproachSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      className="focus-section"
      id="approach"
      variants={sectionVariants}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="section-heading">
        <span className="section-label">{copy.focusIndex}</span>
        <h2>{copy.focusTitle}</h2>
      </div>

      <div className="pipeline-stepper">
        <div className="pipeline-line" aria-hidden="true" />
        <div className="pipeline-grid">
          {copy.focus.map((item, index) => (
            <div className="pipeline-step" key={index}>
              <div className="pipeline-step-top">
                <span className="pipeline-step-num">STEP {item.step}</span>
                <span className="pipeline-step-badge">{item.badge}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
