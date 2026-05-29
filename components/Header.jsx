'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

export default function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (v) => {
    setScrolled(v > 60);
  });

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="header-inner">
        <div className="logo">
          <Image
            src="/images/ssllogo.jpg"
            alt="SLGold"
            width={52}
            height={52}
            className="logo-img"
            priority
          />
        </div>

        <nav className="nav">
          <Link href="#about" className="nav-link">About</Link>
          <Link href="#products" className="nav-link">Products</Link>
          <Link href="#contact" className="nav-link">Contact</Link>
        </nav>

        <div className="nav-cta">
          <Link href="#contact" className="cta-btn">Enquire</Link>
        </div>
      </div>
    </header>
  );
}
