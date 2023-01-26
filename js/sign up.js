const username = document.querySelector("input[type=text]");
const userEmail = document.querySelector("input[type=email]");
const userPassword = document.querySelector("input[type=password]");
let signUp = document.querySelector("button[type=submit]");
let validateInputEmail = document.querySelector(".emailMsgErr");
let validateInputName = document.querySelector(".nameMsgErr");
let validateInputPass = document.querySelector(".passMsgErr");
window.onload = function () {
  username.value = "";
  userEmail.value = "";
  userPassword.value = "";
};

let emailRegx = /^([a-z\d\.-]+)@([a-z]{2,8})\.([a-z]{2,8})(\.[a-z]{2,8})?$/i;
function saveToStorage(userEmail, username, userPassword) {
  if (!emailRegx.test(userEmail) || !username || !userPassword) {
    validate(validateInputEmail, "invalid email!");
    if (!userEmail) {
      validate(validateInputEmail, "please fill in your email!");
    }

    if (!username) {
      validate(validateInputName, "please fill in your name!");
    }

    if (!userPassword) {
      validate(validateInputPass, "please fill in your password!");
    }
  } else if (emailRegx.test(userEmail) && username && userPassword) {
    let user = {
      userEmail,
      username,
      userPassword,
    };
    localStorage.setItem("user", JSON.stringify(user));
    setTimeout(() => {
      window.location = "../pages/login.html";
    }, 1500);
  }
  resetMenu();
}

signUp.addEventListener("click", (e) => {
  e.preventDefault();
  saveToStorage(
    userEmail.value.trim(),
    username.value.trim(),
    userPassword.value.trim()
  );
});

function validate(node, msg) {
  node.style.display = "block";
  node.textContent = msg;
}

function clearMsg(node) {
  node.style.display = "none";
}

userEmail.addEventListener("keyup", function () {
  resetMenu();
  this.value && clearMsg(validateInputEmail);
});

username.addEventListener("keyup", function () {
  resetMenu();
  this.value && clearMsg(validateInputName);
});

userPassword.addEventListener("keyup", function () {
  resetMenu();
  this.value && clearMsg(validateInputPass);
});

userEmail.addEventListener("cut", function () {
  resetMenu();
  this.value && clearMsg(validateInputEmail);
});

username.addEventListener("cut", function () {
  resetMenu();
  this.value && clearMsg(validateInputName);
});

userPassword.addEventListener("cut", function () {
  resetMenu();
  this.value && clearMsg(validateInputPass);
});
