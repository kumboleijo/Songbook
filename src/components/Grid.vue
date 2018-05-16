<template>
    <b-container fluid style="margin-top: .5em">

        <b-row class="no-gutters" v-if="currentSong.name != 'Choose Song'" :key="currentSong.name">
            <b-col lg="4" order-lg="1" class="fixed">
                <b-container fluid class="song-card">
                    <b-card bg-variant="dark" text-variant="white" class="info-card" :title="getSongIndex(currentSong) + '.  ' + currentSong.name"
                        :sub-title="currentSong.artist">
                        <p class="card-text">
                            <b-row class="no-gutters">
                                <b-col cols="6" sm="4" md="3" lg="6">Capo</b-col>
                                <b-col cols="6" sm="4" md="3" lg="6">
                                    <div>
                                        <b-dropdown size="sm" :text="currentSongCapo.toString()" :disabled="currentSong.files.length <= 1">
                                            <b-dropdown-header>Choose other Version</b-dropdown-header>
                                            <b-dropdown-item-button v-for="file of currentSong.files" :key="file.capo.toString() + file.file" @click="changeCapo(file)">Capo {{file.capo}}</b-dropdown-item-button>
                                        </b-dropdown>
                                    </div>
                                </b-col>
                            </b-row>
                            <b-row class="no-gutters" v-for="info of currentSong.infos" :key="info.info">
                                <b-col cols="6" sm="4" md="3" lg="6">{{info.info}}</b-col>
                                <b-col cols="6" sm="8" md="9" lg="6">{{info.value}}</b-col>
                            </b-row>
                        </p>
                    </b-card>
                    <b-card bg-variant="dark" text-variant="white" class="info-card" style="margin-top: .5em" title="Stage Directions" v-if="settings[0].value">
                        <p class="card-text">
                            <b-row class="no-gutters" style="padding-bottom: 1em;">
                                <b-col cols="6" sm="4" md="3" lg="6">
                                    <b>Part</b>
                                </b-col>
                                <b-col cols="6" sm="8" md="9" lg="6">
                                    <b>Presence</b>
                                </b-col>
                            </b-row>
                            <b-row class="no-gutters" v-for="part of currentSong.stageDirections.parts" :key="part.name" style="padding-bottom: 1em">
                                <b-col cols="6" sm="4" md="3" lg="6">{{part.name}}</b-col>
                                <b-col cols="6" sm="8" md="9" lg="6">
                                    <p v-for="value of part.values" :key="value" style="margin: 0px">
                                        {{value}}
                                    </p>
                                </b-col>
                            </b-row>
                        </p>
                    </b-card>
                    <b-card bg-variant="dark" text-variatn="white" id="btn-controls" class="info-card" style="margin-top: .5em" v-if="getSongIndex(currentSong) != 0">
                        <b-row>
                            <b-col cols="6">
                                <b-button block @click="previousSong()">&lsaquo; Previous</b-button>
                            </b-col>
                            <b-col cols="6">
                                <b-button block @click="nextSong()">Next &rsaquo;</b-button>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-container>
            </b-col>
            <b-col lg="8 ">
                <b-container fluid class="song" v-html="currentSongFile"></b-container fluid>
            </b-col>
        </b-row>

        <b-alert show variant="primary" v-if="currentSong.name == 'Choose Song'">
            Newest Songbook:
            <a href="#" class="alert-link" @click="openSongbook(songbooks[songbooks.length-1])">{{songbooks[songbooks.length-1].name}}</a>
        </b-alert>

        <b-row v-if="currentSong.name == 'Choose Song'">
            <b-col lg="6">
                <b-card bg-variant="dark" text-variant="white" title="Songbooks">
                    <p class="card-text">
                        Choose a songbook
                    </p>
                    <b-list-group>
                        <b-list-group-item href="#" v-for="(songbook, index) in songbooks" :key="songbook.name + songbook.datum" @click="openSongbook(songbook)"
                            :disabled="songbook.songs.length == 0">{{index}} - {{songbook.name}}
                            <span v-if="songbook.date">({{songbook.date}})</span>
                        </b-list-group-item>
                    </b-list-group>
                </b-card>
            </b-col>
            <b-col lg="6">
                <b-card bg-variant="dark" text-variant="white" title="All Songs">
                    <p class="card-text">
                        Choose a song
                    </p>
                    <b-list-group>
                        <b-list-group-item href="#" v-for="(song, index) in songbooks[0].songs" :key="song.name" @click="openSong(song)">{{index + 1}} - {{song.name}} ({{song.artist}})</b-list-group-item>
                    </b-list-group>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import ChordSheetJS from 'chordsheetjs';

    export default {
        name: 'Grid',
        components: {
        },
        created() {
            this.$eventHub.on('data-created', ($Data) => {
                this.songs = $Data.songs
                this.songbooks = $Data.songbooks
            })

            this.$eventHub.on('current-songbook-changed', ($Data) => {
                this.currentSongbook = $Data
            })

            this.$eventHub.on('current-setlist-changed', ($Data) => {
                this.currentSetlist = $Data
            })

            this.$eventHub.on('current-song-changed', ($Data) => {
                this.currentSong = $Data
                if ($Data.files) {
                    this.currentSongFile = this.currentSong.files[0].file
                    this.currentSongCapo = this.currentSong.files[0].capo
                }
            })

            this.$eventHub.on('settings-changed', ($Data) => {
                this.settings = $Data
            })

            window.addEventListener('keyup', this.onKeyUp)
        },
        data() {
            return {
                songs: {},
                songbooks: [{ name: '', date: '', songs: [] }],
                currentSongbook: { name: 'Choose Songbook', date: '', songs: [] },
                currentSong: { name: 'Choose Song' },
                currentSongCapo: 0,
                currentSongFile: null,
                settings: [
                    { name: 'Stage Directions', value: false }
                ],
                scroll: false
            }
        },
        computed: {
            songbook() {
                let chordSheet = this.currentSongFile.substring(0);

                let parser = new ChordSheetJS.ChordProParser();
                let song = parser.parse(chordSheet);

                let formatter = new ChordSheetJS.HtmlTableFormatter();
                let html = formatter.format(song);

                return html
            }
        },
        methods: {
            getSongIndex(song) {
                return (this.currentSongbook.songs.indexOf(song) + 1).toString()
            },
            nextSong() {
                this.$eventHub.emit('next-song')
            },
            previousSong() {
                this.$eventHub.emit('previous-song')
            },
            openSongbook(book) {
                this.$eventHub.$emit('songbook-changed', book);
            },
            openSong(song) {
                window.scrollTo(0, 0)
                this.$eventHub.$emit('song-changed', song);
            },
            changeCapo(file) {
                this.currentSongCapo = file.capo
                this.currentSongFile = file.file
            },
            autoScroll() {
                window.scrollBy(0, 1)
                scrolldelay = setTimeout(this.autoScroll(), 10)
            },
            onKeyUp(key) {
                // console.log('key: ' + key.which)

                // key: right arrow
                if (key.which === 39) {
                    key.preventDefault()
                    this.nextSong()
                }

                // key: left arrow
                if (key.which === 37) {
                    key.preventDefault()
                    this.previousSong()
                }

                // key: space
                if (key.which === 32) {
                    key.preventDefault()
                    // this.autoScroll()
                }
            }
        }
    }

</script>

<!-- Add "scoped " attribute to limit CSS to this component only -->
<style scoped>
    .song-template {
        padding: 0px;
    }

    .song {
        font-family: Courier New, Courier, monospace;
        margin-left: auto;
        margin-right: auto;
        padding-bottom: 3em;
        font-size: 0.65em;
        line-height: 1;
    }

    .card {
        margin-bottom: 1em;
    }

    .link {
        color: white !important;
        text-decoration: underline !important;
    }

    .link:hover {
        color: thistle !important;
    }

    /* landscape iPhone */

    @media (min-width: 576px) {
        .song {
            font-size: 1em;
        }
    }

    @media (max-width: 990px) {
        .song,
        .song-card {
            padding: 0px;
        }
    }

    @media (min-width: 992px) {
        .fixed {
            position: fixed;
            right: 0px;
        }
    }
</style>

<style>
    .sg_toc_header,
    .sg_toc_contents,
    .sg_title,
    .sg_subtitle,
    .sg_tab {
        display: none;
    }

    .sg_comment {
        font-weight: bold;
        margin-top: 10px;
        margin-bottom: 4px;
    }

    .sg_chorus_all {
        /* width: 98%; */
        /* margin-left: 0.5em; */
        padding: 5px;
        border-left: solid black 5px;
        border-radius: 5px;
        background-color: #ccc;

    }

    .sg_tab {
        margin-top: 0.8em;
        font-size: 0.7em;
    }

    .sg_chord {
        font-size: 0.8em;
    }
</style>