<template>
    <b-navbar toggleable="md" type="dark" variant="secondary" sticky>

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand href="#" @click="home()">
            <img :src="bandImage" style="width: 30px; border-radius:5px" /> {{bandName}}
        </b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

            <b-navbar-nav>
                <b-nav-item-dropdown :text="currentSongbook.name" left>
                    <b-dropdown-item href="#" v-for="(songbook, index) in songbooks" :key="songbook.name" @click="openSongbook(songbook)" :disabled="songbook.songs.length == 0">
                        {{index}} - {{songbook.name}} {{songbook.date}}</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown text="Setlist" left :disabled="currentSongbook.songs.length == 0">
                    <b-dropdown-item href="#" v-for="(song, index) in currentSongbook.songs" :key="song.name" @click="openSong(song)">{{index+1}} - {{song.name}}</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <b-nav-item @click="print()" :disabled="currentSong.name == 'Choose Song'">Print</b-nav-item>
                <b-nav-item-dropdown text="Settings" right>
                    <b-dropdown-item v-for="setting in settings" :key="setting.name + setting.value" @click="toggleSetting(setting)">
                        <span v-if="setting.value">Hide</span>
                        <span v-if="!setting.value">Show</span>
                        <span>{{setting.name}}</span>
                    </b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item-button id="reload">Refresh App</b-dropdown-item-button>
                    <b-dropdown-item disabled>App: {{version}}</b-dropdown-item>
                    <b-dropdown-item disabled>Build: {{timestamp}}</b-dropdown-item>

                </b-nav-item-dropdown>
            </b-navbar-nav>

        </b-collapse>
    </b-navbar>
</template>

<script>
    export default {
        name: 'NavBar',
        components: {},
        created() {
            this.$eventHub.on('data-created', ($Data) => {
                this.songs = $Data.songs
                this.songbooks = $Data.songbooks

            })

            this.$eventHub.on('current-songbook-changed', ($Data) => {
                this.currentSongbook = $Data
            })

            this.$eventHub.on('current-song-changed', ($Data) => {
                this.currentSong = $Data
            })

            this.$eventHub.on('current-setlist-changed', ($Data) => {
                this.currentSetlist = $Data
            })
        },
        data() {
            return {
                version: VERSION,
                timestamp: TIMESTAMP,
                bandName: BANDNAME,
                bandImage: BANDIMAGE,
                songs: {},
                songbooks: [{ name: '', date: '', songs: [] }],
                currentSongbook: { name: 'Choose Songbook', date: '', songs: [] },
                currentSong: { name: 'Choose Song' },
                settings: [
                    { name: 'Stage Directions', value: false }
                ]
            }
        },
        methods: {
            home() {
                this.$eventHub.emit('current-song-changed', { name: 'Choose Song' })
                this.$eventHub.emit('current-songbook-changed', { name: 'Choose Songbook', date: '', songs: [] })
            },
            openSongbook(book) {
                this.$eventHub.$emit('songbook-changed', book);
            },
            openSong(song) {
                this.$eventHub.$emit('song-changed', song);
            },
            toggleSetting(setting) {
                this.settings[this.settings.indexOf(setting)].value = !this.settings[this.settings.indexOf(setting)].value

                this.$eventHub.emit('settings-changed', this.settings)
            },
            print() {
                window.print()
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .dropdown-menu {
        max-height: 450px !important;
        overflow-y: scroll !important;
    }
</style>