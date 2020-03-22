var apiKey = apiKeyResponse.apiKey;

var gradeTable = new GradeTable(document.getElementById('grade-table'), document.getElementById('no-grades-element'));
var pageHeader = new PageHeader(document.getElementById('page-header'));
var gradeForm = new GradeForm(document.getElementById('new-grade-form'));
var app = new App(apiKey, gradeTable, pageHeader, gradeForm);
app.start();
