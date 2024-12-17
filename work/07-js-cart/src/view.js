import { state } from './model.js';


function renderProduct(product) {
  return `
    <div class="product">
      <img src="${product.image}" alt="${product.name}" style="width: 150px; height: 150px;">
      <h2>${product.name}</h2>
      <p>$${product.price.toFixed(2)}</p>
      <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
    </div>
  `;
} // Render individual product item


export function renderProductPage() {
  const productPage = document.getElementById('product-page');
  productPage.innerHTML = state.products.map(renderProduct).join('');
}


function renderCartItem(item) {
  return `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" width="50" height="50">
      <span>${item.name} ($${item.price.toFixed(2)})</span>
      <input class="quantity-input" data-id="${item.id}" type="number" min="0" value="${item.quantity}">
      <span>Total: $${(item.price * item.quantity).toFixed(2)}</span>
      <button class="remove-item" data-id="${item.id}">remove</button>
    </div>
  `;
}


export function renderCart() {
  const cartDiv = document.getElementById('cart');
  cartDiv.innerHTML = `<p>Entered Render</p>`;
  if (state.cart.length === 0) {
    cartDiv.innerHTML = `<p>Nothing in the cart</p>`;
    return;
  }

  const cartItems = state.cart.map(renderCartItem).join('');
  const totalPrice = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);

  cartDiv.innerHTML = `
    <h2>Your Cart</h2>
    ${cartItems}
    <p>Total Price: $${totalPrice}</p>
    <button id="checkout">Checkout</button>
    <button id="hide-cart">Hide Cart</button>
  `;
}