const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const hbs = require('hbs');
const request = require('request');

//Setting important variables
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

// What i will get from the api later - this serves as a temporary object until the api is called
var character = {
	stats: {
		level: '4565',
		Health: '100',
		Strength: '50',
		Agility: '80',
		Inteligent: '54',
		Stamina: '43',
		Haste: '12'
	},
	EquipedItems: {
		head: {
			name: 'helmet',
			price: 400
		}
	}
};

//Routes
app.get('/', (req, res)=>{
	res.render('index.hbs');
});
app.post('/',(req, res) =>{
   var characterName= req.body.characterName;
   var realm = req.body.realm;
   
   callBlizzardApi(characterName, realm);
   res.end(JSON.stringify(character));
});

function callBlizzardApi(characterName, realm){
	getAccessToken(function(token){
		console.log(`String to request json data is:`);
		var characterInfo = `https://us.api.blizzard.com/wow/character/${realm}/${characterName}?fields=stats&locale=en_US&access_token=${token}`;
		console.log(characterInfo);
	});
}

function getAccessToken(callback){ 
	request.post({ 
		url: 'https://us.battle.net/oauth/token',
		headers: {
			'content-type' : 'application/x-www-form-urlencoded', 
			'Cache-Control' : 'no-cache' 
		},
		form: { grant_type: 'client_credentials' },   
		auth: {
			'user': '83ffd38037c040e694d5aaf72aee9a83',
		    'pass': 'oAWUsgbakOvTq1Q0gp9xU9EPWivify0s'
		}
	},function(error, response, body){
   		callback(JSON.parse(body).access_token);
	}); 	
}

app.listen(3000, () => {
	console.log('app is running on port 3000');
});