
class App {
  constructor(apiKey,gradeTable,pageHeader,gradeForm) {
    this.apiKey = apiKey;
    this.gradesCache = [];
    this.gradeTable = gradeTable;
    this.pageHeader = pageHeader;
    this.gradeForm = gradeForm;
    this.handleGetGradesError = this.handleGetGradesError.bind(this);
    this.handleGetGradesSuccess = this.handleGetGradesSuccess.bind(this);
    this.createGrade = this.createGrade.bind(this);
    this.handleCreateGradeError = this.handleCreateGradeError.bind(this);
    this.handleCreateGradeSuccess = this.handleCreateGradeSuccess.bind(this);
    this.deleteGrade = this.deleteGrade.bind(this);
    this.handleDeleteGradeError = this.handleDeleteGradeError.bind(this);
    this.handleDeleteGradeSuccess = this.handleDeleteGradeSuccess.bind(this);
    this.editGrade = this.editGrade.bind(this);
    this.handleEditGradeError = this.handleEditGradeError.bind(this);
    this.handleEditGradeSuccess = this.handleEditGradeSuccess.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }
  getGrades() {
    $.ajax({
      method: "GET",
      url: "https://sgt.lfzprototypes.com/api/grades",
      headers: {
        "X-Access-Token": this.apiKey
      },
      complete: function () {
        console.log("getAllGrades request completed");
      },
      success: this.handleGetGradesSuccess,
      error: this.handleGetGradesError
    });
  }
  handleGetGradesError(error) {
    console.error(error);
  }
  handleGetGradesSuccess(grades) {
    this.gradesCache = grades;
    this.updateComponents();

  }
  createGrade(name,course,grade) {
    $.ajax({
      method: "POST",
      url: "https://sgt.lfzprototypes.com/api/grades",
      headers: {
        "X-Access-Token": this.apiKey
      },
      data: {
        "name": name,
        "course": course,
        "grade": grade,
      },
      complete: function () {
        console.log("createNewGrade request completed");
      },
      success: this.handleCreateGradeSuccess,
      error: this.handleCreateGradeError
    });
  }
  handleCreateGradeError(error) {
    console.error(error);
  }
  handleCreateGradeSuccess(addedStudent) {
    this.gradesCache.push(addedStudent);
    this.updateComponents();
  }
  deleteGrade(id) {
    $.ajax({
      method: "DELETE",
      url: "https://sgt.lfzprototypes.com/api/grades/" + id,
      headers: {
        "X-Access-Token": this.apiKey
      },
      complete: function () {
        console.log("deleteExistingGrade request completed");
      },
      success: this.handleDeleteGradeSuccess,
      error: this.handleDeleteGradeError
    });
  }
  handleDeleteGradeError(error) {
    console.error(error);
  }
  handleDeleteGradeSuccess() {
    this.getGrades();
  }
  editGrade(id, name, course, grade) {
      $.ajax({
        method: "PATCH",
        url: "https://sgt.lfzprototypes.com/api/grades/" + id,
        headers: {
          "X-Access-Token": this.apiKey
        },
        data: {
          "name": name,
          "course": course,
          "grade": grade
        },
        complete: function () {
          console.log("updateExistingGrade request completed");
        },
        success: this.handleEditGradeSuccess,
        error: this.handleEditGradeError
      });
  }
  handleEditGradeError(error) {
    console.error(error);
  }
  handleEditGradeSuccess() {
    this.getGrades();
  }
  toggleEdit(data) {
    this.gradeForm.editMode(data);
  }
  start() {
    this.getGrades();
    this.gradeForm.onEdit(this.editGrade);
    this.gradeForm.onSubmit(this.createGrade);
    this.gradeTable.onDeleteClick(this.deleteGrade);
    this.gradeTable.onEditClick(this.toggleEdit);
  }
  getAverage(grades) {
    var sum = 0;
    for (var grade of grades) {
      sum += grade.grade;
    }
    return Math.round(sum / grades.length);
  }
  updateComponents() {
    this.gradeTable.updateGrades(this.gradesCache);
    this.pageHeader.updateAverage(this.getAverage(this.gradesCache));
  }
}
