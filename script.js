// --- ЛОГІКА ПЕРЕМИКАННЯ СТОРІНОК ---
const loginForm = document.getElementById('login-form');
const pageLogin = document.getElementById('page-login');
const pageProfile = document.getElementById('page-profile');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    pageLogin.style.opacity = '0';
    setTimeout(() => {
        pageLogin.classList.add('hidden');
        pageProfile.classList.remove('hidden');
        setTimeout(() => { pageProfile.style.opacity = '1'; }, 50);
    }, 500);
});

// --- ЛОГІКА КУКІ ---
document.getElementById('accept-cookies').addEventListener('click', () => {
    document.getElementById('privacy-banner').style.transform = 'translateY(100px)';
    document.getElementById('privacy-banner').style.opacity = '0';
    setTimeout(() => document.getElementById('privacy-banner').remove(), 500);
});

// --- ВІЗИТКА: ТАБИ ---
const navButtons = document.querySelectorAll('.card-buttons button');
const sections = document.querySelectorAll('.card-section');

navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        navButtons.forEach(b => b.classList.remove('is-active'));
        sections.forEach(s => s.classList.remove('is-active'));
        btn.classList.add('is-active');
        document.querySelector(btn.getAttribute('data-section')).classList.add('is-active');
    });
});

// --- ОЧІ ТА АНІМАЦІЯ КЛІПАННЯ (ТВОЯ ЛОГІКА) ---
const pupils = document.querySelectorAll(".creepy-btn__pupil");
const eyeBalls = document.querySelectorAll(".creepy-btn__eye");
const mainButton = document.getElementById("creepy-main-btn");
let blinkTimer;

function handleBlinking(distance) {
    if (blinkTimer) clearInterval(blinkTimer);
    let speed = 1200;
    if (distance < 150) speed = 800;
    if (distance < 100) speed = 400;
    if (distance < 60) speed = 200;

    blinkTimer = setInterval(() => {
        eyeBalls.forEach(eye => {
            eye.style.animation = "none";
            void eye.offsetHeight; 
            eye.style.animation = "blink 0.2s";
        });
    }, speed);
}

document.addEventListener("mousemove", (e) => {
    if (pageProfile.classList.contains('hidden')) return;
    const rect = mainButton.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const distance = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx);
    const x = Math.cos(angle) * 3.5;
    const y = Math.sin(angle) * 3.5;

    pupils.forEach(pupil => pupil.style.transform = `translate(${x}px, ${y}px)`);
    handleBlinking(distance);
});

mainButton.addEventListener("click", () => {
    // 1. Зупиняємо таймери та запускаємо візуальний ефект закриття очей
    if (blinkTimer) clearInterval(blinkTimer);
    eyeBalls.forEach(eye => {
        eye.style.animation = "none";
        eye.style.height = "2px";
    });
    pupils.forEach(pupil => pupil.style.transform = "scale(0.5)");

    // 2. Робимо невелику затримку (300мс), щоб користувач побачив анімацію, 
    // і переходимо на нову сторінку
    setTimeout(() => {
        window.location.href = 'second.html';
    }, 300);
});