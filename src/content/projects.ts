/**
 * Projects data for the Bento "Projects" panel.
 *
 * Each project carries a representative, syntax-highlighted `snippet` (the primary
 * Developer-Chic visual) plus optional `image` — only images that still exist in
 * /public/assets/images are referenced, so the static export never 404s. `liveUrl`
 * is optional: some projects (a team project's old free-tier demo, a local-only
 * Docker Compose stack) have no live deployment to link.
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
}

export const projects: Project[] = [
  {
    id: 'walkwaitapp',
    title: 'WalkWaitApp',
    description: 'A transit decision app comparing real-time TTC bus wait times against walking time.',
    details:
      'A team project with a React frontend and a Node/Express + MySQL backend. It pulls real-time bus data from the TTC Dev API and route data from the Google Maps API, then runs a probability-based algorithm to recommend walking or waiting for the next bus. Authentication is handled with Passport.js and JWTs.',
    technologies: ['React', 'Node.js', 'Express', 'MySQL', 'Passport.js'],
    tags: ['Backend & APIs'],
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
    id: 'smart-bookstore',
    title: 'Smart Bookstore',
    description: 'A bookstore demo with an AI shopping assistant, backed by a Go/ConnectRPC API and a Python semantic-search service.',
    details:
      'A Go backend serves type-safe ConnectRPC APIs to a React/TypeScript frontend, with a single Protocol Buffer schema generating both the Go and TypeScript sides. A Python/FastAPI service handles chat and semantic search: PostgreSQL with the pgvector extension stores book embeddings, and LiteLLM makes the underlying model swappable by configuration alone. The stack runs on Docker Compose with a GitHub Actions CI pipeline.',
    technologies: ['Go', 'ConnectRPC', 'Python', 'PostgreSQL', 'React', 'TypeScript', 'Docker'],
    tags: ['Backend & APIs'],
    githubUrl: 'https://github.com/LuckyP86H/smart-bookstore',
    language: 'go',
    snippet: `// publicProcedures skip authentication entirely. ISBN lookup is public so it
// can prefill the add-book form before a merchant has signed in; its handler
// validates input and never echoes upstream errors, since anyone can call it.
var publicProcedures = map[string]bool{
	"/grpc.health.v1.Health/Check":                              true,
	bookstorev1connect.MerchantServiceLookupBookByISBNProcedure: true,
}`,
  },
  {
    id: 'letter-guess',
    title: 'Letter Guess Game',
    description: 'A letter-guessing game built with vanilla JavaScript.',
    details:
      'Players guess a random letter each round. The game tracks wins, losses, and remaining guesses, with keyboard-driven input.',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    tags: ['Fun Toys'],
    githubUrl: 'https://github.com/LuckyP86H/Letter-Guess-Game',
    liveUrl: 'https://luckyp86h.github.io/Letter-Guess-Game',
    language: 'javascript',
    image: '/assets/images/letter_guess.jpg',
    snippet: `document.onkeyup = function (event) {
  const guess = event.key.toLowerCase();
  if (guess === target) {
    wins++;
    reset();
  } else {
    guessesLeft--;
  }
  render();
};`,
  },
  {
    id: 'crystal-collector',
    title: 'Crystal Collector',
    description: 'Interactive number-matching game with crystals.',
    details:
      'Each crystal is assigned a random hidden value. Click crystals to reach a target total without going over — a small state machine problem.',
    technologies: ['JavaScript', 'jQuery', 'Bootstrap'],
    tags: ['Fun Toys'],
    githubUrl: 'https://github.com/LuckyP86H/Crystal-Collector',
    liveUrl: 'https://luckyp86h.github.io/Crystal-Collector',
    language: 'javascript',
    snippet: `$(".crystal").on("click", function () {
  total += crystalValues[$(this).attr("data-value")];
  if (total > target) {
    losses++;
    newGame();
  } else if (total === target) {
    wins++;
    newGame();
  }
});`,
  },
  {
    id: 'trivia-game',
    title: 'Trivia Game',
    description: 'A timed multiple-choice trivia quiz.',
    details:
      'Presents timed multiple-choice questions and shows a correct/incorrect summary at the end. Uses a countdown timer per question.',
    technologies: ['JavaScript', 'jQuery', 'Responsive Design'],
    tags: ['Fun Toys'],
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
    id: 'gif-tastic',
    title: 'Dynamic GIF Page',
    description: 'Fetches and displays GIFs from the GIPHY API.',
    details:
      'Search GIFs by category; results are fetched from the GIPHY API and rendered dynamically with play/pause on click.',
    technologies: ['JavaScript', 'AJAX', 'API Integration'],
    tags: ['Fun Toys'],
    githubUrl: 'https://github.com/LuckyP86H/Gif-Tastic-Dynamic',
    liveUrl: 'https://luckyp86h.github.io/Gif-Tastic-Dynamic',
    language: 'javascript',
    snippet: `const url = "https://api.giphy.com/v1/gifs/search"
  + "?api_key=" + KEY + "&q=" + topic + "&limit=10";

fetch(url)
  .then((res) => res.json())
  .then((data) => renderGifs(data.data));`,
  },
  {
    id: 'ill-hue-minate',
    title: 'ill-HUE-minate',
    description: 'Color palette generator and visualization tool.',
    details:
      'Generates complementary palettes and previews them across design contexts to help pick harmonious color schemes.',
    technologies: ['JavaScript', 'Canvas API', 'Color Theory'],
    tags: ['Fun Toys'],
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
 */
export const projectCategories = ['All', 'Backend & APIs', 'Fun Toys'];
