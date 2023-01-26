let productName = document.querySelector("#product-name");
let productDesc = document.querySelector("#product-desc");
let productSize = document.querySelector("#product-size");
let imageInp = document.querySelector("#upload_image");
let submitProduct = document.querySelector("#create-product");
let allProducts = JSON.parse(localStorage.getItem("allProducts")) || products;
let validateInputImg = document.querySelector(".validateImg");
let validateInputName = document.querySelector(".validateName");
let validateInputDesc = document.querySelector(".validateDesc");
let validateInputSelect = document.querySelector(".validateSelect");

let productImage;
function createProduct(productName, productDesc, productSize, imageUrl) {
  if (!productName.value) {
    validate(validateInputName, "please fill in your productName!");
  }

  if (!productDesc.value) {
    validate(validateInputDesc, "please fill in your productDesc!");
  }

  if (!productSize.value) {
    validate(validateInputSelect, "please fill in your productSize!");
  }

  if (!imageUrl) {
    validate(validateInputImg, "please upload image!");
  }

  if (productName.value && productDesc.value && productSize.value && imageUrl) {
    let newProduct = {
      img: imageUrl,
      name: productName.value,
      id: allProducts.length + 1,
      title: productDesc.value,
      quantity: 1,
      size: productSize.value,
      isMe: true,
    };
    let newProducts = [...allProducts, newProduct];
    localStorage.setItem("allProducts", JSON.stringify(newProducts));
    productName.value = "";
    productDesc.value = "";
    productSize.value = "";

    setTimeout(() => {
      window.location = "../index.html";
    }, 1500);
  }
}

submitProduct.addEventListener("click", (e) => {
  e.preventDefault();
  createProduct(productName, productDesc, productSize, productImage);
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
  e.target.files[0] && clearMsg(validateInputImg);
  uploadImg(e);
});

function validate(node, msg) {
  node.style.display = "block";
  node.textContent = msg;
}

function clearMsg(node) {
  node.style.display = "none";
}

productName.addEventListener("keyup", function () {
  this.value && clearMsg(validateInputName);
});

productDesc.addEventListener("keyup", function () {
  this.value && clearMsg(validateInputDesc);
});

productSize.addEventListener("change", function () {
  this.value && clearMsg(validateInputSelect);
});
