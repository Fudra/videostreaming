<template>

    <div>
        <video controls width="640" height="360" autoplay class="video-js" preload="auto"  id="video-js">
            <source  type="video/x-flv" v-bind:src="videourl">
        </video>
    </div>



    <!--application/x-mpegurl-->

</template>

<script type="text/babel">

    import store from '../store';
    import $ from 'jquery';
    import videojs from 'video.js';

    export default {
        data() {
            return {
                videourl: null,
                player: null
            }
        },
        ready() {
            let serverUrl = 'http://localhost:3000/api/video/stream/';
            this.videourl = serverUrl + this.$route.params.name;

            let that = this;
            setTimeout(()=> {
                that.play();
            }, 500);

        },
        methods: {
            play() {
                this.player = videojs("video-js");
            }
        },
        destroyed() {
            this.player.dispose();
        }
    }
</script>