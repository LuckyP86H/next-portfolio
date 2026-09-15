/**
 * Site-wide facts and links. Every component reads from here, so a change to a
 * role, link or location only has to be made once.
 */
export const site = {
  name: 'Paul Xu',
  role: 'Software Engineer',
  company: 'ZoomInfo',
  since: 'Jul 2026',
  previously: 'Clari (2021 – 2026)',
  education: 'BCS, University of Waterloo',
  location: 'Toronto, Canada',
  focus: 'Backend · Build systems · Cloud',
  email: 'paulxu155@gmail.com',
  github: 'https://github.com/LuckyP86H',
  linkedin: 'https://linkedin.com/in/paul-xu',
  twitter: 'https://twitter.com/PaulLovesCoding',
} as const;

/** GitHub Pages serves the site under /next-portfolio; `next dev` serves it at the root. */
export const basePath = process.env.NODE_ENV === 'production' ? '/next-portfolio' : '';
