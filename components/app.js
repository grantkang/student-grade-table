
class App {
  constructor(apiKey,gradeTable,pageHeader) {
    this.apiKey = apiKey;
    this.gradeTable = gradeTable;
    this.pageHeader = pageHeader;
    this.handleGetGradesError = this.handleGetGradesError.bind(this);
    this.handleGetGradesSuccess = this.handleGetGradesSuccess.bind(this);
  }
  handleGetGradesError(error) {
    console.log(error);
  }
  handleGetGradesSuccess(grades) {
    this.gradeTable.updateGrades(grades);
    var average = 0;
    for(var grade of grades) {
      average += grade.grade;
    }
    average /= grades.length;
    this.pageHeader.updateAverage(average);
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
  start() {
    this.getGrades();
  }
}
