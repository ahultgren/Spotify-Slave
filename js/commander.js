function Commander(args){
	function Commander(args){
		var that = this;

		that.main = args.main;
		that.queue = Queuer({
			commander: that
		});
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
		set: set,
		queue: queue
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

	function queue(command){
		commander.queue.add(command.values[0]);
	}

	function Queuer(args){
		function Queuer(args){
			var that = this,
				commander = that.commander = args.commander,
				lastTrack,
				main = that.commander.main,
				player = main.player,
				models = main.models,
				playlist = main.playlist;

			// Listen for track ending and change to apps playlist if it's not empty
			player.observe(models.EVENT.CHANGE, function observer(e){
				if( e.data.curtrack && !player.context && playlist.length ){
					player.play(playlist.get(0), playlist);

					//## This observer needs to be removed to not repeat the play queue, but how to add it again?
					player.ignore(models.EVENT.CHANGE, observer);
				}
			});
		}

		Queuer.prototype.add = function(uri) {
			var that = this,
				main = that.commander.main,
				player = main.player,
				models = main.models,
				playlist = main.playlist;

			// Load track
			models.Track.fromURI(uri, function(track){
				playlist.add(track);
			});
		};

		return new Queuer(args);
	}

	return commander;
}