function Socket(args){
	function Socket(args){
		var that = this;

		that.io = args.io;
		that.commander = args.commander;
		that.socket;
	}

	Socket.prototype.connect = function(url) {
		var that = this;
		
		that.socket = io.connect(url);

		that.socket.on('connect', function () {
			console.log('Successfully connected as slave');
		});

		that.socket.on('ask', function(data){
			that.commander.do(data.commands, function(current){
				that.update(current);
			});
		});
	};

	Socket.prototype.update = function(current) {
		var that = this;
		that.socket.emit('update', current);
	};

	var socket = new Socket(args);
	return socket;
}