var apiKey = apiKeyResponse.apiKey;

function getAllGrades() {
  $.ajax({
    method: "GET",
    url: "https://sgt.lfzprototypes.com/api/grades",
    headers: {
      "X-Access-Token": apiKey
    },
    complete: function() {
      console.log("getAllGrades request completed");
    },
    success: function(data) {
      console.log(data);
    },
    error: function(err) {
      console.log(err);
    }
  });
}
