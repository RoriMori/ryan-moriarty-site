#!/bin/bash
# ship.sh — commit, push, and deploy rorimori.com
# Usage: ./ship.sh "your commit message"
# Or just: ./ship.sh  (uses a default message)

set -e  # stop on any error

cd ~/ryan-moriarty-site

MSG="${1:-content update}"

echo "→ pulling latest..."
git pull

echo "→ staging all changes..."
git add -A

echo "→ committing: \"$MSG\""
git commit -m "$MSG" || echo "nothing to commit, continuing..."

echo "→ pushing to GitHub..."
git push

echo "✓ pushed. Vercel is deploying — check vercel.com/dashboard for status."