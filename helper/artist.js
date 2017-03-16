'use strict';
var instance = null;
var artists = [];

class Artists{
    constructor() {
        if(!instance) {
            instance = this;
        }
    }

    static instance(){
        if(!instance) {
            instance = new Artists();
        }
        return instance;
    }

    addArtist(artist){
        artists.push(artist);
    }

    containsArtist(artist){
        return artists.indexOf(artist) != -1;
    }
}

module.exports = Artists;