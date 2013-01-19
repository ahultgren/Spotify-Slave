# Spotify Slave

Spotify Slave (aka Frodj) is a Spotify app for controlling Spotify remotely through a web UI. Using only the basic current features it's not much more than a remote controller. However it's also an excellent tool for democratizing the choice of music at parties, sharing what's played right now or whatnot's in the future. See [Contribution](#please-contribute) below if you feel that this app is not doing what you need, but could.

A working server for the web UI can be found at [frodj.me](http://frodj.me).

## Installation

* Clone this repo  
    `$ git clone git://github.com/ahultgren/Spotify-Slave.git`
* Create a directory symlink on ~/Spotify/spotify-slave on OSX or /Users/username/Spotify/spotify-slave on Windows to [spotify-slave-directory]/src (I have absolutely no clue where to put this stuff on linux, but chances are if you're a linux user you know how to figure it out).  
    `$ ln -s Spotify-Slave/src ~/Spotify/spotify-slave`
* Get yourself a [developer account](https://developer.spotify.com/technologies/apps/#developer-account) (you must have **Spotify Premium**)
* Restart spotify and search for the app  
    `spotify:app:slave`

## Please contribute!

I've come to the conclusion that I don't have the time required for developing Spotify Slave. Not only do I lack the time to actually finish this app, but I also won't be able to maintain it if it where to ever get admitted into the Spotify app finder. Therefore from now on Spotify Slave is open source. "WTF does he mean by that???" some of you might wonder, hasn't it always been open source? Indeed it has, as in here-you-go-here's-a-dump-of-code open source, but now I'm aiming for the don't-be-afraid-to-fix-bugs-or-help-me-or-even-pitch-in-on-the-direction-of-the-project kind of open source. 

In practice that means that if you ever think to yourself:

* "omg he's forgotten a comma!", or
* "heyy, i need that vote-to-change-song stuff, I'ma make it right now", or
* "i could use this class in my own project, let's fork it out and maintain it as a subrepo", or
* "this app needs some more animated gifs",

you're free to open an issue, make a fork and/or submit a pull request. If it fits this project, your work or idea will be incorporated. However, since I'm still the offical maintainer of this project, I reserve the right to decide what features should or shouldn't be implemented.

As part of this transition I've made the [changelog](https://github.com/ahultgren/Spotify-Slave/blob/master/changelog.md) and the [backlog](#backlog) public. So far they've only been used as my personal files to not forget want I want to do when I have time, so they are kinda inconcistent and vague. Hopefully that will change soon. I've also published [Concept Application v1](https://github.com/ahultgren/Spotify-Slave/blob/master/concept.v1) together with the rejection from Spotify, to make the whole process more open and transparent.

If you have any questions or want to discuss anything more or less related to this project, don't hesitate to contact me. I'm probably easiest to reach on twitter ([@andreashultgren](htttps://twitter.com/andreashultgren)).

## Contribution guidelines

Work from the develop branch if you're working on a new feature. Make your own feature branch and issue the eventual pull request from that branch to develop. The commit style used is known as [git-flow](http://nvie.com/posts/a-successful-git-branching-model/). Thus if you're doing a hotfix you should instead branch from master and pull request back to master. I'll take care of releases and version numbering/tagging.

## Backlog

These are the chores and features that I've intended to do but haven't started on yet. They are somewhat in order of importance, but the order is not written in stone and not all of them is fully certain they should be in the app at all. If you whish to contribute the best way is to simply pick one of these tasks.

* 
    **Refactor everything to the next version of Spotify's API**  
    Kind of today Spotify publicly announced a preview of its next API. It works accross all platforms, is async, and cool.
* 
    **Get some structure to the source**  
    Extend Spotify's internal models when appropriate. For example Observables. Make the different modules actually be modules in the `exports.property` sense. Use a MVC framework such as Backbone or Ember to simplify bindings between views and models.
* 
    **Sync full playlist to server**  
    A nice feature would be to see the play queue in the web interface. Spotify Slave can emit all tracks that might already be queued when connecting to the server, and updates can be sent on any change event on the collection. When that is done it would be easy to implement additional features such as the ability to reorder or remove tracks directly in the web interface.
* 
    **Vote to change track**  
    This could be an actually useful feature and an USP since no competitor as for as i know has such a feature. The idea is that if a sucky song is playing at a party those who dislike it will pick up their phone and vote "CRAP". If a majority (or some other arbitrary number) of users vote no the song is changed to the next one in the queue. The main challenge is to determine when majority is reached.
* 
    **Fix permissions system**  
    Instead of just toggling admin-mode on or off, the admin should be able to choose what not-logged-in users are allowed to do on a feature-to-feature basis.
* 
    **Chat**  
    A chat could be used in many different ways. Attendees could for example ask the DJ to play some hip funk.
* 
    **Localization**  
    This includes finding people to translate and to do some restructuring of the code according to Spotify's localization guidelines (/en.loc/strings.json and /fr.loc/strings.json may suffice together with the appropriate index.html).

## Credit

All contributors will be lsited here. Add yourself when you're done with something.

* [Andreas Hultgren](https://github.com/ahultgren/) _Original creator of Spotify Slave_
* [Fröjd Interactive](http://frojd.se) _Encouraged Andreas to start working on this app during work hours (aka hackday)_

## License

**MIT**

Copyright © 2013 Andreas Hultgren.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.