const token = require('./AcquireToken');
const axios = require('axios');

function getBlizzardInfo(characterName, realm, callback){
	token.getAccessToken(function(token){ 
		var characterUrl = `https://us.api.blizzard.com/wow/character/${realm}/${characterName}?fields=stats&locale=en_US&access_token=${token}`;
		var eqItemsUrl = `https://us.api.blizzard.com/wow/character/${realm}/${characterName}?fields=items&locale=en_US&access_token=${token}`;

		axios.all([getCharacterStats(characterUrl), getEquipedItems(eqItemsUrl)])
		.then(axios.spread(function (stats, eqItems){
			console.log(eqItems);
			var statsObj = stats.data;
			var eqItemsObj = eqItems.data.items;
			var info = {statsObj, eqItemsObj};
			callback(info);
		})).catch(function (error) {
			console.log(error);
			callback({});
		});
	});
};

function getCharacterStats(characterUrl) {
  return axios.get(characterUrl);
}

function getEquipedItems(eqItemsUrl) {
  return axios.get(eqItemsUrl);
}

module.exports.getBlizzardInfo = getBlizzardInfo;
