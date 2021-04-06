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

export default Searchbar;