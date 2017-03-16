var cheerio = require('cheerio');
var fs = require("fs");
var artists = require('../helper/artist');
var Crawler = require('../crawler/index');

var baseUrl = "http://www.azlyrics.com";
var crawler = new Crawler(baseUrl);

var self = module.exports = {
    /**
     * Extract artist from url
     * @param html
     * @param path
     */
    extractArtistFromUrl: function (path) {
        var regex = /\/.*\/(\w*)\/.*.html/g;
        var match = regex.exec(path);
        if(match)
            return match[1];
        return null;
    },

    /**
     * Extract lyrics URL from artist page
     * @param html
     * @param path
     */
    extractData: function(html, path) {
        var $ = cheerio.load(html);


        $('#listAlbum').find('a').each(function() {
            var link = $(this).attr('href');

            if(link == undefined)
                return true; //equivalent to continue

            var artist = self.extractArtistFromUrl(link);

            if(artist){
                if(!artists.instance().containsArtist(artist))
                    return true;

                if(link.startsWith('..')){
                    link = link.replace('..', baseUrl)
                }
                console.log('Queuing: ' + link);
                crawler.addToQueue(link);
            }
        });

    },

    /**
     * Extract lyrics from song page
     * @param html
     * @param path
     */
    extractLyrics: function () {
        console.log('here');
        crawler.start(function (content, path) {
            var $ = cheerio.load(content);
            var artist = self.extractArtistFromUrl(path);
            console.log("Artist" + artist);
            if(artist !== null){
                console.log("Artist" + artist);
                var filePath = 'resources/lyrics/'+artist+'.txt';

                var content = $('.ringtone').nextAll('div').first().text();
                if($(".feat")){
                    //todo
                } else{
                    content = content.replace(/\[.*\]/g, ''); //remove [Verse:]
                }

                fs.appendFile(filePath, content, (err) => {
                    if (err) throw err;
                    console.log('The "data to append" was appended to file!');
                });
            }
        }, function () {
            console.log("Done");
        });
    }
};



