
        // Complete product catalog with categories
        const allProducts = [
            // Electronics
            { id: 1, name: "Wireless Bluetooth Headphones", price: 49.99, originalPrice: 89.99, rating: 4.7, category: "electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop" },
            { id: 2, name: "Smartphone 128GB", price: 299.00, originalPrice: 399.00, rating: 4.5, category: "electronics", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop" },
            { id: 3, name: "Laptop 16GB RAM", price: 899.99, originalPrice: 1099.99, rating: 4.8, category: "electronics", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop" },
            { id: 4, name: "Smart Watch", price: 129.99, originalPrice: 179.99, rating: 4.6, category: "electronics", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop" },
            { id: 5, name: "Wireless Mouse", price: 24.99, originalPrice: 39.99, rating: 4.4, category: "electronics", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop" },
            { id: 6, name: "Mechanical Keyboard", price: 79.99, originalPrice: 99.99, rating: 4.9, category: "electronics", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop" },

            // Fashion
            { id: 11, name: "Men's Leather Jacket", price: 89.99, originalPrice: 129.99, rating: 4.6, category: "fashion", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop" },
            { id: 12, name: "Women's Running Shoes", price: 69.99, originalPrice: 99.99, rating: 4.8, category: "fashion", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop" },
            { id: 13, name: "Designer Sunglasses", price: 39.99, originalPrice: 79.99, rating: 4.5, category: "fashion", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop" },

            // Home & Kitchen
            { id: 21, name: "Coffee Maker 12-Cup", price: 69.99, originalPrice: 89.99, rating: 4.6, category: "home", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop" },
            { id: 22, name: "Non-Stick Cookware Set", price: 99.99, originalPrice: 149.99, rating: 4.7, category: "home", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3133?w=400&h=300&fit=crop" },
            { id: 23, name: "Robot Vacuum Cleaner", price: 199.99, originalPrice: 249.99, rating: 4.4, category: "home", image: "https://images.unsplash.com/photo-1585444477914-9e6e6e59adcb?w=400&h=300&fit=crop" },

            // Books
            { id: 31, name: "Best Seller Novel", price: 14.99, originalPrice: 19.99, rating: 4.9, category: "books", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop" },
            { id: 32, name: "Programming Guide", price: 29.99, originalPrice: 39.99, rating: 4.8, category: "books", image: "https://images.unsplash.com/photo-1464924513372-cd207e22a29a?w=400&h=300&fit=crop" },

            // Sports
            { id: 41, name: "Fitness Tracker", price: 79.99, originalPrice: 109.99, rating: 4.5, category: "sports", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop" },
            { id: 42, name: "Yoga Mat Premium", price: 34.99, originalPrice: 49.99, rating: 4.7, category: "sports", image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop" },

            // Deals (discounted items)
            { id: 51, name: "Lightning Deal: Headphones", price: 29.99, originalPrice: 69.99, rating: 4.6, category: "deals", image: "https://images.unsplash.com/photo-1614669536296-2f41f5fbdd15?w=400&h=300&fit=crop" },
            { id: 52, name: "Deal of Day: Smart Bulbs", price: 19.99, originalPrice: 39.99, rating: 4.4, category: "deals", image: "https://images.unsplash.com/photo-1603291820321-ccddb6901f97?w=400&h=300&fit=crop" }
        ];

        let products = [...allProducts];
        let cart = [];
        let currentCategory = 'all';

        // **WORKING NAVIGATION TABS**
        function switchCategory(category) {
            currentCategory = category;
            
            // Update active tab
            document.querySelectorAll('.nav-item').forEach(tab => {
                tab.classList.remove('active');
                if (tab.dataset.category === category) {
                    tab.classList.add('active');
                }
            });

            // Filter products
            if (category === 'all') {
                products = [...allProducts];
                document.getElementById('sectionTitle').textContent = 'Featured Products';
            } else if (category === 'deals') {
                products = allProducts.filter(p => p.category === 'deals' || p.price < 50);
                document.getElementById('sectionTitle').textContent = "Today's Deals";
            } else {
                products = allProducts.filter(p => p.category === category);
                document.getElementById('sectionTitle').textContent = category.charAt(0).toUpperCase() + category.slice(1) + ' Products';
            }

            renderProducts();
            updateCartCount();
        }

        // **WORKING SEARCH**
        function performSearch() {
            const query = document.getElementById('searchInput').value.toLowerCase();
            if (query) {
                products = allProducts.filter(p => 
                    p.name.toLowerCase().includes(query) || 
                    p.category.includes(query)
                );
                document.getElementById('sectionTitle').textContent = `Search results for "${query}"`;
                renderProducts();
            }
        }

        // Render products
        function renderProducts() {
            const grid = document.getElementById('productsGrid');
            if (products.length === 0) {
                grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;"><i class="fas fa-search" style="font-size: 48px; margin-bottom: 20px;"></i><p>No products found</p></div>';
                return;
            }
            
            grid.innerHTML = products.map(product => {
                const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
                return `
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/400x300/eee/999?text=No+Image'">
                        <div class="product-info">
                            <div class="product-title">${product.name}</div>
                            <div class="product-price">
                                $${product.price.toFixed(2)}
                                ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                            </div>
                            <div class="rating">
                                <div class="stars">${stars}</div>
                                <span>(${product.rating})</span>
                            </div>
                            <button class="add-to-cart" onclick="addToCart(${product.id})">
                                <i class="fas fa-shopping-cart"></i> Add to Cart
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // **FULLY WORKING CART**
        function addToCart(productId) {
            const product = products.find(p => p.id === productId) || allProducts.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            
            updateCartDisplay();
            updateCartCount();
            showNotification(`${product.name} added to cart!`);
        }

        function updateCartItem(productId, change) {
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    cart = cart.filter(i => i.id !== productId);
                }
                updateCartDisplay();
                updateCartCount();
            }
        }

        function updateCartDisplay() {
            const cartItemsEl = document.getElementById('cartItems');
            
            if (cart.length === 0) {
                cartItemsEl.innerHTML = `
                    <div class="cart-empty">
                        <i class="fas fa-shopping-cart" style="font-size: 48px; color: #ccc; margin-bottom: 20px;"></i>
                        <p>Your cart is empty</p>
                        <a href="#" class="cta-btn" onclick="closeCart(); showCategory('all')" style="display: inline-block; margin-top: 20px; padding: 12px 24px;">Continue Shopping</a>
                    </div>
                `;
            } else {
                cartItemsEl.innerHTML = cart.map(item => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-info">
                            <div class="cart-item-title">${item.name}</div>
                            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                            <div class="quantity-controls">
                                <button class="qty-btn" onclick="updateCartItem(${item.id}, -1)">−</button>
                                <span style="min-width: 20px; text-align: center;">${item.quantity}</span>
                                <button class="qty-btn" onclick="updateCartItem(${item.id}, 1)">+</button>
                                <button onclick="removeFromCart(${item.id})" style="background: #d32f2f; margin-left: 10px;">Remove</button>
                            </div>
                        </div>
                    </div>
                `).join('');
            }

            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            document.getElementById('cartTotal').textContent = total.toFixed(2);
        }

        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCartDisplay();
            updateCartCount();
        }

        function updateCartCount() {
            const count = cart.reduce((sum, item) => sum + item.quantity, 0);
            const cartCount = document.getElementById('cartCount');
            cartCount.textContent = count;
            cartCount.style.display = count > 0 ? 'flex' : 'none';
        }

        // Cart modal functions
        function openCart() {
            document.getElementById('cartModal').style.display = 'block';
            updateCartDisplay();
        }

        function closeCart() {
            document.getElementById('cartModal').style.display = 'none';
        }

        function checkout() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            alert(`Order placed successfully! Total: $${document.getElementById('cartTotal').textContent}`);
            cart = [];
            closeCart();
            updateCartCount();
            updateCartDisplay();
        }

        function showNotification(message) {
            // Simple notification
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: #4caf50;
                color: white;
                padding: 15px 20px;
                border-radius: 4px;
                z-index: 3000;
                animation: slideIn 0.3s ease;
            `;
            notification.textContent = message;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }

        // Event Listeners
        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        document.getElementById('cartModal').addEventListener('click', (e) => {
            if (e.target.id === 'cartModal') {
                closeCart();
            }
        });

        // Initialize
        renderProducts();
        updateCartCount();
