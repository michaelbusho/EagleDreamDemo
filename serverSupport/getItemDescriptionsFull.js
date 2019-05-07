const axios = require('axios');

function getBlizzardItemDescription(itemsID, token,callback){
	var promises = [];
	var itemsProcessed =0;
	var validItemsID =0;
	var itemsHad = [];
	itemsID.forEach(function(singleItemID){
		url = `https://us.api.blizzard.com/wow/item/${singleItemID}?locale=en_US&access_token=${token}`
		validItemsID++;
		promises.push(axios.get(url))
	});

	axios.all(promises).then(function(results) {
		results.forEach(function(response) {
			itemsProcessed++;
			itemsHad.push(response.data);
		
			if(itemsProcessed === validItemsID){
				callback(itemsHad);
			}
		});
	}).catch(function (error){
		console.log(error);
		callback([]);
	});
}

module.exports.getBlizzardItemDescription = getBlizzardItemDescription;