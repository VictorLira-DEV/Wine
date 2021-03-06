import { SLIDER_INITAL_POSITION } from './config.js';

const slides = document.querySelectorAll('.header__slide');
const btnLeft = document.querySelector('.header__button--left');
const btnRight = document.querySelector('.header__button--right');
const dotContainer = document.querySelector('.header__dots');

let currentSlide = SLIDER_INITAL_POSITION;
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

//slider timer
let timer;
const setTimer = function () {
    return setInterval(() => {
        let counter = 0;
        counter++;
        if (counter > 1) return;

        if (currentSlide === maxSlide - 1) {
            currentSlide = 0;
        } else {
            currentSlide++;
        }
        goToSlide(currentSlide);
        activeDots(currentSlide);
    }, 3000);
};

timer = setTimer();

const nextSlide = function () {
    clearInterval(timer);
    if (currentSlide === maxSlide - 1) {
        currentSlide = 0;
    } else {
        currentSlide++;
    }
    goToSlide(currentSlide);
    activeDots(currentSlide);
    timer = setTimer();
};

const prevSlide = function () {
    clearInterval(timer);
    if (currentSlide === 0) {
        currentSlide = maxSlide - 1;
    } else {
        currentSlide--;
    }
    goToSlide(currentSlide);
    activeDots(currentSlide);
    timer = setTimer();
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('header__dot')) {
        const { slide } = e.target.dataset;
        goToSlide(slide);
        activeDots(slide);
    }
});

const callBannerSlider = function () {
    goToSlide(SLIDER_INITAL_POSITION);
    createDots();
    activeDots(SLIDER_INITAL_POSITION);
};

export default callBannerSlider;
