var express = require('express');
var router = express.Router();
var ffmpeg = require('fluent-ffmpeg');


/* get videos list*/
router.get('/', function(req, res, next) {

   var dir = './res/media/';
   var filesystem = require("fs");
   var myJson = {};
   var myList = []


   filesystem.readdirSync(dir).forEach(function(file) {
      if (!file.startsWith('.')) {
         console.log(file);
         var temp = {};
         temp.video = file;
         myList.push(temp);
      }
   });

   myJson.list = myList;
   console.log(myJson);
   res.json(myJson)
   /*res.json( {
      "list": [
         {
            "video": "Perception.mp4",
         }
      ]
   })*/
}) ;

/* stream video*/

// /stream/foo.mp4
router.get('/stream/:name', function(req, res, next) {
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
      .on('progress', function(info) {
         console.log('progress ' + info.percent + '%');
      })
      .on('end', function() {
         console.log('file has been converted successfully');
      })
      .on('error', function(err) {
         console.log('an error happened: ' + err.message);
      })
      // save to stream
      .pipe(res, {end:true});

});


module.exports = router;
