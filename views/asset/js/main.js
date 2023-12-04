const subInfo = document.querySelector(".user_info--hidden")
const userInfo = document.querySelector(".user_info")
const content = document.querySelector(".content")

function showSubInfo() {
  subInfo.classList.toggle("show")
}

function hideSubInfo() {
  subInfo.classList.remove("show")
}

userInfo.addEventListener("click", showSubInfo)
content.addEventListener("click", hideSubInfo)

function incCurPage() {
  const max = document.querySelector(".total").innerHTML
  const input = document.querySelector(".current_page input")

  var curValue = input.attributes.value.value
  var nextValue = parseInt(curValue) + 1
  if(nextValue <= parseInt(max)) {
    input.attributes.value.value = nextValue
  }
}

function decCurPage() {
  const input = document.querySelector(".current_page input")

  var curValue = input.attributes.value.value
  var nextValue = parseInt(curValue) - 1
  if(nextValue > 0) {
    input.attributes.value.value = nextValue
  }
}