function loadUserData() {
    let userId = localStorage.getItem("user_id");

    if (!userId) {
        console.log("Нет user_id, перенаправляем на index.html");
        window.location.href = "index.html"; // Если не авторизован, перекидываем на главную
        return;
    }

    fetch("php/account.php")
        .then(response => response.json())
        .then(data => {
            console.log("Ответ от сервера (account.php):", data);

            if (data.success) {
                document.getElementById("user-email").textContent = data.email;
                document.getElementById("user-name").textContent = data.name;
                document.getElementById("user-surname").textContent = data.surname;
                document.getElementById("user-age").textContent = data.age;
                document.getElementById("user-gender").textContent = data.gender;
            } else {
                alert("Ошибка: " + data.message);
                window.location.href = "index.html";
            }
        })
        .catch(error => console.error("Ошибка загрузки данных:", error));
}
