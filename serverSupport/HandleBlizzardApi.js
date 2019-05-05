const token = require('./AcquireToken');
const itemPatern = require('./FinalItemsGenerator');
const axios = require('axios');
var characterUrl;
var eqItemsUrl;
var myToken;
var itemExtra ={};

function getBlizzardInfo(characterName, realm, callback){
	token.getAccessToken(function(token){ 
		characterUrl = `https://us.api.blizzard.com/wow/character/${realm}/${characterName}?fields=stats&locale=en_US&access_token=${token}`;
		eqItemsUrl = `https://us.api.blizzard.com/wow/character/${realm}/${characterName}?fields=items&locale=en_US&access_token=${token}`;
		myToken = token;
		axios.all([getCharacterStats(characterUrl), getEquipedItems(eqItemsUrl)])
		.then(axios.spread(function (stats, eqItems){
			var statistics = createStatsObject(stats);
			var eqItemsObj = eqItems.data.items;
			console.log(eqItemsObj);
			var itemsID = createItemArrayID(eqItems.data.items);

			aquireItemData(itemsID, myToken,function(itemsFullDesc){
			var finalItems ={};

			finalItems = itemPatern.createFinalItems(itemsFullDesc, eqItems);
			console.log(finalItems);
			var statusMessage = {status: 'ok', reason: 'ok'};
			var info = {statistics, eqItemsObj, statusMessage, finalItems};

			callback(info);
			});

		})).catch(function (error) {
			var statusMessage = error.response.data;
			var stats = {};
			var info = {statusMessage, stats}
			
			callback(info);
		});
	});
};




function getCharacterStats(characterUrl) {
  return axios.get(characterUrl);
}

function getEquipedItems(eqItemsUrl) {
  return axios.get(eqItemsUrl);
}

function aquireItemData(itemsID, token,callback){
	var promises = [];
	var itemsProcessed =0;
	var itemsHad = [];
	itemsID.forEach(function(singleItemID){
		url = `https://us.api.blizzard.com/wow/item/${singleItemID}?locale=en_US&access_token=${token}`
		console.log(`to url einai : ${url}`);
		promises.push(axios.get(url))
	});

	axios.all(promises).then(function(results) {
		results.forEach(function(response) {
			itemsProcessed++;
			itemsHad.push(response.data);
			if(itemsProcessed === itemsID.length){
				callback(itemsHad);
			}
		});
	});
}

function createStatsObject(stats){
	return statistics = {
				level: stats.data.level,
				strength: stats.data.stats.str,
				agility: stats.data.stats.agi,
				inteligent: stats.data.stats.int,
				stamina: stats.data.stats.sta,
				health: stats.data.stats.health,
				damage: stats.data.stats.offHandDmgMin + "-" + stats.data.stats.offHandDmgMax,
				speed:  stats.data.stats.speedRating,
				armor: 	stats.data.stats.armor,
				dodge: 	stats.data.stats.dodge,
				parry: 	stats.data.stats.parry,
				block: 	stats.data.stats.block,
				critical: 	stats.data.stats.crit,
				haste: 	stats.data.stats.haste,
				mastery: stats.data.stats.mastery,
				leech: stats.data.stats.leech,
				versatility: stats.data.stats.versatility
			};
}

function createItemArrayID(eqItems){
	return itemsID =[
		eqItems.back.id,
		eqItems.chest.id,
		eqItems.feet.id,
		eqItems.finger1.id,	
		eqItems.finger2.id,
		eqItems.hands.id,
		eqItems.head.id,
		eqItems.legs.id,
		eqItems.mainHand.id,
		eqItems.neck.id,
		eqItems.shirt.id,
		eqItems.shoulder.id,
		eqItems.trinket1.id,
		eqItems.trinket2.id,
		eqItems.waist.id,
		eqItems.wrist.id			
	];
}
function createFinalItems(itemsFullDesc, eqItems){
	var finalItems ={}
	itemsFullDesc.forEach(function(element) {
  					if(element.id === eqItems.data.items.back.id){
  						finalItems.back ={
  							id: eqItems.data.items.back.id, 
  							name: eqItems.data.items.back.name,
  							buyPrice: element.buyPrice,
  							sellPrice: element.sellPrice,
  							requiredLevel: element.requiredLevel
  						}
  					} else if(element.id === eqItems.data.items.chest.id){
  						finalItems.chest ={
  							id: eqItems.data.items.chest.id, 
  							name: eqItems.data.items.chest.name,
  							buyPrice: element.buyPrice,
  							sellPrice: element.sellPrice,
  							requiredLevel: element.requiredLevel
  						}
  					} else if(element.id === eqItems.data.items.feet.id) {
  						finalItems.feet ={
  							id: eqItems.data.items.feet.id, 
  							name: eqItems.data.items.feet.name,
  							buyPrice: element.buyPrice,
  							sellPrice: element.sellPrice,
  							requiredLevel: element.requiredLevel
  						}
  					} else if(element.id === eqItems.data.items.finger1.id){
  						finalItems.finger1 ={
  							id: eqItems.data.items.finger1.id, 
  							name: eqItems.data.items.finger1.name,
  							buyPrice: element.buyPrice,
  							sellPrice: element.sellPrice,
  							requiredLevel: element.requiredLevel
  						}
  					}else if(element.id === eqItems.data.items.finger2.id){
  						finalItems.finger2 ={
  							id: eqItems.data.items.finger2.id, 
  							name: eqItems.data.items.finger2.name,
  							buyPrice: element.buyPrice,
  							sellPrice: element.sellPrice,
  							requiredLevel: element.requiredLevel
  						}
  					}else if(element.id === eqItems.data.items.hands.id){
  						finalItems.hands ={
  							id: eqItems.data.items.hands.id, 
  							name: eqItems.data.items.hands.name,
  							buyPrice: element.buyPrice,
  							sellPrice: element.sellPrice,
  							requiredLevel: element.requiredLevel
  						}
  					}else if(element.id === eqItems.data.items.head.id){
  						finalItems.head ={
  							id: eqItems.data.items.head.id, 
  							name: eqItems.data.items.head.name,
  							buyPrice: element.buyPrice,
  							sellPrice: element.sellPrice,
  							requiredLevel: element.requiredLevel
  						}
  					}else if(element.id === eqItems.data.items.legs.id){
  						finalItems.legs ={
  							id: eqItems.data.items.legs.id, 
  							name: eqItems.data.items.legs.name,
  							buyPrice: element.buyPrice,
  							sellPrice: element.sellPrice,
  							requiredLevel: element.requiredLevel
  						}
  					}else if(element.id === eqItems.data.items.mainHand.id){
  						finalItems.mainHand ={
  							id: eqItems.data.items.mainHand.id, 
  							name: eqItems.data.items.mainHand.name,
  							buyPrice: element.buyPrice,
  							sellPrice: element.sellPrice,
  							requiredLevel: element.requiredLevel
  						}
  					}else if(element.id === eqItems.data.items.neck.id){
  						finalItems.neck ={
  							id: eqItems.data.items.neck.id, 
  							name: eqItems.data.items.neck.name,
  							buyPrice: element.buyPrice,
  							sellPrice: element.sellPrice,
  							requiredLevel: element.requiredLevel
  						}
  					}
				});

	return finalItems;
}
module.exports.getBlizzardInfo = getBlizzardInfo;
