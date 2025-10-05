email="zaid$(date +%s)@example.com" && \
curl -s -X POST http://localhost:8001/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"full_name\":\"Zaid Test\",\"email\":\"$email\",\"password\":\"Passw0rd!\"}" | jq && \
token=$(curl -s -X POST http://localhost:8001/api/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=password&username=$email&password=Passw0rd!&scope=customer" | jq -r '.access_token // .token') && \
echo "Access Token: $token" && \
curl -s -H "Authorization: Bearer $token" http://localhost:8001/api/auth/me | jq
