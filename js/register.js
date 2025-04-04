document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("register-form").addEventListener("submit", async function (event) {
        event.preventDefault();

        let email = document.getElementById("email").value.trim();
        let name = document.getElementById("name").value.trim();
        let surname = document.getElementById("surname").value.trim();
        let birthdate = document.getElementById("birthdate").value;
        let gender = document.getElementById("gender").value;
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirm_password").value;
        let agree = document.getElementById("agree").checked;

        let errorElement = document.getElementById("register-error");
        errorElement.style.display = "none";

        // Проверка заполненности
        if (!email || !name || !surname || !birthdate || !gender || !password || !confirmPassword) {
            showError("Заполните все поля!");
            return;
        }

        // Проверка возраста (должно быть не менее 18 лет)
        let birthDateObj = new Date(birthdate);
        let today = new Date();
        let age = today.getFullYear() - birthDateObj.getFullYear();
        if (today < new Date(today.getFullYear(), birthDateObj.getMonth(), birthDateObj.getDate())) {
            age--; // Если ДР еще не наступил в этом году
        }

        if (age < 18) {
            showError("Вам должно быть не менее 18 лет для регистрации.");
            return;
        }

        // Проверка пароля
        if (password.length < 6) {
            showError("Пароль должен содержать минимум 6 символов.");
            return;
        }
        if (password !== confirmPassword) {
            showError("Пароли не совпадают!");
            return;
        }

        if (!agree) {
            showError("Вы должны согласиться на обработку данных!");
            return;
        }

        let userData = {
            email: email,
            name: name,
            surname: surname,
            birthdate: birthdate,
            gender: gender,
            password: password
        };

        try {
            let response = await fetch("php/register.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            });

            let data = await response.json();

            if (data.success) {
                alert("Регистрация прошла успешно!");
                window.location.href = "index.html#auth-section";
            } else {
                showError(data.message);
            }
        } catch (error) {
            console.error("Ошибка регистрации:", error);
            showError("Ошибка сервера. Попробуйте позже.");
        }
    });

    function showError(message) {
        let errorElement = document.getElementById("register-error");
        errorElement.textContent = message;
        errorElement.style.display = "block";
    }
});
