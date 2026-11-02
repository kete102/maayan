#!/usr/bin/env bash
set -euo pipefail

tmp_file="lib/database.types.generated.tmp"
trap 'rm -f "$tmp_file"' EXIT

pnpm exec supabase gen types --local --schema public > "$tmp_file"
pnpm exec prettier --parser typescript --write "$tmp_file"
mv "$tmp_file" lib/database.types.ts
