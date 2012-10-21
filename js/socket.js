function Socket(args){
	function Socket(args){
		var that = this;

		that.io = args.io;
		that.main = args.main;
		that.socket;
	}

	Socket.prototype.connect = function(url) {
		var that = this;
		
		that.socket = io.connect(url);

		that.socket.on('connect', function () {
			console.log('Successfully connected as slave');
		});

		that.socket.on('ask', function(data){
			that.main.commander.do(data.commands);
		});
	};

	Socket.prototype.update = function(current) {
		var that = this;
		
		that.socket.emit('update', current);
	};

	Socket.prototype.change = function(changed) {
		var that = this;
		
		that.socket.emit('change', changed);
	};

	var socket = new Socket(args);
	return socket;
}