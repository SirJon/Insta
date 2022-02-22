(function(){
    var instWrapper = document.querySelector(".pictures");                                              //Находим пустой контейнер для наполнения контентом
    var instTemplade = document.querySelector("#picture-template").content.querySelector(".picture");   //Находим ведро для дублирования
    var instFirstBlock = document.querySelector(".gallery-overlay");                                    //Пустой контейнер большой фотографии

    //Функция заполнения инсты контентом
    window.makeСontent = function(xhrcontent){
        for (var i=0; i<xhrcontent.length; i++){
            var userElemets = instTemplade.cloneNode(true); //Клонируем разметку из ведра
    
            userElemets.querySelector("img").src = xhrcontent[i].url; //В img атрибут src передаём путь к фото
            userElemets.querySelector(".picture-comments").textContent = xhrcontent[i].comments.length; //Передаём кол-во комментов
            userElemets.querySelector(".picture-likes").textContent = xhrcontent[i].likes; //Передаём кол-во лайков
    
            instWrapper.appendChild(userElemets); //встявляем узел в конец списка дочерних элементов контейнера
        }
    }

    bigPictureContent = function(i, xhrcontent){
        instFirstBlock.querySelector(".gallery-overlay-image").src = xhrcontent[i].url; //В img атрибут src передаём путь к фото
        instFirstBlock.querySelector(".comments-count").textContent = xhrcontent[i].comments.length; //Передаём кол-во коментов
        instFirstBlock.querySelector(".likes-count").textContent = xhrcontent[i].likes; //Передаём кол-во лайков
        var instCommentsBlock = instFirstBlock.querySelector(".social"); //Находим блок с комментариями
        var instTempladeComments = document.querySelector("#social-template").content.querySelector(".social__comment"); //Находим ведро для дублирования комментов
        for (var j=0; j<xhrcontent[i].comments.length; j++){ //Цикл добавления комментариев
            var usersComments = instTempladeComments.cloneNode(true); //Клонируем разметку из ведра
        
            usersComments.querySelector("img").src = xhrcontent[i].comments[j].avatar; //В img атрибут src передаём путь к фото аватара
            usersComments.querySelector(".social__text").textContent = xhrcontent[i].comments[j].message; //Передаём комментарий
        
            instCommentsBlock.appendChild(usersComments); //встявляем узел в конец списка дочерних элементов контейнера
        }
        instFirstBlock.querySelector(".gallery-overlay-controls-comments").classList.add("hidden"); //Скрываем блок счётчика комментов
        var instDescription = instFirstBlock.querySelector(".gallery-overlay-controls-description");  //Находим блок с описанием фотографии
        instDescription.classList.remove("hidden");  //Показываем блок с описанием фотографии
        instDescription.querySelector("img").src = xhrcontent[i].comments[1].avatar; //Задаем аватар пользователя
        instDescription.querySelector(".social__caption").textContent = xhrcontent[i].description; //Заполняем описание фотографии
    }

    //Обнуление комментов
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
        document.removeEventListener("keydown", onBigPictureEscPress);  //Удаление обработчика нажатия Esc
        delComments();
    }
    function onBigPictureEscPress(evt){                                 //Закрытие bigPicture по Esc
        if (evt.keyCode === 27){
            closeBigPicture();
        }
    }

    window.bigPictureOpen = function(xhrcontent){
        var buttonCloseBigPicture = document.querySelector(".gallery-overlay-close");       //Кнопку закрытия

        var picture = document.querySelectorAll(".picture");                                //Находим все picture

        for (let i=0; i<xhrcontent.length; i++){                                            //Обработчик событий на открытие больших фото
            picture[i].addEventListener("click", function(){
                bigPictureContent(i, xhrcontent);
                openBigPicture();
            });
            buttonCloseBigPicture.addEventListener("click", function(){
                closeBigPicture();
            });
        }
    }

    
 
    var URL = "https://24.javascript.pages.academy/kekstagram/data";


    //Выполнение кода при правильных полученных данных
    var onSuccess = function(data){
        var users = data;
        try {
            var xhrcontent = JSON.parse(users);
            window.makeСontent(xhrcontent);             //Заполняем фотки
            window.bigPictureOpen(xhrcontent);                 //Открытие большой фотографии
            console.log(xhrcontent);
            window.sorting(xhrcontent);
        }catch(err){
            console.error(err.message);
        }
    }

    var onError = function(message){
        console.error(message);
    }

    window.backend(URL, onSuccess, onError);
})();