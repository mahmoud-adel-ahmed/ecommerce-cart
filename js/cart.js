let cartContainer = document.querySelector(".cartProducts");
let allProducts = JSON.parse(localStorage.getItem("allProducts"));
let alertMsg = document.querySelector(".alert");

function drawUiProducts(cartItems = []) {
  let product = cartItems?.map((prod) => {
    return `<div class="product">
      <img src="${prod.img}" alt="image" />
      <div class="info">
        <h3 class="name">${prod.name}</h3>
        <h4 class="title">${prod.title}</h4>
        <h4 class="quantity">quantity ${prod.quantity}</h4>
        <div class="btns">
          <button onclick="removeFromCart(${prod.id})" class="remove">remove from cart</button>
        </div>
      </div>
    </div>
 `;
  });

  cartContainer.innerHTML =
    product?.join("") || `<h3 class="noProds">Your Cart is empty!</h3>`;
}

drawUiProducts(JSON.parse(localStorage.getItem("productsInCart")));

let removeFromCart = (id) => {
  let productsInStorage =
    JSON.parse(localStorage.getItem("productsInCart")) || [];
  let removedItems = productsInStorage.filter((product) => {
    if (product.id === id) {
      if (product.quantity <= 1) {
        return product.id !== id;
      }
      product.quantity--;
      return product;
    }
    return product;
  });

  //alert msg
  alertMsg.classList.add("active");
  alertMsg.innerHTML = "<p>removed from cart</p>";
  setTimeout(() => {
    alertMsg.classList.remove("active");
  }, 1000);

  // reset menu
  resetMenu();
  localStorage.setItem("productsInCart", JSON.stringify(removedItems));
  let newProducts = JSON.parse(localStorage.getItem("productsInCart"));
  drawUiProducts(newProducts);
};
