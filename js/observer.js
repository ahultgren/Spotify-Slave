function Observer(main){
	function Observer(main){
		var that = this;

		that.main = main;
		that.player = main.observer;
		that.socket = main.socket;

		that.state();
	}

	Observer.prototype.state = function() {
		var that = this;

		that.main.player.observe(main.models.EVENT.CHANGE, function(e){
			if( e.data.playstate ){
				that.socket.change({state: that.main.player.playing});
			}
		});
	};
}