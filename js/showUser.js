let storedUser = JSON.parse(localStorage.getItem("user"));
let header = document.querySelector("header");
let cartItems = JSON.parse(localStorage.getItem("productsInCart")) || [];

// calc cart items
function calcQuantity(items) {
  let { quantity } = items?.reduce(
    (total, item) => {
      total.quantity += item?.quantity;
      return total;
    },
    { quantity: 0 }
  );
  return quantity;
}

(function checkUser() {
  if (storedUser?.username && storedUser?.userPassword) {
    header.querySelector("nav").remove();
    let newNav = document.createElement("nav");
    let user = document.createElement("a");
    let logOut = document.createElement("a");
    let cartItem = document.createElement("a");
    let favorite = document.createElement("a");
    let cartIcon = document.createElement("a");
    let amount = document.createElement("span");

    user.setAttribute("href", "../pages/profile.html");
    user.target = "_blank";

    logOut.href = "#";
    user.textContent = storedUser.username;
    logOut.textContent = "Logout";

    cartIcon.innerHTML = `<i class="fas fa-shopping-cart"></i>`;
    cartIcon.classList.add("cartIcon");
    amount.classList.add("badge");

    cartItem.href = "../pages/cart.html";
    favorite.href = "../pages/favorites.html";

    cartItem.target = "_blank";
    favorite.target = "_blank";
    cartItem.innerHTML = "cart";
    favorite.textContent = "Favorites";

    cartIcon.append(amount);
    newNav.append(favorite, cartIcon, cartItem, user, logOut);
    header.append(newNav);
    amount.textContent = calcQuantity(cartItems) || 0;

    function logout() {
      setTimeout(() => {
        localStorage.clear();
        window.location = "../pages/register.html";
      }, 1500);
    }
    logOut.addEventListener("click", logout);
  }
})();
