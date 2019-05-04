const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const hbs = require('hbs');

const character = {
}

//Middlewere
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=>{
	res.render('index.hbs');
});



app.listen(3000, () => {
	console.log('app is running on port 3000');
});