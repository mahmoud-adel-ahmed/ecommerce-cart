const username = document.querySelector("input[type=text]");
const userPassword = document.querySelector("input[type=password]");
const signIn = document.querySelector("button[type=submit]");
let validateInputEmail = document.querySelector(".emailMsgErr");
let validateInputName = document.querySelector(".nameMsgErr");
let validateInputPass = document.querySelector(".passMsgErr");
let user = JSON.parse(localStorage.getItem("user"));

window.onload = function () {
  username.value = "";
  userPassword.value = "";
};

function proceedToProducts(username, userPassword) {
  if (user?.username === username && user?.userPassword === userPassword) {
    setTimeout(() => {
      window.location = "../index.html";
    }, 1500);
    resetMenu();
  } else if (
    user?.username !== username ||
    user?.userPassword !== userPassword
  ) {
    resetMenu();
    if (!username) {
      validate(validateInputName, "please fill in your name!");
    } else {
      if (user.username !== username) {
        validate(validateInputName, "incorrect username!");
      }
    }
    if (!userPassword) {
      validate(validateInputPass, "please fill in your password!");
    } else {
      if (user.userPassword !== userPassword) {
        validate(validateInputPass, "incorrect password!");
      }
    }
  }
}

signIn.addEventListener("click", (e) => {
  proceedToProducts(username.value.trim(), userPassword.value.trim());
  e.preventDefault();
});

function validate(node, msg) {
  node.style.display = "block";
  node.textContent = msg;
}

function clearMsg(node) {
  node.style.display = "none";
}

username.addEventListener("keyup", function () {
  resetMenu();
  this.value && clearMsg(validateInputName);
});
userPassword.addEventListener("keyup", function () {
  resetMenu();
  this.value && clearMsg(validateInputPass);
});

username.addEventListener("cut", function () {
  resetMenu();
  this.value && clearMsg(validateInputName);
});

userPassword.addEventListener("cut", function () {
  this.value && clearMsg(validateInputPass);
});
