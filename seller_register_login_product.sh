#!/usr/bin/env bash
set -euo pipefail

# ================== CONFIG (override via env if you want) ==================
BASE="${BASE:-http://localhost:8000}"

EMAIL="${EMAIL:-new_seller@example.com}"
PASS="${PASS:-StrongPass123}"
FULL_NAME="${FULL_NAME:-New Seller}"
PHONE="${PHONE:-+91-9000000099}"
STORE_NAME="${STORE_NAME:-Fresh Store}"
STORE_ADDR="${STORE_ADDR:-99 Bazaar Street}"
STORE_DESC="${STORE_DESC:-General goods}"

# Product fields (match your API schema)
NAME="${NAME:-Sample Product}"
DESC="${DESC:-A shiny new product}"
PRICE="${PRICE:-999}"                       # number
SKU="${SKU:-SKU-$(date +%y%m%d%H%M%S)-$RANDOM}"
IMAGE_URL="${IMAGE_URL:-http://example.com/product.jpg}"
STOCK_QTY="${STOCK_QTY:-10}"
WEIGHT="${WEIGHT:-1.0}"
LENGTH="${LENGTH:-10}"
WIDTH="${WIDTH:-5}"
HEIGHT="${HEIGHT:-3}"
SHIP_INFO="${SHIP_INFO:-Ships in 2–3 days}"
CATEGORY_ID="${CATEGORY_ID:-1}"
# ===========================================================================

say()  { printf "\n\033[1;36m%s\033[0m\n" "$*"; }
fail() { printf "\n\033[1;31mERROR:\033[0m %s\n" "$*" >&2; exit 1; }

# tiny JSON extractor (no jq)
json_get () { python3 - "$@" <<'PY'
import sys, json
try:
    data=json.load(sys.stdin)
    key=sys.argv[1]
    cur=data
    for part in key.split('.'):
        if isinstance(cur, dict): cur = cur.get(part, {})
        else: cur = {}
    if isinstance(cur, (dict, list)): print("")
    else: print(cur)
except Exception:
    print("")
PY
}

# 1) Register seller (JSON body)
say "Registering seller ${EMAIL}…"
REGISTER_BODY=$(cat <<JSON
{
  "full_name": "$FULL_NAME",
  "email": "$EMAIL",
  "phone_number": "$PHONE",
  "password": "$PASS",
  "store_name": "$STORE_NAME",
  "store_address": "$STORE_ADDR",
  "store_description": "$STORE_DESC",
  "business_license": "",
  "gst_number": "",
  "bank_account_number": "",
  "bank_ifsc_code": ""
}
JSON
)

REG_STATUS=$(curl -sS -o /tmp/reg.out -w "%{http_code}" \
  -X POST "$BASE/api/auth/register/seller" \
  -H "Content-Type: application/json" \
  --data-raw "$REGISTER_BODY" || true)

if [[ "$REG_STATUS" =~ ^20[01]$ ]]; then
  say "Seller registered."
elif [[ "$REG_STATUS" =~ ^40[0-9]$ || "$REG_STATUS" == "422" ]]; then
  say "Registration returned $REG_STATUS (likely email exists). Proceeding to login."
else
  cat /tmp/reg.out
  fail "Unexpected register status: $REG_STATUS"
fi

# 2) Login (FORM DATA: username=<email>&password=<pass>)
say "Logging in seller (form login: username=$EMAIL)…"
LOGIN_RAW=$(curl -sS -X POST "$BASE/api/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=$EMAIL&password=$PASS")

TOKEN=$(printf '%s' "$LOGIN_RAW" | json_get access_token)
if [[ -z "$TOKEN" ]]; then
  echo "$LOGIN_RAW"
  fail "Login failed. No access_token in response."
fi

DOTS=$(echo -n "$TOKEN" | tr -cd '.' | wc -c)
LEN=$(echo -n "$TOKEN" | wc -c)
[[ "$DOTS" -ne 2 || "$LEN" -lt 150 ]] && fail "Token looks wrong (dots=$DOTS, len=$LEN)."

say "Token acquired (len=$LEN)."

# 3) Who am I? fetch seller_id
say "Verifying /api/auth/me…"
ME_RAW=$(curl -sS "$BASE/api/auth/me" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/json")

SELLER_ID=$(printf '%s' "$ME_RAW" | json_get seller_id)
[[ -z "$SELLER_ID" || "$SELLER_ID" == "None" ]] && SELLER_ID=$(printf '%s' "$ME_RAW" | json_get id)
[[ -z "$SELLER_ID" || "$SELLER_ID" == "None" ]] && { echo "$ME_RAW"; fail "Could not determine seller_id from /me."; }
say "Using seller_id=$SELLER_ID"

# 4) Create product (JSON body exactly as your Swagger shows)
say "Creating product \"$NAME\" (SKU: $SKU)…"
PRODUCT_BODY=$(cat <<JSON
{
  "name": "$NAME",
  "description": "$DESC",
  "price": $PRICE,
  "sku": "$SKU",
  "image_url": "$IMAGE_URL",
  "stock_quantity": $STOCK_QTY,
  "weight": $WEIGHT,
  "length": $LENGTH,
  "width": $WIDTH,
  "height": $HEIGHT,
  "shipping_info": "$SHIP_INFO",
  "category_id": $CATEGORY_ID,
  "seller_id": $SELLER_ID,
  "images": []
}
JSON
)

CREATE_STATUS=$(curl -sS -o /tmp/create.body -w "%{http_code}" \
  -X POST "$BASE/api/sellers/products" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  --data-raw "$PRODUCT_BODY")

cat /tmp/create.body
[[ "$CREATE_STATUS" == "201" ]] || fail "Product not created (status $CREATE_STATUS)."

NEW_ID=$(cat /tmp/create.body | json_get id)
say "Success. Created product id: ${NEW_ID:-unknown}"

# 5) Show first page of seller products
say "Listing seller products…"
curl -sS "$BASE/api/sellers/products" -H "Authorization: Bearer $TOKEN" | sed -e 's/},{/},\n{/g' | head -n 20
