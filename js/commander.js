function Commander(args){
	function Commander(args){
		var that = this;

		that.main = args.main;
	}

	Commander.prototype.do = function(command) {
		var that = this;

		that.commands[command.command] && that.commands[command.command](command);
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

	return commander;
}