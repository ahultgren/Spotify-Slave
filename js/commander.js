function Commander(args){
	function Commander(args){
		var that = this;

		that.sp = args.sp;
		that.player = args.player;
		that.playlist = args.playlist;
		that.models = args.models;
		that.app = args.app;
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
			playlist, tracks, track, position,
			tp = that.sp.trackPlayer;

		if( !that.player.context ){
			// Use this app's playlist
			playlist = that.playlist;

			// Make sure the playlist is not empty
			if( !playlist.length ){
				// Try to fetch the currently playing track
				if( track = tp.getNowPlayingTrack() ){
					position = track.position;
					track = track.track.uri;
				}
				else {
					// Get users tracks
					//## Should be another way than through core
					tracks = that.sp.core.library.getTracks();

					// Pick random track
					track = tracks[Math.floor(Math.random() * tracks.length)].uri;
				}

				// Add track to playlist
				playlist.add(track);
			}

			// Set context
			that.player.context = playlist;

			// Set position as soon as the song has started playing
			position && that.models.player.observe(that.models.EVENT.CHANGE, function observePlay(e){
				if( e.data.playstate === true ){
					that.models.player.ignore(that.models.EVENT.CHANGE, observePlay);

					// Seek until it obeys!
					(function seek(){
						tp.seek(position);

						if( position - tp.getNowPlayingTrack().position > 1000 ){
							setTimeout(seek, 5);
						}
					}());
				}
			});
		}
	}

	return commander;
}