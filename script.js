document.addEventListener('DOMContentLoaded', () => {
    // === ПЛАВНАЯ ПРОКРУТКА ===
    const anchors = document.querySelectorAll('a[href^="#"]');

    anchors.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Отключаем стандартное поведение

            const targetId = this.getAttribute('href'); // Получаем ID секции
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth', // Плавная прокрутка
                    block: 'start' // Начало секции
                });
            }
        });
    });

    // === ПЕРЕМЕЩЕНИЕ СТИКЕРОВ ===
    const stickers = document.querySelectorAll('.sticker img');

    if (stickers.length === 0) {
        console.error('Стикеры не найдены. Проверьте HTML.');
        return;
    }

    stickers.forEach(sticker => {
        let offsetX = 0, offsetY = 0;
        let isDragging = false;

        const moveSticker = (event) => {
            if (!isDragging) return;

            const newX = (event.clientX || event.touches[0].clientX) - offsetX;
            const newY = (event.clientY || event.touches[0].clientY) - offsetY;

            const windowWidth = window.innerWidth - sticker.offsetWidth;
            const windowHeight = window.innerHeight - sticker.offsetHeight;

            // Используем requestAnimationFrame для плавного обновления
            requestAnimationFrame(() => {
                sticker.style.left = `${Math.min(Math.max(newX, 0), windowWidth)}px`;
                sticker.style.top = `${Math.min(Math.max(newY, 0), windowHeight)}px`;
            });
        };

        const stopMoving = () => {
            isDragging = false;
            document.removeEventListener('mousemove', moveSticker);
            document.removeEventListener('touchmove', moveSticker);
        };

        sticker.addEventListener('mousedown', (event) => {
            isDragging = true;
            sticker.style.position = 'absolute';
            offsetX = event.clientX - sticker.getBoundingClientRect().left;
            offsetY = event.clientY - sticker.getBoundingClientRect().top;

            document.addEventListener('mousemove', moveSticker);
            document.addEventListener('mouseup', stopMoving);
        });

        sticker.addEventListener('touchstart', (event) => {
            isDragging = true;
            const touch = event.touches[0];
            offsetX = touch.clientX - sticker.getBoundingClientRect().left;
            offsetY = touch.clientY - sticker.getBoundingClientRect().top;

            document.addEventListener('touchmove', moveSticker);
            document.addEventListener('touchend', stopMoving);
        });
    });
});
