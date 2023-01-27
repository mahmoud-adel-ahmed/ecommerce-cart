let prodsContainer = document.querySelector(".products");
let alertMsg = document.querySelector(".alert");
let searchInput = document.querySelector(".searchProducts");
let filterTypes = document.querySelector(".select-filter");

function drawUiProducts(products = []) {
  let product = products?.map((prod) => {
    return `<div class="product" style="border:${
      prod.isMe ? "2px solid #2c5364" : ""
    }">
      <img src="${prod.img}" alt="image"  />
      <div class="info">
          <h3 class="name">
            <a href='../pages/cartDetails.html' target='_blank' 
            onclick="saveIdToStorage(${prod.id})">${prod.name}</a>
          </h3>
          <p class="title">${prod.title}</p>
          <h4>${prod.size}</h4>
          <div class="btns">
            <button onclick="addToCart(${
              prod.id
            })" class="add">add to cart</button>
            <button class="love">
              <i class="${
                prod.liked ? "iconColor fa" : "far"
              } fa-heart" onclick="addToFavorites(${prod.id})"></i>
            </button>
            ${
              prod.isMe
                ? `<button onclick='editProduct(${prod.id})' class="edit"><i class="fas fa-edit"></i></button><button onclick='removeProduct(${prod.id})' class="edit"><i class="fas fa-trash"></i></button>`
                : ""
            }
      </div>
      </div>
    </div>
 `;
  });
  prodsContainer.innerHTML =
    product?.join("") ||
    `<h3 class="noProds">Could not Find This Product!</h3>`;
}

drawUiProducts(JSON.parse(localStorage.getItem("allProducts")) || products);

// add to cart
function addToCart(id) {
  if (storedUser?.username) {
    let allProducts =
      JSON.parse(localStorage.getItem("allProducts")) || products;
    let badge = document.querySelector(".badge");
    let chosenProd = allProducts?.find((product) => product.id === id);
    let isProductInCart = cartItems.some((item) => item.id === chosenProd.id);
    if (isProductInCart) {
      cartItems = cartItems.map((item) => {
        if (item.id === chosenProd.id) item.quantity++;
        return item;
      });
    } else {
      cartItems.push(chosenProd);
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    let quantity = calcQuantity(cartItems);
    badge.textContent = quantity || 0;

    //alert msg
    alertMsg.classList.add("active");
    alertMsg.innerHTML = "<p>added to cart</p>";
    setTimeout(() => {
      alertMsg.classList.remove("active");
    }, 1000);

    resetMenu();

    return;
  }
  setTimeout(() => {
    window.location = "../pages/login.html";
  }, 1500);
}

function saveIdToStorage(id) {
  localStorage.setItem("productId", id);
}

//search
function searchProducts(productName) {
  let allProducts = JSON.parse(localStorage.getItem("allProducts")) || products;

  let newItems = allProducts?.filter(
    (item) =>
      item.name.includes(productName.toLowerCase()) ||
      item.size.includes(productName.toLowerCase())
  );

  productName === "all"
    ? drawUiProducts(allProducts)
    : drawUiProducts(newItems);
}

searchInput.addEventListener("input", function () {
  filterTypes.value = "";
  resetMenu();
  searchProducts(this.value.replace(/^\s+|\s+$/g, ""));
});

filterTypes?.addEventListener("change", function () {
  filterTypes.value = "";
  resetMenu();
  searchProducts(filterTypes.value);
});

// add to favs
let addToFavorite = JSON.parse(localStorage.getItem("lovedProducts")) || [];
function addToFavorites(id) {
  if (storedUser?.username) {
    let allProducts =
      JSON.parse(localStorage.getItem("allProducts")) || products;
    let chosenProd = allProducts?.find((item) => item.id === id);
    let checkProd = addToFavorite?.some((item) => item.id === chosenProd.id);
    if (checkProd) {
      addToFavorite = addToFavorite?.map((item) => {
        if (item.id === chosenProd.id) {
          item.liked = true;
        }
        return item;
      });
    } else {
      addToFavorite.push({ ...chosenProd, liked: true });
    }
    let newProducts = allProducts?.map((item) => {
      if (item?.id === chosenProd.id) {
        chosenProd.liked = true;
      }
      return item;
    });

    resetMenu();

    //alert msg
    alertMsg.classList.add("active");
    alertMsg.innerHTML = "<p>added to favorite</p>";
    setTimeout(() => {
      alertMsg.classList.remove("active");
    }, 1000);

    localStorage.setItem("lovedProducts", JSON.stringify(addToFavorite));
    localStorage.setItem("allProducts", JSON.stringify(newProducts));
    drawUiProducts(allProducts);
    return;
  }
  setTimeout(() => {
    window.location = "../pages/login.html";
  }, 1500);
}

// edit prod
function editProduct(id) {
  localStorage.setItem("productToEditId", id);
  setTimeout(() => {
    window.location = "../pages/editProduct.html";
  }, 1500);
}

// remove prod
function removeProduct(id) {
  let allProducts = JSON.parse(localStorage.getItem("allProducts")) || products;
  let lovedProducts = JSON.parse(localStorage.getItem("lovedProducts")) || [];
  let productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];

  let myProducts = allProducts.filter((item) => item.isMe === true);
  let chosenItem = myProducts.find((item) => item.id === id);
  let newProducts = allProducts.filter((item) => {
    if (chosenItem.id === item.id) {
      chosenItem.liked = false;
      return item.id !== chosenItem.id;
    }
    return item;
  });
  let checkProdinFav = lovedProducts.some((item) => item.id === chosenItem.id);
  if (checkProdinFav) {
    lovedProducts = lovedProducts.filter((item) => item.id !== chosenItem.id);
    localStorage.setItem("lovedProducts", JSON.stringify(lovedProducts));
  }

  let checkProdinCart = productsInCart.some(
    (item) => item.id === chosenItem.id
  );
  if (checkProdinCart) {
    productsInCart = cartItems.filter((item) => item.id !== chosenItem.id);
    localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
  }

  resetMenu();

  //alert msg
  alertMsg.classList.add("active");
  alertMsg.innerHTML = "<p>removed from cart</p>";
  setTimeout(() => {
    alertMsg.classList.remove("active");
  }, 1000);

  localStorage.setItem("allProducts", JSON.stringify(newProducts));
  drawUiProducts(newProducts);
}
