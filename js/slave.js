function Slave(args){
	function Slave(args){
		var that = this,
			sp = getSpotifyApi(1);

		that.models = sp.require("sp://import/scripts/api/models");
		that.views = sp.require("sp://import/scripts/api/views");
		that.ui = sp.require("sp://import/scripts/ui");
		that.player = new that.views.Player();

		that.socket = args.Socket({
			io: args.io
		});
	}

	var slave = new Slave(args);
	return slave;
}

jQuery(function($){
	Slave({
		io: io,
		Socket: Socket
	});
});