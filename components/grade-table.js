
class GradeTable {
  constructor(tableElement,noGradesElement) {
    this.tableElement = tableElement;
    this.noGradesElement = noGradesElement;
  }
  updateGrades(grades) {
    var tbodyEl = this.tableElement.querySelector('tbody');
    tbodyEl.innerHTML = '';
    for(var data of grades) {
      tbodyEl.appendChild(this.renderGradeRow(data, this.deleteGrade, this.toggleEdit));
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
  onEditClick(toggleEdit) {
    this.toggleEdit = toggleEdit;
  }
  renderGradeRow(data,deleteGrade,toggleEdit) {
    var tableRowElement = document.createElement('tr');

    var tdNameElement = document.createElement('td');
    tdNameElement.textContent = data.name;

    var tdCourseNameElement = document.createElement('td');
    tdCourseNameElement.textContent = data.course;

    var tdGradeElement = document.createElement('td');
    tdGradeElement.textContent = data.grade;

    var tdOperationsElement = document.createElement('td');
    tdOperationsElement.classList.add('justify-space-evenly')

    var editButton = document.createElement('i');
    editButton.classList.add('fas','fa-edit', 'text-primary');
    editButton.addEventListener('click', function() {
      toggleEdit(data);
    });
    tdOperationsElement.appendChild(editButton);

    var deleteButton = document.createElement('i');
    deleteButton.classList.add('fas', 'fa-trash', 'text-danger');
    deleteButton.addEventListener('click', function () {
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
