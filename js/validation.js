document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registration-form");

    form.addEventListener("submit", function (event) {
        let isValid = true;
        const errorMessages = document.querySelectorAll(".error-message");
        errorMessages.forEach(msg => msg.textContent = "");

        const email = form.elements["email"];
        const name = form.elements["name"];
        const surname = form.elements["surname"];
        const age = form.elements["age"];
        const gender = form.elements["gender"];
        const password = form.elements["password"];
        const confirmPassword = form.elements["confirm_password"];
        const agree = form.elements["agree"];

        if (!email.value.includes("@")) {
            setError(email, "Введите корректный email");
            isValid = false;
        }

        if (name.value.trim().length < 2) {
            setError(name, "Имя должно быть не короче 2 символов");
            isValid = false;
        }

        if (surname.value.trim().length < 2) {
            setError(surname, "Фамилия должна быть не короче 2 символов");
            isValid = false;
        }

        if (age.value < 18) {
            setError(age, "Возраст должен быть не менее 18 лет");
            isValid = false;
        }

        if (gender.value === "") {
            setError(gender, "Выберите пол");
            isValid = false;
        }

        if (password.value.length < 6) {
            setError(password, "Пароль должен быть не менее 6 символов");
            isValid = false;
        }

        if (password.value !== confirmPassword.value) {
            setError(confirmPassword, "Пароли не совпадают");
            isValid = false;
        }

        if (!agree.checked) {
            setError(agree, "Необходимо согласие");
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault();
        }
    });

    function setError(element, message) {
        const errorElement = element.nextElementSibling;
        if (errorElement && errorElement.classList.contains("error-message")) {
            errorElement.textContent = message;
        }
    }
});
