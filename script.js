function goHome() {
    window.location.href = 'index.html';
}

function addToCart(name, price, image, id) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'cart.html';
}

document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCart(cart);

    function updateCart(cart) {
        const cartContainer = document.getElementById('cart-container');
        cartContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h2>${item.name}</h2>
                    <p class="price">$${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button onclick="changeQuantity('${item.id}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity('${item.id}', 1)">+</button>
                    </div>
                    <p>Total: $${itemTotal.toFixed(2)}</p>
                </div>
            `;
            cartContainer.appendChild(cartItem);
        });

        document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
    }

    window.changeQuantity = function(id, change) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                const index = cart.indexOf(item);
                cart.splice(index, 1);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart(cart);
        }
    }

    

    window.goBack = function() {
        window.location.href = 'index.html';
    }
    
});


