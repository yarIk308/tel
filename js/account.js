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
                document.getElementById("user-birthdate").textContent = data.user.birthdate;
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
    document.getElementById("edit-birthdate").value = document.getElementById("user-birthdate").textContent;
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
        birthdate: document.getElementById("edit-birthdate").value,
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
document.addEventListener("DOMContentLoaded", () => {
    const editForm = document.getElementById("edit-form");
    const overlay = document.createElement("div");
    overlay.id = "edit-form-overlay";
    document.body.appendChild(overlay);

    // Слушаем нажатие на кнопку редактирования профиля
    document.querySelector(".edit-profile-btn").addEventListener("click", () => {
        // Показываем форму редактирования и затемняем экран
        editForm.classList.add("active");
        overlay.classList.add("active");
    });

    // Функция для скрытия формы и удаления затемненного экрана
    function hideEditForm() {
        editForm.classList.remove("active");
        overlay.classList.remove("active");  // Убираем затемнение
    }

    // Слушаем нажатие на кнопку отмены
    document.querySelector("#edit-form button[type='button']").addEventListener("click", hideEditForm);

    // Слушаем нажатие на затемняющий экран (overlay)
    overlay.addEventListener("click", hideEditForm);
});



