#!/usr/bin/env bash
set -e

# Ensure we're in the project root
cd "$(dirname "$0")"

# create symlinks if missing (safe)
[ -e core ]  || ln -s backend/core core
[ -e routers ] || ln -s backend/routers routers
[ -e schemas ] || ln -s backend/schemas schemas
[ -e services ] || ln -s backend/services services
[ -e db ] || ln -s backend/db db

# Postgres connection - adjust port if needed
export DB_URL="postgresql://zaid:zaidpass@localhost:5434/amesie_db"
export DB_SSLMODE=disable
export DATABASE_URL="${DB_URL}?sslmode=disable"

# Use in-project venv python to run uvicorn
./.venv/bin/python -m uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
