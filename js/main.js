function Main(args){
	function Main(args){
		var that = this,
			sp = that.sp = getSpotifyApi(1);

		that.models = sp.require("sp://import/scripts/api/models");
		that.views = sp.require("sp://import/scripts/api/views");
		that.ui = sp.require("sp://import/scripts/ui");
		that.player = new that.views.Player();
		that.playlist = new that.models.Playlist();
		that.app = that.models.application;

		that.commander = Commander({
			sp: sp,
			player: that.player,
			models: that.models,
			playlist: that.playlist,
			app: that.app
		});

		that.socket = Socket({
			io: args.io,
			commander: that.commander
		});

		that.ui = UI({
			main: that
		});

		that.initialize();
	}

	Main.prototype.initialize = function() {
	};

	var main = new Main(args);
	return main;
}

jQuery(function($){
	window.main = Main({
		io: io
	});
});