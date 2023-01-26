let singleProd = document.querySelector(".single-product");
let productId = localStorage.getItem("productId");
let allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];

(function drawUiProduct(id) {
  if (id) {
    let product = allProducts?.find((item) => item?.id === parseInt(id));
    singleProd.innerHTML = `<div class="product" onclick=saveIdToStorage(${product.id})>
      <img src="${product.img}" alt="image"/>
      <h3>${product.name}</h3>
      <h4>${product.title}</h4>
      <h5>Quantity ${product.quantity}</h5>
    </div>
 `;
  }
})(productId);
