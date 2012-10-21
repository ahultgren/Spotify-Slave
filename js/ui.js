function UI(args){
	var ui, connect, drop;

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
	}


	/* Connect
	 *
	 */
	function Connect(ui){
		var that = this;

		that.ui = ui;
		that.socket = ui.main.socket;

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
		var that = this;

		that.dropInZone();
		that.dropOnIcon();
	};

	Drop.prototype.drop = function(link){
		var that = this,
			models = that.ui.main.models,
			type = (new models.Link(link)).type,
			playlist = that.ui.main.playlist;

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

		if( playlist.tracks.length ){
			that.ui.main.player.context = playlist;
		}
	};

	Drop.prototype.dropInZone = function() {
		var that = this,
			drop = $('#dropzone');

		drop.bind('dragenter', function(e){
			this.style.background = '#444444';
		});
		drop.bind('dragover', function(e){
			e.preventDefault();
			e.originalEvent.dataTransfer.dropEffect = 'copy';
			return false;
		});
		drop.bind('dragleave', function(e){
			this.style.background = '#333333';
		});
		drop.bind('drop', function(e){
			that.drop(e.originalEvent.dataTransfer.getData('Text'));
			this.style.background = '#333333';
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


	/* Playlist
	 * Shows the playlist in the ui
	 */
	function Playlist(ui){
		var that = this,
			list;

		that.ui = ui;

		// Append playlist to DOM
		list = new that.ui.main.views.List(that.ui.main.playlist);
		document.body.appendChild(list.node);
	}


	ui = new UI(args);
	return ui;
}