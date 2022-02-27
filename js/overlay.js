(function(){
        var uploadFile = document.querySelector("#upload-file");            //Находим инпут добавления фотографии
        var uploadOverlay = document.querySelector(".upload-overlay");      //Находим оверлей редактирования фотографии
        var overlayCancel = document.querySelector("#upload-cancel");       //Кнопка закрытия оверлея
        var imagePreview = document.querySelector(".effect-image-preview"); //Фотография оверлея
        var effectLevel = document.querySelector(".upload-effect-level");

        function openOverlay(){  //Функция открытия оверлея
            uploadOverlay.classList.remove("hidden");
            document.addEventListener("keydown", onOverlayEscPress); //Добавление обработчика нажатия Esc
        }
        function closeOverlay(){
            imagePreview.style.filter = null;
            effectLevel.classList.add("hidden");
            uploadOverlay.classList.add("hidden");
            document.removeEventListener("keydown", onOverlayEscPress); //Удаление обработчика нажатия Esc
            uploadFile.value = ""; //Обнуление инпута чтобы сработал change
        }
        function onOverlayEscPress(evt){ //Закрытие оверлея по Esc
            if (evt.keyCode === 27){
                closeOverlay();
            }
        }

        overlayCancel.addEventListener("click", closeOverlay); //Закрыть оверлей при нажатии на кнопку

        var FILE_TYPES = ["png" , "jpg" , "jpeg" , "gif"];
        var fileChooser = document.querySelector("#upload-file");

        fileChooser.addEventListener("change", function(){
            var file = fileChooser.files[0];
            var fileName = file.name.toLowerCase();

            var matches = FILE_TYPES.some(function(item){
                return fileName.endsWith(item);
            });

            if (matches){
                openOverlay();
                var reader = new FileReader();
                var previewSrc = function(){
                    imagePreview.src = reader.result;
                }
                reader.addEventListener("load", previewSrc);
                reader.readAsDataURL(file);
            } else{
                alert("Неверный формат, загрузите фотографию в формате png, jpg, jpeg или gif")
            }
        })
})();