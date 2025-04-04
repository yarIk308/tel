let currentSlide = 0;
let autoSlideInterval;

function showSlide(index) {
    let slides = document.querySelectorAll(".slide");

    if (slides.length === 0) {
        console.error("Ошибка: Слайды не загружены!");
        return;
    }

    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;

    slides.forEach(slide => slide.style.display = "none");
    slides[currentSlide].style.display = "block";
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
    resetAutoSlide();
}

function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
    resetAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

document.addEventListener("DOMContentLoaded", function () {
    let slides = document.querySelectorAll(".slide");
    if (slides.length > 0) {
        showSlide(currentSlide);
        startAutoSlide();
    } 
});
