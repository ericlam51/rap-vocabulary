"use strict";
var SimpleCrawler = require('simplecrawler');

class Crawler {

    /**
     * Intantiate crawler along with base parameters
     * @param baseUrl
     */
    constructor(baseUrl){
        this.crawler = new SimpleCrawler(baseUrl);
        this.crawler.interval = 10000; // Ten seconds
        this.crawler.maxConcurrency = 1;
        this.crawler.maxDepth = 1;
    }

    /**
     * Start crawler and handle each state
     * @param callback called each time an URL is fetched
     * @param finishCallback called when crawler is finished
     */
    start(callback, finishCallback){
        console.log("==========================================================")
        this.crawler.queue.countItems({ status: "queued"}, function(error, count) {
            console.log("The number of queue items: %d", count);
        });

        this.crawler.on("crawlstart", function(queueItem) {
            console.log("Crawler started");
        });

        this.crawler.on("fetchdisallowed", function(queueItem, responseBuffer, response) {
           console.log("Blacklisted")
        });

        this.crawler.on("fetcherror", function(queueItem, responseObject) {
            console.log("Error occured");
        });

        this.crawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {
            console.log("Path: "  + queueItem.path);
            callback(responseBuffer, queueItem.path);
        });

        this.crawler.on("complete", function(queueItem, responseObject) {
            console.log("Finish crawling");
            finishCallback();
        });

        this.crawler.start();
    }

    /**
     * Add to crawler's queue
     * @param url
     */
    addToQueue(url) {
        this.crawler.queueURL(url);
    }

}

module.exports = Crawler;