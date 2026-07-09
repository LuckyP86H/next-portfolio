'use client';

/**
 * Static GitHub-style contribution heatmap rendered as SVG (no external API — safe for a
 * static export). Intensities are generated from a fixed seed so server and client render
 * identically (no hydration mismatch). Scales responsively via viewBox.
 */

const WEEKS = 52;
const DAYS = 7;
const CELL = 12; // logical units per cell (incl. gap)
const SIZE = 10; // drawn square size

// Deterministic PRNG so the pattern is stable across renders/builds.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const LEVEL_FILL = ['#0d0d0d', 'rgba(0,242,255,0.25)', 'rgba(0,242,255,0.45)', 'rgba(0,242,255,0.72)', '#00f2ff'];

function buildCells() {
  const rand = mulberry32(20240607);
  const cells: { x: number; y: number; level: number }[] = [];
  let total = 0;
  for (let w = 0; w < WEEKS; w++) {
    for (let d = 0; d < DAYS; d++) {
      const r = rand();
      const weekendDamp = d === 0 || d === 6 ? 0.15 : 0;
      const v = r - weekendDamp;
      const level = v < 0.45 ? 0 : v < 0.68 ? 1 : v < 0.85 ? 2 : v < 0.95 ? 3 : 4;
      total += level === 0 ? 0 : level * 3 + Math.floor(rand() * 4);
      cells.push({ x: w * CELL, y: d * CELL, level });
    }
  }
  return { cells, total };
}

const { cells, total } = buildCells();
const gridW = WEEKS * CELL;
const gridH = DAYS * CELL;

export default function GitHubActivity() {
  return (
    <div className="flex h-full flex-col gap-3 p-4 sm:p-5">
      <div className="flex items-baseline justify-between">
        <p className="text-sm text-chic-fg">
          <span className="font-semibold text-chic-cyan">{total.toLocaleString()}</span> contributions
        </p>
        <p className="text-[11px] text-chic-muted">last year</p>
      </div>

      <div className="min-h-0 flex-1">
        <svg
          viewBox={`0 0 ${gridW} ${gridH}`}
          width="100%"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={`GitHub contribution graph showing ${total.toLocaleString()} contributions in the last year`}
          className="h-auto w-full"
        >
          {cells.map((c, i) => (
            <rect
              key={i}
              x={c.x}
              y={c.y}
              width={SIZE}
              height={SIZE}
              rx={1.5}
              fill={LEVEL_FILL[c.level]}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth={0.5}
            />
          ))}
        </svg>
      </div>

      <div className="flex items-center gap-2 text-[11px] text-chic-muted">
        <span>Less</span>
        {LEVEL_FILL.map((fill, i) => (
          <span
            key={i}
            className="inline-block h-2.5 w-2.5 rounded-[1px]"
            style={{ backgroundColor: fill }}
            aria-hidden
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
