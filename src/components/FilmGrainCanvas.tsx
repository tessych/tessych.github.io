import { useEffect, useRef } from 'react';

type FilmGrainProps = {
  enabled?: boolean;
  opacity?: number;
};

export const FilmGrainCanvas = ({ enabled = true, opacity = 0.065 }: FilmGrainProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Handle high DPI and window resize
    let animId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Pre-generate 8 offscreen noise pattern tiles (160x160) for near-zero CPU usage
    const TILE_SIZE = 160;
    const PATTERN_COUNT = 8;
    const patterns: CanvasPattern[] = [];

    for (let p = 0; p < PATTERN_COUNT; p++) {
      const offCanvas = document.createElement('canvas');
      offCanvas.width = TILE_SIZE;
      offCanvas.height = TILE_SIZE;
      const offCtx = offCanvas.getContext('2d');
      if (!offCtx) continue;

      const imgData = offCtx.createImageData(TILE_SIZE, TILE_SIZE);
      const data = imgData.data;
      const len = data.length;

      for (let i = 0; i < len; i += 4) {
        // High-contrast film grain: random monochromatic luminescence
        const lum = Math.random() < 0.5 ? 255 : 0;
        data[i] = lum;
        data[i + 1] = lum;
        data[i + 2] = lum;
        // Random alpha density for organic grain variance
        data[i + 3] = Math.floor(Math.random() * 40 + 10);
      }

      offCtx.putImageData(imgData, 0, 0);
      const pattern = ctx.createPattern(offCanvas, 'repeat');
      if (pattern) {
        patterns.push(pattern);
      }
    }

    if (patterns.length === 0) return;

    // Analog film cadence: 20-22 frames per second
    const FPS = 22;
    const FRAME_INTERVAL = 1000 / FPS;
    let lastTime = 0;
    let frameIndex = 0;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const drawFrame = () => {
      // Pick next pre-rendered pattern tile
      const pattern = patterns[frameIndex % patterns.length];
      frameIndex = (frameIndex + 1) % patterns.length;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, width, height);
    };

    // If user prefers reduced motion, draw once and don't animate
    if (mediaQuery.matches) {
      drawFrame();
      return () => {
        window.removeEventListener('resize', resize);
      };
    }

    const loop = (currentTime: number) => {
      animId = requestAnimationFrame(loop);
      const elapsed = currentTime - lastTime;

      if (elapsed > FRAME_INTERVAL) {
        lastTime = currentTime - (elapsed % FRAME_INTERVAL);
        drawFrame();
      }
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="film-grain-canvas"
      aria-hidden="true"
      style={{ opacity }}
    />
  );
};
