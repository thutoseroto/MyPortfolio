// Product Data
const products = [
    // Clothing
    {
        id: 1,
        name: "Traditional Chitenje Wrap",
        category: "clothing",
        price: 350,
        image: "https://images.unsplash.com/photo-1597047084897-51e81819a499?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "Hand-dyed traditional Malawian fabric, perfect for wraps, skirts, or home decor."
    },
    {
        id: 2,
        name: "Men's Malawian Shirt",
        category: "clothing",
        price: 450,
        image: "https://images.unsplash.com/photo-1593030761754-709e3d93c9f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "Comfortable cotton shirt with traditional Malawian print."
    },
    {
        id: 3,
        name: "Women's Chitenje Dress",
        category: "clothing",
        price: 550,
        image: "https://images.unsplash.com/photo-1581044777550-4e2b87b4b6b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "Elegant maxi dress made from authentic chitenje fabric."
    },
    // Crafts
    {
        id: 4,
        name: "Wooden Hippo Carving",
        category: "crafts",
        price: 280,
        image: "https://images.unsplash.com/photo-1605721912195-3aec5fbaf4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "Hand-carved wooden hippo by artisans from Lilongwe."
    },
    {
        id: 5,
        name: "Malawian Basket",
        category: "crafts",
        price: 320,
        image: "https://images.unsplash.com/photo-1604664587350-2f7ab82d4c30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "Traditionally woven basket made from local grasses."
    },
    {
        id: 6,
        name: "Elephant Sculpture",
        category: "crafts",
        price: 450,
        image: "https://images.unsplash.com/photo-1605863821421-46b6e7e0c1f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "Intricate wooden elephant sculpture, a symbol of strength."
    },
    // Kitchen
    {
        id: 7,
        name: "Clay Cooking Pot",
        category: "kitchen",
        price: 220,
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "Traditional clay pot, perfect for slow-cooking stews."
    },
    {
        id: 8,
        name: "Hand-Painted Plates (Set of 4)",
        category: "kitchen",
        price: 380,
        image: "https://images.unsplash.com/photo-1600585154343-2e1b4b5f7c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "Beautiful hand-painted ceramic plates with Malawian patterns."
    },
    {
        id: 9,
        name: "Wooden Serving Bowls",
        category: "kitchen",
        price: 290,
        image: "https://images.unsplash.com/photo-1600593782871-9b8b3d1b0b5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "Set of 3 hand-carved wooden serving bowls."
    },
    // Tools
    {
        id: 10,
        name: "Hand Forged Hoe",
        category: "tools",
        price: 180,
        image: "https://images.unsplash.com/photo-1586864387634-2f9f3c6c8a4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "Traditional hand-forged farming hoe, made by local blacksmiths."
    },
    {
        id: 11,
        name: "Mortar and Pestle",
        category: "tools",
        price: 420,
        image: "https://images.unsplash.com/photo-1586864387942-5b8b3b3b3b3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "Hand-carved wooden mortar and pestle for grinding spices."
    },
    {
        id: 12,
        name: "Wooden Cooking Spoons (Set of 3)",
        category: "tools",
        price: 150,
        image: "https://images.unsplash.com/photo-1586864387634-2f9f3c6c8a4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "Hand-carved wooden cooking spoons, each uniquely designed."
    }
];

// Cart array
let cart = [];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeModal = document.querySelector('.close');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const searchBtn = document.getElementById('searchBtn');
const searchBar = document.getElementById('searchBar');
const categoryCards = document.querySelectorAll('.category-card');

// Display products
function displayProducts(category = 'all') {
    const filteredProducts = category === 'all'
        ? products
        : products.filter(p => p.category === category);

    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
                <div class="product-price">R ${product.price.toFixed(2)}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Add to cart
window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
    showNotification(`${product.name} added to cart!`);
};

// Update cart
function updateCart() {
    cartCount.textContent = cart.length;

    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = '<p style="text-align: center; color: var(--text-light);">Your cart is empty</p>';
            cartTotal.textContent = '0.00';
            return;
        }

        const items = cart.reduce((acc, item) => {
            const existing = acc.find(i => i.id === item.id);
            if (existing) {
                existing.quantity++;
            } else {
                acc.push({...item, quantity: 1});
            }
            return acc;
        }, []);

        cartItems.innerHTML = items.map(item => `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>R ${item.price} x ${item.quantity}</p>
                </div>
                <div>
                    <p>R ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>
        `).join('');

        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toFixed(2);
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--malawi-green);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Event Listeners
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        displayProducts(btn.dataset.filter);
    });
});

cartBtn.addEventListener('click', () => {
    cartModal.classList.add('show');
    updateCart();
});

closeModal.addEventListener('click', () => {
    cartModal.classList.remove('show');
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('show');
    }
});

searchBtn.addEventListener('click', () => {
    searchBar.classList.toggle('hidden');
});

categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.dataset.category;
        filterBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === category) {
                btn.classList.add('active');
            }
        });
        displayProducts(category);
        document.getElementById('clothing').scrollIntoView({ behavior: 'smooth' });
    });
});

// Contact form
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('Thank you for your message! We\'ll get back to you soon.');
    e.target.reset();
});

// Newsletter form
document.querySelector('.newsletter-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('Thanks for subscribing!');
    e.target.reset();
});

// Checkout
document.getElementById('checkoutBtn')?.addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    showNotification('Thank you for your order! (Demo - no payment taken)');
    cart = [];
    updateCart();
    cartModal.classList.remove('show');
});

// Initialize
displayProducts();
updateCart();