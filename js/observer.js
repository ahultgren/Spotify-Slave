function Observer(main){
	function Observer(main){
		var that = this;

		that.main = main;
		that.player = main.observer;
		that.socket = main.socket;
console.log("MJAU");
		that.observe();
	}

	Observer.prototype.observe = function() {
		var that = this,
			player = that.main.player;

		that.main.player.observe(main.models.EVENT.CHANGE, function(e){
			var changed = {};

			if( e.data.curtrack ){
				changed.track = player.track.name;
				changed.album = player.track.album.name;
				changed.cover = player.track.album.data.cover;
				changed.uri = player.track.uri;
				changed.position = 0;

				changed.artists = [];

				player.track.artists.forEach(function(artist){
					changed.artist.push(artist.name);
				});
			}

			if( e.data.playstate ){
				changed.state = player.playing;
			}

			if( e.data.volume ){
				changed.volume = Math.round(player.volume * 100);
			}

			// Since there's no way to detect change in position, always send it
			if( changed.position === undefined ){
				changed.position = player.position;
			}

			that.socket.change(changed);
		});
	};

	var observer = new Observer(main);
	return observer;
}