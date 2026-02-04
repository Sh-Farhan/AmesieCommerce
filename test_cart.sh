#!/usr/bin/env bash
set -euo pipefail

BASE="http://localhost:8001"
AUTH="Authorization: Bearer $token"

echo "======================================="
echo "🛒 Testing CART Endpoints (Customer)"
echo "======================================="

# 1️⃣ View current cart (should be empty)
echo -e "\n➡  GET /api/cart"
curl -s -H "$AUTH" "$BASE/api/cart" | jq

# 2️⃣ List products to find one to add
echo -e "\n➡  GET /api/products"
prod_id=$(curl -s "$BASE/api/products" | jq -r '.[0].id // .data[0].id // empty')
if [ -z "$prod_id" ]; then
  echo "❌ No products found. You must seed at least one product before testing cart."
  exit 1
fi
echo "✅ Found product ID: $prod_id"

# 3️⃣ Add product to cart
echo -e "\n➡  POST /api/cart/items"
curl -s -X POST "$BASE/api/cart/items" \
  -H "$AUTH" -H "Content-Type: application/json" \
  -d "{\"product_id\":$prod_id,\"quantity\":1}" | jq

# 4️⃣ View updated cart
echo -e "\n➡  GET /api/cart"
curl -s -H "$AUTH" "$BASE/api/cart" | jq

# 5️⃣ Update quantity
echo -e "\n➡  PUT /api/cart/items/$prod_id"
curl -s -X PUT "$BASE/api/cart/items/$prod_id" \
  -H "$AUTH" -H "Content-Type: application/json" \
  -d '{"quantity":3}' | jq

# 6️⃣ View after update
echo -e "\n➡  GET /api/cart"
curl -s -H "$AUTH" "$BASE/api/cart" | jq

# 7️⃣ Delete item from cart
echo -e "\n➡  DELETE /api/cart/items/$prod_id"
curl -s -X DELETE "$BASE/api/cart/items/$prod_id" -H "$AUTH" | jq

# 8️⃣ Final check
echo -e "\n➡  GET /api/cart (final)"
curl -s -H "$AUTH" "$BASE/api/cart" | jq

echo -e "\n✅ Cart endpoint tests completed.\n"
