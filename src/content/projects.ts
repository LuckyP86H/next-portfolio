/**
 * Projects data for the Bento "Projects" panel.
 *
 * Each project carries a representative, syntax-highlighted `snippet` (the primary
 * Developer-Chic visual) plus optional `image` — only images that still exist in
 * /public/assets/images are referenced, so the static export never 404s.
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  details: string;
  technologies: string[];
  /** Coarse tags used by the category filter. */
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  language: string;
  snippet: string;
  /** basePath-relative image path, only when the asset exists. */
  image?: string;
}

export const projects: Project[] = [
  {
    id: 'letter-guess',
    title: 'Letter Guess Game',
    description: 'A letter-guessing game built with vanilla JavaScript.',
    details:
      'Players guess a random letter each round. The game tracks wins, losses, and remaining guesses, with keyboard-driven input.',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    tags: ['JavaScript', 'Games'],
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
    tags: ['JavaScript', 'Games'],
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
    tags: ['JavaScript', 'Responsive Design'],
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
    tags: ['JavaScript', 'APIs'],
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
    tags: ['JavaScript', 'APIs'],
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

/** Category filter buttons. "All" first, then coarse tags that actually map to projects. */
export const projectCategories = ['All', 'JavaScript', 'Games', 'APIs', 'Responsive Design'];

export default projects;
