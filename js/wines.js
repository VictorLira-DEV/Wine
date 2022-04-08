import fetchData from './helper-functions.js';

const generateWineMarkup = async function () {
    const winesContainer = document.querySelector('.wines__wrapper');
    const { wines } = await fetchData('../data.json');
    const markup = wines
        .map(item => {
            return `
            <div id="${item.id}" class="wines__item">
                <div class="wines__wine">
                    <div class="wines__image">
                        <svg
                            class="wines__image--heart"
                            width="20"
                            height="18"
                            viewBox="0 0 20 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M12.94 1.76332C12.0568 2.14046 11.207 2.84459 10.3995 3.91733C10.305 4.04283 10.1571 4.11664 10 4.11664C9.84313 4.11664 9.69536 4.04302 9.60088 3.91781L9.59685 3.91256L9.57892 3.88968C9.56228 3.86869 9.53637 3.83658 9.50161 3.79517C9.43204 3.71228 9.32734 3.59253 9.19082 3.45033C8.91695 3.16504 8.51961 2.79417 8.02557 2.44959C7.03117 1.75602 5.70362 1.20669 4.21149 1.57837C1.29584 2.30465 -0.566604 6.85784 2.78578 10.8662C4.50521 12.922 6.3636 14.3625 7.79215 15.2886C8.50593 15.7513 9.11079 16.0845 9.53491 16.3011C9.73426 16.4029 9.89353 16.4789 10.0052 16.5303C12.5615 15.4333 14.9661 13.5542 17.2142 10.8662C20.5666 6.85784 18.7042 2.30465 15.7885 1.57837C14.7593 1.32199 13.8162 1.38914 12.94 1.76332ZM10 17.075C9.80941 17.5372 9.80927 17.5372 9.8091 17.5371L9.80762 17.5365L9.80434 17.5351L9.79338 17.5305L9.75419 17.5137C9.72052 17.4991 9.67198 17.4776 9.6097 17.4491C9.48515 17.3921 9.30556 17.3068 9.08008 17.1917C8.62923 16.9614 7.99418 16.6112 7.2482 16.1277C5.75724 15.1611 3.81676 13.6576 2.0187 11.5077C-1.66386 7.1046 0.131872 1.56404 3.96978 0.608026C5.85443 0.138565 7.48156 0.850952 8.59764 1.62939C9.15885 2.02081 9.60571 2.43852 9.91222 2.7578C9.93728 2.78391 9.96143 2.80939 9.98467 2.83418C10.7638 1.91352 11.6161 1.24128 12.5473 0.843657C13.6408 0.376689 14.8083 0.303643 16.0302 0.608026C19.8681 1.56404 21.6639 7.1046 17.9813 11.5077C15.5967 14.3588 13.0016 16.3783 10.1906 17.5372C10.0685 17.5876 9.93118 17.5874 9.8091 17.5371L10 17.075Z"
                                fill="#888888"
                            />
                        </svg>
                        <svg
                            class="wines__image--red_wine"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                opacity="0.7"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16Z"
                                fill="url(#paint0_linear_401_1985)"
                            />
                            <defs>
                                <linearGradient
                                    id="paint0_linear_401_1985"
                                    x1="-2.43223"
                                    y1="8.09806"
                                    x2="8.69813"
                                    y2="-4.83504"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stop-color="#BA192C" />
                                    <stop
                                        offset="1"
                                        stop-color="#B8217A"
                                    />
                                </linearGradient>
                            </defs>
                        </svg>
                        <img class="wines__image--country" src="${
                            item.country_img
                        }" alt="wine--country">

                        <img
                            class="wines__image--bottle"
                            src="${item.wine_img}"
                            alt="wine-bottle"
                        />
                    </div>
                    <p class="wines__title">
                        ${item.title}
                    </p>
                    <div class="wines__old-price">
                        <span>R$ %${item.old_price}</span>
                        <span>${item.discount}% off</span>
                    </div>
                    <div class="wines__socio">
                        <div>
                            <p>sócio</p>
                            <p>wine</p>
                        </div>
                        <div>
                            <span>R$</span>
                            <span class="wines__socio__price"
                                >${item.partner_price.slice(
                                    0,
                                    item.partner_price.indexOf(',')
                                )},</span
                            > <span>00 </span>
                        </div>
                    </div>
                    <div class="wines__nao-socio">
                        <span>Não sócio</span> &nbsp;
                        <span> R$ ${item.non_partner_price} </span>
                    </div>
                </div>
                <button>Adicionar</button>
            </div>`;
        })
        .join(' ');

    winesContainer.insertAdjacentHTML('afterbegin', markup);
};

export default generateWineMarkup;