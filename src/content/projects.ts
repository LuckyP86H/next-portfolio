/**
 * Projects data for the Bento "Projects" panel.
 *
 * Source of truth for each project is its repository README. An entry here is a short
 * summary of that README, so every entry records `verified`: the date it was last checked
 * against the repo. `npm run projects:check` compares that date with each repo's last push
 * and lists the entries that have gone stale.
 *
 * Each project carries a representative, syntax-highlighted `snippet` (the primary
 * Developer-Chic visual) plus optional `image` — only images that still exist in
 * /public/assets/images are referenced, so the static export never 404s. `liveUrl`
 * is optional and only set for demos that were confirmed to work: most projects run on
 * Cloudflare Workers or Docker Compose and are not deployed publicly.
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  details: string;
  technologies: string[];
  /** Single primary category used by the filter; see `projectCategories`. */
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  language: string;
  snippet: string;
  /** basePath-relative image path, only when the asset exists. */
  image?: string;
  /**
   * ISO date this entry was last checked against the repository README. Left out when an
   * entry has not been re-checked, which `projects:check` reports as unverified.
   */
  verified?: string;
}

export const projects: Project[] = [
  {
    id: 'celery-call-pipeline',
    title: 'Celery Call Pipeline',
    description: 'A call-intelligence pipeline built to learn Celery by killing workers mid-task.',
    details:
      'A realistic pipeline (API → ingest → chord of parallel chunk analyses → merge) that runs locally on Docker Compose, built to study what survives when workers die. RabbitMQ delivers tasks, Redis holds results and chord state, and PostgreSQL is the source of truth. Chunk tasks claim their work with a heartbeat lease so redelivery is idempotent, and two named reliability profiles ("hardened" and Celery\'s defaults) let you watch the same chaos tests pass and fail. A read-only workflow visualizer, celery_viz, is in progress.',
    technologies: ['Python', 'Celery', 'RabbitMQ', 'Redis', 'PostgreSQL', 'FastAPI', 'Docker Compose'],
    tags: ['Backend & Systems'],
    githubUrl: 'https://github.com/LuckyP86H/learn-what-rhyme-with-salary',
    language: 'python',
    snippet: `RELIABILITY_PROFILES = {
    "hardened": {
        "task_acks_late": True,
        "task_reject_on_worker_lost": True,
        "worker_prefetch_multiplier": 1,
    },
    # Exactly what Celery ships with, kept so you can watch it fail.
    "default": {
        "task_acks_late": False,
        "task_reject_on_worker_lost": False,
        "worker_prefetch_multiplier": 4,
    },
}`,
    verified: '2026-11-05',
  },
  {
    id: 'smart-bookstore',
    title: 'Smart Bookstore',
    description: 'A bookstore with an AI shopping assistant: Go/ConnectRPC API, Python semantic search, pgvector.',
    details:
      'A Go backend serves type-safe ConnectRPC APIs to a React/TypeScript frontend, with one Protocol Buffer schema generating both the Go and TypeScript sides. A Python/FastAPI service answers natural-language questions by combining pgvector similarity search over sentence-transformer embeddings with an LLM. LiteLLM makes the provider (local Ollama, OpenAI, Anthropic, Gemini and others) swappable by configuration alone. The stack runs on Docker Compose with GitHub Actions CI.',
    technologies: ['Go', 'ConnectRPC', 'Python', 'pgvector', 'React', 'TypeScript', 'Docker'],
    tags: ['AI & Agents'],
    githubUrl: 'https://github.com/LuckyP86H/smart-bookstore',
    language: 'go',
    snippet: `// publicProcedures skip authentication entirely. ISBN lookup is public so it
// can prefill the add-book form before a merchant has signed in; its handler
// validates input and never echoes upstream errors, since anyone can call it.
var publicProcedures = map[string]bool{
	"/grpc.health.v1.Health/Check":                              true,
	bookstorev1connect.MerchantServiceLookupBookByISBNProcedure: true,
}`,
    verified: '2026-11-05',
  },
  {
    id: 'bamazon',
    title: 'Bamazon',
    description: 'An Amazon-style storefront with a cart, back office and AI merchandising, on Cloudflare Workers.',
    details:
      'Shoppers browse, search and check out; managers restock and add products; supervisors see profit by department. The cart is a cookie of product IDs and quantities only, with prices and stock re-read from D1 on the server at every step, so a sale cannot oversell and checkout works without JavaScript. An LLM-powered concierge turns plain-words requests into validated filters, and a judgment model scores restock urgency and gates deal and purchase-order proposals. Every AI feature has a labelled deterministic fallback. Built with Astro and Zod, with WCAG 2.2 AA checks and Playwright tests.',
    technologies: ['Astro', 'Cloudflare Workers', 'D1', 'TypeScript', 'Zod', 'Playwright'],
    tags: ['Web Apps'],
    githubUrl: 'https://github.com/LuckyP86H/bamazon',
    language: 'typescript',
    snippet: `/** Prices a cart from the current catalogue. Quantities above the live stock are kept but flagged. */
export function priceCart(items: CartItems, products: PricedProduct[]): PricedCart {
  const byId = new Map(products.map((product) => [product.id, product]));
  const lines: CartLine[] = [];
  const unavailable: string[] = [];
  for (const [id, quantity] of Object.entries(items)) {
    const product = byId.get(id);
    if (!product || !product.active || product.stock <= 0) {
      unavailable.push(id);
      continue;
    }
    lines.push({ product, quantity, lineCents: product.priceCents * quantity });
  }
  return { lines, unavailable, totalCents: lines.reduce((s, l) => s + l.lineCents, 0) };
}`,
    verified: '2026-11-05',
  },
  {
    id: 'clickster',
    title: 'Clickster',
    description: 'A click-once memory game with an AI deck curator, an AI host and a Redis leaderboard.',
    details:
      'Click every card exactly once: each click reshuffles the board and a repeat click ends the run. It has Classic, Timed and Daily modes (a date-seeded deck shared by everyone). A curator agent builds a deck from any theme with a streamed tool loop (search Openverse, validate, assemble), where a judgment model gates each card. An AI host reacts to streaks and busts, and scores live in Redis sorted sets. Without API keys everything falls back to a labelled demo mode. Built on SvelteKit and Cloudflare Workers.',
    technologies: ['SvelteKit', 'TypeScript', 'Cloudflare Workers', 'Redis', 'AI agents'],
    tags: ['Games'],
    githubUrl: 'https://github.com/LuckyP86H/clicky-game',
    language: 'typescript',
    snippet: `export function applyClick(state: RunState, cardId: string, now: number): RunState {
	if (state.status !== 'playing') return state;

	const total = state.order.length;
	const clicks = state.clicks + 1;

	// The core guard: a repeat click busts the run.
	if (state.clicked.includes(cardId)) {
		return { ...state, clicks, status: 'bust' };
	}
	// ...otherwise score it and reshuffle the board.
}`,
    verified: '2026-11-05',
  },
  {
    id: 'weft',
    title: 'Weft',
    description: 'A privacy-first MCP server that lets Claude capture and search a local Obsidian vault.',
    details:
      'Claude does the thinking and Weft does the deterministic part: it scrubs secrets, emails and phone numbers from every note it writes and every snippet it returns, files new notes in an inbox folder, runs full-text search, and ranks existing notes as [[wikilink]] candidates by shared rare words (BM25-style IDF, with CJK support). It makes no network calls, holds no API keys, and never edits or deletes an existing note. Tested with pytest and demonstrated through the MCP Inspector.',
    technologies: ['Python', 'MCP', 'uv', 'pytest'],
    tags: ['AI & Agents'],
    githubUrl: 'https://github.com/LuckyP86H/Weft',
    language: 'python',
    snippet: `@mcp.tool(name="weft_scrub")
def weft_scrub(text: str) -> dict[str, Any]:
    """Redact secrets, email addresses and phone numbers from \`\`text\`\`.

    The report never contains the removed text itself.
    """
    result = scrub(text)
    return {
        "scrubbed_text": result.scrubbed_text,
        "redactions": [asdict(r) for r in result.redactions],
    }`,
    verified: '2026-11-05',
  },
  {
    id: 'giftastic',
    title: 'GifTastic',
    description: 'Find the right reaction GIF: search, mood suggestions, or a vision agent that picks for you.',
    details:
      'Originally a 2019 jQuery and GIPHY bootcamp assignment, rebuilt in 2026. The API key now stays on the server, results are cached at the edge by normalised query, and clips play as MP4 (about ten times lighter than GIF). A multimodal agent searches, looks at one frame of each candidate, and picks one to three clips with reasons and alt text, streamed over Server-Sent Events under strict step and image budgets. A small lexicon suggests searches from the mood of a message with no AI at all.',
    technologies: ['SvelteKit', 'TypeScript', 'Cloudflare Workers', 'Vision LLM', 'SSE'],
    tags: ['AI & Agents'],
    githubUrl: 'https://github.com/LuckyP86H/Gif-Tastic-Dynamic',
    language: 'typescript',
    snippet: `export const LIMITS = { steps: 6, searches: 3, images: 12, perLook: 6, picks: 3 } as const;

// The loop: ask the model what to do, run the tool it picked, show it the
// result, repeat. Every tool call is checked, so a confused model gets an
// explanation instead of breaking anything.
export async function runAgent(message: string, deps: AgentDeps): Promise<Pick[]> {
  for (let step = 0; step < LIMITS.steps; step++) {
    const reply = await deps.model.next(SYSTEM, turns, TOOLS);
    // ...validate, run the tool, feed the result back
  }
}`,
    verified: '2026-11-05',
  },
  {
    id: 'crystal-collector',
    title: 'Crystal Collector',
    description: 'A number-matching puzzle with a daily board, a shortest-route solver and a verified leaderboard.',
    details:
      'Hit the target exactly with four crystals whose values stay hidden until clicked. Originally a 2019 jQuery assignment, rebuilt in 2026 with React 19 and TypeScript. One pure rules engine runs in both the browser and a Cloudflare Worker, which replays every submitted run so the D1 leaderboard cannot be faked. Boards come from a date-seeded PRNG and are checked with a coin-change solver, which also shows the shortest route on the result screen. Not deployed publicly yet.',
    technologies: ['React', 'TypeScript', 'Hono', 'Cloudflare Workers', 'D1'],
    tags: ['Games'],
    githubUrl: 'https://github.com/LuckyP86H/Crystal-Collector',
    language: 'typescript',
    image: '/assets/images/crystal_collector.jpg',
    snippet: `/** mulberry32: small, fast, and bit-for-bit identical on every JavaScript engine. */
export function createRng(seed: number): Rng {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    // ...mix and scale to [0, 1)
  };
}`,
    verified: '2026-11-05',
  },
  {
    id: 'letter-guess',
    title: 'Letter Guess',
    description: 'A letter-guessing game: play solo, take the daily letter, or race friends in a live room.',
    details:
      'The computer picks a letter and you get five tries. Solo mode tracks streaks, Daily gives everyone the same letter each UTC day with a shareable result grid, and Friends rooms run on a Durable Object so the server picks each round\'s letter and nobody can peek. Sign in with GitHub or Google to keep history across devices. A React client and shared game rules run on one Cloudflare Worker with D1, with Bun tests.',
    technologies: ['React', 'TypeScript', 'Cloudflare Workers', 'Durable Objects', 'D1'],
    tags: ['Games'],
    githubUrl: 'https://github.com/LuckyP86H/Letter-Guess-Game',
    language: 'typescript',
    snippet: `// The same letter for everyone on a given UTC day. FNV-1a over the date
// string keeps it deterministic without storing anything.
export function dailyLetter(day: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < day.length; i++) {
    hash ^= day.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return ALPHABET.charAt(hash % ALPHABET.length);
}`,
    verified: '2026-11-05',
  },
  {
    id: 'walkwaitapp',
    title: 'WalkWaitApp',
    description: 'A transit decision app comparing real-time TTC bus wait times against walking time.',
    details:
      'A team project with a React frontend and a Node/Express + MySQL backend. It pulls real-time bus data from the TTC Dev API and route data from the Google Maps API, then runs a probability-based algorithm to recommend walking or waiting for the next bus. Authentication is handled with Passport.js and JWTs.',
    technologies: ['React', 'Node.js', 'Express', 'MySQL', 'Passport.js'],
    tags: ['Backend & Systems'],
    githubUrl: 'https://github.com/walk-wait/WalkWaitApp',
    language: 'javascript',
    snippet: `const router = require("express").Router();
const appController = require("../../controllers/appController");

// Matches with "/api/bus/latlon/:lat/:lon"
router.route("/latlon/:lat/:lon")
  .get(appController.findNearBy)

// Matches with "/api/bus/nextstops/:route/:direction/:id"
router.route("/nextstops/:route/:direction/:id")
  .get(appController.findStops)

module.exports = router;`,
  },
  {
    id: 'trivia-game',
    title: 'Trivia Game',
    description: 'A timed multiple-choice trivia quiz.',
    details:
      'Presents timed multiple-choice questions and shows a correct/incorrect summary at the end. Uses a countdown timer per question.',
    technologies: ['JavaScript', 'jQuery', 'Responsive Design'],
    tags: ['Games'],
    githubUrl: 'https://github.com/LuckyP86H/Trivia-Game',
    liveUrl: 'https://luckyp86h.github.io/Trivia-Game',
    language: 'javascript',
    snippet: `function startTimer() {
  timer = setInterval(function () {
    if (--seconds <= 0) {
      clearInterval(timer);
      timeUp();
    }
    $("#clock").text(seconds);
  }, 1000);
}`,
  },
  {
    id: 'ill-hue-minate',
    title: 'ill-HUE-minate',
    description: 'Color palette generator and visualization tool.',
    details:
      'Generates complementary palettes and previews them across design contexts to help pick harmonious color schemes.',
    technologies: ['JavaScript', 'Canvas API', 'Color Theory'],
    tags: ['Web Apps'],
    githubUrl: 'https://github.com/LuckyP86H/illHUEminate',
    liveUrl: 'https://luckyp86h.github.io/illHUEminate/',
    language: 'javascript',
    image: '/assets/images/ill_HUE_minate.jpg',
    snippet: `function complementary(hue) {
  const ctx = canvas.getContext("2d");
  const palette = [hue, (hue + 180) % 360];
  palette.forEach((h, i) => {
    ctx.fillStyle = "hsl(" + h + ", 70%, 55%)";
    ctx.fillRect(i * swatch, 0, swatch, swatch);
  });
}`,
  },
];

/**
 * Category filter buttons. "All" first, then categories describing what a project
 * *is* rather than the tech it's built with — every project carries exactly one.
 *
 *  - AI & Agents:      LLM agents, RAG and MCP are the point of the project.
 *  - Games:            playable games, whatever the stack.
 *  - Backend & Systems: services, queues and distributed-systems learning labs.
 *  - Web Apps:         product-style apps where the UI and full stack are the point.
 */
export const projectCategories = ['All', 'AI & Agents', 'Games', 'Backend & Systems', 'Web Apps'];
