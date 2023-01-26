let productName = document.querySelector("#product-name");
let productDesc = document.querySelector("#product-desc");
let productSize = document.querySelector("#product-size");
let imageInp = document.querySelector("#upload_image");
let submitUpdatedProduct = document.querySelector("#update-product");
let allProducts = JSON.parse(localStorage.getItem("allProducts")) || products;

let productImage;

let productToEditId = localStorage.getItem("productToEditId");

let productToEdit = allProducts.find(
  (item) => item.id === parseInt(productToEditId)
);

if (productToEdit) {
  productName.value = productToEdit.name;
  productDesc.value = productToEdit.title;
  productSize.value = productToEdit.size;
  productImage = productToEdit.img;
} else {
  window.location = "../pages/createProduct.html";
}

function updateProduct(productName, productDesc, productSize, imageUrl) {
  productToEdit.name = productName.value || productToEdit.name;
  productToEdit.title = productDesc.value || productToEdit.title;
  productToEdit.size = productSize.value || productToEdit.size;
  productToEdit.img = imageUrl || productToEdit.img;

  setTimeout(() => {
    window.location = "../index.html";
  }, 1500);

  localStorage.setItem("allProducts", JSON.stringify(allProducts));
}
submitUpdatedProduct.addEventListener("click", (e) => {
  e.preventDefault();
  updateProduct(productName, productDesc, productSize, productImage);
});

function uploadImg(e) {
  let file = e.target.files[0];
  if (!file?.type.includes("image/")) {
    alert("cannot upload this file type");
    return;
  }
  if (file?.size > 2 * 1024 * 1024) {
    alert("file size cannot exceeds 2MB");
    return;
  }
  getImageBase64(file);
}

function getImageBase64(file) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    productImage = reader.result; // imageURL
  };
  reader.onerror = function () {
    alert("failed to upload image");
  };
}

imageInp.addEventListener("change", (e) => {
  uploadImg(e);
});
