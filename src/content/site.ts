/**
 * Site-wide facts and links. Every component reads from here, so a change to a
 * role, link or location only has to be made once.
 */
export const site = {
  name: 'Paul Xu',
  role: 'Software Engineer',
  company: 'ZoomInfo',
  since: '2026',
  education: [
    'MSc Analytics, Computing DS/ML — Georgia Tech',
    'BMath, Computing Statistics — UWaterloo',
  ],
  location: 'Toronto, Canada',
  focus: 'AI Platform, Data Ingestion',
  email: 'paulxu155@gmail.com',
  github: 'https://github.com/LuckyP86H',
  linkedin: 'https://linkedin.com/in/paul-xu',
  twitter: 'https://twitter.com/PaulLovesCoding',
} as const;

/** GitHub Pages serves the site under /next-portfolio; `next dev` serves it at the root. */
export const basePath = process.env.NODE_ENV === 'production' ? '/next-portfolio' : '';
