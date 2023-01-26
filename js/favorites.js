let favContainer = document.querySelector(".favProducts");
let alertMsg = document.querySelector(".alert");

function drawUiProducts(cartItems = []) {
  let product = cartItems?.map((prod) => {
    return `<div class="product">
      <img src="${prod.img}" alt="image" />
      <div class="info">
        <h3 class="name">${prod.name}</h3>
        <h4 class="title">${prod.title}</h4>
        <h4>quantity ${prod.quantity}</h4>
        <div class="btns">
          <button onclick="removeFromFav(${prod.id})" class="remove">remove from Favorites</button>
        </div>
      </div>
    </div>
 `;
  });

  favContainer.innerHTML =
    product?.join("") ||
    `<h3 class="noProds">Your Favorite Cart is empty!</h3>`;
}

drawUiProducts(JSON.parse(localStorage.getItem("lovedProducts")));

let removeFromFav = (id) => {
  let allProducts = JSON.parse(localStorage.getItem("allProducts")) || products;
  let lovedProducts = JSON.parse(localStorage.getItem("lovedProducts")) || [];
  let removedItems = lovedProducts.filter((product) => {
    return product.id !== id;
  });
  let chosenProd = allProducts?.find((item) => item?.id === id);
  let checkInLovedProds = lovedProducts?.some(
    (item) => item.id === chosenProd?.id
  );
  if (checkInLovedProds) {
    let newProducts = allProducts?.map((item) => {
      if (item.liked === chosenProd.liked) {
        chosenProd.liked = false;
      }
      return item;
    });
    localStorage.setItem("allProducts", JSON.stringify(newProducts));
  }

  //alert msg
  alertMsg.classList.add("active");
  alertMsg.innerHTML = "<p>removed from cart</p>";
  setTimeout(() => {
    alertMsg.classList.remove("active");
  }, 500);

  localStorage.setItem("lovedProducts", JSON.stringify(removedItems));
  drawUiProducts(removedItems);

  //reset menu
  resetMenu();
};
