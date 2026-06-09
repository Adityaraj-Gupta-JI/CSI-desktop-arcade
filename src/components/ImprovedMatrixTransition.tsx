"use client";

import React, { useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
// MATRIX BLOCK FLOW TRANSITION - ImprovedMightyEagleStrike Replacement
// ═══════════════════════════════════════════════════════════════
// Animation: Triangular matrix blocks flowing diagonally (top-left → bottom-right)
// Style: PowerPoint morph transition with ASCII character blocks
// Duration: 1.2s total, 60fps, GPU-accelerated
// Colors: Cyan (#00f2fe), Magenta (#d946ef), Green (#10b981) on black

interface BlockParticle {
  x: number;
  y: number;
  size: number;
  char: string;
  color: string;
  phase: number;      // 0-1 animation progress
  speed: number;
  rotation: number;
  opacity: number;
}

interface MatrixTransitionProps {
  onComplete: () => void;
  duration?: number;  // ms, default 1200
}

// ASCII chars for matrix blocks
const MATRIX_CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF▓░█";

// Color palette
const COLORS = ["#00f2fe", "#d946ef", "#10b981", "#fbbf24", "#a855f7"];

export default function ImprovedMatrixTransition({ 
  onComplete, 
  duration = 1200 
}: MatrixTransitionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const blocksRef = useRef<BlockParticle[]>([]);
  const hasCompletedRef = useRef(false);

  // Initialize triangular block grid
  const initBlocks = useCallback((width: number, height: number) => {
    const blocks: BlockParticle[] = [];
    const blockSize = 24;
    const cols = Math.ceil(width / blockSize) + 4;
    const rows = Math.ceil(height / blockSize) + 4;

    // Create diagonal wave pattern (top-left to bottom-right)
    for (let row = -2; row < rows; row++) {
      for (let col = -2; col < cols; col++) {
        // Diagonal index determines wave timing
        const diagonalIndex = col + row;
        const totalDiagonals = cols + rows;

        // Stagger blocks by diagonal for wave effect
        const phaseOffset = diagonalIndex / totalDiagonals;

        // Randomly skip some blocks for "matrix" feel
        if (Math.random() > 0.75) continue;

        blocks.push({
          x: col * blockSize,
          y: row * blockSize,
          size: blockSize,
          char: MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)],
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          phase: phaseOffset, // When this block activates (0-1)
          speed: 0.8 + Math.random() * 0.4,
          rotation: (Math.random() - 0.5) * 90,
          opacity: 0,
        });
      }
    }

    blocksRef.current = blocks;
  }, []);

  // Easing: PowerPoint-style smooth morph
  const easeMorph = (t: number): number => {
    // Cubic ease in-out for smooth morph feel
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  // Render loop
  const render = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    if (startTimeRef.current === 0) {
      startTimeRef.current = timestamp;
      initBlocks(width, height);
    }

    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeMorph(progress);

    // Clear
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    // Animation phases:
    // 0.0-0.3: Blocks ENTER (scale up, fade in)
    // 0.3-0.7: Blocks MORPH (rotate, change chars, shift)
    // 0.7-1.0: Blocks EXIT (scale down, fade out, scatter)

    blocksRef.current.forEach((block) => {
      // Calculate block's local progress based on wave phase
      const waveStart = block.phase * 0.5; // Staggered start
      const waveEnd = waveStart + 0.5;     // Duration of block's animation

      let localProgress = (easedProgress - waveStart) / (waveEnd - waveStart);
      localProgress = Math.max(0, Math.min(1, localProgress));

      if (localProgress <= 0) return;

      // Phase-specific transforms
      let scale = 1;
      let opacity = 1;
      let rotation = 0;
      let offsetX = 0;
      let offsetY = 0;

      if (localProgress < 0.3) {
        // ENTER: Scale from 0, fade in
        const enterP = localProgress / 0.3;
        scale = easeMorph(enterP);
        opacity = enterP;
        rotation = block.rotation * (1 - enterP);
      } else if (localProgress < 0.7) {
        // MORPH: Rotate, drift diagonally
        const morphP = (localProgress - 0.3) / 0.4;
        scale = 1 + Math.sin(morphP * Math.PI) * 0.2;
        opacity = 1;
        rotation = Math.sin(morphP * Math.PI * 2) * 15;
        offsetX = morphP * 30; // Drift right
        offsetY = morphP * 20; // Drift down
      } else {
        // EXIT: Scale down, fade out, scatter
        const exitP = (localProgress - 0.7) / 0.3;
        scale = 1 - easeMorph(exitP) * 0.5;
        opacity = 1 - easeMorph(exitP);
        rotation = block.rotation * exitP;
        offsetX = 30 + exitP * 50;
        offsetY = 20 + exitP * 30;
      }

      // Apply transforms (GPU-accelerated: only transform/opacity)
      ctx.save();
      ctx.translate(block.x + offsetX + block.size / 2, block.y + offsetY + block.size / 2);
      ctx.scale(scale, scale);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-block.size / 2, -block.size / 2);
      ctx.globalAlpha = opacity;

      // Draw block background (triangle shape)
      ctx.fillStyle = block.color + "20"; // 12% opacity hex
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(block.size, 0);
      ctx.lineTo(block.size / 2, block.size);
      ctx.closePath();
      ctx.fill();

      // Draw block border
      ctx.strokeStyle = block.color;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw ASCII character
      ctx.fillStyle = block.color;
      ctx.font = `${block.size * 0.5}px "Courier New", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(block.char, block.size / 2, block.size / 2);

      // Glow effect for some blocks
      if (Math.random() > 0.9) {
        ctx.shadowColor = block.color;
        ctx.shadowBlur = 10;
        ctx.fillText(block.char, block.size / 2, block.size / 2);
        ctx.shadowBlur = 0;
      }

      ctx.restore();
    });

    // Completion check
    if (progress >= 1 && !hasCompletedRef.current) {
      hasCompletedRef.current = true;
      // Fade out canvas
      canvas.style.transition = "opacity 0.3s ease-out";
      canvas.style.opacity = "0";
      setTimeout(() => {
        onComplete();
      }, 300);
      return;
    }

    if (!hasCompletedRef.current) {
      rafRef.current = requestAnimationFrame(render);
    }
  }, [duration, initBlocks, onComplete]);

  // Setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [render]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        pointerEvents: "none",
      }}
    />
  );
}
