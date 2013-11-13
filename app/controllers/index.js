function tableRowsFor(recordings){
	return recordings.map(function(_recording){
		return {
			title: _recording.rec + ": " + _recording.loc +
			_recording.lat + " " + _recording.lng,
			file: _recording.file
		}
	})
}

function play(e){
	Ti.API.info(e.row.file)
	e.row.setTint("yellow");
	var player = Ti.Media.createSound({url:e.row.file});
	player.play();
	
}


function cancel(){
		
	["name", "genus","recordist","country","location","remarks","lat",
	"lng","also","type","nr","quality","qualitylt","area"
	].map(function(field){
		$[field].value = '';
	});
	
}

function search(){
	var params={};
	["name", "genus","recordist","country","location","remarks","lat",
	"lng","also","type","nr","quality","qualitylt","area"].map(function(field){
		if ($[field].value !== '') {
			params[field]=$[field].value;
		}
	});
	
	var query = Alloy.createModel('queries');

	query.save(params, {
		success: function(model, response){
			model = model.toJSON()
			$.recordings.setData(tableRowsFor(model.recordings));
		},
		error: function(model, error){
			$.response.setText(error);
		}
	})
	
}

$.index.open();
