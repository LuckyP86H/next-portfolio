#!/bin/bash

#
# Local CI Validation Script
# Mimics the GitHub Actions workflow to validate changes before pushing
#

set -e  # Exit on error

echo "=================================================="
echo "🚀 Local CI Validation (mimics GitHub Actions)"
echo "=================================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print step
print_step() {
    echo ""
    echo -e "${YELLOW}▶ $1${NC}"
    echo "--------------------------------------------------"
}

# Function to print success
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

# Function to print error
print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Must be run from repository root"
    exit 1
fi

# Step 1: Install dependencies
print_step "Step 1: Install dependencies (npm ci)"
npm ci

print_success "Dependencies installed"

# Step 2: Install Playwright browsers
print_step "Step 2: Install Playwright browsers"
npx playwright install --with-deps

print_success "Playwright browsers installed"

# Step 3: Run tests
print_step "Step 3: Run Playwright tests (npm test)"
if npm test; then
    print_success "All tests passed!"
else
    print_error "Tests failed - deployment would be blocked"
    exit 1
fi

# Step 4: Build the application
print_step "Step 4: Build Next.js application (npm run build)"
if npm run build; then
    print_success "Build successful!"
else
    print_error "Build failed - deployment would be blocked"
    exit 1
fi

# Step 5: Check build output
print_step "Step 5: Verify build output"
if [ -d "out" ]; then
    FILE_COUNT=$(find out -type f | wc -l | tr -d ' ')
    print_success "Build output exists: $FILE_COUNT files in ./out"
else
    print_error "Build output directory ./out not found"
    exit 1
fi

# Final summary
echo ""
echo "=================================================="
echo -e "${GREEN}✓ All CI checks passed!${NC}"
echo "=================================================="
echo ""
echo "Your changes are ready to push. The GitHub Actions"
echo "workflow will follow the same steps:"
echo "  1. Run tests (must pass)"
echo "  2. Build application (must succeed)"
echo "  3. Deploy to GitHub Pages (if on main branch)"
echo ""
