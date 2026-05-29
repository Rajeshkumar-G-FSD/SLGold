'use client';

import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut', delay },
  }),
};

export default function AboutSection() {
  return (
    <section id="about" className="page-section about-section">
      <div className="section-inner">
        <motion.p
          className="section-label"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          About Us
        </motion.p>

        <motion.h2
          className="section-title"
          variants={fadeUp}
          custom={0.1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          Crafted with<br /><em>Generations of Mastery</em>
        </motion.h2>

        <motion.div
          className="section-body"
          variants={fadeUp}
          custom={0.2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p>
            SLGold is born from a passion for purity and precision. Every piece in our
            collection is handcrafted by master artisans who carry forward generations of
            goldsmithing tradition — combining ancient techniques with modern elegance.
          </p>
          <p>
            We source only the finest 22k and 24k gold, ensuring that each jewel that
            leaves our workshop is a testament to uncompromising quality and soul-deep
            craftsmanship.
          </p>
        </motion.div>

        <motion.div
          className="about-stats"
          variants={fadeUp}
          custom={0.35}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {[
            { num: '22K', label: 'Pure Gold' },
            { num: '500+', label: 'Unique Designs' },
            { num: '25+', label: 'Years Heritage' },
          ].map(({ num, label }) => (
            <div className="stat" key={label}>
              <span className="stat-num">{num}</span>
              <span className="stat-label">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
