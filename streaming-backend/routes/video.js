var express = require('express');
var router = express.Router();

var ffmpeg = require('fluent-ffmpeg'),
   ffprobe = require('ffprobe'),
   ffprobeStatic = require('ffprobe-static'),
   getDuration = require('get-video-duration');

var filesystem = require("fs");
var Promise = require("bluebird");

var _ = require('lodash');


var dir = './res/media/';


/* get videos list*/
router.get('/', function (request, response, next) {

    //check media folder for all files and process them
   var readDir = new Promise(function(resolve, reject)  {
      var myList = [];
      var promises = [];

      // read all files
      var files = filesystem.readdirSync(dir);

      // remove all files starts with .
      files = _.remove(files, function(file) {
        return !file.startsWith('.');
      });

      files.forEach(function (file) {
         let temp = {};
         //get all information from video file
        var ff = ffprobe(dir + file, {path: ffprobeStatic.path})
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
         promises.push(ff);

      });

      Promise.all(promises).then(function() {
         resolve(myList);
      });

   });

   readDir.then(function(list) {
      let myJson = {};
      myJson.list = list;
      console.log('json', myJson);
      response.json(myJson);
   });

});

/* stream video*/

// /stream/foo.mp4
router.get('/stream/:name', function (req, res, next) {
    res.contentType('flv');
    var pathToMovie = dir + req.params.name;

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
