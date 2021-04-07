class Api {

    constructor() {
        this.gifsLoaded = 0;
        this.userInput = '';
        this.giphiesArray = []
        this.itemId = ""
        document.querySelector('#search-button').addEventListener('click', () => this.searchGifs());
        document.querySelector('#more').addEventListener('click', () => this.getMoreGifs());
        document.getElementById("imageMenuClose").addEventListener("click", () => this.closeFullWindow());
        this.full = document.getElementById("fullImage")   
    }

    closeFullWindow() {
        this.full.style.display = "none"
    }

    generateGifs(response) {
        let full = this.full
        for (let i = 0; i < response.data.length; i++) {
            let giphyURL = response.data[i].images.original.url;
            this.giphiesArray.push(giphyURL)   
        }

        for (let x = 0; x < 18; x++) {
            let newGif = this.giphiesArray[x]
            let imgNr = "img" + x;
            $("<img/>", {src: newGif, id: imgNr, class: "gifs"})
            .appendTo("#content")
            .click(function() {
                document.querySelector("#imageBoxImg").innerHTML = ""
                full.style.display = "flex"
                $("<img/>", {src: newGif}).appendTo("#imageBoxImg")
                
              });
        }

        
    }


    clearContentWrapper() {
        document.querySelector('#content').innerHTML = "";
        this.gifsLoaded = 0;
    }

    randomGifs() {
        this.giphiesArray = []
        this.clearContentWrapper();
        let randomURL = "https://api.giphy.com/v1/gifs/trending?api_key=ACSF6DvX2932HZzH0n7O6loDtrvWa543";
        $.ajax({url: randomURL, method: 'GET'}).done((response) => this.generateGifs(response));
        this.gifsLoaded +=18
    }

    searchGifs() {
        this.clearContentWrapper();
        this.userInput = $("#search-input").val().trim().replace(/ /g, "+");
        if (this.userInput === '') {
            return this.randomGifs();
        }
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + this.userInput + "&api_key=ACSF6DvX2932HZzH0n7O6loDtrvWa543&limit=150";
        this.giphiesArray = []
        $.ajax({url: queryURL, method: 'GET'}).done((response) => this.generateGifs(response));
        this.gifsLoaded += 18;
    }

    getMoreGifs() {
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + this.userInput + "&api_key=ACSF6DvX2932HZzH0n7O6loDtrvWa543&limit=150";
        let giphiesArray = this.giphiesArray
        let gifsLoaded = this.gifsLoaded;
        $.ajax({url: queryURL, method: 'GET'}).done(function () {
            for (let i = gifsLoaded; i < giphiesArray.length; i++) {
                let giphyURL = giphiesArray[i];
                let imgNr = "img" + i;

                $("<img/>", {src: giphyURL, id: imgNr, class: "gifs"}).appendTo("#content");
            }
        });
        this.gifsLoaded += 18;
        
    }
}
class Navbar {

    navbarPosition = $("#searchbar").offset().top;

    constructor() {
        window.addEventListener('scroll', this.sticky);
        window.addEventListener('resize', this.sticky);
    }

    sticky = () => {
        if ($(window).scrollTop() > this.navbarPosition) {
            $("#navbar").addClass("sticky");
            if ($(window).width() > 950) {
                $('#search-input').css({
                    'margin-left': "240px",
                });
                $('#logo').css({
                    'opacity': '1'
                });
            } else {
                $('#search-input').css({
                    'margin-left': "0px",
                });
                $('#logo').css({
                    'opacity': '0',
                });
            }
            $('#logo').css({
                'position': 'fixed',
                'padding': '5px 15px',
                'align-items': 'center'
            });
            $("#hashtags-container").slideUp();
        } else {
            $("#navbar").removeClass("sticky");
            $('#search-input').css({
                'margin-left': "0px"
            });
            $('#logo').css({
                'position': 'relative',
                'padding': '10px 0',
                'align-items': 'initial',
                'opacity': '1'
            }).removeClass("position-fixed");
            $("#hashtags-container").delay(50).slideDown();
        }
    };
}
class Searchbar {
    searchbar = $('#search-input');

    constructor() {
        this.flag = false;
        this.searchbar.attr('placeholder', 'Search various GIFs and Stickers!');
        setInterval(this.changePlaceholder, 2000);
        document.getElementById("search-input").addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                document.getElementById("search-button").click();
            }
        });
    }

    changePlaceholder = () => {
        if (this.flag) {
            this.searchbar.attr('placeholder', 'Search various GIFs and Stickers!');
            this.flag = !this.flag;
        } else {
            this.searchbar.attr('placeholder', '@username + tag to search within a verified channel');
            this.flag = !this.flag;
        }
    };
}

new Navbar();
new Searchbar();
new Api().randomGifs();