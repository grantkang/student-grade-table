var apiKey = apiKeyResponse.apiKey;
var username = "Grant Kang";

function createNewGrade(id,name,course,grade,createdBy) {
  $.ajax({
    method: "POST",
    url: "https://sgt.lfzprototypes.com/api/grades",
    headers: {
      "X-Access-Token": apiKey
    },
    data: {
      "id": id,
      "name": name,
      "course": course,
      "grade": grade,
      "createdBy": createdBy
    },
    complete: function () {
      console.log("createNewGrade request completed");
    },
    success: function (data) {
      console.log(data);
    },
    error: function (err) {
      console.log(err);
    }
  });
}

function updateExistingGrade(id,name,course,grade) {
  if(name || course || grade) {
    $.ajax({
      method: "PATCH",
      url: "https://sgt.lfzprototypes.com/api/grades/" + id,
      headers: {
        "X-Access-Token": apiKey
      },
      data: {
        "name": name,
        "course": course,
        "grade": grade
      },
      complete: function () {
        console.log("updateExistingGrade request completed");
      },
      success: function (data) {
        console.log(data);
      },
      error: function (err) {
        console.log(err);
      }
    });
  } else {
    console.log("updateExistingGrade(): Must send at least one field to update");
  }
}

function deleteExistingGrade(id) {
  $.ajax({
    method: "DELETE",
    url: "https://sgt.lfzprototypes.com/api/grades/" + id,
    headers: {
      "X-Access-Token": apiKey
    },
    complete: function () {
      console.log("deleteExistingGrade request completed");
    },
    success: function (data) {
      console.log(data);
    },
    error: function (err) {
      console.log(err);
    }
  });
}

var gradeTable = new GradeTable(document.getElementById('grade-table'));
var pageHeader = new PageHeader(document.getElementById('page-header'));
var gradeForm = new GradeForm(document.getElementById('new-grade-form'));
var app = new App(apiKey, gradeTable, pageHeader);
app.start();
