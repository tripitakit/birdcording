function http_request(method, url, callback) {
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            callback && callback(true, this.responseText, null);
        },
        onerror: function(e) {
            callback && callback(false, this.responseText, e.error);
        },
        timeout: 5e3
    });
    client.open(method, url);
    client.send();
}

var API_URL = "http://www.xeno-canto.org/api/recordings.php?query=";

module.exports.sync = function(method, model, options) {
    function callback(success, response, error) {
        Ti.API.info("RESPONSE:", response);
        if (success) {
            var respObj = JSON.parse(response);
            model.set({
                recordings: respObj.recordings
            });
            options.success(model, response, options);
        } else {
            var err = res.error || error;
            Ti.API.error("ERROR: " + err);
            options.error(model, error, options);
            model.trigger("error");
        }
    }
    Ti.API.info("SYNC!");
    var query = model.toJSON();
    var error;
    switch (method) {
      case "create":
        Ti.API.info("CREATE QUERY:", query);
        var getCoords = function() {
            if (!!query.coords) {
                if (query.coords.lat && query.coords.lon) return "lat:" + query.coords.lat + "lng:" + query.coords.lon;
                !!query.coords.box;
            }
        };
        var params_string = "";
        var params = [ {
            name: ""
        }, {
            genus: "gen:"
        }, {
            recordist: "rec:"
        }, {
            country: "cnt:"
        }, {
            location: "loc:"
        }, {
            remarks: "rmk:"
        }, {
            coords: getCoords()
        }, {
            also: "also:"
        }, {
            type: "type:"
        }, {
            nr: "nr:"
        }, {
            quality: "q:"
        }, {
            qualitylt: "q<:"
        }, {
            area: "area:"
        } ];
        params.map(function(p) {
            var key = Object.keys(p)[0];
            !query[key] || (params_string = params_string + p[key] + query[key] + " ");
        });
        url = API_URL + params_string;
        Ti.API.info("URL:", url);
        http_request("GET", url, callback);
        break;

      default:
        error = "ERROR: Sync method not recognized!";
    }
    if (error) {
        options.error(model, error, options);
        Ti.API.error(error);
        model.trigger("error");
    }
};

module.exports.beforeModelCreate = function() {};

module.exports.afterModelCreate = function() {};