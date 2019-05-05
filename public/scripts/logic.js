// Communicate with server
var searchForm = $('#searchForm');
var charModal = $('#characterModal');


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
          populateFields(obj);
          enableCharacterModal();
        }else{
           console.log(obj.statusMessage.reason);
           enableFailureModal();
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

function enableCharacterModal(){
 charModal.show();
}

function enableFailureModal(){
  
}

function populateFields(object){
  

  $('#level').text(object.statsObj.level);
  $('#Strength').text(object.statsObj.stats.str);
  $('#Agility').text(object.statsObj.stats.agi);
  $('#Inteligence').text(object.statsObj.stats.int);
  $('#Stamina').text(object.statsObj.stats.sta);
  $('#Haste').text(Math.round(parseInt(object.statsObj.stats.haste) * 100) / 100);
  $('#health').text(object.statsObj.stats.health);

  console.log(object);
}

function closeCharacterModal(){
  charModal.hide();
}