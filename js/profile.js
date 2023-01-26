let userInStorage = JSON.parse(localStorage.getItem("user"));
let EditBtn = document.querySelector(".edit");

const username = document.querySelector(".name");
const userEmail = document.querySelector(".email");

(function viewProfile() {
  if (userInStorage) {
    userEmail.textContent = `Email: ${userInStorage?.userEmail}`;
    username.textContent = `Name: ${userInStorage?.username}`;
  } else {
    window.location = "../pages/register.html";
  }
})();

EditBtn.addEventListener("click", () => {
  setTimeout(() => {
    window.location = "../pages/editProfile.html";
  }, 1500);
});
