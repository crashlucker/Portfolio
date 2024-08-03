(function () {

  let toDoArray = [],
    toDoArrayName = '';

  // Local storage

  function changeCart(product, keyName) {
    localStorage.setItem(keyName, JSON.stringify(product))
  }

  // Создание title
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  // Форма для возможности записи и создания нового дела
  function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-appern');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';
    button.disabled = true;

    input.addEventListener('input', () => button.disabled = !input.value);

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button
    };
  }

  // Лист дел
  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  // Создаем само дело с кнопками выполнить или удалить дело
  function createTodoItem(obj) {
    let item = document.createElement('li');

    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = obj.name;

    if (obj.done) item.classList.add('list-group-item-success');

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    doneButton.addEventListener('click', () => {
      item.classList.toggle('list-group-item-success');

      const currentId = obj.id;

      for (const arrayItem of toDoArray) {
        if (arrayItem.id === currentId) arrayItem.done = !arrayItem.done;
      }

      changeCart(toDoArray, toDoArrayName);
    });

    deleteButton.addEventListener('click', () => {
      if (confirm('Вы уверены?')) {

        let array = JSON.parse(localStorage.getItem(toDoArrayName));

        item.remove();

        let newArray = array.filter(object => object.id != obj.id);

        changeCart(newArray, toDoArrayName);
      }
    });

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return {
      item,
      doneButton,
      deleteButton
    };
  }

  // Создаем id для элемента
  function setId(arr) {
    let maxId = 0;
    for (const item of arr) {
      if (item.id > maxId) maxId = item.id;
    }

    return maxId + 1;
  }

  // Создаем само приложение TODO, добавляя его на разметку HTML
  function createTodoApp(container, title = 'Список дел', keyName) {

    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();
    toDoArrayName = keyName;

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    if (localStorage.getItem(toDoArrayName)) {
      toDoArray = JSON.parse(localStorage.getItem(toDoArrayName));
    } else {
      localStorage.setItem(toDoArrayName, JSON.stringify(toDoArray));
    }

    for (const itemList of toDoArray) {
      let todoItem = createTodoItem(itemList);
      todoList.append(todoItem.item);
    }

    todoItemForm.form.addEventListener('submit', (e) => {
      e.preventDefault();

      let newItem = {
        id: setId(toDoArray),
        name: todoItemForm.input.value,
        done: false
      };

      let todoItem = createTodoItem(newItem);

      toDoArray.push(newItem);

      changeCart(toDoArray, keyName);

      todoList.append(todoItem.item);

      todoItemForm.input.value = '';

      todoItemForm.button.disabled = true;
    });

  }

  window.createTodoApp = createTodoApp;
})();
