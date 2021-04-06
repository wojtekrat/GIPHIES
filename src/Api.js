class Api {

    constructor() {
        this.gifsToLoad = 42;
        this.gifsLoaded = 24;
        this.userInput = '';
        document.querySelector('#search-button').addEventListener('click', () => this.searchGifs());
        document.querySelector('#more').addEventListener('click', () => this.getMoreGifs());
    }

    generateGifs(response) {
        for (let i = 0; i < 24; i++) {
            let giphyURL = response.data[i].images.original.url;
            let imgNr = "img" + i;
            $("<img/>", {src: giphyURL, id: imgNr, class: "gifs"}).appendTo("#content");
        }
    }

    clearContentWrapper() {
        document.querySelector('#content').innerHTML = "";
        document.querySelector('#overlay').innerHTML = "";
    }

    randomGifs() {
        this.clearContentWrapper();
        let randomURL = "http://api.giphy.com/v1/gifs/trending?api_key=ACSF6DvX2932HZzH0n7O6loDtrvWa543";
        $.ajax({url: randomURL, method: 'GET'}).done((response) => this.generateGifs(response));
    }

    searchGifs() {
        this.clearContentWrapper();
        let userInput = $("#search-input").val().trim().replace(/ /g, "+");

        if (userInput === '') {
            return this.randomGifs();
        }

        this.userInput = userInput;
        this.gifsToLoad = 42;
        this.gifsLoaded = 24;
        let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + userInput + "&api_key=ACSF6DvX2932HZzH0n7O6loDtrvWa543&limit=150";

        $.ajax({url: queryURL, method: 'GET'}).done((response) => this.generateGifs(response));
    }

    getMoreGifs() {
        this.userInput = this.userInput
        let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + userInput + "&api_key=ACSF6DvX2932HZzH0n7O6loDtrvWa543&limit=150";
        let gifsToLoad = this.gifsToLoad;
        let gifsLoaded = this.gifsLoaded;

        $.ajax({url: queryURL, method: 'GET'}).done(function (response) {
            for (let i = gifsLoaded; i < gifsToLoad; i++) {
                let giphyURL = response.data[i].images.original.url;
                let imgNr = "img" + i;

                $("<img/>", {src: giphyURL, id: imgNr, class: "gifs"}).appendTo("#content");
            }
        });
        this.gifsToLoad += 24;
        this.gifsLoaded += 24;
    }
}

export default Api;