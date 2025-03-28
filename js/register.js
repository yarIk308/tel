document.addEventListener("DOMContentLoaded", function () {
    let registerForm = document.getElementById("register-form");

    if (!registerForm) {
        console.error("Форма регистрации не найдена! Проверь `id='register-form'` в `registration.html`.");
        return;
    }

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Получаем данные из полей формы
        let email = document.getElementById("email")?.value.trim();
        let name = document.getElementById("name")?.value.trim();
        let surname = document.getElementById("surname")?.value.trim();
        let age = document.getElementById("age")?.value.trim();
        let gender = document.getElementById("gender")?.value;
        let password = document.getElementById("password")?.value;
        let confirmPassword = document.getElementById("confirm_password")?.value;
        let agree = document.getElementById("agree")?.checked;

        // Проверяем, что все поля заполнены
        if (!email || !name || !surname || !age || !gender || !password || !confirmPassword || !agree) {
            let errorMsg = document.getElementById("register-error");
            if (errorMsg) {
                errorMsg.textContent = "Заполните все поля!";
                errorMsg.style.display = "block";
            }
            return;
        }

        if (password !== confirmPassword) {
            let errorMsg = document.getElementById("register-error");
            if (errorMsg) {
                errorMsg.textContent = "Пароли не совпадают!";
                errorMsg.style.display = "block";
            }
            return;
        }

        let formData = new FormData(registerForm);

        fetch("php/register.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log("Ответ от сервера:", data);

            if (data.success) {
                alert("Регистрация успешна! Теперь войдите в аккаунт.");
                window.location.href = "index.html"; // Перенос на главную после регистрации
            } else {
                let errorMsg = document.getElementById("register-error");
                if (errorMsg) {
                    errorMsg.textContent = data.message;
                    errorMsg.style.display = "block";
                }
            }
        })
        .catch(error => console.error("Ошибка регистрации:", error));
    });
});
