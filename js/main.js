function Main(){
	function Main(){
		var that = this,
			sp = getSpotifyApi(1);

		that.models = sp.require("sp://import/scripts/api/models");
		that.views = sp.require("sp://import/scripts/api/views");
		that.ui = sp.require("sp://import/scripts/ui");

		that.player = that.models.player;
		that.playlist = new that.models.Playlist();
		that.app = that.models.application;

		that.commander = Commander({
			main: that
		});

		that.socket = Socket({
			io: io,
			main: that
		});

		that.ui = UI({
			main: that
		});

		that.initialize();
	}

	Main.prototype.initialize = function() {
	};

	var main = new Main();
	return main;
}

jQuery(function($){
	window.main = Main();
});