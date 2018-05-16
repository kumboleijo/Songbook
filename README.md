# Songbook

> This project allows you to generate your own responsive web songbook.

Live-Demo: https://www.songbook.de.cool

## Prerequisites

1.  Install `npm` (just download [NodeJS](https://nodejs.org/en/), `npm` will be installed right away)
2.  To create .html files out of your chordpro files you need the [Songsheet Generator](http://tenbyten.com/software/songsgen/) by Ten by Ten Software.

## Installation

1.  Download the latest release (you can find all releases [here](https://github.com/kumboleijo/Songbook/releases) - currently Songbook v1.0)
    > `git clone --branch v1.0 --single-branch https://github.com/kumboleijo/Songbook`
2.  `cd <DIRECTORY>` and run `npm i`.

## How to use it

1.  Use the Songsheet Generator to convert a song from the chordpro file format to html
2.  Copy this file into `src/assets/songs/{ArtistName}/`
3.  You need to register your song in `Data.vue` located in `src/components/`

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
        songs:
            {
                hurt: {
                    name: 'Hurt', artist: 'Johnny Cash',
                    files: [
                        { capo: 0, file: Hurt }
                    ], infos: [
                    // you can add as many info boxes as you want per song
                    // structure: { info: info, value: value }
                        { info: 'Main Vocals', value: 'A' },
                        { info: 'Backing Vocals', value: 'B, C' },
                        { info: 'Keys', value: 'E-Piano' },
                        { info: 'Rh. Git', value: 'E-Git' }
                    ], stageDirections: {
                        // you can put as many parts as you want per song
                        parts: [
                            {
                                name: 'Intro / Solo', values: [
                                    'A-Git / Jonas', 'E-Git / A'
                                ]
                            },
                            {
                                name: 'Verse', values: [
                                    'Reverb'
                                ]
                            },
                            {
                                name: 'Outro', values: [
                                    'A-Git / Jonas', 'E-Git / A'
                                ]
                            }
                        ]
                    }
                }
            }
}
...
```

4.  Add the song to a songbook

```javascript
Example
File: Data.vue

export default {
    name: 'Grid',
    created() {

        let mySongbooks = [
            // this songbook will be auto generated and will contain all songs :)
            { name: 'All Songs', date: '', songs: [] },
            // #############################################################
            {
                name: 'My first Concert', date: '01.01.1970', songs: [
                    this.songs.hurt
                ]
            }
        ]
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
