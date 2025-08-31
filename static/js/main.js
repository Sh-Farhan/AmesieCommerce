// Global variables
let authToken = localStorage.getItem('authToken');
let currentUser = null;
let cart = [];
let wishlist = [];

// API Base URL
const API_BASE = '/api';

// Utility functions
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} fade-in`;
    alertDiv.textContent = message;
    
    // Insert at the top of the page
    const container = document.querySelector('.container') || document.body;
    container.insertBefore(alertDiv, container.firstChild);
    
    // Remove after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

function showSpinner() {
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    spinner.id = 'loading-spinner';
    document.body.appendChild(spinner);
}

function hideSpinner() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.remove();
    }
}

// API helper functions
async function apiCall(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    if (authToken) {
        defaultOptions.headers['Authorization'] = `Bearer ${authToken}`;
    }
    
    const response = await fetch(url, {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers,
        },
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'An error occurred');
    }
    
    return response.json();
}

// Authentication functions
async function login(email, password) {
    try {
        showSpinner();
        const formData = new FormData();
        formData.append('username', email);
        formData.append('password', password);
        
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            body: formData,
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Login failed');
        }
        
        const data = await response.json();
        authToken = data.access_token;
        localStorage.setItem('authToken', authToken);
        
        await loadCurrentUser();
        showAlert('Login successful!', 'success');
        
        // Redirect based on user role
        if (currentUser.role === 'SELLER') {
            window.location.href = '/seller/dashboard';
        } else if (currentUser.role === 'ADMIN') {
            window.location.href = '/admin/dashboard';
        } else {
            window.location.href = '/';
        }
        
    } catch (error) {
        showAlert(error.message, 'error');
    } finally {
        hideSpinner();
    }
}

async function register(userData) {
    try {
        showSpinner();
        const response = await apiCall('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
        
        showAlert('Registration successful! Please log in.', 'success');
        window.location.href = '/customer/login';
        
    } catch (error) {
        showAlert(error.message, 'error');
    } finally {
        hideSpinner();
    }
}

async function logout() {
    authToken = null;
    localStorage.removeItem('authToken');
    currentUser = null;
    cart = [];
    wishlist = [];
    showAlert('Logged out successfully', 'info');
    window.location.href = '/login';
}

async function loadCurrentUser() {
    if (!authToken) return null;
    
    try {
        currentUser = await apiCall('/auth/me');
        updateNavigation();
        return currentUser;
    } catch (error) {
        console.error('Failed to load user:', error);
        logout();
        return null;
    }
}

// Navigation functions
function updateNavigation() {
    const authDropdown = document.getElementById('auth-dropdown');
    const userDropdown = document.getElementById('userDropdown');
    const logoutLink = document.getElementById('logout-link');
    const cartLink = document.getElementById('cart-link');
    
    if (currentUser) {
        if (authDropdown) authDropdown.style.display = 'none';
        if (userDropdown) userDropdown.style.display = 'block';
        if (logoutLink) logoutLink.style.display = 'none'; // Hide standalone logout
        if (cartLink) cartLink.style.display = 'block';
        
        // Update user name in dropdown
        const userName = document.getElementById('userName');
        if (userName) {
            userName.textContent = currentUser.full_name || currentUser.email;
        }
        
        // Show/hide role-specific menu items
        const customerMenuItems = document.querySelectorAll('.customer-menu');
        const sellerMenuItems = document.querySelectorAll('.seller-menu');
        const adminMenuItems = document.querySelectorAll('.admin-menu');
        
        // Hide all role-specific menus first
        customerMenuItems.forEach(item => item.style.display = 'none');
        sellerMenuItems.forEach(item => item.style.display = 'none');
        adminMenuItems.forEach(item => item.style.display = 'none');
        
        // Show appropriate menu based on user role
        if (currentUser.role === 'CUSTOMER') {
            customerMenuItems.forEach(item => item.style.display = 'block');
        } else if (currentUser.role === 'SELLER') {
            sellerMenuItems.forEach(item => item.style.display = 'block');
        } else if (currentUser.role === 'ADMIN') {
            adminMenuItems.forEach(item => item.style.display = 'block');
            // Admins can also see customer features
            customerMenuItems.forEach(item => item.style.display = 'block');
        }
    } else {
        if (authDropdown) authDropdown.style.display = 'block';
        if (userDropdown) userDropdown.style.display = 'none';
        if (logoutLink) logoutLink.style.display = 'none';
        if (cartLink) cartLink.style.display = 'none';
    }
}

// Product functions
async function loadProducts(filters = {}) {
    try {
        showSpinner();
        const params = new URLSearchParams(filters);
        const products = await apiCall(`/products?${params}`);
        displayProducts(products);
    } catch (error) {
        showAlert('Failed to load products', 'error');
    } finally {
        hideSpinner();
    }
}

async function loadCategories() {
    try {
        const categories = await apiCall('/products/categories');
        displayCategories(categories);
    } catch (error) {
        console.error('Failed to load categories:', error);
    }
}

function displayProducts(products) {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    if (products.length === 0) {
        container.innerHTML = '<div class="text-center"><h3>No products found</h3></div>';
        return;
    }
    
    container.innerHTML = products.map(product => `
        <div class="product-card fade-in">
            <button class="wishlist-btn" onclick="toggleWishlist(${product.id})" ${!currentUser ? 'style="display: none;"' : ''}>
                <i class="fas fa-heart"></i>
            </button>
            <img src="${product.image_url || 'https://via.placeholder.com/300x250'}" 
                 alt="${product.name}" class="product-image">
            <div class="product-info">
                <h5 class="product-title">${product.name}</h5>
                <p class="text-muted">${product.description || ''}</p>
                ${product.seller ? `
                    <div class="seller-info mb-2">
                        <small class="text-muted">
                            <i class="fas fa-store me-1"></i>
                            Sold by: <strong>${product.seller.store_name}</strong>
                            <span class="text-warning ms-2">
                                ${'★'.repeat(Math.round(product.seller.rating))}${'☆'.repeat(5 - Math.round(product.seller.rating))}
                                (${product.seller.rating.toFixed(1)})
                            </span>
                        </small>
                    </div>
                ` : ''}
                <div class="product-price">₹${product.price}</div>
                <div class="d-flex gap-2">
                    <button class="btn btn-primary flex-fill" onclick="addToCart(${product.id})" ${!currentUser ? 'disabled' : ''}>
                        ${!currentUser ? 'Login to Add to Cart' : 'Add to Cart'}
                    </button>
                    ${product.seller ? `
                        <button class="btn btn-outline-info btn-sm" onclick="viewStore(${product.seller.id})" title="View Store">
                            <i class="fas fa-store"></i>
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function displayCategories(categories) {
    const container = document.getElementById('categories-container');
    if (!container) return;
    
    container.innerHTML = `
        <button class="category-btn active" onclick="filterByCategory(null)">All</button>
        ${categories.map(category => `
            <button class="category-btn" onclick="filterByCategory(${category.id})">${category.name}</button>
        `).join('')}
    `;
}

function filterByCategory(categoryId) {
    // Update active category button
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const filters = {};
    if (categoryId) {
        filters.category_id = categoryId;
    }
    
    loadProducts(filters);
}

function searchProducts() {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.trim();
    
    const filters = {};
    if (searchTerm) {
        filters.search = searchTerm;
    }
    
    loadProducts(filters);
}

// Cart functions
async function loadCart() {
    if (!currentUser) return;
    
    try {
        cart = await apiCall('/cart');
        updateCartDisplay();
        updateCartCount();
    } catch (error) {
        console.error('Failed to load cart:', error);
    }
}

async function addToCart(productId, quantity = 1) {
    if (!currentUser) {
        showAlert('Please log in to add items to cart', 'error');
        return;
    }
    
    try {
        await apiCall('/cart/items', {
            method: 'POST',
            body: JSON.stringify({ product_id: productId, quantity }),
        });
        
        showAlert('Item added to cart!', 'success');
        await loadCart();
    } catch (error) {
        showAlert(error.message, 'error');
    }
}

async function updateCartItem(itemId, quantity) {
    try {
        if (quantity <= 0) {
            await removeFromCart(itemId);
            return;
        }
        
        await apiCall(`/cart/items/${itemId}?quantity=${quantity}`, {
            method: 'PUT',
        });
        
        await loadCart();
    } catch (error) {
        showAlert(error.message, 'error');
    }
}

async function removeFromCart(itemId) {
    try {
        await apiCall(`/cart/items/${itemId}`, {
            method: 'DELETE',
        });
        
        showAlert('Item removed from cart', 'info');
        await loadCart();
    } catch (error) {
        showAlert(error.message, 'error');
    }
}

function updateCartDisplay() {
    const container = document.getElementById('cart-container');
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center">
                <h3>Your cart is empty</h3>
                <a href="/products" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
        return;
    }
    
    let total = 0;
    const cartHTML = cart.map(item => {
        const itemTotal = item.product.price * item.quantity;
        total += itemTotal;
        
        return `
            <div class="cart-item">
                <img src="${item.product.image_url || 'https://via.placeholder.com/80x80'}" 
                     alt="${item.product.name}" class="cart-item-image">
                <div class="flex-grow-1">
                    <h6>${item.product.name}</h6>
                    <p class="text-muted">₹${item.product.price} each</p>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateCartItem(${item.id}, ${item.quantity - 1})">-</button>
                    <span class="mx-2">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateCartItem(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <div class="text-end">
                    <div class="fw-bold">₹${itemTotal}</div>
                    <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = `
        ${cartHTML}
        <div class="text-end mt-4">
            <h4>Total: ₹${total}</h4>
            <button class="btn btn-primary btn-lg" onclick="proceedToCheckout()">Proceed to Checkout</button>
        </div>
    `;
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
        cartCountElement.style.display = totalItems > 0 ? 'inline' : 'none';
    }
}

// Wishlist functions
async function loadWishlist() {
    if (!currentUser) return;
    
    try {
        wishlist = await apiCall('/cart/wishlist');
        updateWishlistDisplay();
    } catch (error) {
        console.error('Failed to load wishlist:', error);
    }
}

async function toggleWishlist(productId) {
    if (!currentUser) {
        showAlert('Please log in to manage wishlist', 'error');
        return;
    }
    
    try {
        const existingItem = wishlist.find(item => item.product_id === productId);
        
        if (existingItem) {
            await apiCall(`/cart/wishlist/${existingItem.id}`, {
                method: 'DELETE',
            });
            showAlert('Removed from wishlist', 'info');
        } else {
            await apiCall('/cart/wishlist', {
                method: 'POST',
                body: JSON.stringify({ product_id: productId }),
            });
            showAlert('Added to wishlist', 'success');
        }
        
        await loadWishlist();
    } catch (error) {
        showAlert(error.message, 'error');
    }
}

// Checkout and Payment functions
function proceedToCheckout() {
    if (cart.length === 0) {
        showAlert('Your cart is empty', 'error');
        return;
    }
    
    window.location.href = '/checkout';
}

async function createOrder(shippingAddress) {
    try {
        showSpinner();
        const order = await apiCall('/orders/create', {
            method: 'POST',
            body: JSON.stringify({ shipping_address: shippingAddress }),
        });
        
        // Initialize Razorpay payment
        const options = {
            key: 'rzp_test_key', // Your Razorpay key
            amount: order.amount * 100, // Amount in paise
            currency: order.currency,
            order_id: order.razorpay_order_id,
            name: 'Shopease',
            description: 'Order Payment',
            handler: async function(response) {
                await verifyPayment(response);
            },
            prefill: {
                name: currentUser.full_name,
                email: currentUser.email,
                contact: currentUser.phone_number || ''
            },
            theme: {
                color: '#667eea'
            }
        };
        
        const rzp = new Razorpay(options);
        rzp.open();
        
    } catch (error) {
        showAlert(error.message, 'error');
    } finally {
        hideSpinner();
    }
}

async function verifyPayment(paymentResponse) {
    try {
        showSpinner();
        await apiCall('/orders/verify-payment', {
            method: 'POST',
            body: JSON.stringify(paymentResponse),
        });
        
        showAlert('Payment successful! Order confirmed.', 'success');
        cart = [];
        setTimeout(() => {
            window.location.href = '/orders';
        }, 2000);
        
    } catch (error) {
        showAlert('Payment verification failed', 'error');
    } finally {
        hideSpinner();
    }
}

// Orders functions
async function loadOrders() {
    if (!currentUser) return;
    
    try {
        showSpinner();
        const orders = await apiCall('/orders');
        displayOrders(orders);
    } catch (error) {
        showAlert('Failed to load orders', 'error');
    } finally {
        hideSpinner();
    }
}

function displayOrders(orders) {
    const container = document.getElementById('orders-container');
    if (!container) return;
    
    if (orders.length === 0) {
        container.innerHTML = `
            <div class="text-center">
                <h3>No orders found</h3>
                <a href="/products" class="btn btn-primary">Start Shopping</a>
            </div>
        `;
        return;
    }
    
    container.innerHTML = orders.map(order => `
        <div class="order-card">
            <div class="d-flex justify-content-between align-items-start mb-3">
                <div>
                    <h5>Order #${order.id}</h5>
                    <p class="text-muted">${new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <div class="text-end">
                    <span class="order-status status-${order.order_status}">${order.order_status}</span>
                    <div class="mt-2">
                        <strong>₹${order.total_amount}</strong>
                    </div>
                </div>
            </div>
            <div class="order-items">
                ${order.order_items.map(item => `
                    <div class="d-flex align-items-center mb-2">
                        <img src="${item.product.image_url || 'https://via.placeholder.com/50x50'}" 
                             alt="${item.product.name}" class="me-3" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
                        <div>
                            <div>${item.product.name}</div>
                            <small class="text-muted">Qty: ${item.quantity} × ₹${item.price}</small>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Form handlers
function handleLoginForm() {
    const form = document.getElementById('login-form') || document.getElementById('seller-login-form') || document.getElementById('admin-login-form');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        await login(email, password);
    });
}

function handleRegisterForm() {
    const form = document.getElementById('register-form');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password !== confirmPassword) {
            showAlert('Passwords do not match', 'error');
            return;
        }
        
        const userData = {
            email: document.getElementById('email').value,
            password: password,
            full_name: document.getElementById('fullName').value,
            phone_number: document.getElementById('phone').value,
        };
        
        await register(userData);
    });
}

function handleCustomerRegisterForm() {
    handleRegisterForm();
}

function handleSellerRegisterForm() {
    // Seller registration is handled inline in the template
}

function handleAdminRegisterForm() {
    // Admin registration is handled inline in the template
}

function handleCheckoutForm() {
    const form = document.getElementById('checkout-form');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        
        const shippingAddress = `${formData.get('full_name')}, ${formData.get('address_line1')}, ${formData.get('city')}, ${formData.get('state')} - ${formData.get('postal_code')}`;
        
        await createOrder(shippingAddress);
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', async () => {
    // Load current user if token exists
    if (authToken) {
        await loadCurrentUser();
    }
    
    // Initialize page-specific functionality
    const currentPage = window.location.pathname;
    
    switch (currentPage) {
        case '/':
        case '/products':
            await loadCategories();
            await loadProducts();
            break;
        case '/cart':
            await loadCart();
            break;
        case '/orders':
            await loadOrders();
            break;
        case '/customer/login':
        case '/seller/login':
        case '/admin/login':
            handleLoginForm();
            break;
        case '/customer/register':
            handleCustomerRegisterForm();
            break;
        case '/seller/register':
            handleSellerRegisterForm();
            break;
        case '/admin/register':
            handleAdminRegisterForm();
            break;
        case '/checkout':
            await loadCart();
            handleCheckoutForm();
            break;
    }
    
    // Load cart and wishlist for authenticated users
    if (currentUser) {
        await loadCart();
        await loadWishlist();
    }
    
    // Set up search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchProducts();
            }
        });
    }
});

// Store and notification functions
function viewStore(sellerId) {
    // Show store details modal or redirect to store page
    showAlert('Store details coming soon!', 'info');
}

// Load user notifications
async function loadNotifications() {
    if (!currentUser) return;
    
    try {
        const notifications = await apiCall('/users/notifications');
        displayNotifications(notifications);
        updateNotificationBadge(notifications.filter(n => !n.is_read).length);
    } catch (error) {
        console.error('Failed to load notifications:', error);
    }
}

function displayNotifications(notifications) {
    const container = document.getElementById('notifications-container');
    if (!container) return;
    
    if (notifications.length === 0) {
        container.innerHTML = '<div class="text-center text-muted py-3">No notifications</div>';
        return;
    }
    
    container.innerHTML = notifications.map(notification => `
        <div class="notification-item ${notification.is_read ? '' : 'unread'}" data-id="${notification.id}">
            <div class="d-flex justify-content-between align-items-start">
                <div class="flex-grow-1">
                    <h6 class="mb-1">${notification.title}</h6>
                    <p class="mb-1 text-muted">${notification.message}</p>
                    <small class="text-muted">${new Date(notification.created_at).toLocaleString()}</small>
                </div>
                ${!notification.is_read ? `
                    <button class="btn btn-sm btn-outline-primary" onclick="markAsRead(${notification.id})">
                        Mark as read
                    </button>
                ` : ''}
            </div>
        </div>
    `).join('');
}

async function markAsRead(notificationId) {
    try {
        await apiCall(`/users/notifications/${notificationId}/read`, {
            method: 'PUT'
        });
        await loadNotifications();
    } catch (error) {
        showAlert('Failed to mark notification as read', 'error');
    }
}

function updateNotificationBadge(unreadCount) {
    const badge = document.getElementById('notification-badge');
    if (badge) {
        if (unreadCount > 0) {
            badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
            badge.style.display = 'inline';
        } else {
            badge.style.display = 'none';
        }
    }
}

// Export functions for global access
window.login = login;
window.logout = logout;
window.addToCart = addToCart;
window.updateCartItem = updateCartItem;
window.removeFromCart = removeFromCart;
window.toggleWishlist = toggleWishlist;
window.filterByCategory = filterByCategory;
window.searchProducts = searchProducts;
window.proceedToCheckout = proceedToCheckout;
window.createOrder = createOrder;
window.viewStore = viewStore;
window.loadNotifications = loadNotifications;
window.markAsRead = markAsRead;
