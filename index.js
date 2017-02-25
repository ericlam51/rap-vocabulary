'use strict';
var fs = require("fs");

var Crawler = require('./crawler/index');
var scrapper = require('./scrapper/index');
var artistJson = require('./resources/artists.json');

var baseUrl = "http://www.azlyrics.com";

var crawler = new Crawler(baseUrl);


for (var i = 0; i < artistJson.length; i++) {
    console.log(artistJson[i].name);
    crawler.addToQueue(artistJson[i].link);
}

crawler.start(function(content, artist) {
    scrapper.extractData(content, artist);
}, function(){
    scrapper.extractLyrics();
}
);
