export const createDots = function (slides, container) {
    slides.forEach((_, i) => {
        container.insertAdjacentHTML(
            'beforeend',
            `<button class="slider__dot" data-slide="${i}"></button>`
        );
    });
};

export const activeDots = function (slide) {
    document.querySelectorAll('.slider__dot').forEach(dot => {
        dot.classList.remove('slider__dot--active');

        document
            .querySelector(`.slider__dot[data-slide="${slide}"]`)
            .classList.add('slider__dot--active');
    });
};