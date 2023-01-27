let singleProd = document.querySelector(".single-product");
let productId = localStorage.getItem("productId");

(function drawUiProduct(id) {
  if (id) {
    let allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];
    let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
    console.log(id, cartItems);
    let checkInProd = cartItems?.some((item) => item?.id === parseInt(id));
    let product = checkInProd
      ? cartItems?.find((item) => item?.id === parseInt(id))
      : allProducts?.find((item) => item?.id === parseInt(id));
    singleProd.innerHTML = `<div onclick=saveIdToStorage(${product.id})>
      <img src="${product.img}" alt="image"/>
      <h3>${product.name}</h3>
      <h4>${product.title}</h4>
      <p>${product.size}</p>
      <h5>Quantity ${product.quantity}</h5>
    </div>
 `;
  }
})(productId);
