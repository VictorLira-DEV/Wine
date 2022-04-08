const callBannerSlider = function () {
    const slides = document.querySelectorAll('.header__slide');
    const btnLeft = document.querySelector('.header__button--left');
    const btnRight = document.querySelector('.header__button--right');
    const dotContainer = document.querySelector('.header__dots');
    let currentSlide = 0;
    const maxSlide = slides.length;

    const createDots = function () {
        slides.forEach((_, i) => {
            dotContainer.insertAdjacentHTML(
                'beforeend',
                `<button class="header__dot" data-slide="${i}"></button>`
            );
        });
    };
    const activeDots = function (slide) {
        document.querySelectorAll('.header__dot').forEach(dot => {
            dot.classList.remove('header__dot--active');

            document
                .querySelector(`.header__dot[data-slide="${slide}"]`)
                .classList.add('header__dot--active');
        });
    };

    const goToSlide = function (position) {
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - position)}%)`;
        });
    };

    const nextSlide = function () {
        if (currentSlide === maxSlide - 1) {
            currentSlide = 0;
        } else {
            currentSlide++;
        }
        goToSlide(currentSlide);
        activeDots(currentSlide);
    };

    const prevSlide = function () {
        if (currentSlide === 0) {
            currentSlide = maxSlide - 1;
        } else {
            currentSlide--;
        }
        goToSlide(currentSlide);
        activeDots(currentSlide);
    };

    const init = function () {
        goToSlide(0);
        createDots();
        activeDots(0);
    };

    init();
    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);

    dotContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('header__dot')) {
            const { slide } = e.target.dataset;
            goToSlide(slide);
            activeDots(slide);
        }
    });
};

export default callBannerSlider;
