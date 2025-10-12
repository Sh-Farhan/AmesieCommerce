#!/usr/bin/env bash
set -euo pipefail

# Go to project root (folder where this script lives)
cd "$(dirname "$0")"

# Idempotent symlinks (don’t fail if they exist)
ln -sfn backend/core      core
ln -sfn backend/routers   routers
ln -sfn backend/schemas   schemas
ln -sfn backend/services  services
ln -sfn backend/db        db

# ---- DB env ----
export DB_USER="zaidkhan"
export DB_PASS="StrongPassword123"
export DB_NAME="taskmind_db"
export DB_HOST="localhost"
export DB_PORT="5432"
export DB_SSLMODE="disable"
export DATABASE_URL="postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?sslmode=${DB_SSLMODE}"
echo "🔗 DATABASE_URL=${DATABASE_URL}"

# ---- Python venv (auto-create if missing) ----
VENV_DIR=".venv"
if [[ ! -x "${VENV_DIR}/bin/python" ]]; then
  echo "🧪 Creating virtualenv at ${VENV_DIR}..."
  python3 -m venv "${VENV_DIR}"
  "${VENV_DIR}/bin/pip" install --upgrade pip
  if [[ -f "requirements.txt" ]]; then
    "${VENV_DIR}/bin/pip" install -r requirements.txt
  else
    # minimal deps if requirements.txt missing
    "${VENV_DIR}/bin/pip" install fastapi uvicorn[standard] sqlalchemy psycopg2-binary python-dotenv
  fi
fi

# ---- Run server ----
exec "${VENV_DIR}/bin/python" -m uvicorn backend.main:app --reload --host 0.0.0.0 --port 8010
