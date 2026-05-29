'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from 'framer-motion';

const FRAME_COUNT = 240;
const HEADER_H = 72;

function framePath(n) {
  return `/images/ezgif-frame-${String(n).padStart(3, '0')}.jpg`;
}

function drawFrame(canvas, frames, index) {
  const img = frames[index];
  if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

  const ctx = canvas.getContext('2d', { alpha: false });
  const cw = canvas.width;
  const ch = canvas.height;
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const isMobile = cw < 768 && ch > cw;

  if (isMobile) {
    // Portrait crop from top-center so full face clears the header
    const usableH = ch - HEADER_H;
    const srcW = Math.round(ih * (cw / usableH));
    const srcX = Math.round((iw - srcW) / 2);
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, srcX, 0, srcW, ih, 0, HEADER_H, cw, usableH);
  } else {
    // Desktop: cover-fit centered
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    ctx.drawImage(img, (cw - sw) / 2, (ch - sh) / 2, sw, sh);
  }
}

export default function HeroSection() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const lastFrameRef = useRef(-1);

  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Framer Motion scroll tracking scoped to the hero section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Map scroll 0→1 to frame index 0→239
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Overlay: full overlay fades at 5% scroll
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  // Brand line exits first at 2% scroll (as girl appears)
  const brandOpacity = useTransform(scrollYProgress, [0, 0.02], [1, 0]);
  const brandY = useTransform(scrollYProgress, [0, 0.02], [0, -20]);

  // Gold progress bar driven directly by frame index
  const progressWidth = useTransform(frameIndex, [0, FRAME_COUNT - 1], ['0%', '100%']);

  // ── Preload all 240 frames ──────────────────────────────────────────────────
  useEffect(() => {
    let count = 0;
    const images = new Array(FRAME_COUNT);

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(i + 1);
      img.onload = img.onerror = () => {
        count++;
        setLoadProgress(Math.round((count / FRAME_COUNT) * 100));
        if (count === FRAME_COUNT) setLoaded(true);
      };
      images[i] = img;
    }

    framesRef.current = images;
  }, []);

  // ── Canvas resize ───────────────────────────────────────────────────────────
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (framesRef.current.length) {
      const idx = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(frameIndex.get())));
      drawFrame(canvas, framesRef.current, idx);
    }
  }, [frameIndex]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  // ── Draw first frame once all images are loaded ─────────────────────────────
  useEffect(() => {
    if (loaded) {
      resizeCanvas();
      drawFrame(canvasRef.current, framesRef.current, 0);
    }
  }, [loaded, resizeCanvas]);

  // ── Scroll → canvas frame (fires every animation frame during scroll) ───────
  useMotionValueEvent(frameIndex, 'change', (v) => {
    if (!loaded) return;
    const idx = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(v)));
    if (idx === lastFrameRef.current) return; // skip if same frame
    lastFrameRef.current = idx;
    drawFrame(canvasRef.current, framesRef.current, idx);
  });

  return (
    <section ref={sectionRef} className="hero-section">
      <div className="hero-sticky">
        {/* Frame canvas */}
        <canvas ref={canvasRef} className="hero-canvas" />

        {/* Text overlay — opacity driven by Framer Motion scroll */}
        <motion.div className="hero-overlay" style={{ opacity: overlayOpacity }}>
          <div className="hero-content">
            <p className="hero-tagline">Est. 2024</p>
            <h1 className="hero-title">
              Pure Gold.<br />Timeless Grace.
            </h1>

            {/* Brand line exits before full overlay (driven by scroll) */}
            <motion.div
              className="hero-brand-line"
              style={{ opacity: brandOpacity, y: brandY }}
            >
              <span className="brand-line-text">
                SL Gold Covering ✨ Premium Imitation Jewellery
              </span>
            </motion.div>

            <p className="hero-subtitle">Scroll to discover our craft</p>
            <div className="scroll-indicator">
              <div className="scroll-line" />
            </div>
          </div>
        </motion.div>

        {/* Gold progress bar */}
        <div className="frame-progress">
          <motion.div className="frame-progress-bar" style={{ width: progressWidth }} />
        </div>

        {/* Loading screen — AnimatePresence fades it out when frames are ready */}
        <AnimatePresence>
          {!loaded && (
            <motion.div
              className="loading-screen"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="loading-inner">
                <div className="loading-logo">SLGold</div>
                <div className="loading-bar-wrap">
                  <div className="loading-bar" style={{ width: `${loadProgress}%` }} />
                </div>
                <div className="loading-text">Loading… {loadProgress}%</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
