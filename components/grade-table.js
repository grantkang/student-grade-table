
class GradeTable {
  constructor(tableElement,noGradesElement) {
    this.tableElement = tableElement;
    this.noGradesElement = noGradesElement;
  }
  updateGrades(grades) {
    var tbodyEl = this.tableElement.querySelector('tbody');
    tbodyEl.innerHTML = '';
    for(var data of grades) {
      tbodyEl.appendChild(this.renderGradeRow(data, this.deleteGrade));
    }
    if(!grades.length) {
      this.noGradesElement.classList.remove('d-none');
    } else {
      this.noGradesElement.classList.add('d-none');
    }
  }
  onDeleteClick(deleteGrade) {
    this.deleteGrade = deleteGrade;
  }
  renderGradeRow(data,deleteGrade) {
    var tableRowElement = document.createElement('tr');

    var tdNameElement = document.createElement('td');
    tdNameElement.textContent = data.name;

    var tdCourseNameElement = document.createElement('td');
    tdCourseNameElement.textContent = data.course;

    var tdGradeElement = document.createElement('td');
    tdGradeElement.textContent = data.grade;

    var tdOperationsElement = document.createElement('td');
    var deleteButton = document.createElement('button');
    deleteButton.classList.add('btn','btn-danger');
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener('click', function() {
      deleteGrade(data.id);
    });
    tdOperationsElement.appendChild(deleteButton);

    tableRowElement.appendChild(tdNameElement);
    tableRowElement.appendChild(tdCourseNameElement);
    tableRowElement.appendChild(tdGradeElement);
    tableRowElement.appendChild(tdOperationsElement);

    return tableRowElement;
  }
}
