#!/bin/bash

# ─────────────────────────────────────────────
# 🔧 SELLER CONFIGURATION
# ─────────────────────────────────────────────
SELLER_EMAIL="zaidauto@example.com"
SELLER_PASSWORD="zaidpass"
SELLER_NAME="Zaid Auto"
SELLER_PHONE="9876543210"

# ─────────────────────────────────────────────
# 📦 PRODUCT CONFIGURATION
# ─────────────────────────────────────────────
PRODUCT_NAME="Smart Watch"
PRODUCT_DESC="Tracks your steps and your thoughts 🧠"
PRODUCT_PRICE=2999
PRODUCT_STOCK=20

# ─────────────────────────────────────────────
# 📍 BASE URL
# ─────────────────────────────────────────────
BASE_URL="http://localhost:8000"

echo ""
echo "📨 Registering seller: $SELLER_EMAIL"

# ──────────────── REGISTER SELLER ────────────────
curl -s -X POST "$BASE_URL/api/auth/register" \
-H "Content-Type: application/json" \
-d '{
  "email": "'$SELLER_EMAIL'",
  "password": "'$SELLER_PASSWORD'",
  "full_name": "'$SELLER_NAME'",
  "phone_number": "'$SELLER_PHONE'"
}' | grep -q "Email already registered" && echo "⚠ Seller likely exists. Skipping registration."

# ──────────────── LOGIN ────────────────
echo ""
echo "🔐 Logging in..."
TOKEN=$(curl -s -X POST "$BASE_URL/api/auth/login" \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "grant_type=password&username=$SELLER_EMAIL&password=$SELLER_PASSWORD" | jq -r '.access_token')

if [[ "$TOKEN" == "null" || -z "$TOKEN" ]]; then
  echo "❌ Login failed: Incorrect email or password"
  exit 1
fi

echo "✅ Login success. Token acquired."

# ──────────────── CREATE PRODUCT ────────────────
echo ""
echo "🛒 Creating product: $PRODUCT_NAME"
curl -s -X POST "$BASE_URL/api/products/" \
-H "Authorization: Bearer $TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "name": "'$PRODUCT_NAME'",
  "description": "'$PRODUCT_DESC'",
  "price": '$PRODUCT_PRICE',
  "stock": '$PRODUCT_STOCK'
}' | jq

echo ""
echo "✅ Done. Seller registered, logged in, product created."
