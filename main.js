import "./src/assets/all.scss";
import "bootstrap/dist/js/bootstrap.min.js";

// 下拉選單的 icon 變化效果
const dropdownEl = document.getElementById("productList");
const iconEl = document.getElementById("dropdownIcon");

dropdownEl.addEventListener("show.bs.dropdown", () => {
  iconEl.textContent = "keyboard_arrow_up";
});

dropdownEl.addEventListener("hide.bs.dropdown", () => {
  iconEl.textContent = "keyboard_arrow_down";
});

/* 登入登出狀態改變 - go */
const logoutBtn = document.getElementById("logoutBtn");
const logoutBtnMb = document.getElementById("logoutBtnMb");
// 登出按鈕點擊
function handleLogout() {
  localStorage.setItem("isLogin", "false");
  window.location.href = "index.html"; // 回首頁
  updateUI();
}

logoutBtn.addEventListener("click", handleLogout);
logoutBtnMb.addEventListener("click", handleLogout);

// 每次載入頁面時檢查狀態
const user = document.getElementById("userHeader");
const guest = document.getElementById("guestHeader");
function updateUI() {
  let login_state = localStorage.getItem("isLogin") === "true";
  if (login_state) {
    user.style.visibility = "visible";
    guest.style.display = "none";
    // user.style.display = "block";
  } else if (login_state == false) {
    guest.style.visibility = "visible";
    // guest.style.display = "block";
    user.style.display = "none";
  }
}
document.addEventListener("DOMContentLoaded", updateUI);
/* 登入登出狀態改變 - end */
