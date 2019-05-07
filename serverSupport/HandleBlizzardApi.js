const token = require('./AcquireToken');
const itemPatern = require('./FinalItemsGenerator');
const itemsDescription = require('./getItemDescriptionsFull');
const axios = require('axios');
var characterUrl;
var eqItemsUrl;
var myToken;

function getBlizzardInfo(characterName, realm, callback){
	token.getAccessToken(function(token){ 
		characterUrl = `https://us.api.blizzard.com/wow/character/${realm}/${characterName}?fields=stats&locale=en_US&access_token=${token}`;
		eqItemsUrl = `https://us.api.blizzard.com/wow/character/${realm}/${characterName}?fields=items&locale=en_US&access_token=${token}`;
		myToken = token;
		axios.all([getCharacterStats(characterUrl), getEquipedItems(eqItemsUrl)])
		.then(axios.spread(function (stats, eqItems){
			var statistics = createStatsObject(stats);
			var eqItemsObj = eqItems.data.items;
			var itemsID = getEquipedItemsID(eqItemsObj);

			itemsDescription.getBlizzardItemDescription(itemsID, myToken,function(itemsFullDesc){
				var finalItems ={};
				finalItems = itemPatern.createFinalItems(itemsFullDesc, eqItemsObj);
				var statusMessage = {status: 'ok', reason: 'ok'};
				var info = {statistics, statusMessage, finalItems};

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

function getEquipedItemsID(eqItems){
	var cntr=0;
	var itemsID = [];

	//first 2 results are never body parts
	for (var bodyPart in eqItems) {
		cntr++;
		if(cntr>2){
			itemsID.push(eqItems[bodyPart].id);
		}
	}
	return itemsID;
}

module.exports.getBlizzardInfo = getBlizzardInfo;
