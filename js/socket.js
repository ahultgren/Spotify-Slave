function Socket(args){
	function Socket(args){
		var that = this;

		that.io = args.io;
		that.commander = args.commander;
	}

	Socket.prototype.connect = function(url) {
		var that = this;
		
		that.socket = io.connect(url);

		that.socket.on('connect', function () {
			console.log('Successfully connected as slave');
		});

		that.socket.on('ask', function(data){
			that.commander.do(data.commands, function(results){
				console.log(results);
				that.reply(data.id, results);
			});
		});
	};

	Socket.prototype.reply = function(id, results) {
		var that = this;

		that.socket.emit(id, results);
	};

	var socket = new Socket(args);
	return socket;
}