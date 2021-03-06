const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const hbs = require('hbs');
const request = require('request');
const blizzardInfo = require('./serverSupport/HandleBlizzardApi.js');
var sanitizer = require('sanitizer');
var favicon = require('serve-favicon');

//Setting important variables
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials/');
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/favicon.ico'));

//Used to generate dynamic html
var bodyParts = [
	'head',
	'chest',
	'shoulder',
	'legs',
	'feet',
	'trinket1',
	'trinket2',
	'back',
	'mainHand',
	'offHand',
	'neck',
	'waist',
	'wrist',
	'shirt',
	'finger1',
	'finger2'
	];
	
//Routes
app.get('/', (req, res)=>{
	res.render('index.hbs',{bodyParts: bodyParts});
});
app.post('/',(req, res) =>{
	//Sanitize input
	var characterName = sanitizer.sanitize(req.body.characterName);
	var realm= sanitizer.sanitize(req.body.realm); 

	blizzardInfo.getBlizzardInfo(characterName, realm, function(info){
  		res.end(JSON.stringify(info));
  	}); 
});
//404 requests
app.get('*', function(req, res){
  res.render('wrongLink.hbs');
});

app.listen(port, () => {
	console.log(`app is running on port ${port}`);
});