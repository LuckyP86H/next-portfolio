# Scripts

Utility scripts for development and CI validation.

## validate-ci.sh

Validates your changes locally by mimicking the GitHub Actions workflow.

### Usage

```bash
./scripts/validate-ci.sh
```

**What it does:**
1. ✅ Installs dependencies (`npm ci`)
2. ✅ Installs Playwright browsers
3. ✅ Runs all tests (`npm test`)
4. ✅ Builds the application (`npm run build`)
5. ✅ Verifies build output exists

**When to run:**
- Before pushing to main
- Before creating a pull request
- When you want to ensure CI will pass

### Using `act` (Advanced)

For a more accurate GitHub Actions simulation, use [act](https://github.com/nektos/act):

```bash
# Install act (macOS)
brew install act

# Install act (Linux)
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash

# Run the test workflow
act push --workflows .github/workflows/playwright.yml

# Run the deploy workflow (test + build + deploy)
act push --workflows .github/workflows/deploy.yml -j test -j build

# Run specific job
act -j test
```

**Note:** `act` requires Docker to be running.

### Quick CI Check (Minimal)

If you just want to verify tests pass quickly:

```bash
npm test
```

To verify the build works:

```bash
npm run build
```

## Troubleshooting

### Script fails with "permission denied"

```bash
chmod +x scripts/validate-ci.sh
```

### Tests fail locally but pass in CI (or vice versa)

- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Playwright cache: `npx playwright install --force`
- Check Node version matches CI (18.x): `node --version`

### Build fails

- Clear Next.js cache: `rm -rf .next`
- Clear build output: `rm -rf out`
- Retry: `npm run build`
