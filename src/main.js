/**
 * SLGold — Scroll-driven frame animation
 * Frames 001→240 on scroll down, 240→001 on scroll up
 * Hero section stays pinned until all frames are played
 */

const FRAME_COUNT = 240;
const FRAME_PATH = (n) => `/images/ezgif-frame-${String(n).padStart(3, '0')}.jpg`;

const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d', { alpha: false });
const loadingScreen = document.getElementById('loadingScreen');
const loadingBar = document.getElementById('loadingBar');
const loadingText = document.getElementById('loadingText');
const heroOverlay = document.getElementById('heroOverlay');
const frameProgressBar = document.getElementById('frameProgressBar');
const siteHeader = document.getElementById('siteHeader');
const heroSection = document.getElementById('hero');

const frames = new Array(FRAME_COUNT);
let loadedCount = 0;
let currentFrameIndex = 0;
let rafId = null;
let pendingFrameIndex = null;
let isRendering = false;

// ─── Canvas sizing ────────────────────────────────────────────────────────────

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    renderFrame(currentFrameIndex);
}

// ─── Draw a single frame (cover-fit, like CSS background-size: cover) ────────

function renderFrame(index) {
    const img = frames[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.drawImage(img, sx, sy, sw, sh);
}

// ─── Smooth animation loop (lerp between frames for silky motion) ─────────────

let animCurrentFrame = 0;

function animateFrame() {
    if (pendingFrameIndex === null) {
        isRendering = false;
        return;
    }

    const target = pendingFrameIndex;
    const delta = target - animCurrentFrame;

    // Lerp speed: faster when far away, settles quickly
    const speed = 0.18;
    animCurrentFrame += delta * speed;

    const frameIdx = Math.round(animCurrentFrame);
    const clampedIdx = Math.max(0, Math.min(FRAME_COUNT - 1, frameIdx));

    if (clampedIdx !== currentFrameIndex) {
        currentFrameIndex = clampedIdx;
        renderFrame(currentFrameIndex);
    }

    // Update gold progress bar
    const progress = currentFrameIndex / (FRAME_COUNT - 1);
    frameProgressBar.style.width = `${progress * 100}%`;

    // Fade out hero text overlay once animation has started
    if (progress > 0.04) {
        heroOverlay.classList.add('faded');
    } else {
        heroOverlay.classList.remove('faded');
    }

    // Keep looping if not settled
    if (Math.abs(animCurrentFrame - target) > 0.3) {
        rafId = requestAnimationFrame(animateFrame);
    } else {
        animCurrentFrame = target;
        currentFrameIndex = Math.max(0, Math.min(FRAME_COUNT - 1, target));
        renderFrame(currentFrameIndex);
        frameProgressBar.style.width = `${(currentFrameIndex / (FRAME_COUNT - 1)) * 100}%`;
        isRendering = false;
        pendingFrameIndex = null;
    }
}

function scheduleDraw(targetIndex) {
    pendingFrameIndex = targetIndex;
    if (!isRendering) {
        isRendering = true;
        rafId = requestAnimationFrame(animateFrame);
    }
}

// ─── Scroll handler ───────────────────────────────────────────────────────────

function onScroll() {
    const scrollY = window.scrollY;
    const heroH = heroSection.offsetHeight;
    const viewH = window.innerHeight;

    // Scroll range that drives the animation: from 0 to (heroH - viewH)
    const scrollRange = heroH - viewH;
    const progress = Math.min(Math.max(scrollY / scrollRange, 0), 1);

    const targetIndex = Math.round(progress * (FRAME_COUNT - 1));
    scheduleDraw(targetIndex);

    // Header becomes opaque once scrolled past hero
    if (scrollY > 60) {
        siteHeader.classList.add('scrolled');
    } else {
        siteHeader.classList.remove('scrolled');
    }
}

// ─── Preload all frames ───────────────────────────────────────────────────────

function preloadFrames() {
    return new Promise((resolve) => {
        let loaded = 0;

        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image();
            img.src = FRAME_PATH(i + 1);

            img.onload = img.onerror = () => {
                loaded++;
                loadedCount = loaded;

                const pct = Math.round((loaded / FRAME_COUNT) * 100);
                loadingBar.style.width = `${pct}%`;
                loadingText.textContent = `Loading… ${pct}%`;

                if (loaded === FRAME_COUNT) resolve();
            };

            frames[i] = img;
        }
    });
}

// ─── Section reveal on scroll (IntersectionObserver) ─────────────────────────

function initReveal() {
    const revealEls = document.querySelectorAll(
        '.section-label, .section-title, .section-body, .about-stats, .products-grid, .contact-grid'
    );
    revealEls.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealEls.forEach(el => observer.observe(el));
}

// ─── Boot ─────────────────────────────────────────────────────────────────────

async function init() {
    // Set canvas size before showing anything
    resizeCanvas();

    // Kick off preload; show loading screen while waiting
    await preloadFrames();

    // Draw first frame immediately
    renderFrame(0);

    // Hide loading screen with a fade
    loadingText.textContent = 'Ready';
    await new Promise(r => setTimeout(r, 300));
    loadingScreen.classList.add('hidden');

    // Wire up events
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // Sync with current scroll (user may have scrolled during load)
    onScroll();

    // Section reveal animations
    initReveal();
}

init();
