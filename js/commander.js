function Commander(args){
	function Commander(args){
		var that = this;

		that.sp = args.sp;
		that.player = args.player;
		that.models = args.models;
	}

	Commander.prototype.do = function(commands, callback) {
		var that = this,
			i, l, j, playlist, tracks;

		for( i = 0, l = commands.length; i < l; i++ ){
			if( commands[i] === 'playpause' ){
				//that.player.playing = 0;
				if( !that.player.context ){
					// Create new playlist
					playlist = new that.models.Playlist();

					// Get users tracks
					//## Should be another way than through core
					tracks = that.sp.core.library.getTracks();

					// Add tracks to playlist
					for( j = tracks.length; j--; ){
						playlist.add(tracks[j].uri);
					}

					// Start playing
					that.player.play(tracks[Math.floor(Math.random() * tracks.length)], playlist);
				}
				console.log(that.player);
			}
		}

		callback(['meow', 'mu', 'mjau', 'gnegg']);
	};

	var commander = new Commander(args);
	return commander;
}