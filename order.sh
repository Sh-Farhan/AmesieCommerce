echo "➡  GET /api/orders"
curl -s -H "$AUTH" "$BASE/api/orders" | jq
