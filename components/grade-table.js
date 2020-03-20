
class GradeTable {
  constructor(tableElement) {
    this.tableElement = tableElement;
  }
  updateGrades(grades) {
    console.log(grades);
    var tbodyEl = this.tableElement.querySelector('tbody');
    tbodyEl.innerHTML = '';
    for(var grade of grades) {
      var tableRowElement = document.createElement('tr');
      var tdNameElement = document.createElement('td');
      tdNameElement.textContent = grade.name;
      var tdCourseNameElement = document.createElement('td');
      tdCourseNameElement.textContent = grade.course;
      var tdGradeElement = document.createElement('td');
      tdGradeElement.textContent = grade.grade;
      tableRowElement.appendChild(tdNameElement);
      tableRowElement.appendChild(tdCourseNameElement);
      tableRowElement.appendChild(tdGradeElement);
      tbodyEl.appendChild(tableRowElement);
    }
  }
}
