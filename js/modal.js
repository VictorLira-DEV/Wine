const benefitsCardsParent = document.querySelector('.benefits__list');
const overlay = document.querySelector('.overlay');
import fetchData from './helper-functions.js';

let modalData;
const getModalData = async function () {
    const { modal } = await fetchData('../data.json');
    modalData = modal;
};

const closeModal = function () {
    const modal = document.querySelector('.modal');
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

const getIconBackgroundColor = function (icon) {
    switch (icon) {
        case 'popup-1':
            return '#FCDDD7';
        case 'popup-2':
            return '#F5D6DC';
        case 'popup-3':
            return '#D5E9E2';
        case 'popup-4':
            return '#FDE8D9';
        default: {
            return 'pink';
        }
    }
};

//using event delegation to get the id
benefitsCardsParent.addEventListener('click', e => {
    overlay.classList.remove('hidden');
    const currentPopupId = e.target.closest('.benefits__item')?.id;

    const markup = modalData
        .map(item => {
            if (item.id !== currentPopupId) return '';
            return `
            <div class="modal">
                <img class="modal__close" src="./svg/btn-close.svg" alt="close icon"">
                <h1>${item.title}</h1>
                <div class="modal__icon-wrapper" style='background: ${getIconBackgroundColor(
                    currentPopupId
                )}' >
                    <img src="${item.image}" alt="current icon">
                </div>
                <p>${item.text}</p>
            </div>`;
        })
        .join(' ');

    overlay.insertAdjacentHTML('afterbegin', markup);
    document
        .querySelector('.modal__close')
        .addEventListener('click', () => closeModal());
});

const callModal = function () {
    getModalData();
};

export default callModal;
