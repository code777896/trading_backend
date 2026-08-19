#!/bin/bash
# Comprehensive API test script for Trading Platform
BASE="http://localhost:5454"
TIMESTAMP=$(date +%s)
EMAIL="testuser_${TIMESTAMP}@example.com"

echo "=========================================="
echo "TRADING PLATFORM API TEST SUITE"
echo "=========================================="
echo "Using email: $EMAIL"
echo ""

# ---- TEST 1: Home ----
echo "--- TEST 1: GET / (Home) ---"
RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" "$BASE/")
HTTP_CODE=$(echo "$RESP" | grep "HTTP_CODE" | cut -d: -f2)
BODY=$(echo "$RESP" | sed '/HTTP_CODE/d')
echo "Status: $HTTP_CODE"
echo "Body: $BODY"
echo ""

# ---- TEST 2: Sign Up ----
echo "--- TEST 2: POST /auth/signup (Sign Up) ---"
RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST "$BASE/auth/signup" \
  -H "Content-Type: application/json" \
  -d "{\"fullName\":\"Test User\",\"email\":\"$EMAIL\",\"password\":\"Test@1234\"}")
HTTP_CODE=$(echo "$RESP" | grep "HTTP_CODE" | cut -d: -f2)
BODY=$(echo "$RESP" | sed '/HTTP_CODE/d')
echo "Status: $HTTP_CODE"
echo "Body: $BODY"
JWT=$(echo "$BODY" | python3 -c "import sys,json; print(json.load(sys.stdin).get('jwt',''))" 2>/dev/null)
echo "JWT captured: ${JWT:0:30}..."
echo ""

# ---- TEST 3: Sign In ----
echo "--- TEST 3: POST /auth/signin (Sign In) ---"
RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST "$BASE/auth/signin" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"Test@1234\"}")
HTTP_CODE=$(echo "$RESP" | grep "HTTP_CODE" | cut -d: -f2)
BODY=$(echo "$RESP" | sed '/HTTP_CODE/d')
echo "Status: $HTTP_CODE"
echo "Body: $BODY"
# Update JWT from signin
JWT2=$(echo "$BODY" | python3 -c "import sys,json; print(json.load(sys.stdin).get('jwt',''))" 2>/dev/null)
if [ -n "$JWT2" ]; then JWT="$JWT2"; fi
echo ""

# ---- TEST 4: Verify 2FA OTP (skip - 2FA not enabled) ----
echo "--- TEST 4: POST /auth/two-factor/otp/{otp} (2FA Verify - SKIPPED, 2FA not enabled) ---"
echo "Skipped - requires 2FA to be enabled first"
echo ""

# ---- TEST 5: Get User Profile ----
echo "--- TEST 5: GET /api/users/profile (User Profile) ---"
RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" "$BASE/api/users/profile" \
  -H "Authorization: Bearer $JWT")
HTTP_CODE=$(echo "$RESP" | grep "HTTP_CODE" | cut -d: -f2)
BODY=$(echo "$RESP" | sed '/HTTP_CODE/d')
echo "Status: $HTTP_CODE"
echo "Body: $BODY"
USER_ID=$(echo "$BODY" | python3 -c "import sys,json; print(json.load(sys.stdin).get('id',''))" 2>/dev/null)
echo "User ID: $USER_ID"
echo ""

# ---- TEST 6: Send Verification OTP ----
echo "--- TEST 6: POST /api/users/verification/EMAIL/sentOtp ---"
RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST "$BASE/api/users/verification/EMAIL/sentOtp" \
  -H "Authorization: Bearer $JWT")
HTTP_CODE=$(echo "$RESP" | grep "HTTP_CODE" | cut -d: -f2)
BODY=$(echo "$RESP" | sed '/HTTP_CODE/d')
echo "Status: $HTTP_CODE"
echo "Body: $BODY"
echo ""

# ---- TEST 7: Enable 2FA (skip - requires real OTP) ----
echo "--- TEST 7: PATCH /api/users/enable-two-factor/verify-otp/{otp} (SKIPPED - requires real OTP) ---"
echo "Skipped - requires OTP from email"
echo ""

# ---- TEST 8: Forgot Password Send OTP ----
echo "--- TEST 8: POST /auth/users/reset-password/sentOtp ---"
RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST "$BASE/auth/users/reset-password/sentOtp" \
  -H "Content-Type: application/json" \
  -d "{\"sendTo\":\"$EMAIL\",\"verificationType\":\"EMAIL\"}")
HTTP_CODE=$(echo "$RESP" | grep "HTTP_CODE" | cut -d: -f2)
BODY=$(echo "$RESP" | sed '/HTTP_CODE/d')
echo "Status: $HTTP_CODE"
echo "Body: $BODY"
echo ""

# ---- TEST 9: Reset Password Verify OTP (skip - requires real OTP) ----
echo "--- TEST 9: PATCH /auth/users/reset-password/verify-otp (SKIPPED - requires real OTP & token) ---"
echo "Skipped - requires OTP from email"
echo ""

# ---- TEST 10: Get Coin List ----
echo "--- TEST 10: GET /coins?page=1 (Coin List) ---"
RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" "$BASE/coins?page=1")
HTTP_CODE=$(echo "$RESP" | grep "HTTP_CODE" | cut -d: -f2)
BODY=$(echo "$RESP" | sed '/HTTP_CODE/d')
echo "Status: $HTTP_CODE"
echo "Body (first 500 chars): ${BODY:0:500}"
echo ""

# ---- TEST 11: Get Coin Market Chart ----
echo "--- TEST 11: GET /coins/bitcoin/chart?days=7 (Market Chart) ---"
RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" "$BASE/coins/bitcoin/chart?days=7")
HTTP_CODE=$(echo "$RESP" | grep "HTTP_CODE" | cut -d: -f2)
BODY=$(echo "$RESP" | sed '/HTTP_CODE/d')
echo "Status: $HTTP_CODE"
echo "Body (first 500 chars): ${BODY:0:500}"
echo ""

# ---- TEST 12: Search Coin ----
echo "--- TEST 12: GET /coins/search?q=bitcoin (Search) ---"
RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" "$BASE/coins/search?q=bitcoin")
HTTP_CODE=$(echo "$RESP" | grep "HTTP_CODE" | cut -d: -f2)
BODY=$(echo "$RESP" | sed '/HTTP_CODE/d')
echo "Status: $HTTP_CODE"
echo "Body (first 500 chars): ${BODY:0:500}"
echo ""

# ---- TEST 13: Get Top 50 Coins ----
echo "--- TEST 13: GET /coins/top50 (Top 50) ---"
RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" "$BASE/coins/top50")
HTTP_CODE=$(echo "$RESP" | grep "HTTP_CODE" | cut -d: -f2)
BODY=$(echo "$RESP" | sed '/HTTP_CODE/d')
echo "Status: $HTTP_CODE"
echo "Body (first 500 chars): ${BODY:0:500}"
echo ""

# ---- TEST 14: Get Trading Coins ----
echo "--- TEST 14: GET /coins/trading (Trading Coins) ---"
RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" "$BASE/coins/trading")
HTTP_CODE=$(echo "$RESP" | grep "HTTP_CODE" | cut -d: -f2)
BODY=$(echo "$RESP" | sed '/HTTP_CODE/d')
echo "Status: $HTTP_CODE"
echo "Body (first 500 chars): ${BODY:0:500}"
echo ""

# ---- TEST 15: Get Coin Details ----
echo "--- TEST 15: GET /coins/details/bitcoin (Coin Details) ---"
RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" "$BASE/coins/details/bitcoin")
HTTP_CODE=$(echo "$RESP" | grep "HTTP_CODE" | cut -d: -f2)
BODY=$(echo "$RESP" | sed '/HTTP_CODE/d')
echo "Status: $HTTP_CODE"
echo "Body (first 500 chars): ${BODY:0:500}"
echo ""

# ---- TEST 16: Create/Place Order ----
echo "--- TEST 16: POST /api/orders/pay (Create Order) ---"
RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST "$BASE/api/orders/pay" \
  -H "Authorization: Bearer $JWT" \
  -H "Content-Type: application/json" \
  -d "{\"coinId\":\"bitcoin\",\"quantity\":0.5,\"orderType\":\"BUY\"}")
HTTP_CODE=$(echo "$RESP" | grep "HTTP_CODE" | cut -d: -f2)
BODY=$(echo "$RESP" | sed '/HTTP_CODE/d')
echo "Status: $HTTP_CODE"
echo "Body: $BODY"
ORDER_ID=$(echo "$BODY" | python3 -c "import sys,json; print(json.load(sys.stdin).get('id',''))" 2>/dev/null)
echo "Order ID: $ORDER_ID"
echo ""

# ---- TEST 17: Get Order by ID ----
echo "--- TEST 17: GET /api/orders/{orderId} (Order by ID) ---"
if [ -n "$ORDER_ID" ]; then
  RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" "$BASE/api/orders/$ORDER_ID" \
    -H "Authorization: Bearer $JWT")
  HTTP_CODE=$(echo "$RESP" | grep "HTTP_CODE" | cut -d: -f2)
  BODY=$(echo "$RESP" | sed '/HTTP_CODE/d')
  echo "Status: $HTTP_CODE"
  echo "Body: $BODY"
else
  echo "Skipped - No order ID from previous test"
fi
echo ""

# ---- TEST 18: Get All Orders ----
echo "--- TEST 18: GET /api/orders (All Orders) ---"
RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" "$BASE/api/orders" \
  -H "Authorization: Bearer $JWT")
HTTP_CODE=$(echo "$RESP" | grep "HTTP_CODE" | cut -d: -f2)
BODY=$(echo "$RESP" | sed '/HTTP_CODE/d')
echo "Status: $HTTP_CODE"
echo "Body: $BODY"
echo ""

# ---- TEST 19: Get Wallet ----
echo "--- TEST 19: GET /api/wallet (User Wallet) ---"
RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" "$BASE/api/wallet" \
  -H "Authorization: Bearer $JWT")
HTTP_CODE=$(echo "$RESP" | grep "HTTP_CODE" | cut -d: -f2)
BODY=$(echo "$RESP" | sed '/HTTP_CODE/d')
echo "Status: $HTTP_CODE"
echo "Body: $BODY"
WALLET_ID=$(echo "$BODY" | python3 -c "import sys,json; print(json.load(sys.stdin).get('id',''))" 2>/dev/null)
echo "Wallet ID: $WALLET_ID"
echo ""

# ---- TEST 20: Wallet to Wallet Transfer ----
echo "--- TEST 20: PUT /api/wallet/{walletId}/transfer (Wallet Transfer) ---"
if [ -n "$WALLET_ID" ]; then
  RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X PUT "$BASE/api/wallet/$WALLET_ID/transfer" \
    -H "Authorization: Bearer $JWT" \
    -H "Content-Type: application/json" \
    -d "{\"amount\":500}")
  HTTP_CODE=$(echo "$RESP" | grep "HTTP_CODE" | cut -d: -f2)
  BODY=$(echo "$RESP" | sed '/HTTP_CODE/d')
  echo "Status: $HTTP_CODE"
  echo "Body: $BODY"
else
  echo "Skipped - No wallet ID"
fi
echo ""

# ---- TEST 21: Pay Order from Wallet ----
echo "--- TEST 21: PUT /api/wallet/order/{orderId}/pay (Pay Order) ---"
if [ -n "$ORDER_ID" ]; then
  RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X PUT "$BASE/api/wallet/order/$ORDER_ID/pay" \
    -H "Authorization: Bearer $JWT")
  HTTP_CODE=$(echo "$RESP" | grep "HTTP_CODE" | cut -d: -f2)
  BODY=$(echo "$RESP" | sed '/HTTP_CODE/d')
  echo "Status: $HTTP_CODE"
  echo "Body: $BODY"
else
  echo "Skipped - No order ID"
fi
echo ""

# ---- TEST 22: Deposit to Wallet ----
echo "--- TEST 22: PUT /api/wallet/deposite (Deposit) ---"
RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X PUT "$BASE/api/wallet/deposite?order_id=1&payment_id=pay_test123" \
  -H "Authorization: Bearer $JWT")
HTTP_CODE=$(echo "$RESP" | grep "HTTP_CODE" | cut -d: -f2)
BODY=$(echo "$RESP" | sed '/HTTP_CODE/d')
echo "Status: $HTTP_CODE"
echo "Body: $BODY"
echo ""

# ---- TEST 23: Create Payment Order ----
echo "--- TEST 23: POST /api/api/payment/RAZORPAY/amount/5000 (Create Payment) ---"
RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST "$BASE/api/api/payment/RAZORPAY/amount/5000" \
  -H "Authorization: Bearer $JWT")
HTTP_CODE=$(echo "$RESP" | grep "HTTP_CODE" | cut -d: -f2)
BODY=$(echo "$RESP" | sed '/HTTP_CODE/d')
echo "Status: $HTTP_CODE"
echo "Body: $BODY"
echo ""

# ---- TEST 24: Add Payment Details ----
echo "--- TEST 24: POST /api/payment-details (Add Payment Details) ---"
RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST "$BASE/api/payment-details" \
  -H "Authorization: Bearer $JWT" \
  -H "Content-Type: application/json" \
  -d "{\"accountNumber\":\"1234567890\",\"accountHolderName\":\"Test User\",\"ifsc\":\"SBIN0001234\",\"bankName\":\"State Bank of India\"}")
HTTP_CODE=$(echo "$RESP" | grep "HTTP_CODE" | cut -d: -f2)
BODY=$(echo "$RESP" | sed '/HTTP_CODE/d')
echo "Status: $HTTP_CODE"
echo "Body: $BODY"
echo ""

# ---- TEST 25: Get Payment Details ----
echo "--- TEST 25: GET /api/payment-details (Get Payment Details) ---"
RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" "$BASE/api/payment-details" \
  -H "Authorization: Bearer $JWT")
HTTP_CODE=$(echo "$RESP" | grep "HTTP_CODE" | cut -d: -f2)
BODY=$(echo "$RESP" | sed '/HTTP_CODE/d')
echo "Status: $HTTP_CODE"
echo "Body: $BODY"
echo ""

# ---- TEST 26: Get User Assets ----
echo "--- TEST 26: GET /api/asset (User Assets) ---"
RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" "$BASE/api/asset" \
  -H "Authorization: Bearer $JWT")
HTTP_CODE=$(echo "$RESP" | grep "HTTP_CODE" | cut -d: -f2)
BODY=$(echo "$RESP" | sed '/HTTP_CODE/d')
echo "Status: $HTTP_CODE"
echo "Body: $BODY"
ASSET_ID=$(echo "$BODY" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d[0].get('id','') if isinstance(d,list) and len(d)>0 else '')" 2>/dev/null)
echo "Asset ID: $ASSET_ID"
echo ""

# ---- TEST 27: Get Asset by ID ----
echo "--- TEST 27: GET /api/asset/{assetId} (Asset by ID) ---"
if [ -n "$ASSET_ID" ]; then
  RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" "$BASE/api/asset/$ASSET_ID")
  HTTP_CODE=$(echo "$RESP" | grep "HTTP_CODE" | cut -d: -f2)
  BODY=$(echo "$RESP" | sed '/HTTP_CODE/d')
  echo "Status: $HTTP_CODE"
  echo "Body: $BODY"
else
  echo "Skipped - No asset ID from previous test"
fi
echo ""

# ---- TEST 28: Get Asset by Coin ID and User ----
echo "--- TEST 28: GET /api/asset/coin/bitcoin/user (Asset by Coin & User) ---"
RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" "$BASE/api/asset/coin/bitcoin/user" \
  -H "Authorization: Bearer $JWT")
HTTP_CODE=$(echo "$RESP" | grep "HTTP_CODE" | cut -d: -f2)
BODY=$(echo "$RESP" | sed '/HTTP_CODE/d')
echo "Status: $HTTP_CODE"
echo "Body: $BODY"
echo ""

# ---- TEST 29: Get User Watchlist ----
echo "--- TEST 29: GET /api/watchlist/user (User Watchlist) ---"
RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" "$BASE/api/watchlist/user" \
  -H "Authorization: Bearer $JWT")
HTTP_CODE=$(echo "$RESP" | grep "HTTP_CODE" | cut -d: -f2)
BODY=$(echo "$RESP" | sed '/HTTP_CODE/d')
echo "Status: $HTTP_CODE"
echo "Body: $BODY"
WATCHLIST_ID=$(echo "$BODY" | python3 -c "import sys,json; print(json.load(sys.stdin).get('id',''))" 2>/dev/null)
echo "Watchlist ID: $WATCHLIST_ID"
echo ""

# ---- TEST 30: Get Watchlist by ID ----
echo "--- TEST 30: GET /api/watchlist/{watchlistId} (Watchlist by ID) ---"
if [ -n "$WATCHLIST_ID" ]; then
  RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" "$BASE/api/watchlist/$WATCHLIST_ID")
  HTTP_CODE=$(echo "$RESP" | grep "HTTP_CODE" | cut -d: -f2)
  BODY=$(echo "$RESP" | sed '/HTTP_CODE/d')
  echo "Status: $HTTP_CODE"
  echo "Body: $BODY"
else
  echo "Skipped - No watchlist ID"
fi
echo ""

# ---- TEST 31: Add Coin to Watchlist ----
echo "--- TEST 31: PATCH /api/watchlist/add/coin/bitcoin (Add to Watchlist) ---"
RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X PATCH "$BASE/api/watchlist/add/coin/bitcoin" \
  -H "Authorization: Bearer $JWT")
HTTP_CODE=$(echo "$RESP" | grep "HTTP_CODE" | cut -d: -f2)
BODY=$(echo "$RESP" | sed '/HTTP_CODE/d')
echo "Status: $HTTP_CODE"
echo "Body: $BODY"
echo ""

# ---- TEST 32: Request Withdrawal ----
echo "--- TEST 32: POST /api/withdrawal/1000 (Request Withdrawal) ---"
RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST "$BASE/api/withdrawal/1000" \
  -H "Authorization: Bearer $JWT")
HTTP_CODE=$(echo "$RESP" | grep "HTTP_CODE" | cut -d: -f2)
BODY=$(echo "$RESP" | sed '/HTTP_CODE/d')
echo "Status: $HTTP_CODE"
echo "Body: $BODY"
WITHDRAWAL_ID=$(echo "$BODY" | python3 -c "import sys,json; print(json.load(sys.stdin).get('id',''))" 2>/dev/null)
echo "Withdrawal ID: $WITHDRAWAL_ID"
echo ""

# ---- TEST 33: Get Withdrawal History ----
echo "--- TEST 33: GET /api/withdrawal (Withdrawal History) ---"
RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" "$BASE/api/withdrawal" \
  -H "Authorization: Bearer $JWT")
HTTP_CODE=$(echo "$RESP" | grep "HTTP_CODE" | cut -d: -f2)
BODY=$(echo "$RESP" | sed '/HTTP_CODE/d')
echo "Status: $HTTP_CODE"
echo "Body: $BODY"
echo ""

# ---- TEST 34: Admin Approve Withdrawal ----
echo "--- TEST 34: PATCH /api/admin/withdrawal/{id}/proceed/true (Admin Approve) ---"
if [ -n "$WITHDRAWAL_ID" ]; then
  RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X PATCH "$BASE/api/admin/withdrawal/$WITHDRAWAL_ID/proceed/true" \
    -H "Authorization: Bearer $JWT")
  HTTP_CODE=$(echo "$RESP" | grep "HTTP_CODE" | cut -d: -f2)
  BODY=$(echo "$RESP" | sed '/HTTP_CODE/d')
  echo "Status: $HTTP_CODE"
  echo "Body: $BODY"
else
  echo "Skipped - No withdrawal ID"
fi
echo ""

# ---- TEST 35: Admin Get All Withdrawals ----
echo "--- TEST 35: GET /api/admin/withdrawal (Admin All Withdrawals) ---"
RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" "$BASE/api/admin/withdrawal" \
  -H "Authorization: Bearer $JWT")
HTTP_CODE=$(echo "$RESP" | grep "HTTP_CODE" | cut -d: -f2)
BODY=$(echo "$RESP" | sed '/HTTP_CODE/d')
echo "Status: $HTTP_CODE"
echo "Body: $BODY"
echo ""

# ---- TEST: Duplicate Sign Up ----
echo "--- BONUS TEST: POST /auth/signup (Duplicate Email) ---"
RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST "$BASE/auth/signup" \
  -H "Content-Type: application/json" \
  -d "{\"fullName\":\"Test User\",\"email\":\"$EMAIL\",\"password\":\"Test@1234\"}")
HTTP_CODE=$(echo "$RESP" | grep "HTTP_CODE" | cut -d: -f2)
BODY=$(echo "$RESP" | sed '/HTTP_CODE/d')
echo "Status: $HTTP_CODE"
echo "Body: $BODY"
echo ""

# ---- TEST: Sign In with wrong password ----
echo "--- BONUS TEST: POST /auth/signin (Wrong Password) ---"
RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST "$BASE/auth/signin" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"WrongPassword\"}")
HTTP_CODE=$(echo "$RESP" | grep "HTTP_CODE" | cut -d: -f2)
BODY=$(echo "$RESP" | sed '/HTTP_CODE/d')
echo "Status: $HTTP_CODE"
echo "Body: $BODY"
echo ""

# ---- TEST: Unauthorized access ----
echo "--- BONUS TEST: GET /api/users/profile (No JWT) ---"
RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" "$BASE/api/users/profile")
HTTP_CODE=$(echo "$RESP" | grep "HTTP_CODE" | cut -d: -f2)
BODY=$(echo "$RESP" | sed '/HTTP_CODE/d')
echo "Status: $HTTP_CODE"
echo "Body: $BODY"
echo ""

echo "=========================================="
echo "TEST SUITE COMPLETE"
echo "=========================================="
