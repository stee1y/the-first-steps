var arr2,
    arr3,
    arr4,
    arr5;

arr2 = [1,2,3,4,5,6,7,8,9,0];
arr3 = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
arr4 = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
arr5 = ['!','@','#','$','%','^','&','*'];

                                // длинна строки
document.getElementById('line-length').oninput = function () {
    document.getElementById('length').innerHTML = this.value;
};

                                // количество паролей
document.getElementById('number-password').oninput = function () {
    document.getElementById('number-pass').innerHTML = this.value;
};

                                // отлавливание нажатия генерации
document.getElementById('generator').onclick = generatePass;

                                // генерирование пароля
function generatePass() {
    var result = [];
    if(document.getElementById('numbers').checked){     // включение цыфр в пароль при нажатом флаге
        result = result.concat(arr2);
    }if(document.getElementById('small-letters').checked){      // включение строчных букв в пароль при нажатом флаге
        result = result.concat(arr3);
    }if(document.getElementById('big-letters').checked){        // включение прописных букв в пароль при нажатом флаге
        result = result.concat(arr4);
    }if(document.getElementById('special-characters').checked){     // включение спецсимволов в пароль при нажатом флаге
        result = result.concat(arr5);
    };

                                // сортировка записаного массива рандомно
    result.sort(random);

                                // очищение строк
    document.getElementById('out').innerHTML = '';

                                // получение значения выбранного количества паролей и переведение этого значения в число командой parseInt()
    var numberPassword = parseInt(document.getElementById('number-password').value);

                                // цикл для создания случайных паролей на странице
    for (var q = 0; q < numberPassword; q++){

                                // получение значения выбранного количества элементов и переведение этого значения в число командой parseInt()
    var lineLength = parseInt(document.getElementById('line-length').value);

                                // создание пустой строки для дальнейшего заполнения
    var pass = '';

                                // заполнение строки рандомно перемешанным массивом
    for (var i = 0; i<lineLength; i++){
        pass += result[getRandomInt(0, result.length - 1)];

                                // выведение полученого пароля
    }document.getElementById('out').innerHTML += '<p>' + pass + '</p>';

                                // после окончания генерации поднять экран к паролям (для телефонов)
        function up() {
            if (window.pageYOffset > 0) {
                window.scrollBy(0, -1);
                setTimeout(up, 3);
            };
        };

        up();
    };
};

                                // получение рандомного числа для функции сортировки
function random(a,b) {
    return Math.random() - 0.5;
};

                                // получение случайного числа для генерации пароля
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};