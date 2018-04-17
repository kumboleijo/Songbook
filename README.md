# Songbook

> This project allows you to generate your own responsive web songbook.

Live-Demo: https://www.songbook.de.cool

## Prerequisites

1.  Install `npm` (just download [NodeJS](https://nodejs.org/en/), `npm` will be installed right away)
2.  To create .html files out of your chordpro files you need the [Songsheet Generator](http://tenbyten.com/software/songsgen/) by Ten by Ten Software.

## Installation

1.  Download the latest release (you can do this by using: `git clone --branch v1.0-beta --single-branch https://github.com/kumboleijo/Songbook`)
2.  `cd <DIRECTORY>` and run `npm i`.

## How to use it

1.  Use the Songsheet Generator to convert a song from the chordpro file format to html
2.  Copy this file into `src/assets/songs/{ArtistName}/`
3.  You need to register your song in `Data.vue` located in `src/components/` and add it to a songbook

```javascript
Example
File: Data.vue

...
// html song imports
import Hurt from '../assets/songs/JohnnyCash/hurt.html'
...

...
data() {
    return {
        bandName: 'My Band',
        currentSongbook: { ... },
        currentSong: { ... },
        currentSetlist: [ ... ],

        // put your song files here
        songs: [
            {
                id: 1, name: 'Hurt', artist: 'Johnny Cash',
                files: [
                   { capo: 0, file: Hurt }
                ], infos: [
                    // you can put song specific infos here
                    // some examples:
                    { info: 'Main Vocals', value: 'Max' },
                    { info: 'Backing Vocals', value: 'Tina, Laura' }
                ], stageDirections: {
                    // the stage directions allow you to set song specific  instructions for mixing and stuff
                    // currently they will be rendered as: Part | Presence
                    // some examples:
                    parts: [
                        {
                         name: 'Intro / Solo',
                            values: [ 'E-Git1,', 'Synth' ]
                        },
                        {
                            name: 'Verse',
                            values: [ 'Main Vocals / Reverb' ]
                        }
                    ]
                }
            }
        ],
        // put your songbooks here
        songbooks: [
            { id: 1, name: 'Concert 1', date: '01.01.2018', songIDs: [1] },
            { id: 2, name: 'Concert 2', date: '02.01.2018', songIDs: [1] },
        ]
    }
}
...
```

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

# Roadmap

* Implement a JavaScript Parser for the chordpro format
