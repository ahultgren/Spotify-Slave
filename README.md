# Spotify Slave

Turn your Spotify player into a slave of your peers' will. Just connect to an instance of [Spotify Server](https://github.com/ahultgren/Spotify-Server) and anyone with access to the server can controll your Spotify player. On any OS.


## Features
Through the web api (aka Spotify Server, see link above) you can let users:

* See what's playing (name, artists, album, duration, player state, player position, and whether shuffling or repeating or not)
* Play or pause
* Play a specific track by URI
* Play a specific track in a specific playlist
* Play previous/next track
* Queue tracks
* Set volume (though currently not allowed in Spotify API) and position

Directly in Spotify Slave you can't to much more than connect to the Spotify Server and choose some initial songs. But eventually more features will come, such as being able to constrain what your users can do, see who's connected, talk to them or something. The specs are not written in stone atm, so please let me know of your ideas!

## Installation

* Clone this repo  
    `$ git clone git://github.com/ahultgren/Spotify-Slave.git`
* Move the directory to ~/Spotify on OSX or /Users/username/Spotify on Windows (I have absolutely no clue where to put this stuff on linux, but chances are if you're a linux user you know how to figure it out).  
    `$ mv Spotify-Slave ~/Spotify/spotify-slave`
* Get yourself a [developer account](https://developer.spotify.com/technologies/apps/#developer-account) (you must have **Spotify Premium**)
* Restart spotify and search for the app!  
	`spotify:app:slave`

This process will be much easier if I ever would get admitted to the Spotify Apps library.

## Contribution

Contributions are very much appreciated. Might need some on the design part, as I'm mainly a developer.

Thanks to [Fröjd](http://frojd.se) for letting me work on this during work time (aka Hackdays)!

## License

MIT. Eg. use as you please but don't expect anything and don't remove this notice :)
Oh, and I'd be happy if you tell people it's me (Andreas Hultgren) who built this.