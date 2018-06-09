<template>

</template>
<script>
    // song imports
    import Hurt from '../assets/songs/JohnnyCash/hurt.html'

    export default {
        name: 'Grid',
        created() {
            // put your songbooks here
            let mySongbooks = [
                // this songbook will be auto generated with all songs
                // #############################################################
                { name: 'All Songs', date: '', songs: [] },
                // #############################################################
                {
                    name: 'My first Concert', date: '01.01.1970', songs: [
                        this.songs.hurt
                    ]
                }

            ]

            // sort all songs by name
            // #############################################################
            let sortedSongs = []

            for (const song in this.songs) {
                if (this.songs.hasOwnProperty(song)) {
                    const element = this.songs[song];
                    if (element.name != 'Pause') {
                        sortedSongs.push(element)
                    }
                }
            }

            this.songbooks = mySongbooks

            sortedSongs = sortedSongs.sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
                if (a.name.toLowerCase() == b.name.toLowerCase()) return 0
            })

            for (const song of sortedSongs) {
                mySongbooks[0].songs.push(song)
            }
            // #############################################################

            // fire data-created event
            this.$eventHub.emit('data-created', { bandLogo: this.bandLogo, songbooks: this.songbooks, songs: this.songs, albums: this.albums });

            // subscribe to other events
            // #############################################################
            this.$eventHub.on('songbook-changed', ($Data) => {
                this.currentSongbook = $Data
                this.$eventHub.emit('current-songbook-changed', this.currentSongbook)
                this.currentSong = this.currentSongbook.songs[0]
                this.$eventHub.emit('current-song-changed', this.currentSongbook.songs[0])
            })

            this.$eventHub.on('song-changed', ($Data) => {
                this.currentSong = $Data
                this.$eventHub.emit('current-song-changed', this.currentSong)
            })

            this.$eventHub.on('next-song', ($Data) => {
                if (this.getCurrentSongIdofCurrentSetlist() < this.currentSongbook.songs.length - 1) {
                    this.$eventHub.emit('current-song-changed', this.currentSongbook.songs[this.getCurrentSongIdofCurrentSetlist() + 1])
                    this.currentSong = this.currentSongbook.songs[this.getCurrentSongIdofCurrentSetlist() + 1]
                }
            })

            this.$eventHub.on('previous-song', ($Data) => {
                if (this.getCurrentSongIdofCurrentSetlist() >= 1) {
                    this.$eventHub.emit('current-song-changed', this.currentSongbook.songs[this.getCurrentSongIdofCurrentSetlist() + -1])
                    this.currentSong = this.currentSongbook.songs[this.getCurrentSongIdofCurrentSetlist() - 1]
                }
            })
            // #############################################################
        },
        methods: {
            getCurrentSongIdofCurrentSetlist() {
                if (this.currentSongbook.songs.indexOf(this.currentSong) == -1) {
                    return this.currentSongbook.songs.indexOf(this.currentSong) + 1
                } else {
                    return this.currentSongbook.songs.indexOf(this.currentSong)
                }
            }
        },
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
                    },
                    pause: { name: 'Pause', artist: '', files: [{ capo: 0, file: '<h3>Pause</h3>' }], infos: [], stageDirections: [] }
                }

                // put your music sources here
                , albums: [
                    {
                        name: 'My Album', albumArtist: 'My Band', albumArt: 'secretbase.jpg', path: 'https://moeplayer.b0.upaiyun.com/aplayer/', tracks: [
                            { name: "Secretbase", file: 'secretbase.mp3' }
                        ]
                    }
                ]

            }
        }
    }
</script>