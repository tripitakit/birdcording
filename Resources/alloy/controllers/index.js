function Controller() {
    function tableRowsFor(recordings) {
        return recordings.map(function(_recording) {
            return {
                title: _recording.rec + ": " + _recording.loc + " " + _recording.lat + " " + _recording.lng,
                file: _recording.file
            };
        });
    }
    function play(e) {
        function playIt() {
            player = Titanium.Media.createSound({
                url: soundfile.nativePath
            });
            player.addEventListener("complete", function() {
                row.setBackgroundColor("#efefef");
                row.title = row.title.replace(" > Playing...", "");
                player.release();
                player = null;
            });
            Ti.API.info("PLAY CACHED", row.file);
            row.title = row.title + " > Playing...";
            row.setBackgroundColor("green");
            player.play();
        }
        Titanium.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAYBACK;
        var player;
        var row = e.source;
        var fname = e.row.file.replace("http://www.xeno-canto.org/download.php?XC=", "");
        var soundfile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, fname);
        if (soundfile.exists()) playIt(); else {
            row.setBackgroundColor("yellow");
            row.title = row.title.replace("Can't get file", "");
            var xhr = Ti.Network.createHTTPClient({
                onload: function() {
                    soundfile.write(this.responseData);
                    playIt();
                },
                onerror: function() {
                    row.setBackgroundColor("red");
                    row.title = row.title + " Can't get file";
                },
                timeout: 5e3
            });
            xhr.open("GET", e.row.file);
            xhr.send();
        }
    }
    function cancel() {
        formFields.map(function(field) {
            $[field].value = "";
        });
        $.recordings.setData([]);
    }
    function search() {
        var params = {};
        formFields.map(function(field) {
            "" !== $[field].value && (params[field] = $[field].value);
        });
        if (Object.keys(params).length > 0) {
            var query = Alloy.createModel("queries");
            query.save(params, {
                success: function(model) {
                    model = model.toJSON();
                    model.numRecordings > 0 ? displayData(model) : $.recordings.setData([ {
                        title: "No recordings found"
                    } ]);
                },
                error: function(model, error) {
                    $.response.setText(error);
                }
            });
        }
    }
    function displayData(model) {
        $.images.setUrl("https://www.google.com/search?tbm=isch&q=" + model.recordings[0].gen);
        $.recordings.setData(tableRowsFor(model.recordings));
    }
    function dothis(e) {
        0 == e.index ? search() : cancel();
    }
    function minimaxi() {
        var height;
        if ($.panel.minimized) {
            height = "90%";
            $.panel.minimized = false;
        } else {
            height = "300";
            $.panel.minimized = true;
        }
        $.images.setHeight(height);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.images = Ti.UI.createWebView({
        top: "30",
        height: "300",
        width: "95%",
        url: "http://en.wikipedia.org/wiki/List_of_birds_by_common_name",
        disableBounce: true,
        id: "images"
    });
    $.__views.index.add($.__views.images);
    $.__views.panel = Ti.UI.createView({
        layout: "vertical",
        minimized: false,
        id: "panel"
    });
    $.__views.index.add($.__views.panel);
    minimaxi ? $.__views.panel.addEventListener("swipe", minimaxi) : __defers["$.__views.panel!swipe!minimaxi"] = true;
    $.__views.title = Ti.UI.createLabel({
        width: "95%",
        top: 10,
        height: "30",
        backgroundColor: "#efefef",
        font: {
            fontSize: 18,
            fontWeight: "bold"
        },
        text: "Xeno-canto DB Query Builder",
        id: "title"
    });
    $.__views.panel.add($.__views.title);
    $.__views.querybuilder = Ti.UI.createView({
        width: "95%",
        top: 10,
        layout: "horizontal",
        height: Ti.UI.SIZE,
        id: "querybuilder"
    });
    $.__views.panel.add($.__views.querybuilder);
    $.__views.name = Ti.UI.createTextField({
        top: 5,
        height: 40,
        font: {
            fontSize: 18
        },
        width: "33%",
        id: "name",
        hintText: "name"
    });
    $.__views.querybuilder.add($.__views.name);
    $.__views.genus = Ti.UI.createTextField({
        top: 5,
        height: 40,
        font: {
            fontSize: 18
        },
        width: "33%",
        id: "genus",
        hintText: "genus"
    });
    $.__views.querybuilder.add($.__views.genus);
    $.__views.recordist = Ti.UI.createTextField({
        top: 5,
        height: 40,
        font: {
            fontSize: 18
        },
        width: "33%",
        id: "recordist",
        hintText: "recordist"
    });
    $.__views.querybuilder.add($.__views.recordist);
    $.__views.country = Ti.UI.createTextField({
        top: 5,
        height: 40,
        font: {
            fontSize: 18
        },
        width: "33%",
        id: "country",
        hintText: "country"
    });
    $.__views.querybuilder.add($.__views.country);
    $.__views.location = Ti.UI.createTextField({
        top: 5,
        height: 40,
        font: {
            fontSize: 18
        },
        width: "33%",
        id: "location",
        hintText: "location"
    });
    $.__views.querybuilder.add($.__views.location);
    $.__views.remarks = Ti.UI.createTextField({
        top: 5,
        height: 40,
        font: {
            fontSize: 18
        },
        width: "33%",
        id: "remarks",
        hintText: "remarks"
    });
    $.__views.querybuilder.add($.__views.remarks);
    $.__views.lat = Ti.UI.createTextField({
        top: 5,
        height: 40,
        font: {
            fontSize: 18
        },
        width: "33%",
        id: "lat",
        hintText: "latitude"
    });
    $.__views.querybuilder.add($.__views.lat);
    $.__views.lng = Ti.UI.createTextField({
        top: 5,
        height: 40,
        font: {
            fontSize: 18
        },
        width: "33%",
        id: "lng",
        hintText: "longitude"
    });
    $.__views.querybuilder.add($.__views.lng);
    $.__views.also = Ti.UI.createTextField({
        top: 5,
        height: 40,
        font: {
            fontSize: 18
        },
        width: "33%",
        id: "also",
        hintText: "also featuring"
    });
    $.__views.querybuilder.add($.__views.also);
    $.__views.type = Ti.UI.createTextField({
        top: 5,
        height: 40,
        font: {
            fontSize: 18
        },
        width: "33%",
        id: "type",
        hintText: "type"
    });
    $.__views.querybuilder.add($.__views.type);
    $.__views.nr = Ti.UI.createTextField({
        top: 5,
        height: 40,
        font: {
            fontSize: 18
        },
        width: "33%",
        id: "nr",
        hintText: "catalog nr."
    });
    $.__views.querybuilder.add($.__views.nr);
    $.__views.quality = Ti.UI.createTextField({
        top: 5,
        height: 40,
        font: {
            fontSize: 18
        },
        width: "33%",
        id: "quality",
        hintText: "quality"
    });
    $.__views.querybuilder.add($.__views.quality);
    $.__views.qualitylt = Ti.UI.createTextField({
        top: 5,
        height: 40,
        font: {
            fontSize: 18
        },
        width: "33%",
        id: "qualitylt",
        hintText: "quality < "
    });
    $.__views.querybuilder.add($.__views.qualitylt);
    $.__views.area = Ti.UI.createTextField({
        top: 5,
        height: 40,
        font: {
            fontSize: 18
        },
        width: "33%",
        id: "area",
        hintText: "area"
    });
    $.__views.querybuilder.add($.__views.area);
    var __alloyId2 = [];
    var __alloyId5 = {
        title: "Search",
        ns: "Alloy.Abstract"
    };
    __alloyId2.push(__alloyId5);
    var __alloyId6 = {
        title: "Cancel",
        ns: "Alloy.Abstract"
    };
    __alloyId2.push(__alloyId6);
    $.__views.buttonbar = Ti.UI.createButtonBar({
        height: "35",
        width: "33%",
        labels: __alloyId2,
        id: "buttonbar"
    });
    $.__views.querybuilder.add($.__views.buttonbar);
    dothis ? $.__views.buttonbar.addEventListener("click", dothis) : __defers["$.__views.buttonbar!click!dothis"] = true;
    $.__views.recordings = Ti.UI.createTableView({
        font: {
            fontSize: 18
        },
        id: "recordings"
    });
    $.__views.panel.add($.__views.recordings);
    play ? $.__views.recordings.addEventListener("click", play) : __defers["$.__views.recordings!click!play"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var formFields = [ "name", "genus", "recordist", "country", "location", "remarks", "lat", "lng", "also", "type", "nr", "quality", "qualitylt", "area" ];
    $.index.open();
    __defers["$.__views.panel!swipe!minimaxi"] && $.__views.panel.addEventListener("swipe", minimaxi);
    __defers["$.__views.buttonbar!click!dothis"] && $.__views.buttonbar.addEventListener("click", dothis);
    __defers["$.__views.recordings!click!play"] && $.__views.recordings.addEventListener("click", play);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;