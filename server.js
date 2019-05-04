const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const hbs = require('hbs');

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
   console.log(`The character name is ${characterName} and the realm is ${realm}`);
   res.end(JSON.stringify(character));
});


app.listen(3000, () => {
	console.log('app is running on port 3000');
});