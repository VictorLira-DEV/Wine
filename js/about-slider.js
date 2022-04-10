import fetchData from './helper-functions.js';
import { SLIDER_INITAL_POSITION } from './config.js';

const dotContainer = document.querySelector('.more-about__dots');
let currentSlide = SLIDER_INITAL_POSITION;
let maxSlide = 4;

const activeDots = function (slide) {
    document.querySelectorAll('.more-about__dot').forEach(dot => {
        dot.classList.remove('more-about__dot--active');

        document
            .querySelector(`.more-about__dot[data-slide="${slide}"]`)
            .classList.add('more-about__dot--active');
    });
};

const createDots = function (slides) {
    slides.forEach((_, i) => {
        dotContainer.insertAdjacentHTML(
            'beforeend',
            `<button class="more-about__dot" data-slide="${i}"></button>`
        );
    });
    activeDots(SLIDER_INITAL_POSITION);
};

const goToSlide = function (position) {
    const slides = document.querySelectorAll('.slide');
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

//CARDS DESKTOP
export const generateSlideMarkup = async function () {
    const sliderContainer = document.querySelector(
        '.more-about__cards-desktop-list'
    );
    const { slides } = await fetchData('../data.json');
    const markup = slides
        .map((item, index) => {
            return `
                <div class="more-about__card">
                    <div class="more-about__card--${index + 1}">
                        <img src="${item.image}" alt="" />
                    </div>
                    <p>
                        ${item.text}
                    </p>
                </div>
            `;
        })
        .join(' ');

    sliderContainer.insertAdjacentHTML('afterbegin', markup);
    createDots(slides);
};

export const callMobileSlider = function () {
    generateSlideMarkup();
    goToSlide(SLIDER_INITAL_POSITION);
    timer = setTimer();
};
