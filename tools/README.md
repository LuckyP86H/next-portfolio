# Development Tools

This folder contains generated dependency visualizations for the project.

## Nx Dependency Graph

Visualizes project-level dependencies (components, lib, content, etc.).

### Generate and view:

```bash
# Interactive mode (opens in browser)
npm run dep-graph

# Or generate static HTML
npx nx graph --file=tools/nx/nx-dep-graph.html
```

**Generated files:**
- `nx/nx-dep-graph.html` - Interactive dependency graph
- `nx/static/` - Assets for the graph viewer

**Note:** These files are gitignored and regenerated on demand.

## Madge File-Level Dependencies

Visualizes file-to-file import relationships.

### Generate dependencies:

```bash
npx madge --extensions ts,tsx,js,jsx --json src > tools/nx/madge-deps.json
```

### View the graph:

Start local server:
```bash
npm run serve:tools
```

Then open in browser:
- Nx graph: http://localhost:8000/nx/nx-dep-graph.html
- Madge graph: http://localhost:8000/nx/madge-deps.html

**Important:** Use the local server - opening HTML files directly with `file://` will fail due to CORS restrictions.

## Project Structure

```
tools/
├── nx/
│   ├── nx-dep-graph.html    # Nx project graph (generated)
│   ├── madge-deps.html       # Madge file graph (static viewer)
│   ├── madge-deps.json       # Madge data (generated)
│   └── static/               # Graph viewer assets (generated)
└── README.md
```
