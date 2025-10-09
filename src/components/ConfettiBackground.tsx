'use client';

import { useEffect, useRef } from 'react';

type Piece = {
  x: number; y: number; w: number; h: number;
  vx: number; vy: number;
  a: number; // angle
  va: number; // angular velocity
  opacity: number;
  color: string; // Added color property
};

export default function ConfettiBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    let pieces: Piece[] = [];

    const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    function resize() {
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    function rand(min: number, max: number) { return Math.random() * (max - min) + min; }

    // 조각 색상 팔레트 (더 미묘한 회색 톤) - Moved outside to be accessible by resetPieces
    const colors = ['#ffffff', '#e0e0e0', '#c0c0c0']; // Fewer, more subtle colors

    function resetPieces() {
      const { innerWidth: w, innerHeight: h } = window;
      const count = Math.round((w * h) / 20000); // Reduced density for fewer particles
      pieces = Array.from({ length: count }).map((): Piece => ({
        x: Math.random() * w,
        y: Math.random() * h,
        w: rand(4, 12), // Smaller pieces
        h: rand(1, 5),  // Smaller pieces
        vx: rand(-0.05, 0.05), // Slower horizontal movement
        vy: rand(0.02, 0.1),   // Slower vertical movement
        a: rand(0, Math.PI * 2),
        va: rand(-0.005, 0.005), // Slower angular velocity
        opacity: rand(0.4, 0.7), // More consistent and slightly higher opacity
        color: colors[Math.floor(Math.random() * colors.length)], // Assign color once
      }));
    }

    function draw() {
      const { innerWidth: w, innerHeight: h } = window;
      // 배경색(검정)
      ctx.fillStyle = '#0b0b0b';
      ctx.fillRect(0, 0, w, h);

      for (const p of pieces) {
        p.x += p.vx;
        p.y += p.vy;
        p.a += p.va;

        // 화면 밖으로 나가면 위쪽/아래쪽에서 다시 등장
        if (p.y > h + 40) p.y = -40;
        if (p.x < -40) p.x = w + 40;
        if (p.x > w + 40) p.x = -40;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.a);
        ctx.fillStyle = p.color; // Use assigned color
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    const onResize = () => { resize(); resetPieces(); };
    resize();
    resetPieces();
    draw();
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(rafRef.current!);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      id="bg-canvas"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}
