<template>

    <div>
        <video controls width="640" height="360" autoplay class="video-js" preload="auto"  id="video-js">
            <source  type="video/x-flv" src="http://localhost:3000/api/video/stream">
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
                videourl: null
            }
        },
        ready() {
//            let fp = flowplayer('#flowplyer', {
//                seekable: true,
//                src: 'http://localhost:3000/api/video/stream'
//            });
            videojs("video-js")
//            console.log();
//            let api = flowplayer($(".flowplayer"));//$("#flowplayer:first").data("flowplayer");
//            api.load(
//                    {
//                        sources: [
//                            {
//                                type: "video/flv",
//                                src: 'http://localhost:3000/api/video/stream'
//                            }
//                        ]
//                    }
//            );

//            store.stream().then(response => {
//                this.videourl = response
//            });
        }
    }
</script>