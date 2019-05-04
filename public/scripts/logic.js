// Communicate with server
var searchForm = $('#searchForm');

searchForm.submit(function (e) {
  e.preventDefault();
  $.ajax({
    type: searchForm.attr('method'),
    url: searchForm.attr('action'),
    data: searchForm.serialize(),
    success: function (data) {
        console.log('The Search was successful.');
        var obj = JSON.parse(data);
        console.log(obj);
    },
    error: function (data) {
        console.log('An error occurred.');
        console.log(data);
    },
  });
});

//Show loading status while the data is being fetched
$(document).ready(function () {
    $(document).ajaxStart(function () {
        $("#loading").show();
    }).ajaxStop(function () {
        $("#loading").hide();
    });
});