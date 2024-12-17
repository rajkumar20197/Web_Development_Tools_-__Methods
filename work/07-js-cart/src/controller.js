import { addToCart, updateCartQuantity, clearCart } from './model.js';
import { renderProductPage, renderCart } from './view.js';

export function initializeApp() {
  renderProductPage();
  setupEventListeners();
}

function setupEventListeners() {
  document.body.addEventListener('click', handleClick);
  document.body.addEventListener('change', handleChange);
}

function handleClick(event) {
  const { target } = event;

  if (target.classList.contains('add-to-cart')) {
    const productId = parseInt(target.dataset.id, 10);
    addToCart(productId);
    renderProductPage();
    renderCart();
  } else if (target.id === 'view-cart') {
    renderCart();
    document.getElementById('cart').style.display = 'block';
  } else if (target.classList.contains('remove-item')) {
    const productId = parseInt(target.dataset.id, 10);
    updateCartQuantity(productId, 0);
    renderCart();
  } else if (target.id === 'hide-cart') {
    document.getElementById('cart').style.display = 'none';
  } else if (target.id === 'checkout') {
    clearCart();
    document.getElementById('cart').style.display = 'none';
    renderProductPage();
  }
}

function handleChange(event) {
  if (event.target.classList.contains('quantity-input')) {
    const productId = parseInt(event.target.dataset.id, 10);
    const quantity = parseInt(event.target.value, 10);
    updateCartQuantity(productId, quantity);
    renderCart();
  }
}
