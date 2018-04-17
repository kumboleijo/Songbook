<template>
    <div id="app">
        <NavBar />
        <Grid />
        <Data />
    </div>
</template>

<script>
    // component imports
    import Grid from './components/Grid'
    import NavBar from './components/NavBar'
    import Data from './components/Data'

    export default {
        name: 'App',
        components: {
            Grid, NavBar, Data
        },
        beforeCreate() {
            // console.log("App > beforeCreate()")
        },
        created() {
            // console.log("App > created()")
        },
        beforeMount() {
            // console.log("App > beforeMount()")
        },
        beforeUpdate() {
            // console.log("App > beforeUpdate()")
        },
        updated() {
            // console.log("App > updated()")
        },
        beforeDestroy() {
            // console.log("App > beforeDestroy()")
        },
        destroyed() {
            // console.log("App > destroyed()")
        }
    }
</script>

<style>
    @media (orientation:landscape) {
        .hide-on-landscape {
            display: none;
        }
    }

    @media (orientation:portrait) {
        .hide-on-portrait {
            display: none;
        }
    }

    @media print {
        body {
            font-size: 16pt !important;
        }
        #btn-controls {
            display: none;
        }
    }
</style>