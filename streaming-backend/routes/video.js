var express = require('express');
var router = express.Router();
var ffmpeg = require('fluent-ffmpeg');
var ffprobe = require('ffprobe')
    ,ffprobeStatic = require('ffprobe-static');
var filesystem = require("fs");
var getDuration = require('get-video-duration');


var dir = './res/media/';


/* get videos list*/
router.get('/', function (req, res, next) {
    var myJson = {};
    var myList = [];

    //check media folder for all files and process them
    filesystem.readdirSync(dir).forEach(function (file) {
        if (!file.startsWith('.')) {
            var temp = {};

            //get informations from video file
            ffprobe(dir + file, {path: ffprobeStatic.path})
                .then(function (info) {
                    var metaInfos = info.streams[0];
                    if (metaInfos.codec_type == 'video') {
                        temp.duration = metaInfos.duration;
                        temp.video = file;
                        myList.push(temp);
                    }
                })
                .catch(function (err) {
                    console.error(err);
                });
        }
    });

    //Timeout noch nötig, damit ffprobe nicht erst nach dem return der res fertig ist
    setTimeout(function() {
        myJson.list = myList;
        console.log(myJson);
        res.json(myJson);
    }, 300);
    /*res.json( {
     "list": [
     {
     "video": "Perception.mp4",
     }
     ]
     })*/
});

/* stream video*/

// /stream/foo.mp4
router.get('/stream/:name', function (req, res, next) {
    res.contentType('flv');
    var pathToMovie = './res/media/' + req.params.name;

    console.log(pathToMovie);
    var proc = ffmpeg(pathToMovie)
    // preset flashvideo
        .format('flv')
        .flvmeta()
        .size('320x?')
        .videoBitrate('512k')
        .videoCodec('libx264')
        .fps(24)
        .audioBitrate('96k')
        .audioCodec('aac')
        .audioFrequency(22050)
        .audioChannels(2)

        // setup event handlers
        .on('progress', function (info) {
            console.log('progress ' + info.percent + '%');
        })
        .on('end', function () {
            console.log('file has been converted successfully');
        })
        .on('error', function (err) {
            console.log('an error happened: ' + err.message);
        })
        // save to stream
        .pipe(res, {end: true});

});


module.exports = router;
