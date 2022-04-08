import fetchData from './helper-functions.js';

const dotContainer = document.querySelector('.more-about__dots');

const activeDots = function (slide) {
    document.querySelectorAll('.more-about__dot').forEach(dot => {
        dot.classList.remove('more-about__dot--active');

        document
            .querySelector(`.more-about__dot[data-slide="${slide}"]`)
            .classList.add('more-about__dot--active');
    });
};

const createDots = async function () {
    const { slides } = await fetchData('../data.json');
    slides.forEach((_, i) => {
        dotContainer.insertAdjacentHTML(
            'beforeend',
            `<button class="more-about__dot" data-slide="${i}"></button>`
        );
    });
    activeDots(0);
};

const goToSlide = async function (position) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - position)}%)`;
    });
};

dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('more-about__dot')) {
        const { slide } = e.target.dataset;
        goToSlide(slide);
        activeDots(slide);
    }
});

export const callMobileSlider = function () {
    goToSlide(0);
    createDots();
};

//CARDS DESKTOP
const generateSlideMarkup = async function () {
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
};

generateSlideMarkup();
