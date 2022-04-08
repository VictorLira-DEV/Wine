import slider from './slider.js';
import { generateWineMarkup } from './wines.js';
import './modal.js';

slider();
generateWineMarkup();

const sliderContainer = document.querySelector(
    '.more-about__cards-desktop-list'
);
const dotContainer = document.querySelector('.more-about__dots');

const fetchData = async function () {
    const response = await fetch('../data.json');
    const { slides } = await response.json();

    return slides;
};


// const createMobileSliderContent = function(){
//     const slidesParent = document.querySelector('.more-about__slider');
//     const slides2 = [...document.querySelectorAll('.slide_item')];
//     console.log(slides2)
//     const markup = slides2.map((item) => {
//         return `
//         <div class="more-about__card--1">
//             <div class="more-about__img">
//                 <img src="./images/about-4.png" alt="">
//             </div>
//             <p class="more-about__text">tis placeat dolor distinctio molestiae modi tempore. Quia nemo cupiditate natus voluptas odit nihil!</p>
//         </div>
//         `
//     }).join(' ');

//     slidesParent.insertAdjacentHTML('afterbegin', markup)
// }

// const mobileSlider = async function () {
//     const sliderContainer = document.querySelector('.more-about__slider');
//     const slidesData = await fetchData();
//     const markup = slidesData
//         .map((_, index) => {
//             return `
//         <div class="more-about__slider slide_item slide slide--${
//             index + 1
//         }" style="transform: translateX(${100 * (index + 1)});" ></div>
//         `;
//         })
//         .join(' ');

//     sliderContainer.insertAdjacentHTML('afterbegin', markup);

//     setTimeout(() => {
//         createMobileSliderContent()
//     }, 3000)
// };

const activeDots = function (slide) {
    document.querySelectorAll('.more-about__dot').forEach(dot => {
        dot.classList.remove('more-about__dot--active');

        document
            .querySelector(`.more-about__dot[data-slide="${slide}"]`)
            .classList.add('more-about__dot--active');
    });
};

const createDots = async function () {
    const slidesData = await fetchData();
    slidesData.forEach((_, i) => {
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

const init = function () {
    goToSlide(0)
    fetchData();
    createDots();
    // mobileSlider();
};

init();

//CARDS DESKTOP
const generateSlideMarkup = async function () {
    const data = await fetchData();
    const markup = data
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
