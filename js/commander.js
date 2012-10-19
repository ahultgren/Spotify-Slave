function Commander(args){
	function Commander(args){
		var that = this;

		that.main = args.main;
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
					if( !commands[i].indexOf('play track ') ){
						playURI(commands[i].substring(12, commands[i].length - 1));
					}
				}
			}
		}
	};

	/* Actions */

	Commander.prototype.commands = {
		playpause: playpause,
		'next track': next,
		'previous track': previous
	};

	var commander = new Commander(args);

	/* Private functions */

	/* Commands */

	function playpause(){
		var that = commander,
			player = that.main.player;

		if( player.playing ){
			player.playing = false;
		}
		else {
			ensureContext();
			player.playing = true;
		}
	}

	function next(){
		var that = commander;

		that.main.player.next();
	}

	function previous(){
		var that = commander;

		that.main.player.previous();
	}

	function playURI(uri){
		var that = commander;
		
		that.main.models.Track.fromURI(uri, function(track){
			that.main.player.play(track);
		});
	}


	/* Ensure that there's actually a context before trying to play */

	function ensureContext(){
		var that = commander,
			player = that.main.player,
			playlist = that.main.playlist,
			trackPlayer = that.main.sp.trackPlayer,
			models = that.main.models,
			tracks, track, position;

		if( !player.context ){
			// Make sure the playlist is not empty
			if( !playlist.length ){
				// Try to fetch the currently playing track
				if( track = trackPlayer.getNowPlayingTrack() ){
					position = track.position;
					track = track.track.uri;
				}
				else {
					// Get a random track from the user
					track = models.library.tracks[~~(Math.random() * models.library.tracks.length)];
				}

				// Add track to playlist
				playlist.add(track);
			}

			// Set context
			player.context = playlist;

			// Set position as soon as the song has started playing
			position && models.player.observe(models.EVENT.CHANGE, function observePlay(e){
				if( e.data.playstate === true ){
					models.player.ignore(models.EVENT.CHANGE, observePlay);

					// Seek until it obeys!
					(function seek(){
						trackPlayer.seek(position);

						if( position - trackPlayer.getNowPlayingTrack().position > 1000 ){
							setTimeout(seek, 5);
						}
					}());
				}
			});
		}
	}

	return commander;
}