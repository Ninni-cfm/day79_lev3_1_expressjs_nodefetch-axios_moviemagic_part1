function search() {
    console.log('Search button clicked!');

    let searchText = document.getElementById('txtSearch').value;

    while (searchText.indexOf('/') >= 0) {
        searchText = searchText.replace('/', '%2f');
    }
    while (searchText.indexOf('\\') >= 0) {
        searchText = searchText.replace('\\', '%5c');
    }

    while (searchText.indexOf('?') >= 0) {
        searchText = searchText.replace('?', '%3f');
    }

    while (searchText.indexOf(' ') >= 0) {
        searchText = searchText.replace(' ', '%20');
    }

    window.location.href = `/search/${searchText}`;
}
