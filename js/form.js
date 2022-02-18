(function(){   
    //Перемещение ползунка обработки фотогрфии

    var effectPin = document.querySelector(".upload-effect-level-pin");     //Нашёл пин
    var effectVal = document.querySelector(".upload-effect-level-val");     //Нашёл "хвост" пина
    var imagePreview = document.querySelector(".effect-image-preview");

    var currentPosition = null;
    var EFFECT_WIDTH_MIN = 0;                                               //границы пина
    var EFFECT_WIDTH_MAX = 455;

    effectPin.addEventListener("mousedown", function(evt){
        evt.preventDefault();                                               //Отменяю действие по умолчанию
        var startCoordX = evt.clientX;                                      //Задаю начальные координаты
        function onMouseMove(moveEvt){
            moveEvt.preventDefault();                                       //Отменяю действие по умолчанию
            var shift = startCoordX - moveEvt.clientX;                      //Отслеживаем изменение координат пина
            startCoordX = moveEvt.clientX;                                  //Обновляем текущее положение пина
            if (((effectPin.offsetLeft - shift)>= EFFECT_WIDTH_MIN) && ((effectPin.offsetLeft - shift)<= EFFECT_WIDTH_MAX)){      //Если не выходим за пределы поля пина 
                currentPosition =  (effectPin.offsetLeft - shift);  //Рассчитываем правильное положение
                effectPin.style.left =  currentPosition + "px";              //Присваиваем пину и хвосту пина  и пепреводим в px
                effectVal.style.width =  currentPosition + "px";
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
            imagePreview.style.filter = "grayscale("+  currentPosition/455 +")";
            imagePreview.classList.add("effect-chrome");
        }
        if (flagEffect === "sepia"){
            imagePreview.style.filter = "sepia("+  currentPosition/455 +")";
            imagePreview.classList.add("effect-sepia");
        }
        if (flagEffect === "marvin"){
            imagePreview.style.filter = "invert("+  currentPosition*100/455 +"%)";
            imagePreview.classList.add("effect-marvin");
        }
        if (flagEffect === "phobos"){
            imagePreview.style.filter = "blur("+ (1 + 4*( currentPosition/455)) +"px)";
            imagePreview.classList.add("effect-phobos");
        }
        if (flagEffect === "heat"){
            imagePreview.style.filter = "brightness("+ (1 + 2*( currentPosition/455)) +")";
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
        effectPin.style.left =  EFFECT_WIDTH_MAX + "px";
        effectVal.style.width =  EFFECT_WIDTH_MAX + "px";
        currentPosition =  EFFECT_WIDTH_MAX;
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
})();