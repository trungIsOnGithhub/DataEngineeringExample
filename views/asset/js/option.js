var payment_button = document.getElementById("make-payment"),
quantity = document.getElementById("quantity"),
verticalDir = document.getElementById("vertical"),
horizonDir = document.getElementById("horizontal"),
twoside = document.getElementById("twoside"),
oneside = document.getElementById("oneside");

function check_number_input(formValue) {
  if (isNaN(formValue)) {
    return false;
  }
  return quantity.value.length > 0 && quantity.value.length < 3;
}
payment_button.addEventListener('click', function() {
    if ( !(twoside.checked || oneside.checked)
                || !(verticalDir.checked || horizonDir.checked)
                || (twoside.checked && oneside.checked)
                || (verticalDir.checked && horizonDir.checked)
                || !check_number_input(quantity.value) ) {

            alert("Hãy Nhập Đầy Đủ Thông Tin Trang In Một Cách Hợp Lệ!!");
        }
    else {
        window.location.href='/success';
    }
});