    // --- Variables Globales y Estado de la Aplicación ---
    let cart = []; 
    let allOrders = []; 
    const ADMIN_PASSWORD = "admin123"; 
    const WHATSAPP_NUMBER = "5353978329"; 

    // --- Datos de Productos ---
    const products = {
        pizzasNapolitanas: [
            { id: 'pn1', name: 'Pizza Napolitana', price: 150, description: 'Clásica pizza napolitana individual.', image: 'images/pizza napolitana cubana.jpg' }
        ],
        pizzasFamiliares: [
            { id: 'pf1', name: 'Pizza Familiar', price: 3000, description: 'Pizza grande para compartir en familia.', image: 'images/pizzaFamiliar.jpg' }
        ],
        bebidas: [
            { id: 'b1', name: 'Refresco de Lata (Cola)', price: 240, description: 'Lata de refresco sabor cola.', image: 'images/brizocola.png' },
            { id: 'b2', name: 'Refresco de Lata (Piña)', price: 240, description: 'Lata de refresco sabor piña.', image: 'images/brizopiña.png' },
            { id: 'b3', name: 'Refresco de Lata (Limón)', price: 240, description: 'Lata de refresco sabor limón.', image: 'images/brizolimon.png' },
            { id: 'b4', name: 'Refresco de Lata (Naranja)', price: 240, description: 'Lata de refresco sabor naranja.', image: 'images/brizonaranja.png' },
            { id: 'b5', name: 'Malta de Lata (Santa Isabel)', price: 260, description: 'Malta en lata marca Santa Isabel.', image: 'images/maltaisabel.png' },
            { id: 'b6', name: 'Malta Guajira', price: 300, description: 'Malta marca Guajira.', image: 'images/GUAJIRA.png' },
            { id: 'b7', name: 'Cerveza Parranda', price: 220, description: 'Cerveza nacional Parranda.', image: 'images/parranda.png' },
            { id: 'b8', name: 'Cerveza Mayabe', price: 220, description: 'Cerveza nacional Mayabe.', image: 'images/Mayabe.png' },
            { id: 'b9', name: 'Jugo Manzana', price: 200, description: 'Jugo de manzana.', image: 'images/jugomanzana.png' },
            { id: 'b10', name: 'Jugo Mango', price: 200, description: 'Jugo de mango.', image: 'images/jugomango.png' },
            { id: 'b11', name: 'Jugo Melocotón', price: 200, description: 'Jugo de melocotón.', image: 'images/jugomelocoton.png' },
            { id: 'b12', name: 'Pru Frío', price: 50, description: 'Bebida refrescante Pru.', image: 'images/pru.png' }
        ],
        agregados: [
            { id: 'a1', name: 'Agregado de Jamón', price: 70, description: 'Porción extra de jamón.', image: 'images/jamon.png' },
            { id: 'a2', name: 'Agregado de Queso', price: 70, description: 'Porción extra de queso.', image: 'images/queso.png' },
            { id: 'a3', name: 'Agregado de Ají Pimiento', price: 70, description: 'Porción extra de ají pimiento.', image: 'images/pimiento.jpg' }
        ],
        otros: [
            {id: 'a1', name:'Café Bryderk 500g', price: 1200, description:'Café Español de la mejor calidad y sabor', image:'images/cafe.png'}
        ],
    };

    // --- Selectores del DOM ---
    const napolitanasContainer = document.getElementById('napolitanas-pizzas');
    const familiaresContainer = document.getElementById('familiares-pizzas');
    const bebidasContainer = document.getElementById('bebidas-container');
    const agregadosContainer = document.getElementById('agregados-container');
    const otrosContainer = document.getElementById('otros-container');
    
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalElement = document.getElementById('cart-total');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const checkoutButton = document.getElementById('checkout-button'); 
    const cartModal = document.getElementById('cartModal');
    const closeCartModalButton = document.getElementById('closeCartModal');
    const cartFab = document.getElementById('cart-fab');
    const cartCountFab = document.getElementById('cart-count-fab');
    
    const orderFormSection = document.getElementById('pedido');
    const orderForm = document.getElementById('order-form'); 
    const orderSummaryElement = document.getElementById('order-summary');
    const orderTotalFormElement = document.getElementById('order-total-form');
    const orderIdFormElement = document.getElementById('order-id-form');
    const direccionInput = document.getElementById('direccion');
    const telefonoInput = document.getElementById('telefono');
    
    const adminSection = document.getElementById('admin');
    const adminLoginSection = document.getElementById('admin-login-section');
    const adminLoginForm = document.getElementById('admin-login-form');
    const adminDashboard = document.getElementById('admin-dashboard');
    const adminOrdersList = document.getElementById('admin-orders-list');

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('header nav a.nav-link, #mobile-menu a');
    const sections = document.querySelectorAll('section[id]');

    // --- Funciones Auxiliares ---
    function showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast-message ${type === 'success' ? 'toast-success' : 'toast-error'}`;
        toast.textContent = message;
        toastContainer.appendChild(toast);
        toast.offsetHeight; 
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 500); 
        }, 3000); 
    }

    function generateOrderId() {
        return `ORD-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    }

    function formatPrice(price) {
        return `${price.toFixed(2)} CUP`; // Añadido CUP
    }
    
    function updateActiveNavLink() {
        let currentSectionId = 'hero'; 
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 80) { 
                currentSectionId = section.id;
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active-nav');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active-nav');
            }
        });
    }

    // --- Lógica de Productos y Menú ---
    function renderProducts() {
        const renderCategory = (container, categoryProducts, productType) => {
            container.innerHTML = '';
            categoryProducts.forEach(product => {
                container.innerHTML += `
                    <div class="menu-card bg-white p-4 md:p-6 rounded-lg shadow-lg flex flex-col justify-between">
                        <div>
                            <img src="${product.image}" alt="[Imagen de ${product.name}]" class="w-full h-40 md:h-48 object-cover rounded-md mb-4" onerror="this.onerror=null;this.src='https://placehold.co/600x400/CCCCCC/FFFFFF?text=Imagen+no+disponible';">
                            <h4 class="text-lg md:text-xl font-semibold mb-2 text-gray-800">${product.name}</h4>
                            <p class="text-gray-600 text-sm mb-3">${product.description || ''}</p>
                        </div>
                        <div class="flex justify-between items-center mt-auto">
                            <span class="text-md md:text-lg font-bold text-primary">${formatPrice(product.price)}</span>
                            <button class="add-to-cart-btn bg-green-500 text-white px-3 py-2 md:px-4 md:py-2 rounded-md hover:bg-green-600 text-xs md:text-sm" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-type="${productType}">
                                Agregar <i class="fas fa-cart-plus ml-1"></i>
                            </button>
                        </div>
                    </div>
                `;
            });
        };

        renderCategory(napolitanasContainer, products.pizzasNapolitanas, 'pizza');
        renderCategory(familiaresContainer, products.pizzasFamiliares, 'pizza');
        renderCategory(bebidasContainer, products.bebidas, 'bebida');
        renderCategory(agregadosContainer, products.agregados, 'agregado');
        renderCategory(otrosContainer, products.otros, 'otros');
        
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', handleAddToCart);
        });
    }

    // --- Lógica del Carrito ---
    function handleAddToCart(event) {
        const id = event.target.dataset.id;
        const name = event.target.dataset.name;
        const price = parseFloat(event.target.dataset.price);
        const type = event.target.dataset.type;

        // CORRECCIÓN: Verificar si el precio es un número válido antes de añadir al carrito.
        if (isNaN(price)) {
            console.error('Invalid price for product:', name, event.target.dataset.price);
            showToast(`Error: El producto "${name}" tiene un precio inválido.`, 'error');
            return; // Detiene la ejecución si el precio no es un número
        }

        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id, name, price, quantity: 1, type });
        }
        renderCart();
        showToast(`${name} agregado al carrito!`, 'success');
    }

    function updateCartItemQuantity(id, change) {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                cart = cart.filter(cartItem => cartItem.id !== id);
            }
        }
        renderCart();
    }

    function renderCart() {
        // CORRECCIÓN: Filtrar cualquier item corrupto (con precio o cantidad inválidos) del carrito.
        const originalCount = cart.length;
        cart = cart.filter(item => !isNaN(parseFloat(item.price)) && !isNaN(parseInt(item.quantity, 10)));
        if (cart.length < originalCount) {
            console.warn('Removed corrupted items from cart.');
            showToast('Se eliminaron artículos con datos inválidos del carrito.', 'error');
        }

        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            checkoutButton.disabled = true;
        } else {
            emptyCartMessage.style.display = 'none';
            checkoutButton.disabled = false;
            cart.forEach(item => {
                cartItemsContainer.innerHTML += `
                    <div class="flex justify-between items-center py-3 border-b">
                        <div>
                            <p class="font-semibold text-gray-800">${item.name}</p>
                            <p class="text-sm text-gray-500">${formatPrice(item.price)} x ${item.quantity}</p>
                        </div>
                        <div class="flex items-center">
                             <button class="quantity-change-btn text-accent-red hover:text-red-700 px-2 py-1 rounded" data-id="${item.id}" data-change="-1"><i class="fas fa-minus-circle"></i></button>
                             <span class="mx-2 text-gray-800">${item.quantity}</span>
                             <button class="quantity-change-btn text-green-500 hover:text-green-700 px-2 py-1 rounded" data-id="${item.id}" data-change="1"><i class="fas fa-plus-circle"></i></button>
                             <span class="ml-4 font-bold text-gray-800">${formatPrice(item.price * item.quantity)}</span>
                        </div>
                    </div>
                `;
            });
        }
        
        document.querySelectorAll('.quantity-change-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.id; 
                const change = parseInt(e.currentTarget.dataset.change);
                updateCartItemQuantity(id, change);
            });
        });

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // CORRECCIÓN: Asegurarse de que el total sea un número antes de mostrarlo y habilitar el botón.
        if (isNaN(total)) {
            cartTotalElement.textContent = 'Error';
            checkoutButton.disabled = true;
        } else {
            cartTotalElement.textContent = formatPrice(total);
            checkoutButton.disabled = cart.length === 0;
        }

        cartCountFab.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    function openCartModal() {
        renderCart();
        cartModal.style.display = 'flex';
    }

    function closeCartModal() {
        cartModal.style.display = 'none';
    }

    // --- Lógica de Pedidos y WhatsApp ---
    function showOrderForm() {
        // CORRECCIÓN: Doble verificación para no proceder si el carrito está vacío o el total es inválido.
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (cart.length === 0 || isNaN(total)) {
            showToast('Tu carrito está vacío o el total es inválido.', 'error');
            return;
        }
        closeCartModal();
        hideAllSections();
        orderFormSection.classList.remove('hidden');
        window.scrollTo(0, orderFormSection.offsetTop - 80); 

        orderSummaryElement.innerHTML = cart.map(item => `
            <p>${item.name} (x${item.quantity}) - ${formatPrice(item.price * item.quantity)}</p>
        `).join('');
        
        orderTotalFormElement.textContent = formatPrice(total);
        orderIdFormElement.textContent = generateOrderId();
        direccionInput.value = '';
        telefonoInput.value = '';
    }
    
    orderForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const orderId = orderIdFormElement.textContent;
        const address = direccionInput.value.trim();
        const phone = telefonoInput.value.trim();
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        if (!address || !phone) {
            showToast('Por favor, completa la dirección y tu teléfono.', 'error');
            return;
        }

        const newOrder = {
            id: orderId,
            items: [...cart], 
            total: total,
            address: address,
            phone: phone,
            status: 'Enviado a WhatsApp', 
            timestamp: new Date().toLocaleString()
        };
        
        allOrders.push(newOrder); 
        sendOrderViaWhatsApp(newOrder);
    });
    
    function sendOrderViaWhatsApp(order) {
        let message = `*Nuevo Pedido de Pizzería Colonizadores*\n\n`;
        message += `*ID Pedido:* ${order.id}\n`;
        message += `*Cliente (Teléfono):* ${order.phone}\n`;
        message += `*Dirección de Entrega:* ${order.address}\n\n`;
        message += "*Items del Pedido:*\n";
        order.items.forEach(item => {
            message += `- ${item.name} (x${item.quantity}) - ${formatPrice(item.price * item.quantity)}\n`;
        });
        message += `\n*Total del Pedido:* ${formatPrice(order.total)}\n\n`;
        message += `-----------------------------------\n`;
        message += `Por favor, confirmar recepción del pedido.\n`;
        message += `Tiempo estimado de entrega: 35 minutos (aprox).`;

        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        showToast('Serás redirigido a WhatsApp para enviar tu pedido. ¡Gracias!', 'success');
        
        cart = [];
        renderCart();
        orderForm.reset();
        setTimeout(() => {
            showSection('menu'); 
        }, 1500);
        renderAdminOrders(); 
        
    }

    // --- Lógica del Panel de Administración (Simulado) ---
    adminLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('admin-password').value;
        if (password === ADMIN_PASSWORD) {
            adminLoginSection.classList.add('hidden');
            adminDashboard.classList.remove('hidden');
            renderAdminOrders();
            showToast('Acceso de administrador concedido.', 'success');
        } else {
            showToast('Contraseña de administrador incorrecta.', 'error');
        }
        adminLoginForm.reset();
    });

    function renderAdminOrders() {
        adminOrdersList.innerHTML = '';
        if (allOrders.length === 0) {
            adminOrdersList.innerHTML = '<p class="text-gray-600">No hay pedidos registrados en esta sesión.</p>';
            return;
        }
        
        let tableHtml = `
            <table class="min-w-full bg-white border border-gray-300">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">ID Pedido</th>
                        <th class="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Tel. Cliente</th>
                        <th class="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Dirección</th>
                        <th class="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Total</th>
                        <th class="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Estado (Manual)</th>
                        <th class="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Fecha</th>
                        <th class="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Ver Items</th>
                    </tr>
                </thead>
                <tbody>
        `;

        allOrders.slice().reverse().forEach(order => { 
            tableHtml += `
                <tr class="hover:bg-gray-50">
                    <td class="py-2 px-4 border-b text-sm text-gray-700">${order.id}</td>
                    <td class="py-2 px-4 border-b text-sm text-gray-700">${order.phone}</td>
                    <td class="py-2 px-4 border-b text-sm text-gray-700">${order.address}</td>
                    <td class="py-2 px-4 border-b text-sm text-gray-700">${formatPrice(order.total)}</td>
                    <td class="py-2 px-4 border-b text-sm">
                        <select data-order-id="${order.id}" class="admin-order-status-select p-1 border rounded-md text-xs ${
                            order.status === 'Entregado' ? 'bg-green-100 text-green-700' : 
                            order.status === 'Confirmado (cocina)' ? 'bg-blue-100 text-blue-700' :
                            order.status === 'Cancelado' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'}">
                            <option value="Enviado a WhatsApp" ${order.status === 'Enviado a WhatsApp' ? 'selected' : ''}>Enviado a WhatsApp</option>
                            <option value="Confirmado (cocina)" ${order.status === 'Confirmado (cocina)' ? 'selected' : ''}>Confirmado (cocina)</option>
                            <option value="En Camino" ${order.status === 'En Camino' ? 'selected' : ''}>En Camino</option>
                            <option value="Entregado" ${order.status === 'Entregado' ? 'selected' : ''}>Entregado</option>
                            <option value="Cancelado" ${order.status === 'Cancelado' ? 'selected' : ''}>Cancelado</option>
                        </select>
                    </td>
                    <td class="py-2 px-4 border-b text-sm text-gray-700">${order.timestamp}</td>
                    <td class="py-2 px-4 border-b text-sm">
                        <button class="text-blue-500 hover:underline text-xs view-order-details-admin" data-order-id="${order.id}">Detalles</button>
                    </td>
                </tr>
            `;
        });
        tableHtml += `</tbody></table>`;
        adminOrdersList.innerHTML = tableHtml;

        document.querySelectorAll('.admin-order-status-select').forEach(select => {
            select.addEventListener('change', (e) => {
                const orderId = e.target.dataset.orderId;
                const newStatus = e.target.value;
                const order = allOrders.find(o => o.id === orderId);
                if (order) {
                    order.status = newStatus;
                    showToast(`Estado del pedido ${orderId} actualizado a ${newStatus}.`, 'success');
                    e.target.className = `admin-order-status-select p-1 border rounded-md text-xs ${
                            newStatus === 'Entregado' ? 'bg-green-100 text-green-700' : 
                            newStatus === 'Confirmado (cocina)' ? 'bg-blue-100 text-blue-700' :
                            newStatus === 'Cancelado' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'}`;
                }
            });
        });
        
        document.querySelectorAll('.view-order-details-admin').forEach(button => {
            button.addEventListener('click', (e) => {
                const orderId = e.target.dataset.orderId;
                const order = allOrders.find(o => o.id === orderId);
                if (order) {
                    const itemsDetails = order.items.map(item => `${item.name} (x${item.quantity}) - ${formatPrice(item.price * item.quantity)}`).join('\n');
                    const detailMessage = `Detalles del Pedido #${order.id}:\n\nCliente (Tel): ${order.phone}\nDirección: ${order.address}\nTotal: ${formatPrice(order.total)}\nEstado Actual: ${order.status}\n\nItems:\n${itemsDetails}`;
                    alert(detailMessage); 
                }
            });
        });
    }
    
    // --- Navegación y Visibilidad de Secciones ---
    function hideAllSections() {
        orderFormSection.classList.add('hidden');
        adminSection.classList.add('hidden');
    }

    function showSection(sectionId) {
        hideAllSections(); 
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
            sectionElement.classList.remove('hidden');
            window.scrollTo({ top: sectionElement.offsetTop - 70, behavior: 'smooth' });
        }

        if (sectionId === 'menu' || sectionId === 'hero') {
            document.getElementById('hero').classList.remove('hidden');
            document.getElementById('menu').classList.remove('hidden');
            document.getElementById('contacto').classList.remove('hidden');
            if (sectionId === 'hero') window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (sectionId === 'contacto') {
             document.getElementById('hero').classList.remove('hidden'); 
             document.getElementById('menu').classList.remove('hidden');
             document.getElementById('contacto').classList.remove('hidden');
        } else { 
            document.getElementById('hero').classList.add('hidden');
            document.getElementById('menu').classList.add('hidden');
            document.getElementById('contacto').classList.add('hidden');
            if (sectionElement) sectionElement.classList.remove('hidden');
        }
        updateActiveNavLink();
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            showSection(sectionId);
            if (mobileMenu.classList.contains('hidden') === false) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // --- Inicialización ---
    document.addEventListener('DOMContentLoaded', () => {
        renderProducts();
        renderCart();
        document.getElementById('current-year').textContent = new Date().getFullYear();
        showSection('hero'); 
        cartFab.addEventListener('click', openCartModal);
        closeCartModalButton.addEventListener('click', closeCartModal);
        checkoutButton.addEventListener('click', showOrderForm); 
        window.onclick = function(event) {
            if (event.target == cartModal) {
                closeCartModal();
            }
        }
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        window.addEventListener('scroll', updateActiveNavLink);
        updateActiveNavLink(); 
        loadDataFromLocalStorage();
        renderAdminOrders(); 
    });

    // --- Simulación de persistencia con localStorage ---
    function saveDataToLocalStorage() {
        localStorage.setItem('pizzeriaCart', JSON.stringify(cart));
        localStorage.setItem('pizzeriaAllOrders', JSON.stringify(allOrders));
    }

    function loadDataFromLocalStorage() {
        const storedCart = localStorage.getItem('pizzeriaCart');
        if (storedCart) cart = JSON.parse(storedCart);
        const storedOrders = localStorage.getItem('pizzeriaAllOrders');
        if (storedOrders) allOrders = JSON.parse(storedOrders);
        renderCart();
    }
    window.addEventListener('beforeunload', saveDataToLocalStorage);