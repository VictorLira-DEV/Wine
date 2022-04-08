import { SLIDER_INITAL_POSITION } from './config.js';
import { createDots, activeDots } from './slider.js';

const slides = document.querySelectorAll('.header__slide');
const btnLeft = document.querySelector('.header__button--left');
const btnRight = document.querySelector('.header__button--right');
const dotContainer = document.querySelector('.slider-dots');

let currentSlide = SLIDER_INITAL_POSITION;
const maxSlide = slides.length;

// const activeDots = function (slide) {
//     document.querySelectorAll('.header__dot').forEach(dot => {
//         dot.classList.remove('header__dot--active');

//         document
//             .querySelector(`.header__dot[data-slide="${slide}"]`)
//             .classList.add('header__dot--active');
//     });
// };

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

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('slider__dot')) {
        const { slide } = e.target.dataset;
        goToSlide(slide);
        activeDots(slide);
    }
});

const callBannerSlider = function () {
    goToSlide(SLIDER_INITAL_POSITION);
    createDots(slides, dotContainer)
    activeDots(SLIDER_INITAL_POSITION);
};

export default callBannerSlider;
