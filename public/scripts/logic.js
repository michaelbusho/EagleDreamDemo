// Communicate with server
var searchForm = $('#searchForm');
var charModal = $('#characterModal');

searchForm.submit(function (e) {
  charModal.hide();
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
  var statistics = object.statistics;
  var finalItems = object.finalItems;
 
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

  
/*
  $('#back').text(object.eqItemsObj.back.name);
 
  $('#feet').text(object.eqItemsObj.feet.name);
  $('#finger1').text(object.eqItemsObj.finger1.name);
  $('#finger2').text(object.eqItemsObj.finger2.name);
  $('#hands').text(object.eqItemsObj.hands.name);

  $('#legs').text(object.eqItemsObj.legs.name);
  $('#mainHand').text(object.eqItemsObj.mainHand.name);
  $('#offHand').text(object.eqItemsObj.offHand.name);

  $('#trinket1').text(object.eqItemsObj.trinket1.name);
  $('#trinket2').text(object.eqItemsObj.trinket2.name);
  $('#waist').text(object.eqItemsObj.waist.name);
  $('#wrist').text(object.eqItemsObj.wrist.name);
*/
  console.log(object);
}

function closeCharacterModal(){
  charModal.hide();
}