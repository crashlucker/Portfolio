import Student from "./students.js";

// Стартовый JavaScript для отключения отправки форм при наличии недопустимых полей
(function () {
  'use strict'

  // Получите все формы, к которым мы хотим применить пользовательские стили проверки Bootstrap
  let forms = document.querySelectorAll('.needs-validation')

  // Зацикливайтесь на них и предотвращайте отправку
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

const students = [
  new Student('Ivan', 'Shiriaev', 'Denisovich', new Date(2003, 4, 20), 2021, 'Informatics'),
  new Student('Alen', 'Fiquar', 'Evgenievich', new Date(2012, 2, 12), 2003, 'Mathematics'),
  new Student('Denis', 'Makarov', 'Ivanovich', new Date(1990, 10, 10), 1999, 'Politics')
]


const $studentList = document.getElementById('table__body'),
  $studentListAllTh = document.querySelectorAll('th');

let column = 'fullName',
  columnDir = true,
  formValue = document.querySelectorAll('.validation-check'),
  flag;

function newStudent(student) {

  const $studentRow = document.createElement('tr'),
    $fullNameTd = document.createElement('td'),
    $facultyTd = document.createElement('td'),
    $birthdayTd = document.createElement('td'),
    $facultyTermsTd = document.createElement('td');

  $fullNameTd.textContent = student.fullName;
  $facultyTd.textContent = student.getFaculty();
  $birthdayTd.textContent = student.getBirthDay();
  $facultyTermsTd.textContent = student.getFacultyTerms();

  $studentRow.append($fullNameTd);
  $studentRow.append($facultyTd);
  $studentRow.append($birthdayTd);
  $studentRow.append($facultyTermsTd);

  return $studentRow;
}

function sortedStudents(prop, dir) {
  const studentsCopy = [...students];

  return studentsCopy.sort((studentA, studentB) => {
    if ((!dir == false ? studentA[prop] < studentB[prop] : studentA[prop] > studentB[prop]))
      return -1;
  })
}

function render() {
  let studentsCopy = [...students];

  studentsCopy = sortedStudents(column, columnDir);

  $studentList.innerHTML = '';

  for (const student of studentsCopy) $studentList.append(newStudent(student));

  formValue.forEach(el => el.value = '');
}


$studentListAllTh.forEach(el => el.addEventListener('click', function () {
  column = this.dataset.column;
  columnDir = !columnDir;
  render()
}))


// Add student

document.getElementById('add-student').addEventListener('submit', e => {
  e.preventDefault();

  flag = 1;

  formValue.forEach(el => {
    if (!el.value) flag = 0;
  })

  if (flag) {
    students.push(new Student(
      document.getElementById('input-name').value,
      document.getElementById('input-surname').value,
      document.getElementById('input-lastname').value,
      new Date(document.getElementById('input-birthday').value),
      Number(document.getElementById('input-studyStart').value),
      document.getElementById('input-faculty').value
    ))

    render();
  }

})

render();
