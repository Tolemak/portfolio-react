import { CanvasTexture, SRGBColorSpace } from 'three';
import type { PlanetSurface } from '../../data/projectPlanets';

const WIDTH = 1024;
const HEIGHT = 512;

export interface SurfaceTextures {
  map: CanvasTexture;
  emissiveMap?: CanvasTexture;
  emissiveIntensity: number;
  roughness: number;
}

type Painter = (ctx: CanvasRenderingContext2D, random: () => number) => void;

/** Small seeded generator, so a planet looks the same on every visit. */
function seeded(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function canvas(paint: Painter, seed: number): CanvasTexture {
  const element = document.createElement('canvas');
  element.width = WIDTH;
  element.height = HEIGHT;
  const ctx = element.getContext('2d');
  if (ctx) paint(ctx, seeded(seed));
  const texture = new CanvasTexture(element);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function grid(ctx: CanvasRenderingContext2D, step: number, color: string, width = 1) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  for (let x = 0; x <= WIDTH; x += step) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, HEIGHT);
  }
  for (let y = 0; y <= HEIGHT; y += step) {
    ctx.moveTo(0, y);
    ctx.lineTo(WIDTH, y);
  }
  ctx.stroke();
}

/** Mathema: squared school paper, a red margin line and a few sums written in blue ink. */
const notebook: Painter = (ctx, random) => {
  ctx.fillStyle = '#fbfbf8';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  grid(ctx, 18, '#c9dcea');
  ctx.fillStyle = '#e49b9b';
  ctx.fillRect(150, 0, 4, HEIGHT);
  ctx.fillRect(662, 0, 4, HEIGHT);
  ctx.fillStyle = '#1d3f8f';
  ctx.font = 'italic 34px Georgia, serif';
  const sums = ['1 + ½ + ¼ = 2', 'x² − 4 = 0', 'π ≈ 3,14', 'Σ n = 55', '√2', 'a² + b² = c²'];
  sums.forEach((text, i) => {
    ctx.fillText(text, 180 + random() * 380 + (i % 2) * 520, 70 + i * 72);
  });
  ctx.strokeStyle = '#cf2f25';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(420, 250, 60, 26, -0.1, 0, Math.PI * 2);
  ctx.stroke();
};

function dotMatrix(ctx: CanvasRenderingContext2D, random: () => number, lit: string, unlit: string | null) {
  const step = 10;
  for (let y = step / 2; y < HEIGHT; y += step) {
    const row = Math.floor(y / step);
    // Rows come in bands, like the lines of a rate board.
    const band = row % 9 < 7;
    for (let x = step / 2; x < WIDTH; x += step) {
      const on = band && random() > 0.58;
      if (!on && !unlit) continue;
      ctx.fillStyle = on ? lit : (unlit as string);
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

/** CryptoPulse: a black board of LED dots, some of them lit red-orange. */
const led: Painter = (ctx, random) => {
  ctx.fillStyle = '#050505';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  dotMatrix(ctx, random, '#ff5b3a', '#241410');
};

const ledGlow: Painter = (ctx, random) => {
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  dotMatrix(ctx, random, '#ff5b3a', null);
};

/** File Actions: a green cutting mat with its grid and the yellow 45° guides. */
const mat: Painter = (ctx) => {
  ctx.fillStyle = '#2e6a50';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  grid(ctx, 16, 'rgba(255, 255, 255, 0.14)');
  grid(ctx, 80, 'rgba(255, 255, 255, 0.32)', 2);
  ctx.strokeStyle = '#f3d34a';
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let x = -HEIGHT; x < WIDTH; x += 256) {
    ctx.moveTo(x, HEIGHT);
    ctx.lineTo(x + HEIGHT, 0);
  }
  ctx.stroke();
};

/** Lecture API: bands of pink, one per layer of the architecture. */
const strata: Painter = (ctx, random) => {
  const shades = ['#e91e63', '#c2185b', '#f06292', '#ad1457', '#f48fb1', '#d81b60'];
  let y = 0;
  let i = 0;
  while (y < HEIGHT) {
    const height = 24 + random() * 46;
    ctx.fillStyle = shades[i % shades.length];
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= WIDTH; x += 32) {
      ctx.lineTo(x, y + Math.sin(x / 90 + i) * 5);
    }
    ctx.lineTo(WIDTH, y + height + 6);
    ctx.lineTo(0, y + height + 6);
    ctx.closePath();
    ctx.fill();
    y += height;
    i += 1;
  }
};

/** The old portfolio: a small blue moon full of craters. */
const craters: Painter = (ctx, random) => {
  ctx.fillStyle = '#1976d2';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  for (let i = 0; i < 70; i += 1) {
    const x = random() * WIDTH;
    const y = random() * HEIGHT;
    const r = 6 + random() * 34;
    ctx.fillStyle = random() > 0.5 ? 'rgba(10, 40, 90, 0.45)' : 'rgba(160, 205, 255, 0.35)';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
};

/** This portfolio: violet clouds, with a ring added by the scene. */
const nebula: Painter = (ctx, random) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
  gradient.addColorStop(0, '#3b0a6e');
  gradient.addColorStop(0.5, '#6a0dad');
  gradient.addColorStop(1, '#2a0650');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  for (let i = 0; i < 120; i += 1) {
    const x = random() * WIDTH;
    const y = random() * HEIGHT;
    const r = 20 + random() * 80;
    const cloud = ctx.createRadialGradient(x, y, 0, x, y, r);
    cloud.addColorStop(0, 'rgba(180, 140, 255, 0.35)');
    cloud.addColorStop(1, 'rgba(180, 140, 255, 0)');
    ctx.fillStyle = cloud;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
};

const PAINTERS: Record<PlanetSurface, Painter> = { notebook, led, mat, strata, craters, nebula };

export function paintSurface(surface: PlanetSurface, seed: number): SurfaceTextures {
  const map = canvas(PAINTERS[surface], seed);
  if (surface === 'led') {
    return { map, emissiveMap: canvas(ledGlow, seed), emissiveIntensity: 2.2, roughness: 0.4 };
  }
  return { map, emissiveIntensity: 0, roughness: surface === 'notebook' ? 0.95 : 0.75 };
}
