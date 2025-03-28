document.addEventListener("DOMContentLoaded", function () {
    loadUserData();
});

// 📌 Загружаем данные пользователя из БД и отображаем на странице
function loadUserData() {
    let userId = localStorage.getItem("user_id");

    if (!userId) {
        alert("Вы не авторизованы!");
        window.location.href = "index.html";
        return;
    }

    fetch(`php/get_user.php?user_id=${userId}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById("user-email").textContent = data.user.email;
                document.getElementById("user-name").textContent = data.user.name;
                document.getElementById("user-surname").textContent = data.user.surname;
                document.getElementById("user-age").textContent = data.user.age;
                document.getElementById("user-gender").textContent = data.user.gender;
            } else {
                alert("Ошибка загрузки данных: " + data.message);
            }
        })
        .catch(error => console.error("Ошибка загрузки профиля:", error));
}

// 📌 Показываем форму редактирования и заполняем её текущими данными
function showEditForm() {
    document.getElementById("edit-form").style.display = "block";

    // Подставляем текущие значения в форму
    document.getElementById("edit-name").value = document.getElementById("user-name").textContent;
    document.getElementById("edit-surname").value = document.getElementById("user-surname").textContent;
    document.getElementById("edit-age").value = document.getElementById("user-age").textContent;
    document.getElementById("edit-gender").value = document.getElementById("user-gender").textContent;
}

// 📌 Скрываем форму редактирования
function hideEditForm() {
    document.getElementById("edit-form").style.display = "none";
}

// 📌 Обновляем данные пользователя в БД
function updateProfile() {
    let userId = localStorage.getItem("user_id");

    let updatedData = {
        user_id: userId,
        name: document.getElementById("edit-name").value,
        surname: document.getElementById("edit-surname").value,
        age: document.getElementById("edit-age").value,
        gender: document.getElementById("edit-gender").value
    };

    console.log("Отправляемые данные:", updatedData); // Проверяем, какие данные отправляются

    fetch("php/update_user.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
    })
    .then(response => response.text()) // Изменяем на text() для отладки
    .then(text => {
        try {
            console.log("Ответ сервера:", text); // Выводим полный ответ сервера
            let data = JSON.parse(text);
            
            if (data.success) {
                alert("Данные успешно обновлены!");
                loadUserData();
                hideEditForm();
            } else {
                alert("Ошибка обновления: " + data.message);
            }
        } catch (error) {
            console.error("Ошибка JSON:", error);
            console.log("Ответ сервера:", text);
        }
    })
    .catch(error => console.error("Ошибка обновления профиля:", error));
}
