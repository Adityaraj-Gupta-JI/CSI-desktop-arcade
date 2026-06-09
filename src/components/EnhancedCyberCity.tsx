"use client";

import React, { useEffect, useRef, useCallback, useMemo } from "react";

// ═══════════════════════════════════════════════════════════════
// ASCII CYBERPUNK CITY - EnhancedForestBackground Replacement
// ═══════════════════════════════════════════════════════════════
// Performance: Canvas-based rendering, RAF loop, no DOM thrashing
// Integration: Works BELOW GridScan (z-0), ABOVE TechBackground (z-0)
// Theme: Dark tech aesthetic with neon cyan/magenta/green accents

// ─── TypeScript Interfaces ───
interface CityLayer {
  id: string;
  speed: number;        // Parallax multiplier
  opacity: number;
  yOffset: number;      // Base vertical position
  color: string;        // Neon accent color
}

interface Entity {
  x: number;
  y: number;
  type: "robot" | "animal" | "building" | "light";
  designIndex: number;
  layerId: string;
  animPhase: number;
  speed: number;
}

// ─── ASCII ART ASSETS (5 Robots + 3 Animals + Buildings) ───
const ROBOT_DESIGNS: string[][] = [
  // [0] Sentinel Droid - Tall guard
  [
    "    ▓▓▓    ",
    "   ╱◉ ◉╲   ",
    "  ╱  ▽  ╲  ",
    " ┃┌─────┐┃ ",
    " ┃│ ███ │┃ ",
    " ┃│ ▓▓▓ │┃ ",
    " ┃│ ░░░ │┃ ",
    " ┃└─────┘┃ ",
    " ┃ ═══╦══┃ ",
    " ┃    ║  ┃ ",
    " ┃  ══╩══┃ ",
    " ┃  ▓   ▓ ┃",
    " ┃  ▓   ▓ ┃",
    " ════════  ",
  ],
  // [1] Hover Bot - Compact floating
  [
    "  ┌───────┐  ",
    " ╱  ◉   ◉  ╲ ",
    "│    ▼     │",
    "│  ┌───┐   │",
    "│  │███│   │",
    "│  │▓▓▓│   │",
    "└──┴───┴───┘",
    "  ═══════   ",
    "   ▓   ▓    ",
  ],
  // [2] Titan Mech - Heavy wide
  [
    "    ▓▓▓▓▓    ",
    "   ╱◉   ◉╲   ",
    "  ┃  ═══  ┃  ",
    " ┃┌───────┐┃ ",
    " ┃│▓▓▓▓▓▓▓│┃ ",
    " ┃│░░░░░░░│┃ ",
    " ┃│███████│┃ ",
    " ┃└───────┘┃ ",
    " ┃ ═══════ ┃ ",
    " ┃  ║   ║  ┃ ",
    " ┃  ▓   ▓  ┃ ",
    " ┃  ▓   ▓  ┃ ",
    " ══════════  ",
  ],
  // [3] Scout Drone - Small flying
  [
    "  ╭─────╮  ",
    " ╱ ◉   ◉ ╲ ",
    "│   ▽     │",
    "│ ┌───┐   │",
    "│ │▓▓▓│   │",
    "╰─┴───┴───╯",
    "  ═══════  ",
    "   ▓ ▓     ",
  ],
  // [4] Cyber Walker - Humanoid
  [
    "     ▓▓▓     ",
    "    ╱◉ ◉╲    ",
    "   ┃  ▽  ┃   ",
    "  ┃┌─────┐┃  ",
    " ┃ │▓▓▓▓▓│ ┃ ",
    " ┃ │░░░░░│ ┃ ",
    " ┃ │█████│ ┃ ",
    " ┃ └─────┘ ┃ ",
    " ┃  ═╦═╦═  ┃ ",
    " ┃   ║ ║   ┃ ",
    " ┃  ═╩═╩═  ┃ ",
    " ┃  ▓   ▓  ┃ ",
    " ═══════════ ",
  ],
];

const ANIMAL_DESIGNS: string[][] = [
  // [0] Cyber Wolf
  [
    "     ▓▓▓      ",
    "    ╱◉ ◉╲     ",
    "   ╱  ▽  ╲    ",
    "  ┃▓▓▓▓▓▓▓┃   ",
    "  ┃░░░░░░░┃   ",
    "   ╲▓▓▓▓▓╱    ",
    "    ║   ║     ",
    "    ▓   ▓     ",
    "    ▓   ▓     ",
  ],
  // [1] Mech Bird
  [
    "   ╱▓▓▓╲    ",
    "  ╱  ◉  ╲   ",
    " │   ▽   │  ",
    " │▓▓▓▓▓▓▓│  ",
    " │░░░░░░░│  ",
    "  ╲▓▓▓▓▓╱   ",
    "   ║║ ║║    ",
    "   ▓  ▓     ",
  ],
  // [2] Nano Spider
  [
    "  ┌─────┐  ",
    "  │◉   ◉│  ",
    "  │  ▽  │  ",
    "  │▓▓▓▓▓│  ",
    "  └─────┘  ",
    "  ╱│╲╱│╲   ",
    " ╱ │  │ ╲  ",
    "▓  ▓  ▓  ▓ ",
  ],
];

const BUILDING_PATTERNS: Record<string, string[]> = {
  skyscraper: [
    "┌────────┐",
    "│▓▓▓▓▓▓▓▓│",
    "│░░░░░░░░│",
    "│▓▓▓▓▓▓▓▓│",
    "│░░░░░░░░│",
    "│▓▓▓▓▓▓▓▓│",
    "│░░░░░░░░│",
    "│▓▓▓▓▓▓▓▓│",
    "│░░░░░░░░│",
    "└────────┘",
  ],
  tower: [
    "    ▓▓    ",
    "   ┌──┐   ",
    "   │▓▓│   ",
    "   │░░│   ",
    "   │▓▓│   ",
    "   │░░│   ",
    "   │▓▓│   ",
    "   │░░│   ",
    "   │▓▓│   ",
    "   └──┘   ",
  ],
  mid: [
    "┌──────┐",
    "│▓▓▓▓▓▓│",
    "│░░░░░░│",
    "│▓▓▓▓▓▓│",
    "│░░░░░░│",
    "└──────┘",
  ],
  far: [
    "▓▓▓▓▓▓▓▓",
    "▓▓▓▓▓▓▓▓",
    "▓▓▓▓▓▓▓▓",
    "▓▓▓▓▓▓▓▓",
  ],
};

// ─── Layer Configuration ───
const LAYERS: CityLayer[] = [
  { id: "bg", speed: 0.02, opacity: 0.15, yOffset: 0.55, color: "#10b981" },
  { id: "mid", speed: 0.05, opacity: 0.25, yOffset: 0.65, color: "#00f2fe" },
  { id: "fg", speed: 0.10, opacity: 0.40, yOffset: 0.75, color: "#fbbf24" },
  { id: "near", speed: 0.18, opacity: 0.55, yOffset: 0.82, color: "#a855f7" },
];

// ─── Utility: Parse ASCII to renderable cells ───
interface AsciiCell {
  char: string;
  x: number;
  y: number;
  glow: boolean;
}

function parseAscii(lines: string[]): AsciiCell[] {
  const cells: AsciiCell[] = [];
  const maxW = Math.max(...lines.map((l) => l.length));
  lines.forEach((line, row) => {
    for (let col = 0; col < maxW; col++) {
      const ch = line[col] || " ";
      if (ch !== " ") {
        const glow = ["◉", "▓", "█", "●", "★"].includes(ch);
        cells.push({ char: ch, x: col, y: row, glow });
      }
    }
  });
  return cells;
}

// ─── Main Component ───
export default function EnhancedCyberCity() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const entitiesRef = useRef<Entity[]>([]);

  // Pre-parse all designs for performance - MOVED INSIDE COMPONENT
  const parsedRobots = useMemo(() => ROBOT_DESIGNS.map(parseAscii), []);
  const parsedAnimals = useMemo(() => ANIMAL_DESIGNS.map(parseAscii), []);

  // Initialize entities once
  const initEntities = useCallback((width: number, height: number) => {
    const entities: Entity[] = [];

    LAYERS.forEach((layer) => {
      const baseY = height * layer.yOffset;
      const count = layer.id === "bg" ? 8 : layer.id === "mid" ? 6 : layer.id === "fg" ? 4 : 3;

      // Add buildings
      for (let i = 0; i < count; i++) {
        const bKeys = Object.keys(BUILDING_PATTERNS);
        const bType = layer.id === "bg" ? "far" : layer.id === "mid" ? "mid" : "skyscraper";
        entities.push({
          x: (width / count) * i + Math.random() * 50,
          y: baseY - Math.random() * 100,
          type: "building",
          designIndex: bKeys.indexOf(bType),
          layerId: layer.id,
          animPhase: Math.random() * Math.PI * 2,
          speed: 0,
        });
      }

      // Add robots (fewer in background)
      const robotCount = layer.id === "near" ? 2 : layer.id === "fg" ? 1 : 0;
      for (let i = 0; i < robotCount; i++) {
        entities.push({
          x: Math.random() * width * 0.8 + width * 0.1,
          y: baseY - 30,
          type: "robot",
          designIndex: Math.floor(Math.random() * ROBOT_DESIGNS.length),
          layerId: layer.id,
          animPhase: Math.random() * Math.PI * 2,
          speed: (Math.random() - 0.5) * 0.3,
        });
      }

      // Add animals (only in mid/fg)
      if (layer.id === "mid" || layer.id === "fg") {
        const animalCount = 1;
        for (let i = 0; i < animalCount; i++) {
          entities.push({
            x: Math.random() * width,
            y: baseY - 20,
            type: "animal",
            designIndex: Math.floor(Math.random() * ANIMAL_DESIGNS.length),
            layerId: layer.id,
            animPhase: Math.random() * Math.PI * 2,
            speed: (Math.random() - 0.5) * 0.5,
          });
        }
      }

      // Add blinking lights on buildings
      const lightCount = layer.id === "near" ? 15 : layer.id === "fg" ? 10 : 5;
      for (let i = 0; i < lightCount; i++) {
        entities.push({
          x: Math.random() * width,
          y: baseY - Math.random() * 150,
          type: "light",
          designIndex: 0,
          layerId: layer.id,
          animPhase: Math.random() * Math.PI * 2,
          speed: 1 + Math.random() * 2,
        });
      }
    });

    entitiesRef.current = entities;
  }, []);

  // ─── Render Loop ───
  const render = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;
    const t = timestamp / 1000;
    timeRef.current = t;

    // Clear with deep dark background
    ctx.fillStyle = "#020706";
    ctx.fillRect(0, 0, width, height);

    // Grid pattern overlay (subtle)
    ctx.strokeStyle = "rgba(16, 185, 129, 0.03)";
    ctx.lineWidth = 0.5;
    const gridSize = 40;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Mouse parallax offset
    const mouseX = mouseRef.current.x;
    const mouseY = mouseRef.current.y;

    // Render each layer
    LAYERS.forEach((layer) => {
      const parallaxX = (mouseX - width / 2) * layer.speed;
      const parallaxY = (mouseY - height / 2) * layer.speed * 0.3;

      ctx.save();
      ctx.globalAlpha = layer.opacity;

      entitiesRef.current
        .filter((e) => e.layerId === layer.id)
        .forEach((entity) => {
          const baseX = entity.x + parallaxX;
          const baseY = entity.y + parallaxY;

          if (entity.type === "light") {
            const blink = Math.sin(t * entity.speed + entity.animPhase) > 0.3;
            if (blink) {
              ctx.fillStyle = layer.color;
              ctx.shadowColor = layer.color;
              ctx.shadowBlur = 8;
              ctx.fillRect(baseX, baseY, 3, 3);
              ctx.shadowBlur = 0;
            }
            return;
          }

          if (entity.type === "building") {
            const pattern = BUILDING_PATTERNS[Object.keys(BUILDING_PATTERNS)[entity.designIndex]];
            if (!pattern) return;
            const cells = parseAscii(pattern);
            const charW = layer.id === "bg" ? 6 : layer.id === "mid" ? 8 : 10;
            const charH = charW * 1.8;

            cells.forEach((cell) => {
              const cx = baseX + cell.x * charW;
              const cy = baseY + cell.y * charH;
              if (cx < -50 || cx > width + 50) return;

              ctx.fillStyle = cell.glow ? layer.color : `rgba(100, 116, 139, ${layer.opacity + 0.2})`;
              if (cell.glow) {
                ctx.shadowColor = layer.color;
                ctx.shadowBlur = 6;
              }
              ctx.font = `${charH * 0.8}px "Courier New", monospace`;
              ctx.fillText(cell.char, cx, cy);
              ctx.shadowBlur = 0;
            });
            return;
          }

          // Robot or Animal
          const design = entity.type === "robot" ? ROBOT_DESIGNS[entity.designIndex] : ANIMAL_DESIGNS[entity.designIndex];
          if (!design) return;

          const moveX = entity.type === "robot" ? Math.sin(t * 0.5 + entity.animPhase) * 20 : Math.sin(t * 0.8 + entity.animPhase) * 40;
          const hoverY = Math.sin(t * 2 + entity.animPhase) * 3;

          const cells = entity.type === "robot" ? parsedRobots[entity.designIndex] : parsedAnimals[entity.designIndex];
          const charW = layer.id === "near" ? 12 : layer.id === "fg" ? 10 : 8;
          const charH = charW * 1.6;

          cells.forEach((cell) => {
            const cx = baseX + moveX + cell.x * charW;
            const cy = baseY + hoverY + cell.y * charH;
            if (cx < -100 || cx > width + 100) return;

            ctx.fillStyle = cell.glow ? layer.color : `rgba(148, 163, 184, ${layer.opacity + 0.3})`;
            if (cell.glow) {
              ctx.shadowColor = layer.color;
              ctx.shadowBlur = 10;
            }
            ctx.font = `${charH * 0.75}px "Courier New", monospace`;
            ctx.fillText(cell.char, cx, cy);
            ctx.shadowBlur = 0;
          });
        });

      ctx.restore();
    });

    // Scanline overlay (subtle)
    ctx.fillStyle = "rgba(0, 242, 254, 0.015)";
    const scanY = (t * 60) % (height + 100) - 50;
    ctx.fillRect(0, scanY, width, 2);

    rafRef.current = requestAnimationFrame(render);
  }, [parsedRobots, parsedAnimals]);

  // ─── Setup & Cleanup ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initEntities(window.innerWidth, window.innerHeight);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [initEntities, render]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}