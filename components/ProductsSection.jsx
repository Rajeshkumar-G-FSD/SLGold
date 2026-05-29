'use client';

import { motion } from 'framer-motion';

const products = [
  { icon: '◈', title: 'Bridal Sets', desc: 'Complete bridal jewellery curated for your most special day.' },
  { icon: '◇', title: 'Necklaces', desc: 'Timeless necklace designs ranging from delicate chains to statement chokers.' },
  { icon: '◆', title: 'Bangles & Kadas', desc: 'Traditional and contemporary bangles forged in purest gold.' },
  { icon: '✦', title: 'Rings & Earrings', desc: 'Exquisitely designed rings and earrings for every occasion.' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export default function ProductsSection() {
  return (
    <section id="products" className="page-section products-section">
      <div className="section-inner">
        <motion.p
          className="section-label"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          Our Collection
        </motion.p>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          Signature<br /><em>Pieces</em>
        </motion.h2>

        <motion.div
          className="products-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {products.map(({ icon, title, desc }) => (
            <motion.div
              key={title}
              className="product-card"
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
            >
              <span className="product-icon">{icon}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
