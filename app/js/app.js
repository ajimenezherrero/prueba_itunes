'use strict';

var uriItunes = "https://itunes.apple.com/search?term=";

function submitForm(evt){
    var request = new XMLHttpRequest(),
        searchText = document.getElementById("searchText"),
        valueSearch = searchText.value.replace(" ", "+"),
        uriRequest = uriItunes + valueSearch;

    evt.preventDefault();
    alert(uriItunes + valueSearch);

    request.open("GET", uriRequest, true);
    request.setRequestHeader('Access-Control-Allow-Origin', '*');
    request.setRequestHeader('Content-Type', 'application/txt');

    request.onreadystatechange = function () {
        console.log(request);
        if (request.readyState ==  XMLHttpRequest.DONE) {
            var result = request;
            console.log(result);
        }
        /*
        * if (req.readyState === 4) {
         if (req.status >= 200 && req.status < 400) {
         callback(req.responseText);
         } else {
         errback(new Error('Response returned with non-OK status'));
         }
         }
        *
        * */
    };

    request.send(null);

}

function getSuccesfull(){

}


