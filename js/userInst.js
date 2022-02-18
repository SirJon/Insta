(function(){    
    var commentsText, descriptionText;
    var VALUE_INST = 25;


    window.userInst = new Array(VALUE_INST);

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


    //Функция рандомного выбора одного или двух комментов
    function randomComments(){
        var com = randomMinMax(1,3) == 1 ? [randomValue(commentsText)] : [randomValue(commentsText), randomValue(commentsText)];
        return(com);
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
})();