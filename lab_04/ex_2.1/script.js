const form = document.getElementById("registerForm");
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const terms = document.getElementById("terms");
const genderRadios = document.querySelectorAll('input[name="gender"]');

function showError(fieldId, message) {
  document.getElementById(fieldId + "Error").textContent = message;
}

function clearError(fieldId) {
  document.getElementById(fieldId + "Error").textContent = "";
}

function validateFullname() {
  const val = fullname.value.trim();
  const regex = /^[a-zA-ZÀ-ỹ\s]{3,}$/;
  if (val === "") {
    showError("fullname", "Họ tên không được trống.");
    return false;
  }
  if (!regex.test(val)) {
    showError(
      "fullname",
      "Họ tên phải từ 3 ký tự, chỉ chứa chữ và khoảng trắng.",
    );
    return false;
  }
  clearError("fullname");
  return true;
}

function validateEmail() {
  const val = email.value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (val === "") {
    showError("email", "Email không được trống.");
    return false;
  }
  if (!regex.test(val)) {
    showError("email", "Email sai định dạng.");
    return false;
  }
  clearError("email");
  return true;
}

function validatePhone() {
  const val = phone.value.trim();
  const regex = /^0\d{9}$/;
  if (val === "") {
    showError("phone", "Số điện thoại không được trống.");
    return false;
  }
  if (!regex.test(val)) {
    showError("phone", "Số điện thoại gồm 10 số, bắt đầu bằng 0.");
    return false;
  }
  clearError("phone");
  return true;
}

function validatePassword() {
  const val = password.value;
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (val === "") {
    showError("password", "Mật khẩu không được trống.");
    return false;
  }
  if (!regex.test(val)) {
    showError("password", "Mật khẩu ≥ 8 ký tự, có chữ hoa, thường, số.");
    return false;
  }
  clearError("password");
  return true;
}

function validateConfirmPassword() {
  const val = confirmPassword.value;
  if (val === "") {
    showError("confirmPassword", "Xác nhận mật khẩu không được trống.");
    return false;
  }
  if (val !== password.value) {
    showError("confirmPassword", "Mật khẩu không khớp.");
    return false;
  }
  clearError("confirmPassword");
  return true;
}

function validateGender() {
  let isChecked = false;
  for (let i = 0; i < genderRadios.length; i++) {
    if (genderRadios[i].checked) {
      isChecked = true;
      break;
    }
  }
  if (!isChecked) {
    showError("gender", "Vui lòng chọn giới tính.");
    return false;
  }
  clearError("gender");
  return true;
}

function validateTerms() {
  if (!terms.checked) {
    showError("terms", "Bạn phải đồng ý với điều khoản.");
    return false;
  }
  clearError("terms");
  return true;
}

fullname.addEventListener("blur", validateFullname);
email.addEventListener("blur", validateEmail);
phone.addEventListener("blur", validatePhone);
password.addEventListener("blur", validatePassword);
confirmPassword.addEventListener("blur", validateConfirmPassword);

fullname.addEventListener("input", function () {
  clearError("fullname");
});
email.addEventListener("input", function () {
  clearError("email");
});
phone.addEventListener("input", function () {
  clearError("phone");
});
password.addEventListener("input", function () {
  clearError("password");
});
confirmPassword.addEventListener("input", function () {
  clearError("confirmPassword");
});

for (let i = 0; i < genderRadios.length; i++) {
  genderRadios[i].addEventListener("change", function () {
    clearError("gender");
  });
}

terms.addEventListener("change", function () {
  clearError("terms");
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const isValidName = validateFullname();
  const isValidEmail = validateEmail();
  const isValidPhone = validatePhone();
  const isValidPw = validatePassword();
  const isValidConfirm = validateConfirmPassword();
  const isValidGender = validateGender();
  const isValidTerms = validateTerms();

  if (
    isValidName &&
    isValidEmail &&
    isValidPhone &&
    isValidPw &&
    isValidConfirm &&
    isValidGender &&
    isValidTerms
  ) {
    form.classList.add("hidden");
    document.getElementById("successMessage").classList.remove("hidden");
    document.getElementById("registeredName").textContent = fullname.value;
  }
});
