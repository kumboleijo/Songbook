# Songbook

> This project allows you to generate your own responsive web songbook.

<a href="https://www.buymeacoffee.com/kumboleijo" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

## Features

- Access all your songbooks and band music files
- Support for multiple songsheets per song in different keys
- Easy printing
- ! The whole songbook is offline accessible !
- You can install the songbook on your mobile device (iOS > 12, Android)

<img src="https://github.com/kumboleijo/Songbook/blob/master/imgs/img_1.png?raw=true" height="300px">
<br>
<img src="https://github.com/kumboleijo/Songbook/blob/master/imgs/img_2.png?raw=true" height="300px">
<br>
<img src="https://github.com/kumboleijo/Songbook/blob/master/imgs/ios_1.png?raw=true" height="300px">
<img src="https://github.com/kumboleijo/Songbook/blob/master/imgs/ios_2.png?raw=true" height="300px">
<br>

## Prerequisites

1.  Install `npm` (just download [NodeJS](https://nodejs.org/en/), `npm` will be installed right away)
2.  To create .html files out of your chordpro files you need the [Songsheet Generator](http://tenbyten.com/software/songsgen/) by Ten by Ten Software.

(you can also use yarn as a package manager)

## Installation

1.  Download the latest release (you can find all releases [here](https://github.com/kumboleijo/Songbook/releases) - currently Songbook v1.1)
    > `git clone --branch v1.1 --single-branch https://github.com/kumboleijo/Songbook`
2.  `cd <DIRECTORY>` and run `npm i`
3.  run `npm run dev`

## How to use it

1.  Use the Songsheet Generator to convert a song from the chordpro file format to html
2.  Copy this file into `src/assets/songs/{ArtistName}/`
3.  Register your song in `Data.vue` located in `src/components/`

```javascript
Example
File: Data.vue

...
// song imports
import Hurt from '../assets/songs/JohnnyCash/hurt.html'
...

...
data() {
    return {
        currentSongbook: { name: 'Choose Songbook', date: '', songs: [] },
        currentSong: { id: 0, name: 'Choose Song', artist: '', file: '', infos: [] },

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
                                    'A-Git', 'E-Git'
                                ]
                            },
                            {
                                name: 'Verse', values: [
                                    'Reverb'
                                ]
                            },
                            {
                                name: 'Outro', values: [
                                    'A-Git', 'E-Git'
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

5.  Update package.json with your band infos

```javascript
  "bandName": "{Your Bandname}",
  "bandImage": "./static/{your_cover_file}.png",
  "iconPath": "./src/assets/icons/{your_icon_file}.png",
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
