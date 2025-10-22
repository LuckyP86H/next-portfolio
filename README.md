# Modern Portfolio

This is a modern portfolio site built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Next.js 14** with App Router for optimized page loading and SEO
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for smooth animations
- **D3.js** for data visualization
- **Dark/Light mode** support
- **Responsive design** for all device sizes
- **Horizontal swipe navigation** for sections
- **Modern UI components** with animations

## Project Structure

```
.
├── public/
│   ├── assets/
│   │   └── images/
│   └── *
├── src/
│   ├── app/
│   │   ├── about/
│   │   ├── contact/
│   │   ├── portfolio/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   ├── sections/
│   │   └── ui/
│   ├── content/
│   │   └── aboutMe.ts
│   ├── styles/
│   │   └── globals.css
│   └── ThemeProvider.tsx
├── .eslintrc.json
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

## Getting Started

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Migration from Original Portfolio

This project is a migration from a React-based portfolio to a modern Next.js application. Key upgrades include:

1. **Framework**: Migrated from Create React App to Next.js for better performance and SEO
2. **Styling**: Shifted from React-Bootstrap to Tailwind CSS for more flexibility and faster development
3. **TypeScript**: Added TypeScript for better type safety and developer experience
4. **Dark Mode**: Implemented a dark/light theme toggle using next-themes
5. **Animations**: Enhanced with Framer Motion for smooth transitions and interactions
6. **Responsive Design**: Improved mobile responsiveness with Tailwind's utility classes
7. **Data Visualization**: Added D3.js for skills visualization
8. **Navigation**: Added horizontal swipe navigation for a modern UX

## Build for Production

```bash
npm run build
```

## Deployment

This application can be deployed to any platform that supports Next.js, such as Vercel, Netlify, or AWS.

For Vercel deployment (recommended):

```bash
npm install -g vercel
vercel
```

## Dependency graph (Nx)

We added a minimal Nx setup to visualize project dependencies without restructuring the repo. See `README.nx.md` for quick usage and commands to generate the interactive graph (`npm run dep-graph`).

## License

This project is licensed under the MIT License.