# Changlelog

## 0.1

* Feature: Connect to websocket server
* Feature: Recieve commands
* Feature: Play/pause when asked to playpause

## 0.2

* Feature: Drag and drop stuff to dropzone to set playing context
* Feature: Show context as a list in UI
* Feature: Drag and drop stuff on application icon in sidebar
* Fix: Dropped users are not loaded. Instead the app's user's tracks are loaded
* Fix: postion playback in commander
* Fix: models.library.tracks[~~(Math.random() *  models.library.tracks)]

## 0.3

* Fix: playing when a context have been dropped restarts anyway...
* Fix: remove .sp dependencies
* Fix: remove ensure context. If there's no songs then maybe there shouldn't be. The online users can add songs themselves
* Feature: Excecute basic commands
    * Next
    * Previous
    * Play uri
* Feature: Emit to socket when any property has changed
    * Create observer class
    * Listen to changes on
        * state, track, artist, album, volume, uri, position
    * Create an update method that emits current:
        * state, track, artist, album, volume, uri, position
    * Send extensive data on change event and connect: shuffle, repeat
* Feature Emit current on connect
* Fix: observing when a song ends doesnt work

## 0.3.3

* Fix: emit duration
* Fix: recieve one command at a time
* Fix: listen for do instead of ask

## 0.3.4

* Fix: rename 'next/previous track' to 'next/prev'

## 0.3.5

* Fix: repair playURI()

## 0.4

* Fix: check if there's a track before trying to access it... (eg player.track.album)
* Feature: Advanced commands
    * Set stuff (position, state, volume, repeat, shuffle)
    * "Queue" songs (add to own playlist)

## 0.5

* Feature: enable/disable authorization
    * Add text, input and checkbox to view
    * If checked and filled in when connecting -> send command to enable
    * on check and filled -> send command to enable
    * on uncheck -> send command to disable
* Feature: ability to create a room
* Chore: make it easier to connect in the ui
    * Remove token
    * Put url and namespace in separate fields
    * Dont write _slave
* Chore: rename app to Frodj
* Fix: change localhost:3000 default to frodj.me
* Feature: Auto-generated link to room
* Feature: feedback when connected or failed to connect
    * Disable inputs and buttons on connect
* Feature: disconnect button
* Fix: make the app able to reconnect
* Feature: basic ui and ux improvements
    * Light theme
    * Style header
    * Hide server behind link
    * Merge dropzone and queue
    * Validate room name
    * Style disabled inputs
    * Update admin mode behavior to update the password as soon as it's changed
* Fix: enhance queue behavior
    * Always make sure the queue is played when the song changes, unless a user initated the change
    * Always remove the last played song from the queue if it's in the queue
    * Prevent non-playable tracks from being added to queue
    * Clear-queue button
    * Add caption and better CTA to queue UI
* Chore: add analytics code
* Feature: restore interrupted connections
    * Save connection data on successfull connect
    * When connecting again and name is taken, try with the saved token
    * When loading the app and last conneciton was recent and has not been taken by someone else (how do i know?), ask if user wants to reconnect

### 0.5.1
* Hotfix: forgot to update version number for 0.5

### 0.5.2
* Chore: updated docs to encourage participation and contribution
