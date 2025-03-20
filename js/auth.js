// Функция показа имени пользователя после входа
function showUser(username) {
    let userInfo = document.getElementById("user-info");
    let usernameSpan = document.getElementById("username");
    let loginBtn = document.getElementById("login-btn");
    let registerBtn = document.getElementById("register-btn");

    if (userInfo && usernameSpan) {
        userInfo.style.display = "flex";
        usernameSpan.textContent = "Привет, " + username;
    }

    // Скрываем кнопки входа и регистрации
    if (loginBtn) loginBtn.style.display = "none";
    if (registerBtn) registerBtn.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
    let username = localStorage.getItem("username");

    if (username) {
        showUser(username);
    }

    let loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let formData = new FormData(loginForm);

            fetch("php/login.php", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log("Ответ от сервера:", data);

                if (data.success) {
                    localStorage.setItem("username", data.username);
                    localStorage.setItem("user_id", data.user_id);
                    showUser(data.username);
                    window.location.href = "products.html"; // После входа сразу на страницу товаров
                } else {
                    let errorMsg = document.getElementById("login-error");
                    if (errorMsg) {
                        errorMsg.textContent = data.message;
                        errorMsg.style.display = "block";
                    }
                }
            })
            .catch(error => console.error("Ошибка авторизации:", error));
        });
    }
});

// Функция выхода
function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("user_id");
    window.location.href = "index.html"; // После выхода перекидываем на главную
}
