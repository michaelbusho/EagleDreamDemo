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
console.log(object);

  $('#level').text(object.statistics.level);
  $('#strength').text(object.statistics.strength);
  $('#agility').text(object.statistics.agility);
  $('#inteligence').text(object.statistics.inteligent);
  $('#stamina').text(object.statistics.stamina);
  $('#health').text(object.statistics.health);
  $('#damage').text(object.statistics.damage);
  $('#speed').text(object.statistics.speed);
  $('#haste').text(object.statistics.haste);

  $('#armor').text(object.statistics.armor);
  $('#dodge').text(object.statistics.dodge);
  $('#parry').text(object.statistics.parry);
  $('#block').text(object.statistics.block);
 
  $('#critical').text(object.statistics.critical);
  $('#haste').text(object.statistics.haste);
  $('#mastery').text(object.statistics.mastery);
  $('#leech').text(object.statistics.leech);
  $('#versatility').text(object.statistics.versatility);
/*
  $('#back').text(object.eqItemsObj.back.name);
  $('#chest').text(object.eqItemsObj.chest.name);
  $('#feet').text(object.eqItemsObj.feet.name);
  $('#finger1').text(object.eqItemsObj.finger1.name);
  $('#finger2').text(object.eqItemsObj.finger2.name);
  $('#hands').text(object.eqItemsObj.hands.name);
  $('#head').text(object.eqItemsObj.head.name);
  $('#legs').text(object.eqItemsObj.legs.name);
  $('#mainHand').text(object.eqItemsObj.mainHand.name);
  $('#offHand').text(object.eqItemsObj.offHand.name);
  $('#shoulder').text(object.eqItemsObj.shoulder.name);
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