const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const character = {
}

//Middlewere
app.use(express.static(__dirname + '/public'));

app.listen(3000, () => {
	console.log('app is running on port 3000');
});