function Socket(args){
	function Socket(args){
		var that = this;

		that.io = args.io;
		that.main = args.main;
		that.socket;
	}

	Socket.prototype.connect = function(server, namespace, adminToken) {
		var that = this,
			slaveToken = (Math.random()*0xFFFFFFFFFFFFFFFFFFFF).toString(36),
			httpPath = server + '/' + namespace,
			socketPath = httpPath + '_slave?token=' + slaveToken;

		$.ajax({
			url: httpPath,
			type: 'POST',
			data: {
				slaveToken: slaveToken,
				adminToken: adminToken || undefined
			}
		})
		.done(function(){
			that.socket = io.connect(socketPath);

			that.socket.on('connect', function () {
				console.log('Successfully connected as slave');

				that.update();
			});

			that.socket.on('do', function(command){
				that.main.commander.do(command);
			});

			that.socket.on('refresh', function(data){
				that.update();
			});
		})
		.fail(function(){

		});
	};

	Socket.prototype.update = function() {
		var that = this,
			player = that.main.player,
			artists = [];

		if( player.track ){
			player.track.artists.forEach(function(artist){
				artists.push(artist.name);
			});

			that.change({
				state: player.playing,
				track: player.track.name,
				artists: artists,
				album: player.track.album.name,
				cover: player.track.album.data.cover,
				volume: ~~(player.volume * 100),
				uri: player.track.uri,
				duration: player.track.duration,
				position: player.position,
				repeat: player.repeat,
				shuffle: player.shuffle
			});
		}
		else {
			that.change({
				position: null
			});
		}
	};

	Socket.prototype.change = function(changed) {
		var that = this;

		that.socket.emit('change', changed);
	};

	Socket.prototype.setAdminMode = function(token) {
		this.socket && this.socket.emit('auth', token);
	};

	var socket = new Socket(args);
	return socket;
}