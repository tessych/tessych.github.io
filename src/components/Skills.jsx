import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, BrainCircuit, LayoutTemplate, Wrench } from 'lucide-react';

const skillCategories = [
  {
    title: 'Languages',
    icon: <Code2 size={20} />,
    skills: ['Go', 'Python', 'C++', 'JavaScript', 'SQL']
  },
  {
    title: 'Backend & API',
    icon: <Database size={20} />,
    skills: ['REST API', 'gRPC', 'Gin', 'Fiber', 'FastAPI']
  },
  {
    title: 'Databases',
    icon: <Database size={20} />,
    skills: ['PostgreSQL', 'Redis', 'MongoDB']
  },
  {
    title: 'Machine Learning',
    icon: <BrainCircuit size={20} />,
    skills: ['PyTorch', 'TensorFlow', 'scikit-learn']
  },
  {
    title: 'DevOps & Tools',
    icon: <Wrench size={20} />,
    skills: ['Docker Compose', 'Nginx', 'Ngrok', 'Git', 'Unit Testing']
  },
  {
    title: 'Frontend',
    icon: <LayoutTemplate size={20} />,
    skills: ['React', 'Vue.js']
  }
];

const Skills = () => {
  return (
    <motion.section 
      className="glass-panel"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      style={{ zIndex: 1 }}
    >
      <h2 className="section-title">Стек Технологий</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        {skillCategories.map((category, index) => (
          <motion.div 
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
            style={{ 
              background: 'rgba(255, 255, 255, 0.02)', 
              borderRadius: '12px', 
              padding: '1rem',
              border: '1px solid var(--glass-border)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--accent-color)' }}>
              {category.icon}
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{category.title}</h3>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {category.skills.map(skill => (
                <span 
                  key={skill}
                  style={{
                    fontSize: '0.85rem',
                    padding: '0.2rem 0.6rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '4px',
                    color: 'var(--text-secondary)'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Skills;
