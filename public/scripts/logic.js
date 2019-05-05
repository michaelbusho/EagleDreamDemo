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
  
/*
  $('#level').text(object.statsObj.level);
  $('#Strength').text(object.statsObj.stats.str);
  $('#Agility').text(object.statsObj.stats.agi);
  $('#Inteligence').text(object.statsObj.stats.int);
  $('#Stamina').text(object.statsObj.stats.sta);
  $('#health').text(object.statsObj.stats.health);
  $('#damage').text(object.statsObj.stats.offHandDmgMin + "-" + object.statsObj.stats.offHandDmgMax);
  $('#speed').text(object.statsObj.stats.speedRating);

  $('#armor').text(object.statsObj.stats.armor);
  $('#dodge').text(object.statsObj.stats.dodge);
  $('#parry').text(object.statsObj.stats.parry);
  $('#block').text(object.statsObj.stats.block);

  $('#critical').text(object.statsObj.stats.crit);
  $('#Haste').text(Math.round(parseInt(object.statsObj.stats.haste) * 100) / 100);
  $('#mastery').text(object.statsObj.stats.mastery);
  $('#leech').text(object.statsObj.stats.leech);
  $('#versatility').text(object.statsObj.stats.versatility);

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