function Commander(args){
	function Commander(args){
		var that = this;

		that.sp = args.sp;
		that.player = args.player;
		that.playlist = args.playlist;
		that.models = args.models;
	}

	Commander.prototype.do = function(commands, update) {
		var that = this,
			i, l;

		for( i = 0, l = commands.length; i < l; i++ ){
			// The callback is only used when fresh data is wanted
			if( commands[i] === 'current' ){
				//## that.update(update);
			}
			else {
				// Takes care of all 'static' commands like playpause, name of track, name of artist, next etc
				if( that.commands[commands[i]] ){
					that.commands[commands[i]]();
				}
				else {
					//## Figure out what the command is about and route accordingly
				}
			}
		}
	};

	/* Actions */

	Commander.prototype.commands = {
		playpause: playpause
	};

	var commander = new Commander(args);

	/* Private functions */

	function playpause(){
		var that = commander;

			console.log(that.player.playing);
		if( that.player.playing ){
			that.player.playing = 0;
		}
		else {
			ensureContext();
			that.player.playing = 1;
		}
	}

	function ensureContext(){
		var that = commander, 
			playlist, tracks, track;

		if( !that.player.context ){
			// Use this app's playlist
			playlist = that.playlist;

			// Make sure the playlist is not empty
			if( !playlist.length ){
				// Get users tracks
				//## Should be another way than through core
				tracks = that.sp.core.library.getTracks();
				track = tracks[Math.floor(Math.random() * tracks.length)];

				// Add random track to playlist
				playlist.add(track.uri);
			}

			// Set context
			that.player.context = playlist;
		}
	}

	return commander;
}