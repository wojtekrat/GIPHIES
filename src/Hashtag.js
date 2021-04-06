class Hashtag {

    constructor() {
        document.getElementById('hashtag1').addEventListener('click', () => this.search("wheel"));
        document.getElementById('hashtag2').addEventListener('click', () => this.search("paola"));
        document.getElementById('hashtag3').addEventListener('click', () => this.search("raz degan"));
        document.getElementById('hashtag4').addEventListener('click', () => this.search("grand theft auto"));
    }

    search = (val) => {
        document.getElementById('search-input').value = val;
    }
}

export default Hashtag;