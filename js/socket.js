function Socket(args){
	function Socket(args){
		var that = this;

		that.io = args.io;
	}

	Socket.prototype.connect = function(first_argument) {
		var socket = io.connect('http://localhost:3000/slave?token=1337');

		socket.on('connect', function () {
		console.log("MJAU");
		});

		socket.on('ask', function(command){
			console.log("mjau2", command);
		});
	};

	var socket = new Socket(args);
	return socket;
}