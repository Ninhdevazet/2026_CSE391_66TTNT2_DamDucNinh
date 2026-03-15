document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const fullname = document.getElementById('fullname');
    const nameCount = document.getElementById('nameCount');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');
    const togglePw = document.getElementById('togglePw');
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    const confirmPassword = document.getElementById('confirmPassword');
    const terms = document.getElementById('terms');
    const genderRadios = document.querySelectorAll('input[name="gender"]');

    function showError(fieldId, message) {
        document.getElementById(fieldId + 'Error').textContent = message;
    }

    function clearError(fieldId) {
        document.getElementById(fieldId + 'Error').textContent = '';
    }

    function validateFullname() {
        const val = fullname.value.trim();
        const regex = /^[\p{L}\s]{3,50}$/u;
        if (val === '') {
            showError('fullname', 'Họ tên không được để trống.');
            return false;
        }
        if (!regex.test(val)) {
            showError('fullname', 'Họ tên phải từ 3 ký tự, chỉ chứa chữ cái và khoảng trắng.');
            return false;
        }
        clearError('fullname');
        return true;
    }

    function validateEmail() {
        const val = email.value.trim();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (val === '') {
            showError('email', 'Email không được để trống.');
            return false;
        }
        if (!regex.test(val)) {
            showError('email', 'Email không đúng định dạng.');
            return false;
        }
        clearError('email');
        return true;
    }

    function validatePhone() {
        const val = phone.value.trim();
        const regex = /^0\d{9}$/;
        if (val === '') {
            showError('phone', 'Số điện thoại không được để trống.');
            return false;
        }
        if (!regex.test(val)) {
            showError('phone', 'Số điện thoại gồm 10 chữ số, bắt đầu bằng 0.');
            return false;
        }
        clearError('phone');
        return true;
    }

    function validatePassword() {
        const val = password.value;
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (val === '') {
            showError('password', 'Mật khẩu không được để trống.');
            return false;
        }
        if (!regex.test(val)) {
            showError('password', 'Mật khẩu ≥ 8 ký tự, gồm chữ hoa, chữ thường và số.');
            return false;
        }
        clearError('password');
        return true;
    }

    function validateConfirmPassword() {
        const val = confirmPassword.value;
        if (val === '') {
            showError('confirmPassword', 'Vui lòng xác nhận mật khẩu.');
            return false;
        }
        if (val !== password.value) {
            showError('confirmPassword', 'Mật khẩu xác nhận không khớp.');
            return false;
        }
        clearError('confirmPassword');
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
            showError('gender', 'Vui lòng chọn giới tính.');
            return false;
        }
        clearError('gender');
        return true;
    }

    function validateTerms() {
        if (!terms.checked) {
            showError('terms', 'Bạn phải đồng ý với điều khoản.');
            return false;
        }
        clearError('terms');
        return true;
    }

    fullname.addEventListener('input', function() {
        nameCount.textContent = fullname.value.length + '/50';
        clearError('fullname');
    });

    password.addEventListener('input', function() {
        clearError('password');
        const val = password.value;
        let strength = 0;
        
        if (val.length > 0) {
            if (val.length >= 8) strength++;
            if (/[A-Z]/.test(val) && /[a-z]/.test(val)) strength++;
            if (/\d/.test(val) || /[^A-Za-z0-9]/.test(val)) strength++;
        }

        if (val.length === 0) {
            strengthBar.style.width = '0%';
            strengthText.textContent = '';
        } else if (strength <= 1) {
            strengthBar.style.width = '33%';
            strengthBar.style.backgroundColor = 'red';
            strengthText.textContent = 'Yếu';
            strengthText.style.color = 'red';
        } else if (strength === 2) {
            strengthBar.style.width = '66%';
            strengthBar.style.backgroundColor = '#ffcc00';
            strengthText.textContent = 'Trung bình';
            strengthText.style.color = '#ffaa00';
        } else {
            strengthBar.style.width = '100%';
            strengthBar.style.backgroundColor = 'green';
            strengthText.textContent = 'Mạnh';
            strengthText.style.color = 'green';
        }
    });

    togglePw.addEventListener('click', function() {
        if (password.type === 'password') {
            password.type = 'text';
            togglePw.textContent = '🙈';
        } else {
            password.type = 'password';
            togglePw.textContent = '👁';
        }
    });

    fullname.addEventListener('blur', validateFullname);
    email.addEventListener('blur', validateEmail);
    phone.addEventListener('blur', validatePhone);
    password.addEventListener('blur', validatePassword);
    confirmPassword.addEventListener('blur', validateConfirmPassword);

    email.addEventListener('input', function() { clearError('email'); });
    phone.addEventListener('input', function() { clearError('phone'); });
    confirmPassword.addEventListener('input', function() { clearError('confirmPassword'); });

    for (let i = 0; i < genderRadios.length; i++) {
        genderRadios[i].addEventListener('change', function() {
            clearError('gender');
        });
    }

    terms.addEventListener('change', function() {
        clearError('terms');
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const isNameValid = validateFullname();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isPwValid = validatePassword();
        const isConfirmPwValid = validateConfirmPassword();
        const isGenderValid = validateGender();
        const isTermsValid = validateTerms();

        if (isNameValid && isEmailValid && isPhoneValid && isPwValid && isConfirmPwValid && isGenderValid && isTermsValid) {
            form.classList.add('hidden');
            document.getElementById('successMessage').classList.remove('hidden');
            document.getElementById('registeredName').textContent = fullname.value;
        }
    });
});