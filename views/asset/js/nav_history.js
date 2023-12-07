const subInfo = document.querySelector(".user_info--hidden")
const userInfo = document.querySelector(".user_info")
const content = document.querySelector(".content")

function showSubInfo() {
  subInfo.classList.add("show")
}

function hideSubInfo() {
  subInfo.classList.remove("show")
}

userInfo.addEventListener("click", showSubInfo)
content.addEventListener("click", hideSubInfo)