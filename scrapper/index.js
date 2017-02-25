var cheerio = require('cheerio');
var fs = require("fs");

var Crawler = require('../crawler/index');
var baseUrl = "http://www.azlyrics.com/";
var crawler = new Crawler(baseUrl);

/**
 * Extract lyrics URL from artist page
 * @param html
 * @param path
 */
module.exports.extractData = function(html, path) {
    var $ = cheerio.load(html);


    $('#listAlbum').find('a').each(function() {
        var link = $(this).attr('href');
        if(link == undefined)
            return true;

        if(link.startsWith('..')){
            link = link.replace('..', 'http://www.azlyrics.com')
        }
        console.log('Queuing: ' + link);
        crawler.addToQueue(link);
    });

}

/**
 * Extract lyrics from song page
 * @param html
 * @param path
 */
module.exports.extractLyrics = function () {
    crawler.start(function (content, path) {
        var $ = cheerio.load(content);
        var regex = /\/.*\/(\w*)\/.*.html/g;
        var match = regex.exec(path);

        if(match !== null){
            var filePath = 'resources/'+match[1]+'.txt';

            fs.appendFile(filePath, $('.ringtone').nextAll('div').first().text(), (err) => {
                if (err) throw err;
                console.log('The "data to append" was appended to file!');
            });
        }
    }, function () {
        console.log("Done");
    });
}