const items = [{
        title: "Трендовые картины 2022 на холсте",
        description: "Обратите внимание! Цвет изображения на мониторе может отличаться от напечатанного. Это зависит от настроек и типа вашего монитора.",
        price: 250,
        img: "./img/1.jpeg",
        rating: 2.7,
    },
    {
        title: "Интерьерная круглая картина",
        description: "Интерьерная картина, круглый холст ручной натяжки с идеальними краями! Отлично впишется в современный интерьер!",
        price: 600,
        img: "./img/2.jpg",
        rating: 3.1,
    },
    {
        title: "Интерьерная картина из мха",
        description: "Если вы хотите быстро обновить помещение без особых затрат, обратите внимание на картины из мха. Они отлично дополнят уютные гостиные, жилые комнаты, респектабельные конференц-залы и крошечные кафе.",
        price: 1800,
        img: "./img/3.jpg",
        rating: 5.0,
    },
    {
        title: "Картина абстракция для интерьера",
        description: "Картины в жанре абстракционизма это не только великолепное украшение для дома, но и возможность найти скрытый смысл, видимый только вам. Каждое творение в этом жанре уникально",
        price: 540,
        img: "./img/4.jpg",
        rating: 4.7,
    },
    {
        title: "Картина Розовый фламинго",
        description: "Яркая картина и качественная печать рисунка.Есть крепление сзади! Бонусом подарим открытку",
        price: 400,
        img: "./img/5.jpg",
        rating: 3.9,
    },
    {
        title: "Картина Современная живопись",
        description: "Такая интерьерная картина абстракция будет очень стильно смотреться в любом современном интерьере жилища, кафе или офиса.",
        price: 580,
        img: "./img/6.jpg",
        rating: 3.2,
    },
    {
        title: "Интерьерная картина, ART",
        description: "Интерьерные картины, написаны на натуральном итальянском холсте, полностью готовы и не нуждаются в дополнительной доработке.",
        price: 300,
        img: "./img/7.jpeg",
        rating: 2.9,
    },
    {
        title: "Интерьерные картины для гостиной",
        description: "Картины для интерьера гостиной могут быть самыми разными, как по стилю, так и по сюжету.",
        price: 500,
        img: "./img/8.jpeg",
        rating: 3.4,
    },
    {
        title: "Картина Острые козырьки",
        description: "По желанию (доп. услуга) картина покрывается безопасным защитным лаком, придавая сочности краскам и защищенности полотну. Тип лакировки выбирается индивидуально.",
        price: 460,
        img: "./img/9.jpg",
        rating: 3.8,
    },
    {
        title: "Интерьерные картины в стиле минимализма",
        description: "Модные картины в стиле минимализм идеально дополняют лаконичную обстановку современной квартиры с открытыми локациями, большим количеством света, зелени и функциональной мебелью.",
        price: 700,
        img: "./img/10.jpeg",
        rating: 4.2,
    },
    {
        title: "Интерьерная картина на кухню Специи на ложке",
        description: "Иногда, даже одной картины бывает достаточно для того, чтобы внести нотку изысканности и лоска или создать домашний уют.",
        price: 650,
        img: "./img/11.jpg",
        rating: 3.7,
    },
    {
        title: "Интерьерная картина для офисов",
        description: "Это не просто живопись маслом, а множество техник, сочетаемых в одной картине! Текстурная паста для объёма, позолота поталью для блеска, тонкие линии для динамики.",
        price: 800,
        img: "./img/12.jpeg",
        rating: 4.1,
    },
];

let currentState = [...items];

const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");

//Функция для отрисовки
function renderItems(arr) {
    nothingFound.textContent = "";
    itemsContainer.innerHTML = "";
    arr.forEach((item) => {
        itemsContainer.append(prepareShopItem(item));
    });
    if (!arr.length) {
        nothingFound.textContent = "Ничего не найдено";
    }
}

// Функция-хелпер для сортировки товаров по алфавиту
function sortByAlphabet(a, b) {
    if (a.title > b.title) {
        return 1;
    }
    if (a.title < b.title) {
        return -1;
    }
    return 0;
}

// Вызываем функцию для отрисовки в самом начале
// И тут же сортируем по алфавиту
renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

// Функция для создания верстки конкретного товара
function prepareShopItem(shopItem) {
    const { title, description, img, price, rating } = shopItem;

    const item = itemTemplate.content.cloneNode(true);

    item.querySelector("h1").textContent = title;
    item.querySelector("p").textContent = description;
    item.querySelector("img").src = img;
    item.querySelector(".price").textContent = `${price}BYN`;

    // Находим контейнер для рейтинга
    const ratingContainer = item.querySelector(".rating");
    // Рисуем нужное количество звездочек
    for (let i = 0; i < rating; i++) {
        const star = document.createElement("i");
        star.classList.add("fa", "fa-star");
        ratingContainer.append(star);
    }

    return item;
}

// Инпут для поиска
const searchInput = document.querySelector("#search-input");
// Кнопка
const searchButton = document.querySelector("#search-btn");

// Функция для поиска по товарам (сбрасывает фильтры)
function applySearch() {

    const searchString = searchInput.value.trim().toLowerCase();

    // Нашли все товары, в title которых есть searchString
    currentState = items.filter((el) =>
        el.title.toLowerCase().includes(searchString)
    );

    currentState.sort((a, b) => sortByAlphabet(a, b));
    renderItems(currentState);

    sortControl.selectedIndex = 0;
}

// Обработчик при клике на кнопку поиска
searchButton.addEventListener("click", applySearch);
// Обработчик события поиска при взаимодействии с инпутом
searchInput.addEventListener("search", applySearch);

// Селект с опциями сортировки
const sortControl = document.querySelector("#sort");

sortControl.addEventListener("change", (event) => {
    const selectedOption = event.target.value;
    // В зависимости от вида сортировки упорядочиваем массив товаров
    switch (selectedOption) {
        case "expensive":
            {
                // Сначала дорогие
                currentState.sort((a, b) => b.price - a.price);
                break;
            }
        case "cheap":
            {
                // Сначала дешевые
                currentState.sort((a, b) => a.price - b.price);
                break;
            }
        case "rating":
            {
                // От более высокого рейтинга к более низкому
                currentState.sort((a, b) => b.rating - a.rating);
                break;
            }
        case "alphabet":
            {
                // По алфавиту
                currentState.sort((a, b) => sortByAlphabet(a, b));
                break;
            }
    }
    // Массив упорядочили — осталось его отрисовать
    renderItems(currentState);
});