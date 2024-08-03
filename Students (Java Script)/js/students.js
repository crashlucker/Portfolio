export default class Student {
  constructor(name, surname, lastname, birthDate, studyStart, faculty) {
    this.name = name
    this.surname = surname
    this.lastname = lastname
    this.birthDate = birthDate
    this.studyStart = studyStart
    this.faculty = faculty
  }

  rightSurname() {
    return this.surname.charAt(0).toUpperCase() + this.surname.slice(1).toLowerCase();
  }
  rightName() {
    return this.name.toLowerCase().charAt(0).toUpperCase() + this.name.slice(1).toLowerCase();
  }
  rightLastname() {
    return this.lastname.toLowerCase().charAt(0).toUpperCase() + this.lastname.slice(1).toLowerCase();
  }

  get fullName() {
    return this.rightSurname() + ' ' + this.rightName() + ' ' + this.rightLastname();
  }

  getAge() {

    const today = new Date();
    let year = this.birthDate.getFullYear();
    let month = this.birthDate.getMonth();
    let day = this.birthDate.getDate();
    let age = today.getFullYear() - year;
    if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
      age--;
    }

    if (Math.floor(age / 10) === 1) return age + ' лет';

    switch (age % 10) {
      case 1: return age + ' год';

      case 2:
      case 3:
      case 4: return age + ' года';

      default: return age + ' лет'
    }
  }

  getBirthDay() {
    let d = this.birthDate.getDate();
    let m = this.birthDate.getMonth() + 1;
    const y = this.birthDate.getFullYear();

    d = d > 9 ? d : '0' + d;
    m = m > 9 ? m : '0' + m;

    return d + '.' + m + '.' + y + ' (' + this.getAge() + ')';
  }

  getFaculty() {
    return this.faculty;
  }

  getFacultyTerms() {
    const today = new Date();

    const endOfStudy = this.studyStart + 4;

    if (today.getFullYear() - endOfStudy > 0) return this.studyStart + '-' + (this.studyStart + 4) + ' (Выпустился)';

    return this.studyStart + '-' + (this.studyStart + 4) + ' (' + (today.getFullYear() - this.studyStart) + ' курс)';
  }
}
