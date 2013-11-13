exports.definition = {
    config: {
        adapter: {
            type: "ti-xenocanto-bb",
            collection_name: "queries"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("queries", exports.definition, []);

collection = Alloy.C("queries", exports.definition, model);

exports.Model = model;

exports.Collection = collection;