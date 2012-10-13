function Slave(args){
	function Slave(args){
		var that = this,
			sp = that.sp = getSpotifyApi(1);

		that.models = sp.require("sp://import/scripts/api/models");
		that.views = sp.require("sp://import/scripts/api/views");
		that.ui = sp.require("sp://import/scripts/ui");
		that.player = new that.views.Player();
		that.playlist = new that.models.Playlist();

		that.commander = Commander({
			sp: sp,
			player: that.player,
			models: that.models,
			playlist: that.playlist
		});

		that.socket = args.Socket({
			io: args.io,
			commander: that.commander
		});

		that.initialize();
	}

	Slave.prototype.initialize = function() {
		var that = this,
			url = $('#url'),
			token = $('#token');

		// Wait until the user has selected a url
		$('#connectButton').click(function(){
			that.socket.connect(url.val() + '?token=' + token.val());
		});
	};

	var slave = new Slave(args);
	return slave;
}

jQuery(function($){
	window.slave = Slave({
		io: io,
		Socket: Socket
	});
});