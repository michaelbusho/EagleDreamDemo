// Communicate with server
var searchForm = $('#searchForm');

searchForm.submit(function (e) {
  e.preventDefault();
  $.ajax({
    type: searchForm.attr('method'),
    url: searchForm.attr('action'),
    data: searchForm.serialize(),
    success: function (data) {
        console.log('Performed Search.');
        var obj = JSON.parse(data);
        if(obj.statusMessage.status === 'ok'){
          console.log(obj);
        }else{
           console.log(obj.statusMessage.reason);
        }
    },
    error: function (data) {
        console.log('Search could not be performed');
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