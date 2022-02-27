(function(){
    window.sorting = function(xhrcontent){
        var filters = document.querySelector(".filters");
        filters.classList.remove("hidden");

        var checkBox = document.querySelectorAll(".filters-radio");

        var copyXhrcontent = xhrcontent.slice();

        var recommendPhoto = copyXhrcontent.slice();

        var popularPhoto = copyXhrcontent.sort(function(left, right){
            return right.likes - left.likes;
        }).slice();

        var discussedPhoto = copyXhrcontent.sort(function(left, right){
            return -left.comments.length + right.comments.length;
        }).slice();

        var shuffle = function(arr){
            for (var i=arr.length-1; i>0; i--){
                let nowValue = arr[i];
                let shuffleIndex = Math.floor(Math.random()*(i+1));

                arr[i] = arr[shuffleIndex];
                arr[shuffleIndex] = nowValue;
            }
            return(arr);
        }

        var newPhoto = function(arr){
            return(shuffle(arr).slice(0, 10));
        };

        var randomPhoto = newPhoto(copyXhrcontent).slice();

        var valueFilter = {
            "recommend": recommendPhoto,
            "popular": popularPhoto,
            "discussed": discussedPhoto,
            "random": randomPhoto
        }

        var delСontent = function(){
            var templadeСontent = document.querySelectorAll(".picture");
            for (var i=0; i<templadeСontent.length; i++){
                templadeСontent[i].remove();
            }
        }
        
        for (let i=0; i<checkBox.length; i++){
            checkBox[i].addEventListener("change", function(){
                delСontent();
                window.makeСontent(valueFilter[checkBox[i].value]);
                window.bigPictureOpen(valueFilter[checkBox[i].value]);
            })
        }
    }
})();