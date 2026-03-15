document.addEventListener("DOMContentLoaded", function () {
  let currentStep = 1;

  const form = document.getElementById("multiForm");
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");
  const step3 = document.getElementById("step3");

  const btnPrev = document.getElementById("btnPrev");
  const btnNext = document.getElementById("btnNext");
  const btnSubmit = document.getElementById("btnSubmit");
  const progressText = document.getElementById("progressText");
  const successMessage = document.getElementById("successMessage");

  const fullname = document.getElementById("fullname");
  const dob = document.getElementById("dob");
  const genderRadios = document.querySelectorAll('input[name="gender"]');

  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");

  function showError(id, msg) {
    document.getElementById(id + "Error").textContent = msg;
  }

  function clearError(id) {
    document.getElementById(id + "Error").textContent = "";
  }

  function validateStep1() {
    let isValid = true;
    const nameVal = fullname.value.trim();
    const nameRegex = /^[\p{L}\s]{3,}$/u;

    if (nameVal === "") {
      showError("fullname", "Họ tên không được trống.");
      isValid = false;
    } else if (!nameRegex.test(nameVal)) {
      showError("fullname", "Họ tên không hợp lệ.");
      isValid = false;
    } else {
      clearError("fullname");
    }

    if (dob.value === "") {
      showError("dob", "Vui lòng chọn ngày sinh.");
      isValid = false;
    } else {
      clearError("dob");
    }

    let isGenderChecked = false;
    for (let i = 0; i < genderRadios.length; i++) {
      if (genderRadios[i].checked) {
        isGenderChecked = true;
        break;
      }
    }
    if (!isGenderChecked) {
      showError("gender", "Vui lòng chọn giới tính.");
      isValid = false;
    } else {
      clearError("gender");
    }

    return isValid;
  }

  function validateStep2() {
    let isValid = true;
    const emailVal = email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passVal = password.value;

    if (emailVal === "" || !emailRegex.test(emailVal)) {
      showError("email", "Email không hợp lệ.");
      isValid = false;
    } else {
      clearError("email");
    }

    if (passVal.length < 6) {
      showError("password", "Mật khẩu phải từ 6 ký tự.");
      isValid = false;
    } else {
      clearError("password");
    }

    if (confirmPassword.value === "" || confirmPassword.value !== passVal) {
      showError("confirmPassword", "Mật khẩu không khớp.");
      isValid = false;
    } else {
      clearError("confirmPassword");
    }

    return isValid;
  }

  function updateSummary() {
    document.getElementById("sumName").textContent = fullname.value;

    const dobParts = dob.value.split("-");
    if (dobParts.length === 3) {
      document.getElementById("sumDob").textContent =
        dobParts[2] + "/" + dobParts[1] + "/" + dobParts[0];
    }

    for (let i = 0; i < genderRadios.length; i++) {
      if (genderRadios[i].checked) {
        document.getElementById("sumGender").textContent =
          genderRadios[i].value;
      }
    }

    document.getElementById("sumEmail").textContent = email.value;
  }

  function updateUI() {
    progressText.textContent = "Bước " + currentStep + " / 3";

    step1.classList.add("hidden");
    step2.classList.add("hidden");
    step3.classList.add("hidden");

    if (currentStep === 1) {
      step1.classList.remove("hidden");
      btnPrev.classList.add("hidden");
      btnNext.classList.remove("hidden");
      btnSubmit.classList.add("hidden");
    } else if (currentStep === 2) {
      step2.classList.remove("hidden");
      btnPrev.classList.remove("hidden");
      btnNext.classList.remove("hidden");
      btnSubmit.classList.add("hidden");
    } else if (currentStep === 3) {
      updateSummary();
      step3.classList.remove("hidden");
      btnPrev.classList.remove("hidden");
      btnNext.classList.add("hidden");
      btnSubmit.classList.remove("hidden");
    }
  }

  btnNext.addEventListener("click", function () {
    if (currentStep === 1) {
      if (validateStep1()) {
        currentStep++;
        updateUI();
      }
    } else if (currentStep === 2) {
      if (validateStep2()) {
        currentStep++;
        updateUI();
      }
    }
  });

  btnPrev.addEventListener("click", function () {
    if (currentStep > 1) {
      currentStep--;
      updateUI();
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    form.classList.add("hidden");
    progressText.classList.add("hidden");
    successMessage.classList.remove("hidden");
  });

  fullname.addEventListener("input", function () {
    clearError("fullname");
  });
  dob.addEventListener("change", function () {
    clearError("dob");
  });
  for (let i = 0; i < genderRadios.length; i++) {
    genderRadios[i].addEventListener("change", function () {
      clearError("gender");
    });
  }

  email.addEventListener("input", function () {
    clearError("email");
  });
  password.addEventListener("input", function () {
    clearError("password");
  });
  confirmPassword.addEventListener("input", function () {
    clearError("confirmPassword");
  });
});
