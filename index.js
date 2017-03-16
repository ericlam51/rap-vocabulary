'use strict';
var fs = require("fs");

var Crawler = require('./crawler/index');
var scrapper = require('./scrapper/index');
var artistJson = require('./resources/artists.json');
var artists = require('./helper/artist.js');

var baseUrl = "http://www.azlyrics.com";
var crawler = new Crawler(baseUrl);



for (var i = 0; i < artistJson.length; i++) {
    console.log(artistJson[i].name);
    artists.instance().addArtist(artistJson[i].name);
    crawler.addToQueue(artistJson[i].link);
}


crawler.start(function(content, artist) {
    scrapper.extractData(content, artist);
}, function(){
    scrapper.extractLyrics();
});

console.log(artists);
module.exports = artists;

