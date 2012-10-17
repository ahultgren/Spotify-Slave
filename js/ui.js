function UI(args){
	var ui, connect, drop;

	/* UI
	 * Controller for everything in the UI
	 */
	function UI(args){
		var that = this;

		that.main = args.main;
		that.socket = args.main.socket;

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
		var that = this;

		that.dropInZone();
		that.dropOnIcon();
	};

	Drop.prototype.drop = function(link){
		var that = this,
			http = link.split('/'),
			uri = link.split(':'),
			playlist = that.ui.main.playlist,
			models = that.ui.main.models;

		if( (http[5] || uri[1]) === 'playlist' ){
			models.Playlist.fromURI(link, function(tempPlaylist){
				// Load into the app's playlist
				var tracks = tempPlaylist.tracks,
					i;

				for( i = tracks.length; i--; ){
					playlist.add(tracks[i]);
				}
			});
		}
		else if( (http[3] || uri[1]) === 'track' ){
			playlist.add(link);
		}
		else if( (http[3] || uri[1]) === 'album' ){
			models.Album.fromURI(link, function(tempAlbum){
				// Load into the app's playlist
				var tracks = tempAlbum.tracks,
					i;

				for( i = tracks.length; i--; ){
					playlist.add(tracks[i]);
				}
			});
		}
		else if( (http[3] || uri[1]) === 'artist' ){
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
		}
		else if( (http[3] || uri[1]) === 'user' ){
			// Do nothing, Toplist is too unreliable
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