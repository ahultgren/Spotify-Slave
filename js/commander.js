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