#!/usr/bin/env bash
set -euo pipefail
BASE="http://localhost:8001"
AUTH="Authorization: Bearer ${token:?run login script first to set \$token}"

curl -s "$BASE/api/products" | jq
curl -s "$BASE/api/products/categories" | jq
# add more curls from above…
