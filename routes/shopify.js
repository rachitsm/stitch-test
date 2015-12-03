var express = require('express');
var request = require('request');
var router = express.Router();

var API_KEY = '4c92e473a9031c639e93ac5a67c56efa';
var PASSWD = '33b50b3b926196d382c29ea1543de889';
var STORE_NAME = 'stitchtestrachit';

router.get('/get', function(req, res) {

	var path
		, url
		;

	path = req.query.path;

	res.set({'Content-Type': 'application/json'});

	url = 'https://' + API_KEY + ':' + PASSWD + '@' + STORE_NAME + '.myshopify.com' + path;
	console.log(path);
	console.log('req: ' + url);

	request(url
		, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				res.status(200).send(body);
			} else {
				console.log(error);
				console.log(response.statusCode);
				res.status(response.statusCode).send(body);
			}
		}
	);

});

router.post('/post', function(req, res){

	var path = req.query.path
		, requestData = req.body
		;

	console.log(requestData);

	request({
		url: 'https://' + API_KEY + ':' + PASSWD + '@' + STORE_NAME + '.myshopify.com' + path
		, method: "POST"
		, json: true
		, headers: {
			"content-type": "application/json"
		}
		, body: JSON.stringify(requestData)
	}
	, function (error, response, body) {

			console.log(response.statusCode);

			if (!error && response.statusCode === 200 || response.statusCode === 201) {
				res.status(200).send(body);
			} else {
				console.log(error);
				//console.log(response);
				res.status(500).send(body);
			}
	});
});

router.put('/put', function(req, res){

	var path = req.query.path
			, requestData = req.body
			;

	console.log(requestData);

	request({
				url: 'https://' + API_KEY + ':' + PASSWD + '@' + STORE_NAME + '.myshopify.com' + path
				, method: "PUT"
				, json: true
				, headers: {
					"content-type": "application/json"
				}
				, body: JSON.stringify(requestData)
			}
			, function (error, response, body) {

				console.log(response.statusCode);

				if (!error && response.statusCode === 200 || response.statusCode === 201) {
					res.status(200).send(body);
				} else {
					console.log(error);
					//console.log(response);
					res.status(500).send(body);
				}
			});
});

router.delete('/delete', function(req, res) {

	var path;

	path = req.query.path;

	//res.set({'Content-Type': 'application/json'});

	//url = 'https://' + API_KEY + ':' + PASSWD + '@' + STORE_NAME + '.myshopify.com' + path;
	console.log(path);
	//console.log('req: ' + url);

	request({
				url: 'https://' + API_KEY + ':' + PASSWD + '@' + STORE_NAME + '.myshopify.com' + path
				, method: "DELETE"
			}
			, function (error, response, body) {

				console.log(response.statusCode);

				if (!error && response.statusCode === 200) {
					res.status(200).send(body);
				} else {
					console.log(error);
					console.log(response.statusCode);
					res.status(response.statusCode).send(body);
				}
			}
	);

});

module.exports = router;