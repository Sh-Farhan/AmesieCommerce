import os
import requests
import streamlit as st

# ---------- CONFIG ----------
BACKEND_BASE = os.getenv("AMESIE_API", "http://localhost:8010")
API_PREFIX   = "/api"                  # your backend prefix
AUTH_PREFIX  = f"{API_PREFIX}/auth"    # /api/auth

ENDPOINTS = {
    "register": f"{BACKEND_BASE}{AUTH_PREFIX}/register",
    "register_seller": f"{BACKEND_BASE}{AUTH_PREFIX}/register/seller",
    "login": f"{BACKEND_BASE}{AUTH_PREFIX}/login",
    "me": f"{BACKEND_BASE}{AUTH_PREFIX}/me",
}

# ---------- STREAMLIT SETUP ----------
st.set_page_config(page_title="Amesie Commerce", page_icon="🛒", layout="centered")
st.title("🛒 Amesie Commerce Portal")

# session token
if "token" not in st.session_state:
    st.session_state.token = None

def auth_headers():
    return {"Authorization": f"Bearer {st.session_state.token}"} if st.session_state.token else {}

# ---------------- REGISTER USER ----------------
st.subheader("👤 Register User")
full_name = st.text_input("Full Name")
email = st.text_input("Email")
password = st.text_input("Password", type="password")

if st.button("Register User"):
    if not (full_name and email and password):
        st.warning("Please fill all fields.")
    else:
        payload = {"full_name": full_name, "email": email, "password": password}
        try:
            resp = requests.post(ENDPOINTS["register"], json=payload, timeout=15)
            if resp.ok:
                st.success("✅ User registered successfully!")
            else:
                st.error(f"❌ {resp.text}")
        except Exception as e:
            st.error(f"Error: {e}")

st.divider()

# ---------------- LOGIN ----------------
st.subheader("🔐 Login")
login_email = st.text_input("Login Email")
login_pass  = st.text_input("Login Password", type="password")

if st.button("Login"):
    if not (login_email and login_pass):
        st.warning("Enter both email and password.")
    else:
        payload = {"username": login_email, "password": login_pass}
        try:
            resp = requests.post(ENDPOINTS["login"], data=payload, timeout=15)
            if resp.ok:
                st.session_state.token = resp.json().get("access_token")
                st.success("✅ Logged in successfully!")
            else:
                st.error(f"❌ {resp.text}")
        except Exception as e:
            st.error(f"Error: {e}")

if not st.session_state.token:
    st.stop()

st.divider()
# ---------------- PRODUCTS ----------------
st.header("🛍 Products")

col1, col2, col3 = st.columns(3)
with col1:
    name = st.text_input("Product Name")
with col2:
    price = st.number_input("Price", min_value=0.0, step=0.01)
with col3:
    stock = st.number_input("Stock", min_value=0, step=1)

if st.button("Add Product"):
    payload = {"name": name, "price": price, "stock": stock}
    resp = requests.post(f"{BACKEND_BASE}/api/products", json=payload, headers=auth_headers())
    st.success("✅ Product added") if resp.ok else st.error(resp.text)

if st.button("View All Products"):
    resp = requests.get(f"{BACKEND_BASE}/api/products", headers=auth_headers())
    if resp.ok:
        st.dataframe(resp.json(), use_container_width=True)
    else:
        st.error(resp.text)

st.divider()

# ---------------- CART ----------------
st.header("🛒 Cart")

cart_action = st.radio("Select action", ["View Cart", "Add to Cart", "Remove from Cart"])

if cart_action == "View Cart":
    resp = requests.get(f"{BACKEND_BASE}/api/cart", headers=auth_headers())
    st.dataframe(resp.json()) if resp.ok else st.error(resp.text)

elif cart_action == "Add to Cart":
    pid = st.text_input("Product ID to add")
    qty = st.number_input("Quantity", min_value=1, step=1)
    if st.button("Add"):
        payload = {"product_id": pid, "quantity": qty}
        resp = requests.post(f"{BACKEND_BASE}/api/cart", json=payload, headers=auth_headers())
        st.success("✅ Added") if resp.ok else st.error(resp.text)

elif cart_action == "Remove from Cart":
    pid = st.text_input("Product ID to remove")
    if st.button("Remove"):
        resp = requests.delete(f"{BACKEND_BASE}/api/cart/{pid}", headers=auth_headers())
        st.success("✅ Removed") if resp.ok else st.error(resp.text)

st.divider()

# ---------------- ORDERS ----------------
st.header("📦 Orders")

order_action = st.radio("Select order action", ["View Orders", "Place Order"])
if order_action == "View Orders":
    resp = requests.get(f"{BACKEND_BASE}/api/orders", headers=auth_headers())
    st.dataframe(resp.json()) if resp.ok else st.error(resp.text)
elif order_action == "Place Order":
    if st.button("Confirm Order"):
        resp = requests.post(f"{BACKEND_BASE}/api/orders", headers=auth_headers())
        st.success("✅ Order placed") if resp.ok else st.error(resp.text)

st.divider()
# ---------------- PROFILE ----------------
st.subheader("🙋 Your Profile Info")
try:
    resp = requests.get(ENDPOINTS["me"], headers=auth_headers(), timeout=15)
    if resp.ok:
        st.json(resp.json())
    else:
        st.error(f"❌ {resp.text}")
except Exception as e:
    st.error(f"Error: {e}")

# ---------------- LOGOUT ----------------
st.sidebar.header("Session")
if st.sidebar.button("Logout"):
    st.session_state.token = None
    st.experimental_rerun()

st.caption("Frontend connected to /api/auth routes successfully.")
