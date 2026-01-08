const allProducts = [
    { id: 1, name: "Headphones", price: 49.99, category: "electronics", image: "https://via.placeholder.com/300" },
    { id: 2, name: "Shoes", price: 69.99, category: "fashion", image: "https://via.placeholder.com/300" },
    { id: 3, name: "Book", price: 19.99, category: "books", image: "https://via.placeholder.com/300" }
];

let products = [...allProducts];
let cart = [];

function renderProducts() {
    const grid = document.getElementById("productsGrid");
    grid.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.image}">
            <h4>${p.name}</h4>
            <p>$${p.price}</p>
            <button class="add-to-cart" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join("");
}

function switchCategory(cat) {
    document.querySelectorAll(".nav-item").forEach(i => i.classList.remove("active"));
    document.querySelector(`[data-category="${cat}"]`).classList.add("active");

    products = cat === "all" ? allProducts : allProducts.filter(p => p.category === cat);
    renderProducts();
}

function addToCart(id) {
    cart.push(allProducts.find(p => p.id === id));
    document.getElementById("cartCount").textContent = cart.length;
}

function openCart() {
    document.getElementById("cartModal").style.display = "block";
}

function closeCart() {
    document.getElementById("cartModal").style.display = "none";
}

function checkout() {
    alert("Order placed!");
    cart = [];
    closeCart();
}

renderProducts();
