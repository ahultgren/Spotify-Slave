App Name: Frodj  
Name: Andreas Hultgren  
Company: Fröjd Interactive AB  
Website: andreashultgren.se

Short description: Frodj is for all those occasions when everyone wants a say in what song is played. Let your friends choose what’s played through a web interface, or retain all the power yourself from the comfort of your couch.

# The problem

Imagine you’re hosting a house party. The music is playing, everyone’s happy and trying to hear each other through the loud music and enjoying themselves in general. Since everyone wants their own music played you created a collaborative playlist beforehand so everyone will be happy. The early night paces on more loudly and intense for each track that passes.

Then there’s the dude. He (it’s mostly a he) who just can’t be happy with the music. Right now, he thinks, right before the climax of the epic EBM song – the music must be changed. With complete disregard of what anyone else might think, of the playlist they created together and of any queued tracks, he decides to play some obscure [insert genre you don’t fancy here].

The mood drops like the heaviest of brostep drops while your guests confusedly stop yelling to each other to drown out the no longer playing music.

# The solution

Frodj is the solution to all this, and a variety of other problems. You will no longer have to huddle with your friends around the computer while competing about queuing the most songs. You can secretly manipulate the playlist while you lounge in your very comfortable armchair. You could even put a big screen in the middle of the living room, showing what is currently played. 

# The works

How will this be achieved you wonder? The Frodj app is basically a client to a Node server. All the user has to do is to choose a room-name and connect. Upon submit, the app asks the server if the name is not taken and if so a new room is created and the app is connected. On any change to player properties, those will be emitted to the server and forwarded to any web clients listening.

Clients connected to the web interface are presented with a simple interface where they can see current track name, artists, album, duration and progress of track etc. If allowed they can also play/pause and change track, or search for any track and queue/play it. When any action is taken the web client emits a command to the server that is forwarded to the Frodj app client. 

# Mock-ups

![Web UI](https://raw.github.com/ahultgren/Spotify-Slave/master/concept-v1/figures/figure1.png)
_Fig 1: Mock-up of the Frodj app UI. The main functionality is to choose a room name and connect to the server. A link to where the web UI is located is provided. If the user wants to, admin mode can be enabled which will not let users manipulate what’s played if they’re not logged in. Lastly a list of tracks queued through the web UI is provided, since an app currently is not allowed to manipulate Spotify’s native play queue._


![Web UI](https://raw.github.com/ahultgren/Spotify-Slave/master/concept-v1/figures/figure2.png)
_Fig 2: Early version of the web UI_

![Mobile web UI](https://raw.github.com/ahultgren/Spotify-Slave/master/concept-v1/figures/figure3.png)
_Fig 3: Early version of the web UI responsivised for mobile._
