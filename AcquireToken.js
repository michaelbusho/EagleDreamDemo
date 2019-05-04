const request = require('request');

const clientID = '83ffd38037c040e694d5aaf72aee9a83';
const clientSecret = 'oAWUsgbakOvTq1Q0gp9xU9EPWivify0s';

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
		if(error) {
			callback('#');
			console.log('Unable to connect to us.battle.net');
		} else if (response.statusCode == 400) {
			callback('#');
			console.log('Unable to get personal token');
		} else if(response.statusCode == 200) {
	 		callback(JSON.parse(body).access_token);
		}else {
			callback('#');
			console.log('Uncaught Error');
		}
	}); 	
}

module.exports.getAccessToken = getAccessToken;



/*

var params = {
	method: 'POST',
	url: 'https://us.battle.net/oauth/token',
	headers: {
		'content-type' : 'application/x-www-form-urlencoded', 
		'Cache-Control' : 'no-cache' 
	},
	body: "grant_type=client_credentials" ,
	auth: {
		username: clientID,
	    password: clientSecret
	}
}
axios.interceptors.request.use(request => {
  console.log('Starting Request', request)
  return request
})


axios(params).then(function (response) {
		console.log("ook");
	}).catch(function (error){
		console.log(error);
});*/