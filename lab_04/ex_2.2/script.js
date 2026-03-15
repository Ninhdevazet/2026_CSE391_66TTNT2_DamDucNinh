const prices = {
  "Áo thun": 150000,
  "Quần jean": 300000,
  "Giày sneaker": 500000,
};

const form = document.getElementById("orderForm");
const product = document.getElementById("product");
const quantity = document.getElementById("quantity");
const deliveryDate = document.getElementById("deliveryDate");
const address = document.getElementById("address");
const notes = document.getElementById("notes");
const paymentRadios = document.querySelectorAll('input[name="payment"]');
const charCount = document.getElementById("charCount");
const totalPriceEl = document.getElementById("totalPrice");
const confirmDialog = document.getElementById("confirmDialog");
const successMessage = document.getElementById("successMessage");

function showError(id, msg) {
  document.getElementById(id + "Error").textContent = msg;
}

function clearError(id) {
  document.getElementById(id + "Error").textContent = "";
}

function calcTotal() {
  const prodName = product.value;
  const qty = parseInt(quantity.value) || 0;
  let total = 0;

  if (prodName !== "" && qty > 0) {
    total = prices[prodName] * qty;
  }
  totalPriceEl.textContent = total.toLocaleString("vi-VN");
  return total;
}

function valProduct() {
  if (product.value === "") {
    showError("product", "Vui lòng chọn sản phẩm.");
    return false;
  }
  clearError("product");
  return true;
}

function valQuantity() {
  const val = parseInt(quantity.value);
  if (isNaN(val) || val < 1 || val > 99) {
    showError("quantity", "Số lượng phải từ 1 đến 99.");
    return false;
  }
  clearError("quantity");
  return true;
}

function valDate() {
  const val = deliveryDate.value;
  if (val === "") {
    showError("deliveryDate", "Vui lòng chọn ngày giao hàng.");
    return false;
  }

  const inputDate = new Date(val);
  inputDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 30);

  if (inputDate < today) {
    showError("deliveryDate", "Không được chọn ngày trong quá khứ.");
    return false;
  }
  if (inputDate > maxDate) {
    showError("deliveryDate", "Chỉ được giao trong vòng 30 ngày tới.");
    return false;
  }

  clearError("deliveryDate");
  return true;
}

function valAddress() {
  if (address.value.trim().length < 10) {
    showError("address", "Địa chỉ giao hàng phải từ 10 ký tự.");
    return false;
  }
  clearError("address");
  return true;
}

function valNotes() {
  const len = notes.value.length;
  if (len > 200) {
    showError("notes", "Ghi chú không được vượt quá 200 ký tự.");
    charCount.classList.add("text-red");
    return false;
  }
  clearError("notes");
  charCount.classList.remove("text-red");
  return true;
}

function valPayment() {
  let checked = false;
  for (let i = 0; i < paymentRadios.length; i++) {
    if (paymentRadios[i].checked) {
      checked = true;
      break;
    }
  }
  if (!checked) {
    showError("payment", "Vui lòng chọn phương thức thanh toán.");
    return false;
  }
  clearError("payment");
  return true;
}

product.addEventListener("change", function () {
  clearError("product");
  calcTotal();
});
product.addEventListener("blur", valProduct);

quantity.addEventListener("input", function () {
  clearError("quantity");
  calcTotal();
});
quantity.addEventListener("blur", valQuantity);

deliveryDate.addEventListener("input", function () {
  clearError("deliveryDate");
});
deliveryDate.addEventListener("blur", valDate);

address.addEventListener("input", function () {
  clearError("address");
});
address.addEventListener("blur", valAddress);

notes.addEventListener("input", function () {
  charCount.textContent = notes.value.length + "/200";
  valNotes();
});
notes.addEventListener("blur", valNotes);

for (let i = 0; i < paymentRadios.length; i++) {
  paymentRadios[i].addEventListener("change", function () {
    clearError("payment");
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const isPValid = valProduct();
  const isQValid = valQuantity();
  const isDValid = valDate();
  const isAValid = valAddress();
  const isNValid = valNotes();
  const isPayValid = valPayment();

  if (isPValid && isQValid && isDValid && isAValid && isNValid && isPayValid) {
    document.getElementById("summaryProduct").textContent = product.value;
    document.getElementById("summaryQuantity").textContent = quantity.value;
    document.getElementById("summaryTotal").textContent =
      calcTotal().toLocaleString("vi-VN");

    const dateParts = deliveryDate.value.split("-");
    document.getElementById("summaryDate").textContent =
      dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0];

    form.classList.add("hidden");
    confirmDialog.classList.remove("hidden");
  }
});

document.getElementById("btnConfirm").addEventListener("click", function () {
  confirmDialog.classList.add("hidden");
  successMessage.classList.remove("hidden");
});

document.getElementById("btnCancel").addEventListener("click", function () {
  confirmDialog.classList.add("hidden");
  form.classList.remove("hidden");
});
