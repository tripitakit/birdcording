function Controller() {
    function tableRowsFor(recordings) {
        return recordings.map(function(_recording) {
            return {
                title: _recording.rec + ": " + _recording.loc + _recording.lat + " " + _recording.lng,
                file: _recording.file
            };
        });
    }
    function play(e) {
        Ti.API.info(e.row.file);
        e.row.setTint("yellow");
        var player = Ti.Media.createSound({
            url: e.row.file
        });
        player.play();
    }
    function cancel() {
        [ "name", "genus", "recordist", "country", "location", "remarks", "lat", "lng", "also", "type", "nr", "quality", "qualitylt", "area" ].map(function(field) {
            $[field].value = "";
        });
    }
    function search() {
        var params = {};
        [ "name", "genus", "recordist", "country", "location", "remarks", "lat", "lng", "also", "type", "nr", "quality", "qualitylt", "area" ].map(function(field) {
            "" !== $[field].value && (params[field] = $[field].value);
        });
        var query = Alloy.createModel("queries");
        query.save(params, {
            success: function(model) {
                model = model.toJSON();
                $.recordings.setData(tableRowsFor(model.recordings));
            },
            error: function(model, error) {
                $.response.setText(error);
            }
        });
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
    $.__views.querybuilder = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        id: "querybuilder"
    });
    $.__views.index.add($.__views.querybuilder);
    $.__views.name = Ti.UI.createTextField({
        top: 5,
        height: 40,
        font: {
            fontSize: 24
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
            fontSize: 24
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
            fontSize: 24
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
            fontSize: 24
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
            fontSize: 24
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
            fontSize: 24
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
            fontSize: 24
        },
        width: "33%",
        id: "lat",
        hintText: "lat"
    });
    $.__views.querybuilder.add($.__views.lat);
    $.__views.lng = Ti.UI.createTextField({
        top: 5,
        height: 40,
        font: {
            fontSize: 24
        },
        width: "33%",
        id: "lng",
        hintText: "lng"
    });
    $.__views.querybuilder.add($.__views.lng);
    $.__views.also = Ti.UI.createTextField({
        top: 5,
        height: 40,
        font: {
            fontSize: 24
        },
        width: "33%",
        id: "also",
        hintText: "also"
    });
    $.__views.querybuilder.add($.__views.also);
    $.__views.type = Ti.UI.createTextField({
        top: 5,
        height: 40,
        font: {
            fontSize: 24
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
            fontSize: 24
        },
        width: "33%",
        id: "nr",
        hintText: "nr"
    });
    $.__views.querybuilder.add($.__views.nr);
    $.__views.quality = Ti.UI.createTextField({
        top: 5,
        height: 40,
        font: {
            fontSize: 24
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
            fontSize: 24
        },
        width: "33%",
        id: "qualitylt",
        hintText: "qualitylt"
    });
    $.__views.querybuilder.add($.__views.qualitylt);
    $.__views.area = Ti.UI.createTextField({
        top: 5,
        height: 40,
        font: {
            fontSize: 24
        },
        width: "33%",
        id: "area",
        hintText: "area"
    });
    $.__views.querybuilder.add($.__views.area);
    $.__views.__alloyId1 = Ti.UI.createButton({
        top: 5,
        height: 40,
        font: {
            fontSize: 24
        },
        width: "17%",
        title: "Search",
        id: "__alloyId1"
    });
    $.__views.querybuilder.add($.__views.__alloyId1);
    search ? $.__views.__alloyId1.addEventListener("click", search) : __defers["$.__views.__alloyId1!click!search"] = true;
    $.__views.__alloyId2 = Ti.UI.createButton({
        top: 5,
        height: 40,
        font: {
            fontSize: 24
        },
        width: "17%",
        title: "Cancel",
        id: "__alloyId2"
    });
    $.__views.querybuilder.add($.__views.__alloyId2);
    cancel ? $.__views.__alloyId2.addEventListener("click", cancel) : __defers["$.__views.__alloyId2!click!cancel"] = true;
    $.__views.recordings = Ti.UI.createTableView({
        top: 10,
        font: {
            fontSize: 22
        },
        id: "recordings"
    });
    $.__views.index.add($.__views.recordings);
    play ? $.__views.recordings.addEventListener("click", play) : __defers["$.__views.recordings!click!play"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    __defers["$.__views.__alloyId1!click!search"] && $.__views.__alloyId1.addEventListener("click", search);
    __defers["$.__views.__alloyId2!click!cancel"] && $.__views.__alloyId2.addEventListener("click", cancel);
    __defers["$.__views.recordings!click!play"] && $.__views.recordings.addEventListener("click", play);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;