// Product Data
        const products = [
            { id: 1, name: "Wireless Headphones Pro", price: 199.99, originalPrice: 249.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", category: "electronics", rating: 4.8, reviews: 245, description: "Premium wireless headphones with active noise cancellation, 30-hour battery life, and crystal-clear sound quality.", badge: "Best Seller" },
            { id: 2, name: "Smart Watch Series X", price: 349.99, originalPrice: 399.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400", category: "electronics", rating: 4.6, reviews: 189, description: "Advanced smartwatch with health monitoring, GPS, and seamless smartphone integration." },
            { id: 3, name: "Premium Cotton T-Shirt", price: 29.99, originalPrice: 39.99, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", category: "clothing", rating: 4.5, reviews: 312, description: "Ultra-soft premium cotton t-shirt. Perfect for everyday wear with a modern fit." },
            { id: 4, name: "Leather Crossbody Bag", price: 89.99, originalPrice: 119.99, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400", category: "accessories", rating: 4.7, reviews: 156, description: "Genuine leather crossbody bag with multiple compartments and adjustable strap.", badge: "New" },
            { id: 5, name: "Minimalist Desk Lamp", price: 59.99, originalPrice: 79.99, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400", category: "home", rating: 4.4, reviews: 98, description: "Modern LED desk lamp with adjustable brightness and color temperature." },
            { id: 6, name: "Running Sneakers Elite", price: 129.99, originalPrice: 159.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", category: "clothing", rating: 4.9, reviews: 423, description: "Lightweight running shoes with responsive cushioning and breathable mesh upper.", badge: "Popular" },
            { id: 7, name: "Wireless Charging Pad", price: 39.99, originalPrice: 49.99, image: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?w=400", category: "electronics", rating: 4.3, reviews: 201, description: "Fast wireless charging pad compatible with all Qi-enabled devices." },
            { id: 8, name: "Gold Pendant Necklace", price: 149.99, originalPrice: 189.99, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400", category: "accessories", rating: 4.8, reviews: 87, description: "Elegant 18k gold-plated pendant necklace with delicate chain." },
            { id: 9, name: "Ceramic Planter Set", price: 44.99, originalPrice: 59.99, image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400", category: "home", rating: 4.6, reviews: 134, description: "Set of 3 modern ceramic planters in varying sizes with drainage holes." },
            { id: 10, name: "Denim Jacket Classic", price: 79.99, originalPrice: 99.99, image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400", category: "clothing", rating: 4.5, reviews: 267, description: "Classic denim jacket with a timeless design. Perfect for layering." },
            { id: 11, name: "Bluetooth Speaker Mini", price: 49.99, originalPrice: 69.99, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400", category: "electronics", rating: 4.4, reviews: 178, description: "Compact portable speaker with powerful sound and 12-hour battery life." },
            { id: 12, name: "Scented Candle Collection", price: 34.99, originalPrice: 44.99, image: "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=400", category: "home", rating: 4.7, reviews: 203, description: "Set of 3 hand-poured soy candles with relaxing aromatherapy scents.", badge: "Sale" }
        ];

        // State
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        let currentCategory = 'all';
        let currentView = 'grid';
        let filteredProducts = [...products];

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            renderProducts();
            updateCartUI();
            updateWishlistUI();
            setupEventListeners();
        });

        // Event Listeners
        function setupEventListeners() {
            document.getElementById('searchInput').addEventListener('input', handleSearch);
            document.getElementById('searchInputMobile').addEventListener('input', handleSearch);
            document.getElementById('accountForm').addEventListener('submit', handleAccountSave);
            document.getElementById('checkoutForm').addEventListener('submit', handleCheckout);
        }

        // Search
        function handleSearch(e) {
            const query = e.target.value.toLowerCase();
            if (e.target.id === 'searchInput') {
                document.getElementById('searchInputMobile').value = query;
            } else {
                document.getElementById('searchInput').value = query;
            }
            
            filteredProducts = products.filter(p => 
                (currentCategory === 'all' || p.category === currentCategory) &&
                (p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query))
            );
            renderProducts();
        }

        // Category Filter
        function filterByCategory(category) {
            currentCategory = category;
            document.querySelectorAll('.category-btn').forEach(btn => {
                if (btn.dataset.category === category) {
                    btn.classList.remove('bg-gray-200', 'text-gray-700');
                    btn.classList.add('bg-indigo-600', 'text-white');
                } else {
                    btn.classList.remove('bg-indigo-600', 'text-white');
                    btn.classList.add('bg-gray-200', 'text-gray-700');
                }
            });
            
            const query = document.getElementById('searchInput').value.toLowerCase();
            filteredProducts = products.filter(p => 
                (category === 'all' || p.category === category) &&
                (p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query))
            );
            renderProducts();
        }

        // Sort Products
        function sortProducts() {
            const sortBy = document.getElementById('sortSelect').value;
            switch(sortBy) {
                case 'price-low':
                    filteredProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    filteredProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'name':
                    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'rating':
                    filteredProducts.sort((a, b) => b.rating - a.rating);
                    break;
                default:
                    filteredProducts = products.filter(p => currentCategory === 'all' || p.category === currentCategory);
            }
            renderProducts();
        }

        // View Toggle
        function setView(view) {
            currentView = view;
            const grid = document.getElementById('productsGrid');
            const gridBtn = document.getElementById('gridViewBtn');
            const listBtn = document.getElementById('listViewBtn');
            
            if (view === 'grid') {
                grid.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';
                gridBtn.classList.add('bg-indigo-600', 'text-white');
                gridBtn.classList.remove('bg-white', 'text-gray-600');
                listBtn.classList.remove('bg-indigo-600', 'text-white');
                listBtn.classList.add('bg-white', 'text-gray-600');
            } else {
                grid.className = 'grid grid-cols-1 gap-4';
                listBtn.classList.add('bg-indigo-600', 'text-white');
                listBtn.classList.remove('bg-white', 'text-gray-600');
                gridBtn.classList.remove('bg-indigo-600', 'text-white');
                gridBtn.classList.add('bg-white', 'text-gray-600');
            }
            renderProducts();
        }

        // Render Products
        function renderProducts() {
            const grid = document.getElementById('productsGrid');
            document.getElementById('productCount').textContent = filteredProducts.length;
            
            grid.innerHTML = filteredProducts.map(product => {
                const isInWishlist = wishlist.includes(product.id);
                const discount = Math.round((1 - product.price / product.originalPrice) * 100);
                
                if (currentView === 'list') {
                    return `
                        <div class="bg-white rounded-xl shadow-md overflow-hidden flex fade-in hover:shadow-lg transition">
                            <div class="relative w-48 h-48 flex-shrink-0">
                                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover cursor-pointer" onclick="openProductModal(${product.id})">
                                ${product.badge ? `<span class="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">${product.badge}</span>` : ''}
                                <span class="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">-${discount}%</span>
                            </div>
                            <div class="flex-1 p-4 flex flex-col justify-between">
                                <div>
                                    <h3 class="font-semibold text-gray-800 text-lg cursor-pointer hover:text-indigo-600" onclick="openProductModal(${product.id})">${product.name}</h3>
                                    <p class="text-gray-500 text-sm mt-1 line-clamp-2">${product.description}</p>
                                    <div class="flex items-center mt-2">
                                        <div class="flex text-yellow-400 text-sm">
                                            ${Array(5).fill(0).map((_, i) => `<i class="fas fa-star${i < Math.floor(product.rating) ? '' : (i < product.rating ? '-half-alt' : '')}"></i>`).join('')}
                                        </div>
                                        <span class="text-gray-500 text-sm ml-2">(${product.reviews})</span>
                                    </div>
                                </div>
                                <div class="flex items-center justify-between mt-4">
                                    <div>
                                        <span class="text-xl font-bold text-indigo-600">$${product.price}</span>
                                        <span class="text-gray-400 line-through text-sm ml-2">$${product.originalPrice}</span>
                                    </div>
                                    <div class="flex gap-2">
                                        <button onclick="toggleWishlist(${product.id})" class="p-2 rounded-full ${isInWishlist ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-600'} hover:scale-110 transition">
                                            <i class="fas fa-heart"></i>
                                        </button>
                                        <button onclick="addToCart(${product.id})" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                                            <i class="fas fa-cart-plus mr-2"></i>Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }
                
                return `
                    <div class="bg-white rounded-xl shadow-md overflow-hidden group fade-in hover:shadow-lg transition">
                        <div class="relative overflow-hidden">
                            <img src="${product.image}" alt="${product.name}" class="w-full h-56 object-cover cursor-pointer group-hover:scale-105 transition duration-300" onclick="openProductModal(${product.id})">
                            ${product.badge ? `<span class="absolute top-3 left-3 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">${product.badge}</span>` : ''}
                            <span class="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">-${discount}%</span>
                            <button onclick="toggleWishlist(${product.id})" class="absolute bottom-3 right-3 w-10 h-10 rounded-full ${isInWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-600'} shadow-md flex items-center justify-center hover:scale-110 transition">
                                <i class="fas fa-heart"></i>
                            </button>
                        </div>
                        <div class="p-4">
                            <p class="text-xs text-gray-500 uppercase tracking-wide">${product.category}</p>
                            <h3 class="font-semibold text-gray-800 mt-1 cursor-pointer hover:text-indigo-600 transition" onclick="openProductModal(${product.id})">${product.name}</h3>
                            <div class="flex items-center mt-2">
                                <div class="flex text-yellow-400 text-sm">
                                    ${Array(5).fill(0).map((_, i) => `<i class="fas fa-star${i < Math.floor(product.rating) ? '' : ''}"></i>`).join('')}
                                </div>
                                <span class="text-gray-500 text-sm ml-2">(${product.reviews})</span>
                            </div>
                            <div class="flex items-center justify-between mt-3">
                                <div>
                                    <span class="text-lg font-bold text-indigo-600">$${product.price}</span>
                                    <span class="text-gray-400 line-through text-sm ml-2">$${product.originalPrice}</span>
                                </div>
                                <button onclick="addToCart(${product.id})" class="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition">
                                    <i class="fas fa-cart-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Cart Functions
        function addToCart(productId) {
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ id: productId, quantity: 1 });
            }
            saveCart();
            updateCartUI();
            showToast('Added to cart!');
            
            const cartCountEl = document.getElementById('cartCount');
            cartCountEl.classList.add('cart-bounce');
            setTimeout(() => cartCountEl.classList.remove('cart-bounce'), 300);
        }

        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            saveCart();
            updateCartUI();
            showToast('Removed from cart');
        }

        function updateQuantity(productId, change) {
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    removeFromCart(productId);
                } else {
                    saveCart();
                    updateCartUI();
                }
            }
        }

        function saveCart() {
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        function updateCartUI() {
            const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
            document.getElementById('cartCount').textContent = cartCount;
            
            const cartItemsContainer = document.getElementById('cartItems');
            const emptyCart = document.getElementById('emptyCart');
            const cartFooter = document.getElementById('cartFooter');
            
            if (cart.length === 0) {
                cartItemsContainer.classList.add('hidden');
                emptyCart.classList.remove('hidden');
                cartFooter.classList.add('hidden');
            } else {
                cartItemsContainer.classList.remove('hidden');
                emptyCart.classList.add('hidden');
                cartFooter.classList.remove('hidden');
                
                let subtotal = 0;
                cartItemsContainer.innerHTML = cart.map(item => {
                    const product = products.find(p => p.id === item.id);
                    subtotal += product.price * item.quantity;
                    return `
                        <div class="flex gap-4 py-4 border-b">
                            <img src="${product.image}" alt="${product.name}" class="w-20 h-20 object-cover rounded-lg">
                            <div class="flex-1">
                                <h4 class="font-semibold text-gray-800">${product.name}</h4>
                                <p class="text-indigo-600 font-medium">$${product.price}</p>
                                <div class="flex items-center gap-2 mt-2">
                                    <button onclick="updateQuantity(${product.id}, -1)" class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition">-</button>
                                    <span class="w-8 text-center">${item.quantity}</span>
                                    <button onclick="updateQuantity(${product.id}, 1)" class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition">+</button>
                                </div>
                            </div>
                            <button onclick="removeFromCart(${product.id})" class="text-red-500 hover:text-red-700">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `;
                }).join('');
                
                document.getElementById('cartSubtotal').textContent = `$${subtotal.toFixed(2)}`;
                document.getElementById('cartTotal').textContent = `$${subtotal.toFixed(2)}`;
            }
        }

        function toggleCart() {
            const sidebar = document.getElementById('cartSidebar');
            const overlay = document.getElementById('cartOverlay');
            
            if (sidebar.classList.contains('translate-x-full')) {
                sidebar.classList.remove('translate-x-full');
                overlay.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            } else {
                sidebar.classList.add('translate-x-full');
                overlay.classList.add('hidden');
                document.body.style.overflow = '';
            }
        }

        // Wishlist Functions
        function toggleWishlist(productId) {
            const index = wishlist.indexOf(productId);
            if (index > -1) {
                wishlist.splice(index, 1);
                showToast('Removed from wishlist');
            } else {
                wishlist.push(productId);
                showToast('Added to wishlist');
            }
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            updateWishlistUI();
            renderProducts();
        }

        function updateWishlistUI() {
            const wishlistCount = document.getElementById('wishlistCount');
            if (wishlist.length > 0) {
                wishlistCount.textContent = wishlist.length;
                wishlistCount.classList.remove('hidden');
            } else {
                wishlistCount.classList.add('hidden');
            }
        }

        function renderWishlist() {
            const grid = document.getElementById('wishlistGrid');
            const emptyWishlist = document.getElementById('emptyWishlist');
            
            if (wishlist.length === 0) {
                grid.classList.add('hidden');
                emptyWishlist.classList.remove('hidden');
            } else {
                grid.classList.remove('hidden');
                emptyWishlist.classList.add('hidden');
                
                grid.innerHTML = wishlist.map(id => {
                    const product = products.find(p => p.id === id);
                    const discount = Math.round((1 - product.price / product.originalPrice) * 100);
                    return `
                        <div class="bg-white rounded-xl shadow-md overflow-hidden group fade-in">
                            <div class="relative overflow-hidden">
                                <img src="${product.image}" alt="${product.name}" class="w-full h-56 object-cover cursor-pointer" onclick="openProductModal(${product.id})">
                                <span class="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">-${discount}%</span>
                                <button onclick="toggleWishlist(${product.id})" class="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-red-500 text-white shadow-md flex items-center justify-center hover:scale-110 transition">
                                    <i class="fas fa-heart"></i>
                                </button>
                            </div>
                            <div class="p-4">
                                <h3 class="font-semibold text-gray-800">${product.name}</h3>
                                <div class="flex items-center justify-between mt-3">
                                    <div>
                                        <span class="text-lg font-bold text-indigo-600">$${product.price}</span>
                                        <span class="text-gray-400 line-through text-sm ml-2">$${product.originalPrice}</span>
                                    </div>
                                    <button onclick="addToCart(${product.id})" class="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition">
                                        <i class="fas fa-cart-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');
            }
        }

        // Product Modal
        function openProductModal(productId) {
            const product = products.find(p => p.id === productId);
            const discount = Math.round((1 - product.price / product.originalPrice) * 100);
            const isInWishlist = wishlist.includes(productId);
            
            document.getElementById('productModalContent').innerHTML = `
                <div>
                    <img src="${product.image}" alt="${product.name}" class="w-full h-96 object-cover rounded-xl">
                </div>
                <div class="flex flex-col justify-center">
                    ${product.badge ? `<span class="inline-block bg-indigo-100 text-indigo-600 text-sm px-3 py-1 rounded-full mb-2 w-fit">${product.badge}</span>` : ''}
                    <h2 class="text-2xl font-bold text-gray-800 mb-2">${product.name}</h2>
                    <div class="flex items-center gap-2 mb-4">
                        <div class="flex text-yellow-400">
                            ${Array(5).fill(0).map((_, i) => `<i class="fas fa-star${i < Math.floor(product.rating) ? '' : ''}"></i>`).join('')}
                        </div>
                        <span class="text-gray-500">${product.rating} (${product.reviews} reviews)</span>
                    </div>
                    <p class="text-gray-600 mb-6">${product.description}</p>
                    <div class="flex items-center gap-4 mb-6">
                        <span class="text-3xl font-bold text-indigo-600">$${product.price}</span>
                        <span class="text-xl text-gray-400 line-through">$${product.originalPrice}</span>
                        <span class="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">${discount}% OFF</span>
                    </div>
                    <div class="flex gap-4">
                        <button onclick="addToCart(${product.id}); closeProductModal();" class="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
                            <i class="fas fa-cart-plus mr-2"></i>Add to Cart
                        </button>
                        <button onclick="toggleWishlist(${product.id}); openProductModal(${product.id});" class="w-14 h-14 rounded-lg ${isInWishlist ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'} flex items-center justify-center hover:scale-105 transition">
                            <i class="fas fa-heart text-xl"></i>
                        </button>
                    </div>
                    <div class="mt-6 pt-6 border-t">
                        <div class="flex items-center gap-2 text-gray-600 mb-2">
                            <i class="fas fa-truck"></i>
                            <span>Free shipping on orders over $50</span>
                        </div>
                        <div class="flex items-center gap-2 text-gray-600 mb-2">
                            <i class="fas fa-undo"></i>
                            <span>30-day return policy</span>
                        </div>
                        <div class="flex items-center gap-2 text-gray-600">
                            <i class="fas fa-shield-alt"></i>
                            <span>2-year warranty included</span>
                        </div>
                    </div>
                </div>
            `;
            
            document.getElementById('productModal').classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }

        function closeProductModal() {
            document.getElementById('productModal').classList.add('hidden');
            document.body.style.overflow = '';
        }

        // Section Navigation
        function showSection(section) {
            document.getElementById('homeSection').classList.add('hidden');
            document.getElementById('wishlistSection').classList.add('hidden');
            document.getElementById('accountSection').classList.add('hidden');
            document.getElementById('checkoutSection').classList.add('hidden');
            
            if (section === 'home') {
                document.getElementById('homeSection').classList.remove('hidden');
            } else if (section === 'wishlist') {
                document.getElementById('wishlistSection').classList.remove('hidden');
                renderWishlist();
            } else if (section === 'account') {
                document.getElementById('accountSection').classList.remove('hidden');
            } else if (section === 'checkout') {
                document.getElementById('checkoutSection').classList.remove('hidden');
                renderCheckout();
            }
        }

        // Checkout
        function proceedToCheckout() {
            if (cart.length === 0) {
                showToast('Your cart is empty');
                return;
            }
            toggleCart();
            showSection('checkout');
        }

        function renderCheckout() {
            const checkoutItems = document.getElementById('checkoutItems');
            let subtotal = 0;
            
            checkoutItems.innerHTML = cart.map(item => {
                const product = products.find(p => p.id === item.id);
                subtotal += product.price * item.quantity;
                return `
                    <div class="flex gap-3 py-2">
                        <img src="${product.image}" alt="${product.name}" class="w-16 h-16 object-cover rounded-lg">
                        <div class="flex-1">
                            <h4 class="font-medium text-gray-800 text-sm">${product.name}</h4>
                            <p class="text-gray-500 text-sm">Qty: ${item.quantity}</p>
                        </div>
                        <span class="font-medium">$${(product.price * item.quantity).toFixed(2)}</span>
                    </div>
                `;
            }).join('');
            
            const shipping = subtotal > 50 ? 0 : 9.99;
            const tax = subtotal * 0.08;
            const total = subtotal + shipping + tax;
            
            document.getElementById('checkoutSubtotal').textContent = `$${subtotal.toFixed(2)}`;
            document.getElementById('checkoutShipping').textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
            document.getElementById('checkoutTax').textContent = `$${tax.toFixed(2)}`;
            document.getElementById('checkoutTotal').textContent = `$${total.toFixed(2)}`;
        }

        function handleCheckout(e) {
            e.preventDefault();
            const orderNumber = Math.random().toString(36).substring(2, 10).toUpperCase();
            document.getElementById('orderNumber').textContent = orderNumber;
            document.getElementById('orderSuccessModal').classList.remove('hidden');
            cart = [];
            saveCart();
            updateCartUI();
        }

        function closeOrderSuccess() {
            document.getElementById('orderSuccessModal').classList.add('hidden');
            showSection('home');
        }

        // Account
        function handleAccountSave(e) {
            e.preventDefault();
            showToast('Account details saved!');
        }

        // Utility Functions
        function showToast(message) {
            const toast = document.getElementById('toast');
            document.getElementById('toastMessage').textContent = message;
            toast.classList.remove('translate-y-full', 'opacity-0');
            setTimeout(() => {
                toast.classList.add('translate-y-full', 'opacity-0');
            }, 2500);
        }

        function scrollToProducts() {
            document.getElementById('categoryFilters').scrollIntoView({ behavior: 'smooth' });
        }

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeProductModal();
                document.getElementById('orderSuccessModal').classList.add('hidden');
            }
        });