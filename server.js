const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const hbs = require('hbs');
const request = require('request');
const blizzardInfo = require('./HandleBlizzardApi.js');

//Setting important variables
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

//Routes
app.get('/', (req, res)=>{
	res.render('index.hbs');
});
app.post('/',(req, res) =>{
   var characterName= req.body.characterName;
   var realm = req.body.realm;
   
  	blizzardInfo.getBlizzardInfo(characterName, realm, function(info){
  		res.end(JSON.stringify(info));
  	})
   
});

app.listen(3000, () => {
	console.log('app is running on port 3000');
});