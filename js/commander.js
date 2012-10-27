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
		playURI: playURI,
		set: set
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

	function set(command){
		var that = commander,
			property = command.values[0],
			value = command.values[1];

		if( property === 'position' ){
			that.main.player.position = value * 1000;
			console.log(value * 1000, that.main.player.position);
		}
		else if( property === 'volume' ){
			that.main.player.volume = value/100;
		}
		else if( property === 'repeat' || property === 'shuffle' ){
			that.main.player[property] = !!value;
		}
		else if( property === 'state' ){
			that.main.player.playing = value;
		}
	}

	return commander;
}