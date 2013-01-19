function UI(args){
	var ui, connect, drop, admin, feedback, tooltip;

	/* UI
	 * Controller for everything in the UI
	 */
	function UI(args){
		var that = this;

		that.main = args.main;

		// Private subcontrollers
		connect = new Connect(that);
		drop = new Drop(that);
		playlist = new Playlist(that);
		admin = new Admin(that);
		feedback = new Feedback(that);
		tooltip = new Tooltip($('.tooltip'));

		// Expose public methods
		that.disableConnect = connect.disable.bind(connect);
	}


	/* Connect
	 *
	 */
	function Connect(ui){
		var that = this;

		that.ui = ui;
		that.socket = ui.main.socket;

		that.initialize();
		that.changeServer();
	}

	Connect.prototype.initialize = function() {
		var that = this,
			url = $('#url'),
			namespace = $('#namespace'),
			token = $('#token'),
			link = that.link = $('#room-href'),
			connectButton = that.connectButton = $('#connectButton'),
			disconnectButton = that.disconnectButton = $('#disconnectButton'),
			allConnectInputs = that.allConnectInputs = $().add(connectButton).add(url).add(namespace);

		// Generate external link to room
		$.merge(url, namespace).on('keyup', function(){
			link.attr('href', url.val() + '/' + namespace.val());
			link.text(url.val() + '/' + namespace.val());
		});

		// Wait until the user has selected a url
		connectButton.click(function(){
			feedback.hideAll();
			allConnectInputs.prop('disabled', true);

			that.socket.connect(url.val(), namespace.val(), $('#admin-toggle').is(':checked') && $('#admin-token').val() || undefined)
				.done(function(){
					that.disable();
				})
				.fail(function(){
					allConnectInputs.prop('disabled', false);
					feedback.show('connectError');
				});
		});

		disconnectButton.click(function(){
			that.socket.disconnect();
			feedback.hide('connectSuccess');

			allConnectInputs.prop('disabled', false);
			disconnectButton.prop('disabled', true);
		});
	};

	Connect.prototype.disable = function(server, namespace) {
		var that = this;

		if( server && namespace ){
			that.link.attr('href', server + '/' + namespace);
			that.link.text(server + '/' + namespace);
		}

		feedback.show('connectSuccess');
		that.allConnectInputs.prop('disabled', true);
		that.disconnectButton.prop('disabled', false);
	};

	Connect.prototype.changeServer = function() {
		var that = this,
			serverToggle = $('#server-toggle'),
			serverRow = $('#server-row');

		serverToggle.toggle(function(){
			serverRow.slideDown(200);
		}, function(){
			serverRow.slideUp(200);
		});
	};

	/* Admin
	 * Controls whether or not admin mode is on 
	 */
	function Admin(ui){
		var that = this,
			token = $('#admin-token'),
			toggle = $('#admin-toggle'),
			adminPassRow = $('#admin-row');

		that.ui = ui;

		toggle.click(function(){
			if( toggle.is(':checked') ){
				that.ui.main.socket.setAdminMode(token.val());
				adminPassRow.slideDown(200);
			}
			else {
				that.ui.main.socket.setAdminMode();
				adminPassRow.slideUp(200);
			}
		});

		token.on('input', function(){
			if( toggle.is(':checked') ){
				that.ui.main.socket.setAdminMode(token.val());
			}
		});
	}


	/* Drop
	 * Handles drag n drop for importing tracks
	 */
	function Drop(ui){
		var that = this;

		that.ui = ui;

		that.initialize();
	}

	Drop.prototype.initialize = function() {
		var that = this;

		that.header = $('.list-header');
		that.zone = $('.list-box');
		that.dropZone = $('#dropzone');

		that.dropInZone();
		that.dropOnIcon();
	};

	Drop.prototype.drop = function(link){
		var that = this,
			models = that.ui.main.models,
			type = (new models.Link(link)).type,
			playlist = that.ui.main.playlist,
			promise = $.Deferred(),
			wasEmpty = !playlist.length;

		/* Types:
			1: artist
			2: album
			4: track
			5: playlist
			9: local track
			10: profile */

		switch( type ){
			case 1:
				models.Artist.fromURI(link, function(tempArtist){
					var search = new models.Search('artist:"' + tempArtist.name + '"');

					search.localResults = models.LOCALSEARCHRESULTS.IGNORE;
					search.searchPlaylists = false;
					search.searchAlbums = false;
					search.pageSize = 5;

					search.observe(models.EVENT.CHANGE, function(result) {
						result.tracks.forEach(function(track){
							playlist.add(track);
						});
					});

					search.appendNext();
				});
			break;
			case 2:
				models.Album.fromURI(link, function(tempAlbum){
					// Load into the app's playlist
					var tracks = tempAlbum.tracks,
						i;

					for( i = tracks.length; i--; ){
						playlist.add(tracks[i]);
					}
				});
			break;
			case 4:
				playlist.add(link);
			break;
			case 5:
				models.Playlist.fromURI(link, function(tempPlaylist){
					// Load into the app's playlist
					var tracks = tempPlaylist.tracks,
						i;

					for( i = tracks.length; i--; ){
						playlist.add(tracks[i]);
					}
				});
			break;
			case 10:
				// Do nothing, Toplist is too unreliable
			break;
		}

		if( wasEmpty && playlist.tracks.length ){
			that.ui.main.player.context = playlist;
			that.unEmpty();
			promise.resolve();
		}
		else {
			promise.reject();
		}

		return promise.promise();
	};

	Drop.prototype.dropInZone = function() {
		var that = this,
			zone = that.zone,
			drop = that.dropZone,
			defaultColor = drop.css('border-color'),
			dragColor = '#5c5c5c',
			w = $(window);

		drop.bind('dragenter', function(e){
			drop.css('border-color', dragColor);
		});
		zone.bind('dragover', function(e){
			e.preventDefault();
			e.originalEvent.dataTransfer.dropEffect = 'copy';
			return false;
		});
		drop.bind('dragleave', function(e){
			drop.css('border-color', defaultColor);
		});
		zone.on('drop', function(e){
			drop.css('border-color', defaultColor);
			that.drop(e.originalEvent.dataTransfer.getData('Text'));
		});
	};

	Drop.prototype.dropOnIcon = function() {
		var that = this,
			models = that.ui.main.models;

		models.application.observe(models.EVENT.LINKSCHANGED, function(){
			models.application.links.forEach(function(link){
				that.drop(link);
			});
		});
	};

	Drop.prototype.unEmpty = function() {
		this.dropZone.addClass('unempty');
		this.header.removeClass('empty');
	};

	Drop.prototype.empty = function() {
		this.dropZone.removeClass('unempty');
		this.header.addClass('empty');
	};


	/* Playlist
	 * Shows the playlist in the ui
	 */
	function Playlist(ui){
		var that = this,
			list,
			clear = $('.clear-queue');

		that.ui = ui;

		// Append playlist to DOM
		list = new that.ui.main.views.List(that.ui.main.playlist);
		list.node.classList.add("sp-light");
		
		$('.list-box').append(list.node);

		// Clear list on click on button
		clear.click(function(){
			that.clear();
		});
	}

	Playlist.prototype.clear = function() {
		var that = this,
			playlist = that.ui.main.playlist;

		while(playlist.length){
			try {
				playlist.remove(0);
			}
			catch(e){}
		}

		drop.empty();
	};


	/* Feedback
	 * Takes care of success and error messages
	 */
	function Feedback(ui){
		var that = this;

		that.ui = ui;
		that.messages = {
			connectSuccess: $('#connect-success'),
			connectError: $('#connect-error')
		};
	}

	Feedback.prototype.show = function(message) {
		var messages = this.messages;

		if( messages[message] ){
			messages[message].show();
		}
	};

	Feedback.prototype.hide = function(message) {
		var messages = this.messages;

		if( messages[message] ){
			messages[message].hide();
		}
	};

	Feedback.prototype.hideAll = function() {
		var messages = this.messages,
			i;

		for( i in messages ){
			messages[i].hide();
		}
	};


	ui = new UI(args);
	return ui;


	/* Tooltip
	 * Module for displaying tooltips next to focused elements
	 */
	function Tooltip (tooltips) {
		tooltips.each(function(){
			var tooltip = $(this),
				target = $('#' + tooltip.attr('data-for'));

			target.on('focus', function(e){
				tooltip.addClass('active').css({
					top: target.position().top,
					right: -tooltip.outerWidth()
				});
			})
			.on('blur', function(e){
				tooltip.removeClass('active');
			});
		});
	}
}