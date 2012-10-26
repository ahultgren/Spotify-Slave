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
		next: next,
		prev: previous,
		playURI: playURI
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

	function playURI(command){
		var that = commander;

		if( command.values.length ){
			that.main.models.Track.fromURI(command.values[0], function(track){
				that.main.player.play(track, command.values[1]);
			});
		}
	}

	return commander;
}