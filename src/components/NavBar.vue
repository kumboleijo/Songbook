<template>
    <b-navbar toggleable="md" type="dark" variant="secondary" sticky>

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand href="#">
            <!-- add your band logo here -->
            <img src="../assets/logo.png" style="width: 30px; border-radius:5px" /> {{bandName}}
        </b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

            <b-navbar-nav>
                <b-nav-item-dropdown :text="currentSongbook.name" left>
                    <b-dropdown-item href="#" v-for="songbook in songbooks" :key="songbook.id + songbook.name" @click="openSongbook(songbook)"
                        :disabled="songbook.songIDs.length == 0">
                        {{songbook.id}} - {{songbook.name}} ({{songbook.date}}) </b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown text="Setlist" left :disabled="currentSetlist.length == 0">
                    <b-dropdown-item href="#" v-for="song in currentSetlist" :key="song.id + song.name" @click="openSong(song)">{{getSongIndex(song)}} - {{song.name}}</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <b-nav-item @click="print()" :disabled="currentSong.id == 0">Print</b-nav-item>
                <b-nav-item-dropdown text="Settings" right>
                    <b-dropdown-item v-for="setting in settings" :key="setting.name + setting.value" @click="toggleSetting(setting)">
                        <span v-if="setting.value">Hide</span>
                        <span v-if="!setting.value">Show</span>
                        <span>{{setting.name}}</span>
                    </b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>


            <!-- Right aligned nav items -->
            <!-- <b-navbar-nav class="ml-auto">

                <b-nav-item>
                    <b-butt <font-awesome-icon :icon="iconMoon" @click="test()" />
                </b-nav-item>
                <b-nav-item>
                    <font-awesome-icon :icon="iconSun" @click="test()" />
                </b-nav-item>
                <b-nav-item>
                    <font-awesome-icon :icon="iconAngleUp" @click="test()" />
                </b-nav-item>
                <b-nav-item>
                    <font-awesome-icon :icon="iconAngleDown" @click="test()" />
                </b-nav-item>
                <b-nav-item>
                    <font-awesome-icon :icon="iconPlay" @click="test()" />
                </b-nav-item>
                <b-nav-item>
                    <font-awesome-icon :icon="iconBackward" @click="test()" />
                </b-nav-item>
                <b-nav-item>
                    <font-awesome-icon :icon="iconForward" @click="test()" />
                </b-nav-item>


            </b-navbar-nav> -->

        </b-collapse>
    </b-navbar>
</template>

<script>
    import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
    import faMoon from '@fortawesome/fontawesome-free-solid/faMoon'
    import faSun from '@fortawesome/fontawesome-free-solid/faSun'
    import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp'
    import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown'
    import faPlay from '@fortawesome/fontawesome-free-solid/faPlay'
    import faBackward from '@fortawesome/fontawesome-free-solid/faBackward'
    import faForward from '@fortawesome/fontawesome-free-solid/faForward'
    import faCoffee from '@fortawesome/fontawesome-free-solid/faCoffee'

    export default {
        name: 'NavBar',
        components: {
            FontAwesomeIcon
        },
        beforeCreate() {
            // console.log("NavBar > beforeCreate()")
        },
        created() {
            // console.log("NavBar > created()")

            this.$eventHub.on('data-created', ($Data) => {
                this.bandName = $Data.bandName
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
        beforeMount() {
            // console.log("NavBar > beforeMount()")
        },
        beforeUpdate() {
            // console.log("NavBar > beforeUpdate()")
        },
        updated() {
            // console.log("NavBar > updated()")
        },
        beforeDestroy() {
            // console.log("NavBar > beforeDestroy()")
        },
        destroyed() {
            // console.log("NavBar > destroyed()")
        },
        data() {
            return {
                bandName: '',
                songs: [],
                songbooks: [],
                currentSongbook: { name: 'Choose Songbook' },
                currentSong: { id: 0, name: 'Choose Song' },
                currentSetlist: [],
                settings: [
                    { name: 'Stage Directions', value: false }
                ]
            }
        },
        computed: {
            iconMoon() { return faMoon },
            iconSun() { return faSun },
            iconAngleUp() { return faAngleUp },
            iconAngleDown() { return faAngleDown },
            iconPlay() { return faPlay },
            iconBackward() { return faBackward },
            iconForward() { return faForward },
        },
        methods: {
            getSongIndex(song) {
                return this.currentSetlist.indexOf(song) + 1
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
<style scoped>
    ul.navbar-nav ml-auto li.nav-item {}
</style>