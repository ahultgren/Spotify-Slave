function UI(args){
	var ui, connect;

	/* UI
	 * Controller for everything in the UI
	 */
	function UI(args){
		var that = this;

		that.socket = args.socket;

		connect = new Connect(that);
	}


	/* Connect
	 *
	 */
	function Connect(ui){
		var that = this;

		that.ui = ui;
		that.socket = ui.socket;

		that.initialize();
	}

	Connect.prototype.initialize = function() {
		var that = this,
			url = $('#url'),
			token = $('#token');

		// Wait until the user has selected a url
		$('#connectButton').click(function(){
			that.socket.connect(url.val() + '?token=' + token.val());
		});
	};

	ui = new UI(args);

	return ui;
}