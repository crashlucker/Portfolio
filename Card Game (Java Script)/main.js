(function () {
  document.addEventListener("DOMContentLoaded", () => {

    // Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.

    function createNumbersArray(count) {
      let array = Array.from({ length: count * 2 }, (_, index) => (index % count) + 1);

      return array;
    }

    // Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

    function shuffle(arr) {
      for (let i = 0; i < arr.length; i++) {
        let randomIndex = Math.floor(Math.random() * arr.length);
        let temp = arr[i];
        arr[i] = arr[randomIndex];
        arr[randomIndex] = temp;
      };

      return arr;
    }

    function removeItem(countBackArray) {

      if (countBackArray.length === 2) {
        if (countBackArray[0].id === countBackArray[1].id) {
          invisiblePairs++;

          countBackArray[0].classList.add('click-restrict');
          countBackArray[1].classList.add('click-restrict');

          if (invisiblePairs === countOfPairs) makeButton();
        }
      }

      if (countBackArray.length === 3) {
        if (countBackArray[0].id !== countBackArray[1].id) {
          countBackArray[0].classList.remove('back');
          countBackArray[1].classList.remove('back');
          countBackArray[0].classList.remove(countBackArray[0].id);
          countBackArray[1].classList.remove(countBackArray[1].id);
        }

        countBackArray.splice(0, 2);
      }
    }

    function makeButton() {
      let button = document.createElement('button');

      button.textContent = 'Сыграть еще раз';
      button.classList.add('replay');

      button.addEventListener('click', () => location.reload());

      document.body.append(button);
    }

    // Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

    function startGame(count) {
      let numberArray = createNumbersArray(count);
      numberArray = shuffle(numberArray);



      for (let arrayId of numberArray) {
        let li = document.createElement('li');
        li.classList.add('item');
        li.id = idOfItem[arrayId - 1];
        list.append(li);
      }

      document.querySelectorAll('.item').forEach(e => e.addEventListener('click', () => {

        e.classList.toggle("back");

        countBackArray.includes(e) ? countBackArray.splice(countBackArray.indexOf(e), 1) : countBackArray.push(e);

        e.classList.toggle(e.id);
        removeItem(countBackArray);
      }))

    }

    let countOfPairs = 8;
    let countBackArray = [];
    let list = document.querySelector(".list");
    let invisiblePairs = 0;
    const idOfItem = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];

    startGame(countOfPairs);
  })
})()
