document.getElementById("register-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let name = document.getElementById("name").value;
    let surname = document.getElementById("surname").value;
    let age = document.getElementById("age").value;
    let gender = document.getElementById("gender").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm_password").value;
    let agree = document.getElementById("agree").checked;

    if (!email.includes("@")) {
        alert("Введите корректный email!");
        return;
    }
    if (name.length < 2 || surname.length < 2) {
        alert("Имя и фамилия должны быть не короче 2 символов!");
        return;
    }
    if (age < 18) {
        alert("Возраст должен быть не менее 18 лет!");
        return;
    }
    if (gender === "") {
        alert("Выберите пол!");
        return;
    }
    if (password.length < 6) {
        alert("Пароль должен содержать минимум 6 символов!");
        return;
    }
    if (password !== confirmPassword) {
        alert("Пароли не совпадают!");
        return;
    }
    if (!agree) {
        alert("Вы должны согласиться с обработкой персональных данных!");
        return;
    }

    localStorage.setItem("username", name);
    
        window.location.href = "index.html";
});
