/****
 * ti-mongodb.js
 * Custom Alloy Sync Adapter 
 * CRUD operation with REST API of a remote mongoDB server application.
 *
 * Copyright (c) 2013 Patrick De Marta
 * Licensed under the MIT license.
 */

var API_URL= 'http://www.xeno-canto.org/api/recordings.php?query=';

// Override the Backbone.sync method with the following
module.exports.sync = function(method, model, options) {
	Ti.API.info("SYNC!");
	var query = model.toJSON();
	var error;

	switch(method) {

		/** Create a new query, search with the model attributes, 
		receive json response in entity attribute added at the mode on query success */
		case 'create':
			Ti.API.info("CREATE QUERY:", query)
			var getCoords = function() {
				if (!!query.coords) {
					if (!!query.coords.lat && !! query.coords.lon) {
						return 'lat:' + query.coords.lat + 'lng:' + query.coords.lon
					} else if (!!query.coords.box) {
						/** TODO box coordinates*/
					};
				};
			};
		
			var params_string = '';
			var params = [
				{ name:"" },
				{ genus: 'gen:' },
				{ recordist: 'rec:' },
				{ country: 'cnt:' },
				{ location: 'loc:' },
				{ remarks: 'rmk:' },
				{ coords: getCoords() },
				{ also:'also:' },
				{ type: 'type:' },
				{ nr: "nr:" },
				{ quality: 'q:' },
				{ qualitylt: 'q<:' },
				{ area: 'area:' }
			];

			params.map(function(p){
				var key = Object.keys(p)[0];
				if (!!query[key]) {
					params_string = params_string + p[key] + query[key] + " ";
				};
			});

			url = API_URL + params_string;
			Ti.API.info("URL:", url)
			http_request('GET', url, callback);
			break;

		default :
			error = 'ERROR: Sync method not recognized!';
		};

		if (error) {
			options.error(model, error, options);
			Ti.API.error(error);
			model.trigger('error');
		}

		function callback(success, response, error) {
			Ti.API.info("RESPONSE:", response)
			if (success) {
				var respObj = JSON.parse(response);
				// sending back the model with fetched data in entity attribute
				model.set({recordings: respObj.recordings});
				model.set({numRecordings: respObj.numRecordings});
				options.success(model, response, options);
			} else {
				var err = response.error || error;
				Ti.API.error('ERROR: ' + err);
				options.error(model, error, options);
				model.trigger('error');
			}
	};
};


function http_request(method, url, callback) {
	var client = Ti.Network.createHTTPClient({
		onload: function(e) {
			if (callback) callback(true, this.responseText, null);
		},
		onerror: function(e) {
			if (callback) callback(false, this.responseText, e.error);
		},
		timeout : 5000
	});
	client.open(method, url);
	client.send();
};



module.exports.beforeModelCreate = function(config, name) {};


module.exports.afterModelCreate = function(Model, name) {};

