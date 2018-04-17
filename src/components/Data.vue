<template>

</template>
<script>
    // html song imports
    import Hurt from '../assets/songs/JohnnyCash/hurt.html'

    export default {
        name: 'Grid',
        beforeCreate() {
            // console.log("Data > beforeCreate()")
        },
        created() {
            // console.log("Data > created()")

            // fire data-created event
            this.$eventHub.emit('data-created', { bandName: this.bandName, bandLogo: this.bandLogo, songbooks: this.songbooks, songs: this.songs });

            // subscribe to other events
            this.$eventHub.on('songbook-changed', ($Data) => {
                this.currentSongbook = $Data
                this.$eventHub.emit('current-songbook-changed', this.currentSongbook)

                this.currentSetlist = []

                for (let songID of this.currentSongbook.songIDs) {
                    for (let song of this.songs) {
                        if (songID == song.id) {
                            this.currentSetlist.push(song)
                        }
                    }
                }
                this.$eventHub.emit('current-setlist-changed', this.currentSetlist)
                if (this.currentSetlist.length >> 0) {
                    this.currentSong = this.currentSetlist[0]
                    this.$eventHub.emit('current-song-changed', this.currentSetlist[0])
                } else {
                    this.$eventHub.emit('current-song-changed', { id: 0, name: 'Choose Song' })
                }
            })

            this.$eventHub.on('song-changed', ($Data) => {
                this.currentSong = $Data
                this.$eventHub.emit('current-song-changed', this.currentSong)
            })

            this.$eventHub.on('next-song', ($Data) => {
                if (this.getCurrentSongIdofCurrentSetlist() < this.currentSetlist.length - 1) {
                    this.$eventHub.emit('current-song-changed', this.currentSetlist[this.getCurrentSongIdofCurrentSetlist() + 1])
                    this.currentSong = this.currentSetlist[this.getCurrentSongIdofCurrentSetlist() + 1]
                }
            })

            this.$eventHub.on('previous-song', ($Data) => {
                if (this.getCurrentSongIdofCurrentSetlist() >= 1) {
                    this.$eventHub.emit('current-song-changed', this.currentSetlist[this.getCurrentSongIdofCurrentSetlist() + -1])
                    this.currentSong = this.currentSetlist[this.getCurrentSongIdofCurrentSetlist() - 1]
                }
            })
        },
        beforeMount() {
            // console.log("Data > beforeMount()")
        },
        beforeUpdate() {
            // console.log("Data > beforeUpdate()")
        },
        updated() {
            // console.log("Data > updated()")
        },
        beforeDestroy() {
            // console.log("Data > beforeDestroy()")
        },
        destroyed() {
            // console.log("Data > destroyed()")
        },
        methods: {
            getCurrentSongIdofCurrentSetlist() {
                return this.currentSetlist.indexOf(this.currentSong)
            }
        },
        data() {
            return {
                bandName: 'My Band',
                currentSongbook: { id: 0, name: 'Choose Songbook', songIDs: [] },
                currentSong: { id: 0, name: 'Choose Song', artist: '', file: '', infos: [] },
                currentSetlist: [],
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
                            { info: 'Backing Vocals', value: 'Tina, Laura' },
                            { info: '...', value: '...' },
                            { info: '..', value: '..' }
                        ], stageDirections: {
                            // the stage directions allow you to set song specific instructions for mixing and stuff
                            // currently they will be rendered as: Part | Presence
                            // some examples:
                            parts: [
                                {
                                    name: 'Intro / Solo', values: [
                                        'E-Git'
                                    ]
                                },
                                {
                                    name: 'Verse', values: [
                                        'Main Vocals / Reverb'
                                    ]
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
    }
</script>