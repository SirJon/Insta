(function(){
    window.backend = function(url, onSuccess, onError){
        var xhr = new XMLHttpRequest();

        console.log(xhr);
        xhr.addEventListener("load", function(){
            var error;
            switch (xhr.status){
                case 200: 
                    onSuccess(xhr.responseText);
                    break;

                case 400:
                    error = "Неверный запрос";
                    break;
                case 401:
                    error = "Пользователь не авторизован";
                    break;
                case 404:
                    error = "Ничего не найдено";
                    break;

                default:
                    error = "Статус ответа: " + xhr.status + " " + xhr.statusText;
            }
            if (error){
                onError(error);
            }
        })

        xhr.addEventListener("error", function(){
            onError("Произошла ошибка соединения")
        });

        xhr.timeout = 3000;
        xhr.addEventListener("timeout", function(){
            onError("Запрос не успел выполниться за " + xhr.timeout + "мс")
        })

        xhr.open("GET", url);
        xhr.send();
    }
})();