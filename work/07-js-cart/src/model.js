export const state = {
  products: [
    { id: 1, name: 'Jorts', price: 0.99, image: 'images/Jorts.jpg' },
    { id: 2, name: 'Jean', price: 3.14, image: 'images/Jean.jpg' },
    { id: 3, name: 'Nyancat', price: 2.73, image: 'images/Nyancat.jpg' },
  ],
  cart: [],
  totalitems: 0,
};


export function addToCart(productId) {
  const productInCart = state.cart.find(item => item.id === productId);       // Add a product to the cart or update quantity
  if (productInCart) {
    productInCart.quantity += 1;
  } else {
    const product = state.products.find(p => p.id === productId);
    state.cart.push({ ...product, quantity: 1 });
  }
  state.totalitems += 1;
  updateViewCartButton();
}


export function updateCartQuantity(productId, quantity) {
  const productInCart = state.cart.find(item => item.id === productId);         // Update the quantity of a cart item
  if (productInCart) {
    state.totalitems -= productInCart.quantity;
    productInCart.quantity = quantity;
    state.totalitems += quantity;
    if (productInCart.quantity <= 0) {
      state.cart = state.cart.filter(item => item.id !== productId);
    }
  }
  updateViewCartButton();
}
 

export function clearCart() {
  state.cart = [];
  state.totalitems = 0;
  updateViewCartButton();                                                       
                                                                                // Clear the cart (used during checkout)
}

export function updateViewCartButton() {
  const countSpan = document.querySelector('#view-cart .count') || document.createElement('span');
  let s = `(${state.totalitems})`;
  if(state.totalitems <= 0){
    s = "";
  } 
  countSpan.innerHTML = s;
}