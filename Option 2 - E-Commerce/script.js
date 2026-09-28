const products = [
    {
        id: 1,
        name: "Aura Headphones",
        category: "electronics",
        price: 2499,
        oldPrice: 3499,
        rating: 4.8,
        emoji: "🎧",
        description: "Premium wireless headphones with immersive sound, comfortable ear cushions and long-lasting battery life."
    },

    {
        id: 2,
        name: "Nova Smartwatch",
        category: "electronics",
        price: 3299,
        oldPrice: 4499,
        rating: 4.7,
        emoji: "⌚",
        description: "A stylish smartwatch with fitness tracking, notifications and a bright everyday display."
    },

    {
        id: 3,
        name: "Urban Sneakers",
        category: "fashion",
        price: 1999,
        oldPrice: 2799,
        rating: 4.6,
        emoji: "👟",
        description: "Modern everyday sneakers designed for comfort, casual outfits and all-day walking."
    },

    {
        id: 4,
        name: "Classic Backpack",
        category: "fashion",
        price: 1599,
        oldPrice: 2199,
        rating: 4.5,
        emoji: "🎒",
        description: "A clean and spacious backpack suitable for college, work and everyday travel."
    },

    {
        id: 5,
        name: "Minimal Lamp",
        category: "home",
        price: 1299,
        oldPrice: 1799,
        rating: 4.4,
        emoji: "💡",
        description: "A minimalist table lamp that adds a warm and elegant touch to your workspace."
    },

    {
        id: 6,
        name: "Cloud Cushion",
        category: "home",
        price: 899,
        oldPrice: 1299,
        rating: 4.6,
        emoji: "🛋️",
        description: "A soft decorative cushion designed to bring comfort and style to your living space."
    },

    {
        id: 7,
        name: "Classic Watch",
        category: "accessories",
        price: 2199,
        oldPrice: 2999,
        rating: 4.7,
        emoji: "⌚",
        description: "A timeless wristwatch with a clean design that works for both casual and formal looks."
    },

    {
        id: 8,
        name: "Urban Sunglasses",
        category: "accessories",
        price: 999,
        oldPrice: 1499,
        rating: 4.5,
        emoji: "🕶️",
        description: "Stylish sunglasses with a modern frame designed for everyday outdoor use."
    }
];

let cart = JSON.parse(localStorage.getItem("veloraCart")) || [];

function displayProducts(productList) {
    const productGrid = document.getElementById("productGrid");

    productGrid.innerHTML = "";

    productList.forEach(product => {

        const discount = Math.round(
            ((product.oldPrice - product.price) / product.oldPrice) * 100
        );

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <span class="discount">${discount}% OFF</span>

            <div class="product-image">
                ${product.emoji}
            </div>

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <div class="product-price">
                    ₹${product.price.toLocaleString()}
                    <del>₹${product.oldPrice.toLocaleString()}</del>
                </div>

                <div class="product-rating">
                    ⭐ ${product.rating}
                </div>

            </div>
        `;

        card.onclick = function() {
            openProductModal(product.id);
        };

        productGrid.appendChild(card);
    });
}

displayProducts(products);

function openProductModal(productId) {
    const product = products.find(item => item.id === productId);

    const modal = document.getElementById("productModal");
    const details = document.getElementById("productDetails");

    details.innerHTML = `
        <div class="modal-product">

            <div class="modal-product-image">
                ${product.emoji}
            </div>

            <div class="modal-product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h2>${product.name}</h2>

                <div class="product-rating">
                    ⭐ ${product.rating} / 5
                </div>

                <h3>
                    ₹${product.price.toLocaleString()}
                </h3>

                <p class="modal-description">
                    ${product.description}
                </p>

                <button
                    class="add-cart"
                    onclick="addToCart(${product.id})"
                >
                    🛒 Add to Cart
                </button>

            </div>

        </div>
    `;

    modal.style.display = "flex";
}


function closeProductModal() {
    document.getElementById("productModal").style.display = "none";
}

function addToCart(productId) {
    const product = products.find(item => item.id === productId);

    cart.push(product);

    localStorage.setItem("veloraCart", JSON.stringify(cart));

    updateCartCount();

    closeProductModal();

    alert(product.name + " added to your cart!");
}


function updateCartCount() {
    const cartCount = document.getElementById("cartCount");

    cartCount.textContent = cart.length;
}

updateCartCount();

function openCart() {
    const cartOverlay = document.getElementById("cartOverlay");

    cartOverlay.style.display = "block";

    displayCart();
}


function closeCart() {
    document.getElementById("cartOverlay").style.display = "none";
}


function displayCart() {
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "₹0";
        return;
    }

    let total = 0;

    cart.forEach((product, index) => {

        total += product.price;

        const item = document.createElement("div");

        item.className = "cart-item";

        item.innerHTML = `
            <div>
                <h4>${product.emoji} ${product.name}</h4>
                <p>₹${product.price.toLocaleString()}</p>
            </div>

            <button
                class="remove-item"
                onclick="removeFromCart(${index})"
            >
                Remove
            </button>
        `;

        cartItems.appendChild(item);
    });

    cartTotal.textContent = "₹" + total.toLocaleString();
}

function removeFromCart(index) {
    cart.splice(index, 1);

    localStorage.setItem("veloraCart", JSON.stringify(cart));

    updateCartCount();

    displayCart();
}

function searchProducts() {
    const searchText =
        document.getElementById("searchInput").value.toLowerCase();

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchText)
    );

    displayProducts(filteredProducts);
}

function filterCategory(category) {
    if (category === "all") {
        displayProducts(products);
        return;
    }

    const filteredProducts = products.filter(product =>
        product.category === category
    );

    displayProducts(filteredProducts);
}

function focusSearch() {
    const searchInput = document.getElementById("searchInput");

    searchInput.focus();
    searchInput.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

function scrollToShop() {
    const shopSection = document.getElementById("shop");

    shopSection.scrollIntoView({
        behavior: "smooth"
    });
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Thank you for shopping with VÉLORA! 🛍️\n\nCheckout is a demo in this project.");
}

window.onclick = function(event) {
    const modal = document.getElementById("productModal");

    if (event.target === modal) {
        closeProductModal();
    }
};