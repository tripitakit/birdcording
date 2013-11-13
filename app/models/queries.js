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
