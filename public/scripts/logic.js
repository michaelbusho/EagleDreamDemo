// Communicate with server
var searchForm = $('#searchForm');
var charModal = $('#characterModal');
var invalidModal = $('#invalidModal');

searchForm.submit(function (e) {
  closeCharacterModal();
  closefailureModal();
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
          closefailureModal();
        }else{
           console.log(obj.statusMessage.reason);
            $("#failure-reason").text(obj.statusMessage.reason);
           closeCharacterModal();
           enableFailureModal();

        }
    },
    error: function (data) {
        console.log('Search could not be performed');
        $("#failure-reason").text(`Search could not be performed: ${data}`);
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
  invalidModal.show();
}

function populateFields(object){
  var statistics = object.statistics;
  var finalItems = object.finalItems;

  
  $(`#profile-img`).attr("src", `http://render-us.worldofwarcraft.com/character/${object.thumnbail}`);
  Object.keys(statistics).forEach(function(key,index) {
    $(`#${key}`).text(statistics[key]);
  });
  var artifactName;
  Object.keys(finalItems).forEach(function(key,index) {
    artifactName = finalItems[key].name;
    artifactName.length<21?$(`.${key}`).text(finalItems[key].name):$(`.${key}`).text(artifactName.substring(0,19) +"..");
  
    $(`.${key}-sellPrice`).text(finalItems[key].sellPrice);
    $(`.${key}-buyPrice`).text(finalItems[key].buyPrice);
    $(`.${key}-requiredLevel`).text(finalItems[key].requiredLevel);
    $(`.${key}-icon`).attr("src",`https://render-us.worldofwarcraft.com/icons/56/${finalItems[key].icon}.jpg`);
  });
  console.log(object);
}

function closeCharacterModal(){
  charModal.hide();
}
function closefailureModal() {
  invalidModal.hide();
}