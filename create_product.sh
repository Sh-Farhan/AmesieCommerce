BASE="http://localhost:8001"

# 1) Register a TEMP seller
seller="seller$(date +%s)@example.com"
curl -s -X POST "$BASE/api/auth/register/seller" \
  -H "Content-Type: application/json" \
  -d "{\"full_name\":\"Temp Seller\",\"email\":\"$seller\",\"password\":\"Passw0rd!\"}" | jq

# 2) Login as seller (OAuth form, email goes in 'username', scope=seller)
sellertoken=$(
  curl -s -X POST "$BASE/api/auth/login" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "grant_type=password&username=$seller&password=Passw0rd!&scope=seller" \
  | jq -r '.access_token // .token'
)
echo "SELLER TOKEN: ${sellertoken:0:28}..."

# 3) Create a category (capture id)
catresp=$(curl -s -X POST "$BASE/api/products/categories" \
  -H "Authorization: Bearer $sellertoken" \
  -H "Content-Type: application/json" \
  -d '{"name":"Electronics"}')
cat_id=$(echo "$catresp" | jq -r '.id // .data.id // .category.id // 1')
echo "CATEGORY ID: $cat_id"
echo "$catresp" | jq

# 4) Create a product at /api/sellere/products
curl -s -X POST "$BASE/api/sellere/products" \
  -H "Authorization: Bearer $sellertoken" \
  -H "Content-Type: application/json" \
  -d "$(printf '{"name":"Test Laptop","description":"Seed via seller","price":49999,"category_id":%s,"stock":10}' "$cat_id")" | jq

# 5) Confirm it’s visible publicly
curl -s "$BASE/api/products" | jq
