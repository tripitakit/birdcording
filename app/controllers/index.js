
var formFields = ["name", "genus", "recordist","country",
				  "location","remarks","lat", "lng","also","type","nr",
				   "quality","qualitylt","area"];

function tableRowsFor(recordings){
	return recordings.map(function(_recording){
		return {
			title: _recording.rec + ": " + _recording.loc + " " +
			_recording.lat + " " + _recording.lng,
			file: _recording.file
		}
	})
}

function play(e){
	Titanium.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAYBACK;
	
	var player;
	
		var row = e.source;
		var fname = e.row.file.replace("http://www.xeno-canto.org/download.php?XC=", "");
		var soundfile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, fname);
	
		if (soundfile.exists()) {
			playIt();	
		
		} else {
			// download and play
			row.setBackgroundColor("yellow");
			row.title = row.title.replace("Can't get file","");
			
			var xhr = Ti.Network.createHTTPClient({
				onload: function(e) {

					soundfile.write(this.responseData);
					playIt();
				},
				onerror: function(e) {
					row.setBackgroundColor("red");
					row.title = row.title + " Can't get file"
				},
				timeout : 5000
			});
			xhr.open("GET", e.row.file);
			xhr.send();
		}
	
		function playIt(){
			player = Titanium.Media.createSound({
				url: soundfile.nativePath,
			});
			player.addEventListener("complete", function(){
				row.setBackgroundColor("#efefef");
				row.title = row.title.replace(" > Playing...","");
				player.release();
				player = null;
			});
			Ti.API.info("PLAY CACHED", row.file);
			row.title = row.title + " > Playing..."
			row.setBackgroundColor("green");
			player.play();
		}
}


function cancel(){
	formFields.map(function(field){
		$[field].value = '';
	});
	$.recordings.setData([]); 
}

function search(){
	
	var params={};
	formFields.map(function(field){
		if ($[field].value !== '') {
			params[field]=$[field].value;
		}
	});
	
	if (Object.keys(params).length > 0) {
		var query = Alloy.createModel('queries');

		query.save(params, {
			success: function(model, response){
				model = model.toJSON()
				if (model.numRecordings > 0)	{
					displayData(model)
				} else {
					$.recordings.setData([{title:"No recordings found"}]); 
				}
			},
			error: function(model, error){
				$.response.setText(error);
			}
		});
	}
}

function displayData(model){
	$.images.setUrl("https://www.google.com/search?tbm=isch&q=" + model.recordings[0].gen);
	$.recordings.setData(tableRowsFor(model.recordings));
}

function dothis(e){
	e.index == 0 ? search() : cancel();
}

function minimaxi(){
	var height;
	if ($.panel.minimized) {
		height = "90%";
		$.panel.minimized = false;
	} else {
		height = "300";
		$.panel.minimized = true;
	};
	$.images.setHeight(height);
}

$.index.open();










