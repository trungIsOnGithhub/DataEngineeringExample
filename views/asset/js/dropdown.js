function myFunction(ev) {
  document.getElementById("myDropdown").classList.toggle("show");
  ev.stopPropagation()
}

function filterFunction() {
  var input, filter, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

function changeInput(ev) {
  ev.preventDefault()
  const dropInput = document.querySelector(".drop")

  dropInput.value = ev.target.innerText
}

document.querySelector(".content").addEventListener("click", (ev) => {
  document.getElementById("myDropdown").classList.remove("show");
})

document.querySelector(".dropdown-content").addEventListener("click", (ev) => {
  ev.stopPropagation()
})