document.addEventListener('DOMContentLoaded', () => {
    const stickers = document.querySelectorAll('.sticker img');

    stickers.forEach(sticker => {
        let offsetX = 0, offsetY = 0;

        const moveSticker = (event) => {
            const newX = (event.clientX || event.touches[0].clientX) - offsetX;
            const newY = (event.clientY || event.touches[0].clientY) - offsetY;

            // Ограничение движения
            const windowWidth = window.innerWidth - sticker.offsetWidth;
            const windowHeight = window.innerHeight - sticker.offsetHeight;

            sticker.style.left = `${Math.min(Math.max(newX, 0), windowWidth)}px`;
            sticker.style.top = `${Math.min(Math.max(newY, 0), windowHeight)}px`;
        };

        const stopMove = () => {
            document.removeEventListener('mousemove', moveSticker);
            document.removeEventListener('mouseup', stopMove);
            document.removeEventListener('touchmove', moveSticker);
            document.removeEventListener('touchend', stopMove);
        };

        sticker.addEventListener('mousedown', (event) => {
            offsetX = event.clientX - sticker.getBoundingClientRect().left;
            offsetY = event.clientY - sticker.getBoundingClientRect().top;
            document.addEventListener('mousemove', moveSticker);
            document.addEventListener('mouseup', stopMove);
        });

        sticker.addEventListener('touchstart', (event) => {
            const touch = event.touches[0];
            offsetX = touch.clientX - sticker.getBoundingClientRect().left;
            offsetY = touch.clientY - sticker.getBoundingClientRect().top;
            document.addEventListener('touchmove', moveSticker);
            document.addEventListener('touchend', stopMove);
        });
    });
});
