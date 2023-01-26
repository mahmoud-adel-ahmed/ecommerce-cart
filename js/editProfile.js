let userInStorage = JSON.parse(localStorage.getItem("user"));
const username = document.querySelector("#name");
const userEmail = document.querySelector("#email");
const userPassword = document.querySelector("#password");
let UpdateBtn = document.querySelector(".update");

if (userInStorage) {
  userEmail.value = userInStorage?.userEmail;
  username.value = userInStorage?.username;
  userPassword.value = userInStorage?.userPassword;
} else {
  window.location = "../pages/register.html";
}

function updateUser(userEmail, username, userPassword) {
  userInStorage.userEmail = userEmail;
  userInStorage.username = username;
  userInStorage.userPassword = userPassword;
  localStorage.setItem("user", JSON.stringify(userInStorage));

  setTimeout(() => {
    window.location = "../pages/profile.html";
  }, 1500);
}

UpdateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  updateUser(
    userEmail.value.trim(),
    username.value.trim(),
    userPassword.value.trim()
  );
});
