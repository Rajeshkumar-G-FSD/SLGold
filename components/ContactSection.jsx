'use client';

import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut', delay },
  viewport: { once: true, amount: 0.2 },
});

export default function ContactSection() {
  return (
    <section id="contact" className="page-section contact-section">
      <div className="section-inner">
        <motion.p className="section-label" {...fadeUp(0)}>Get in Touch</motion.p>

        <motion.h2 className="section-title" {...fadeUp(0.1)}>
          Visit Our<br /><em>Showroom</em>
        </motion.h2>

        <motion.div className="contact-grid" {...fadeUp(0.2)}>
          <div className="contact-info">
            {[
              {
                label: 'Address',
                text: <>SLGold Jewellers, MG Road,<br />Bengaluru, Karnataka 560001</>,
              },
              {
                label: 'Hours',
                text: <>Mon – Sat: 10am – 8pm<br />Sunday: 11am – 6pm</>,
              },
              {
                label: 'Contact',
                text: <>+91 98765 43210<br />hello@slgold.in</>,
              },
            ].map(({ label, text }) => (
              <div className="contact-item" key={label}>
                <span className="contact-icon">◎</span>
                <div>
                  <strong>{label}</strong>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>

          <form className="contact-form">
            <input type="text" placeholder="Your Name" className="form-input" />
            <input type="email" placeholder="Email Address" className="form-input" />
            <textarea placeholder="Your Message" className="form-input form-textarea" />
            <motion.button
              type="submit"
              className="form-submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
