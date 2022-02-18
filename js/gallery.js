(function(){ 
    //Рандомное число в диапазоне от min до max(не включая max)
    function randomMinMax(min, max){
        return(Math.floor((Math.random() * (max-min))+min));
    }

    var instWrapper = document.querySelector(".pictures"); //Находим пустой контейнер для наполнения контентом
    var instTemplade = document.querySelector("#picture-template").content.querySelector(".picture");  //Находим ведро для дублирования

    //наполняем контейнер контентом
    for (var i=0; i<window.userInst.length; i++){
        var userElemets = instTemplade.cloneNode(true); //Клонируем разметку из ведра

        userElemets.querySelector("img").src = window.userInst[i].url; //В img атрибут src передаём путь к фото
        userElemets.querySelector(".picture-comments").textContent = window.userInst[i].comments.length; //Передаём кол-во комментов
        userElemets.querySelector(".picture-likes").textContent = window.userInst[i].likes; //Передаём кол-во лайков

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

   
    var instFirstBlock = document.querySelector(".gallery-overlay");
    function bigPictureNice(i){
        instFirstBlock.querySelector(".gallery-overlay-image").src = window.userInst[i].url; //В img атрибут src передаём путь к фото
        instFirstBlock.querySelector(".comments-count").textContent = window.userInst[i].comments.length; //Передаём кол-во коментов
        instFirstBlock.querySelector(".likes-count").textContent = window.userInst[i].likes; //Передаём кол-во лайков
        var instCommentsBlock = instFirstBlock.querySelector(".social"); //Находим блок с комментариями
        var instTempladeComments = document.querySelector("#social-template").content.querySelector(".social__comment"); //Находим ведро для дублирования комментов
        for (var j=0; j<window.userInst[i].comments.length; j++){ //Цикл добавления комментариев
            var usersComments = instTempladeComments.cloneNode(true); //Клонируем разметку из ведра
        
            usersComments.querySelector("img").src = avatarUser(); //В img атрибут src передаём путь к фото аватара
            usersComments.querySelector(".social__text").textContent = window.userInst[i].comments[j]; //Передаём комментарий
        
            instCommentsBlock.appendChild(usersComments); //встявляем узел в конец списка дочерних элементов контейнера
        }
        instFirstBlock.querySelector(".gallery-overlay-controls-comments").classList.add("hidden"); //Скрываем блок счётчика комментов
        var instDescription = instFirstBlock.querySelector(".gallery-overlay-controls-description");  //Находим блок с описанием фотографии
        instDescription.classList.remove("hidden");  //Показываем блок с описанием фотографии
        instDescription.querySelector("img").src = avatarUser(); //Задаем аватар пользователя
        instDescription.querySelector(".social__caption").textContent = window.userInst[i].description; //Заполняем описание фотографии
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

    for (let i=0; i<window.userInst.length; i++){                //Обработчик событий на открытие больших фото
        picture[i].addEventListener("click", function(){
            bigPictureNice(i)
            openBigPicture();
        });
        buttonCloseBigPicture.addEventListener("click", function(){
            closeBigPicture();
        });
    }

 
    var URL = "https://24.javascript.pages.academy/kekstagram/data";

    var onSuccess = function(data){
        var users = data;
        try {
            console.log(JSON.parse(users));
        }catch(err){
            console.error(err.message);
        }
    }

    var onError = function(message){
        console.error(message);
    }

    window.backend(URL, onSuccess, onError);
    window.backend("https://24.javascript.pages.academy/data", onSuccess, onError);
    window.backend("https://api.github.com/user", onSuccess, onError);
})();