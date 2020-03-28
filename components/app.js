
class App {
  constructor(apiKey,gradeTable,pageHeader,gradeForm) {
    this.apiKey = apiKey;
    this.gradesCache = [];
    this.gradeTable = gradeTable;
    this.pageHeader = pageHeader;
    this.gradeForm = gradeForm;
  }
  getGrades = () => {
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
  handleGetGradesError = (error) => {
    console.error(error);
  }
  handleGetGradesSuccess = (grades) => {
    this.gradesCache = grades;
    this.updateComponents();
  }
  createGrade = (name,course,grade) => {
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
  handleCreateGradeError = (error) => {
    console.error(error);
  }
  handleCreateGradeSuccess = (addedGrade) => {
    addedGrade.grade = Number(addedGrade.grade);
    this.gradesCache.push(addedGrade);
    this.updateComponents();
  }
  deleteGrade = (id) => {
    $.ajax({
      method: "DELETE",
      url: "https://sgt.lfzprototypes.com/api/grades/" + id,
      headers: {
        "X-Access-Token": this.apiKey
      },
      complete: function () {
        console.log("deleteExistingGrade request completed");
      },
      success: function() {
        this.handleDeleteGradeSuccess(id);
      },
      error: this.handleDeleteGradeError
    });
  }
  handleDeleteGradeError = (error) => {
    console.error(error);
  }
  handleDeleteGradeSuccess = (id) => {
    for(var i = this.gradesCache.length - 1; i >= 0; i--) {
      if(this.gradesCache[i].id === id) {
        this.gradesCache.splice(i,1);
        this.updateComponents();
        return;
      }
    }
  }
  editGrade = (id, name, course, grade) => {
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
  handleEditGradeError = (error) => {
    console.error(error);
  }
  handleEditGradeSuccess = (updatedGrade) => {
    for (var i = this.gradesCache.length - 1; i >= 0; i--) {
      if (this.gradesCache[i].id === updatedGrade.id) {
        this.gradesCache[i] = updatedGrade;
        this.updateComponents();
        return;
      }
    }
  }
  toggleEdit = (data) => {
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
      sum += Number(grade.grade);
    }
    return Math.round(sum / grades.length);
  }
  updateComponents() {
    this.gradeTable.updateGrades(this.gradesCache);
    this.pageHeader.updateAverage(this.getAverage(this.gradesCache));
  }
}
