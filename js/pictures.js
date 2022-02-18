var userInst, commentsText, descriptionText;
var min, max, valueName;
var VALUEINST = 25;


userInst = new Array(VALUEINST);

commentsText = [
    "Всё отлично!",
    "В целом всё неплохо. Но не всё.",
    "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
    "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
    "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
    "Лица у людей на фотке перекошены, как будто их избивают"
];

descriptionText = [
    "Тестим новую камеру!",
    "Затусили с друзьями на море",
    "Как же круто тут кормят",
    "Отдыхаем...",
    "Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья."
];

//Функция выбора одного рандомного значения из массива
function randomValue(valueName){    
    return(valueName[Math.floor(Math.random() * valueName.length)]);
}

//Рандомное число в диапазоне от min до max(не включая max)
function randomMinMax(min, max){
    return(Math.floor((Math.random() * (max-min))+min));
}


//Функция рандомного выбора одного или двух комментов, но возможно дублирование
function randomComments(){
    var com = randomMinMax(1,3) == 1 ? [randomValue(commentsText)] : [randomValue(commentsText), randomValue(commentsText)];
    return(com);
}

//Функция рандомного выбора одного или двух комментов, без дублирование, но первая строчка спизжена
function randomComments1(){
    var commentsValue = commentsText.map(i=>[Math.random(), i]).sort().map(i=>i[1]);
    var com = randomMinMax(1,3) == 1 ? [commentsValue[0]] : [commentsValue[0], commentsValue[1]];
    return(com);
}

function randomComments2(){
    var com = randomValue(commentsText);
    var amountComments = randomMinMax(1,8);
    for (j=0; j<amountComments; j++){
        com = com + "," + randomValue(commentsText);
    }
    return[com];
}

//Заполнение массива контентом
for (var i=0; i < userInst.length; i++){
    userInst[i] = {
        url: "photos/"+ (i+1) + ".jpg",
        likes: randomMinMax(15, 200),
        comments: randomComments(),
        description: randomValue(descriptionText)
    };
}

///////////////////////////////////////////////


var instWrapper = document.querySelector(".pictures"); //Находим пустой контейнер для наполнения контентом
var instTemplade = document.querySelector("#picture-template").content.querySelector(".picture");  //Находим ведро для дублирования

//наполняем контейнер контентом
for (var i=0; i<userInst.length; i++){
    var userElemets = instTemplade.cloneNode(true); //Клонируем разметку из ведра

    userElemets.querySelector("img").src = userInst[i].url; //В img атрибут src передаём путь к фото
    userElemets.querySelector(".picture-comments").textContent = userInst[i].comments.length; //Передаём кол-во комментов
    userElemets.querySelector(".picture-likes").textContent = userInst[i].likes; //Передаём кол-во лайков

    instWrapper.appendChild(userElemets); //встявляем узел в конец списка дочерних элементов контейнера
}

function avatarUser(){  //Аватар юзера
    return("img/avatar/" + randomMinMax(1, 7) + ".svg");
}

var uploadFile = document.querySelector("#upload-file");  //Находим инпут добавления фотографии
var uploadOverlay = document.querySelector(".upload-overlay"); //Находим оверлей редактирования фотографии
var overlayCancel = document.querySelector("#upload-cancel"); //Кнопка закрытия оверлея

function openOverlay(){  //Функция открытия оверлея
    uploadOverlay.classList.remove("hidden");
    document.addEventListener("keydown", onOverlayEscPress); //Добавление обработчика нажатия Esc
}
function closeOverlay(){
    uploadOverlay.classList.add("hidden");
    document.removeEventListener("keydown", onOverlayEscPress); //Удаление обработчика нажатия Esc
    uploadFile.value = ""; //Обнуление инпута чтобы сработал change
}
function onOverlayEscPress(evt){ //Закрытие оверлея по Esc
    if (evt.keyCode === 27){
        closeOverlay();
    }
}

uploadFile.addEventListener("change", openOverlay);  //При изменении состояния инпута(загрузки фотграфии) показать оверлей
overlayCancel.addEventListener("click", closeOverlay); //Закрыть оверлей при нажатии на кнопку

var picture = document.querySelectorAll(".picture");              //Находим все picture
var buttonCloseBigPicture = document.querySelector(".gallery-overlay-close");    //Кнопку закрытия


/*Первый способ
// var instFirstBlock1 = document.querySelector("#gallery-overlay").content.querySelector(".gallery-overlay-template"); //Находим контейнер большой фотографии
// var bigPictureBusket = document.querySelector(".bigPictures")           //Находим контейнер для наполнения

// for (var i=0; i<userInst.length; i++){
//     var instFirstBlock = instFirstBlock1.cloneNode(true); //Клонируем разметку из ведра

//     instFirstBlock.querySelector(".gallery-overlay-image").src = userInst[i].url; //В img атрибут src передаём путь к фото
//     instFirstBlock.querySelector(".comments-count").textContent = userInst[i].comments.length; //Передаём кол-во коментов
//     instFirstBlock.querySelector(".likes-count").textContent = userInst[i].likes; //Передаём кол-во лайков
//     var instCommentsBlock = instFirstBlock.querySelector(".social"); //Находим блок с комментариями
//     var instTempladeComments = document.querySelector("#social-template").content.querySelector(".social__comment"); //Находим ведро для дублирования комментов
//     for (var j=0; j<userInst[i].comments.length; j++){ //Цикл добавления комментариев
//         var usersComments = instTempladeComments.cloneNode(true); //Клонируем разметку из ведра
    
//         usersComments.querySelector("img").src = avatarUser(); //В img атрибут src передаём путь к фото аватара
//         usersComments.querySelector(".social__text").textContent = userInst[i].comments[j]; //Передаём комментарий
    
//         instCommentsBlock.appendChild(usersComments); //встявляем узел в конец списка дочерних элементов контейнера
//     }
//     instFirstBlock.querySelector(".gallery-overlay-controls-comments").classList.add("hidden"); //Скрываем блок счётчика комментов
//     var instDescription = instFirstBlock.querySelector(".gallery-overlay-controls-description");  //Находим блок с описанием фотографии
//     instDescription.classList.remove("hidden");  //Показываем блок с описанием фотографии
//     instDescription.querySelector("img").src = avatarUser(); //Задаем аватар пользователя
//     instDescription.querySelector(".social__caption").textContent = userInst[i].description; //Заполняем описание фотографии

//     bigPictureBusket.appendChild(instFirstBlock); //встявляем узел в конец списка дочерних элементов контейнера
// }

// var bigPicture = document.querySelectorAll(".gallery-overlay");                     //Находим все большие фото
// var buttonCloseBigPicture = document.querySelectorAll(".gallery-overlay-close");    //Все кнопки закрытия

// function openBigPicture(i){                                         //Открытие окна
//     bigPicture[i].classList.remove("hidden");
//     document.addEventListener("keydown", onBigPictureEscPress);     //Добавление обработчика нажатия Esc
// }
// function closeBigPicture(i){
//     bigPicture[i].classList.add("hidden");
//     document.removeEventListener("keydown", onBigPictureEscPress);  //Удаление обработчика нажатия Esc
// }
// function onBigPictureEscPress(evt, i){                                 //Закрытие bigPicture по Esc
//     if (evt.keyCode === 27){
//         closeBigPicture(i);
//     }
// }

// for (let i=0; i<userInst.length; i++){                //Обработчик событий на открытие больших фото
//     picture[i].addEventListener("click", function(){
//         openBigPicture(i);
//     });
//     buttonCloseBigPicture[i].addEventListener("click", function(){
//         closeBigPicture(i);
//     });
// }

*/

//Второй способ
var instFirstBlock = document.querySelector(".gallery-overlay");
function bigPictureNice(i){
    instFirstBlock.querySelector(".gallery-overlay-image").src = userInst[i].url; //В img атрибут src передаём путь к фото
    instFirstBlock.querySelector(".comments-count").textContent = userInst[i].comments.length; //Передаём кол-во коментов
    instFirstBlock.querySelector(".likes-count").textContent = userInst[i].likes; //Передаём кол-во лайков
    var instCommentsBlock = instFirstBlock.querySelector(".social"); //Находим блок с комментариями
    var instTempladeComments = document.querySelector("#social-template").content.querySelector(".social__comment"); //Находим ведро для дублирования комментов
    for (var j=0; j<userInst[i].comments.length; j++){ //Цикл добавления комментариев
        var usersComments = instTempladeComments.cloneNode(true); //Клонируем разметку из ведра
    
        usersComments.querySelector("img").src = avatarUser(); //В img атрибут src передаём путь к фото аватара
        usersComments.querySelector(".social__text").textContent = userInst[i].comments[j]; //Передаём комментарий
    
        instCommentsBlock.appendChild(usersComments); //встявляем узел в конец списка дочерних элементов контейнера
    }
    instFirstBlock.querySelector(".gallery-overlay-controls-comments").classList.add("hidden"); //Скрываем блок счётчика комментов
    var instDescription = instFirstBlock.querySelector(".gallery-overlay-controls-description");  //Находим блок с описанием фотографии
    instDescription.classList.remove("hidden");  //Показываем блок с описанием фотографии
    instDescription.querySelector("img").src = avatarUser(); //Задаем аватар пользователя
    instDescription.querySelector(".social__caption").textContent = userInst[i].description; //Заполняем описание фотографии
}

function delComments(){
    var templadeComments = document.querySelectorAll(".social__comment");
    for (var i=0; i<templadeComments.length; i++){
        templadeComments[i].remove();
    }
}

function openBigPicture(){                                         //Открытие окна
    instFirstBlock.classList.remove("hidden");
    document.addEventListener("keydown", onBigPictureEscPress);     //Добавление обработчика нажатия Esc
}
function closeBigPicture(){
    instFirstBlock.classList.add("hidden");
    delComments();
    document.removeEventListener("keydown", onBigPictureEscPress);  //Удаление обработчика нажатия Esc
}
function onBigPictureEscPress(evt){                                 //Закрытие bigPicture по Esc
    if (evt.keyCode === 27){
        closeBigPicture();
    }
}

for (let i=0; i<userInst.length; i++){                //Обработчик событий на открытие больших фото
    picture[i].addEventListener("click", function(){
        bigPictureNice(i)
        openBigPicture();
    });
    buttonCloseBigPicture.addEventListener("click", function(){
        closeBigPicture();
    });
}

//Перемещение ползунка обработки фотогрфии

var effectPin = document.querySelector(".upload-effect-level-pin");     //Нашёл пин
var effectVal = document.querySelector(".upload-effect-level-val");     //Нашёл "хвост" пина
var imagePreview = document.querySelector(".effect-image-preview");

window.coordinates = {    
    currentPosition: null,
    EFFECT_WIDTH_MIN: 0,                                                //границы пина
    EFFECT_WIDTH_MAX: 455,
}

effectPin.addEventListener("mousedown", function(evt){
    evt.preventDefault();                                               //Отменяю действие по умолчанию
    var startCoordX = evt.clientX;                                      //Задаю начальные координаты
    function onMouseMove(moveEvt){
        moveEvt.preventDefault();                                       //Отменяю действие по умолчанию
        var shift = startCoordX - moveEvt.clientX;                      //Отслеживаем изменение координат пина
        startCoordX = moveEvt.clientX;                                  //Обновляем текущее положение пина
        if (((effectPin.offsetLeft - shift)>=window.coordinates.EFFECT_WIDTH_MIN) && ((effectPin.offsetLeft - shift)<=window.coordinates.EFFECT_WIDTH_MAX)){      //Если не выходим за пределы поля пина 
            window.coordinates.currentPosition =  (effectPin.offsetLeft - shift);  //Рассчитываем правильное положение
            effectPin.style.left = window.coordinates.currentPosition + "px";              //Присваиваем пину и хвосту пина  и пепреводим в px
            effectVal.style.width = window.coordinates.currentPosition + "px";
            addFilter();
        }
    }
    function onMouseUp(upEvt){
        upEvt.preventDefault();
        document.removeEventListener("mousemove", onMouseMove);         //При отпукании пина удалить с него обработчики
        document.removeEventListener("mouseup", onMouseUp);
    }
    document.addEventListener("mousemove", onMouseMove);                //При нажатии на пин добавить обработчики
    document.addEventListener("mouseup", onMouseUp);
})

//Изменение фильтра


var effectLevel = document.querySelector(".upload-effect-level");
var flagEffect = "none";
var checkBox = document.querySelectorAll(".upload-effect-controls input[type=radio]");

function valieCheckBox(i){
    flagEffect = checkBox[i].value;
}
function showPin(){
    effectLevel.classList.remove("hidden");

}
function hidePin(){
    effectLevel.classList.add("hidden");
}
function addFilter(){
    if (flagEffect === "none"){
        imagePreview.style.filter = null;
    }
    if (flagEffect === "chrome"){
        imagePreview.style.filter = "grayscale("+ window.coordinates.currentPosition/455 +")";
        imagePreview.classList.add("effect-chrome");
    }
    if (flagEffect === "sepia"){
        imagePreview.style.filter = "sepia("+ window.coordinates.currentPosition/455 +")";
        imagePreview.classList.add("effect-sepia");
    }
    if (flagEffect === "marvin"){
        imagePreview.style.filter = "invert("+ window.coordinates.currentPosition*100/455 +"%)";
        imagePreview.classList.add("effect-marvin");
    }
    if (flagEffect === "phobos"){
        imagePreview.style.filter = "blur("+ (1 + 4*(window.coordinates.currentPosition/455)) +"px)";
        imagePreview.classList.add("effect-phobos");
    }
    if (flagEffect === "heat"){
        imagePreview.style.filter = "brightness("+ (1 + 2*(window.coordinates.currentPosition/455)) +")";
        imagePreview.classList.add("effect-heat");
    }
}
hidePin();
function removePreviousClass(){
    if (imagePreview.classList.length > 1){
        for(var i = 1; i<imagePreview.classList.length; i++){
            imagePreview.classList.remove(imagePreview.classList[1]);
        }
    }
}
function effectDefolt(){
    effectPin.style.left = window.coordinates.EFFECT_WIDTH_MAX + "px";
    effectVal.style.width = window.coordinates.EFFECT_WIDTH_MAX + "px";
    window.coordinates.currentPosition = window.coordinates.EFFECT_WIDTH_MAX;
}

for(let i = 0; i<checkBox.length; i++){
    checkBox[i].addEventListener("change", function(){
        valieCheckBox(i);
    })
}

checkBox[0].addEventListener("change", function(){    
    hidePin();
    removePreviousClass();
    effectDefolt();
    imagePreview.style.filter = null;
})

for (let i = 1; i<checkBox.length; i++){
    checkBox[i].addEventListener("change", function(){        
        showPin();
        removePreviousClass();
        effectDefolt();
        addFilter();
    })
}






























// function openPicture(evt){
//     evt.preventDefault()                //Отменяем действие по умолчанию
//     instFirstBlock.classList.remove("hidden"); //Удаляем класс скрывающий большую фотографию
//     clickElement = evt.target;
//     i = clickElement.id;
//     pictureDataFilling(i);
//     document.addEventListener("keydown", onPictureEscPress); //Добавление обработчика нажатия Esc
// }
// function closePicture(){
//     instFirstBlock.classList.add("hidden");
//     document.removeEventListener("keydown", onPictureEscPress); //Удаление обработчика нажатия Esc
// }
// function onPictureEscPress(evt){ //Закрытие оверлея по Esc
//     if (evt.keyCode === 27){
//         closePicture();
//     }
// }

// document.addEventListener("click", openPicture);

// function closePhoto(){
//     evt.preventDefault()                //Отменяем действие по умолчанию
//     instFirstBlock.classList.add("hidden"); //Удаляем класс скрывающий большую фотографию
// }
// var buttonClosePhoto = document.querySelector(".gallery-overlay-close");
// buttonClosePhoto.addEventListener("click", closePhoto);














// var instFirstBlock = document.querySelector(".gallery-overlay"); //Находим контейнер большой фотографии

// // instFirstBlock.classList.remove("hidden"); //Удаляем класс скрывающий большую фотографию
// instFirstBlock.querySelector(".gallery-overlay-image").src = userInst[0].url; //В img атрибут src передаём путь к фото
// instFirstBlock.querySelector(".comments-count").textContent = userInst[0].comments.length; //Передаём кол-во коментов
// instFirstBlock.querySelector(".likes-count").textContent = userInst[0].likes; //Передаём кол-во лайков

// var instCommentsBlock = instFirstBlock.querySelector(".social"); //Находим блок с комментариями
// var instTempladeComments = document.querySelector("#social-template").content.querySelector(".social__comment"); //Находим ведро для дублирования комментов


// for (var i=0; i<userInst[0].comments.length; i++){ //Цикл добавления комментариев
//     var usersComments = instTempladeComments.cloneNode(true); //Клонируем разметку из ведра

//     usersComments.querySelector("img").src = avatarUser(); //В img атрибут src передаём путь к фото аватара
//     usersComments.querySelector(".social__text").textContent = userInst[0].comments[i]; //Передаём комментарий

//     instCommentsBlock.appendChild(usersComments); //встявляем узел в конец списка дочерних элементов контейнера
// }

// instFirstBlock.querySelector(".gallery-overlay-controls-comments").classList.add("hidden"); //Скрываем блок счётчика комментов

// var instDescription = instFirstBlock.querySelector(".gallery-overlay-controls-description");  //Находим блок с описанием фотографии
// instDescription.classList.remove("hidden");  //Показываем блок с описанием фотографии
// instDescription.querySelector("img").src = avatarUser(); //Задаем аватар пользователя
// instDescription.querySelector(".social__caption").textContent = userInst[0].description; //Заполняем описание фотографии