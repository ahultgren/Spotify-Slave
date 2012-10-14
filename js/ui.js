function UI(args){
	var ui, connect, drop;

	/* UI
	 * Controller for everything in the UI
	 */
	function UI(args){
		var that = this;

		that.socket = args.socket;

		// Private subcontrollers
		connect = new Connect(that);
		drop = new Drop(that);
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


	/* Drop
	 * Handles drag n drop for importing tracks
	 */
	function Drop(ui){
		var that = this;

		that.ui = ui;

		that.initialize();
	}

	Drop.prototype.initialize = function() {
		var that = this,
			drop = $('#dropzone');

		drop.bind('dragenter', that.handleDragEnter);
		drop.bind('dragover', that.handleDragOver);
		drop.bind('dragleave', that.handleDragLeave);
		drop.bind('drop', that.handleDrop);
	};

	Drop.prototype.handleDragEnter = function(e){
		this.style.background = '#444444';
	};

	Drop.prototype.handleDragOver = function(e){
		e.preventDefault();
		e.originalEvent.dataTransfer.dropEffect = 'copy';
		return false;
	};

	Drop.prototype.handleDragLeave = function(e){
		this.style.background = '#333333';
	};

	Drop.prototype.handleDrop = function(e){
		var uri = e.originalEvent.dataTransfer.getData('Text');
		this.style.background = '#333333';

		//## Figure out what kind of uri was provided, load it and load it into the playlist
		if(uri.split(":")[1]=="user") {
		}
	};


	ui = new UI(args);
	return ui;
}