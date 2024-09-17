// Get the cart from localStorage or create an empty array if it doesn't exist
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to display cart items in the cart.html page
function displayCartItems() {
    const cartTableBody = document.querySelector('#cart-table tbody');
    const cartTotal = document.querySelector('#cart-total');
    cartTableBody.innerHTML = ''; // Clear existing items
    let totalCost = 0;

    if (cart.length === 0) {
        // If the cart is empty, show a message
        cartTableBody.innerHTML = '<tr><td colspan="5">Your cart is empty</td></tr>';
    } else {
        // Iterate through the cart and display each item
        cart.forEach((item, index) => {
            const itemTotal = parseInt(item.price.replace(' Rs', '')) * item.quantity;
            totalCost += itemTotal;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td><a href="${item.link}">${item.name}</a></td>
                <td>${item.price}</td>
                <td>${item.quantity}</td>
                <td>${itemTotal} Rs</td>
                <td><button class="remove-from-cart" data-index="${index}">Remove</button></td> <!-- Added Remove button -->
            `;
            cartTableBody.appendChild(row);
        });
    }

    // Update the total cost in the cart
    cartTotal.innerText = totalCost + ' Rs';

    // Add event listeners for remove buttons
    const removeButtons = document.querySelectorAll('.remove-from-cart');
    removeButtons.forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

// Function to remove a product from the cart
function removeFromCart(event) {
    const index = event.target.getAttribute('data-index');
    cart.splice(index, 1); // Remove item from the cart array

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Redisplay the cart items
    displayCartItems();
}

// Call the displayCartItems function when the page loads
document.addEventListener('DOMContentLoaded', displayCartItems);

// Function to add products to the cart from the products.html page
function addToCart(event) {
    const productCard = event.target.parentElement;
    const productName = productCard.querySelector('h3').innerText;
    const productPrice = productCard.querySelector('p').innerText;
    const productLink = productCard.querySelector('a') ? productCard.querySelector('a').href : window.location.href;

    // Check if the product already exists in the cart
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        // If the product exists, increase its quantity
        existingProduct.quantity += 1;
    } else {
        // Add a new product to the cart
        cart.push({
            name: productName,
            price: productPrice,
            link: productLink,
            quantity: 1
        });
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Alert the user that the product has been added to the cart
    alert(`${productName} has been added to your cart.`);
}

// Add event listeners for all "Add to Cart" buttons on the products page
const addToCartButtons = document.querySelectorAll('.add-to-cart');

if (addToCartButtons.length > 0) {
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Function to clear the cart (optional)
function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}
