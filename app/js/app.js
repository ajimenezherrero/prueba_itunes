'use strict';

//////////////////////
// GLOBAL VARIABLES //
//////////////////////
var uriItunes = "https://itunes.apple.com/search?term=",
    proxy = 'https://cors-anywhere.herokuapp.com/',
    results = [];

//////////////////////////////////
// ONCLICK ELEMENT RESULTS LIST //
//////////////////////////////////
function selectListElement(element){
    var listSongs = document.getElementById("listSongs"),
        singleSong = document.getElementById("singleSong"),
        listProperties = document.getElementById('listProperties');

    listSongs.style.display = "none";
    singleSong.style.display = "block";

    for (var property in results[element]) {
        var liProperty = document.createElement('li');
        liProperty.innerHTML = property + '=' + results[element][property];
        listProperties.appendChild(liProperty);
    }
}

////////////////////////////////////
// CREATE LIST ELEMENTS BY RESULT //
////////////////////////////////////
function createLiResults(result, iterPosition){
    var newLi = document.createElement('li'),
        trackName =  document.createElement("h3"),
        artistName =  document.createElement("h4"),
        collectionName =  document.createElement("h4"),
        artworkUrl60 =  document.createElement("img");

    newLi.setAttribute("onclick", "selectListElement("+ iterPosition +")");

    trackName.innerHTML = result.trackName;
    artistName.innerHTML = result.artistName;
    collectionName.innerHTML = result.collectionName;
    artworkUrl60.src = result.artworkUrl60;

    newLi.appendChild(artworkUrl60);
    newLi.appendChild(trackName);
    newLi.appendChild(artistName);
    newLi.appendChild(collectionName);

    return newLi;
}

/////////////////////////////////
// REMOVE CHILDS BY ELEMENT ID //
/////////////////////////////////
function removeAllChildsById(id){
    var element = document.getElementById(id);

    while (element.hasChildNodes()) {
        element.removeChild(element.firstChild);
    }
}

/////////////////////////
// SEARCH FORM ONCLICK //
/////////////////////////
function submitForm(evt){
    var request = new XMLHttpRequest(),
        searchText = document.getElementById("searchText"),
        valueSearch = searchText.value,
        uriRequest = proxy + uriItunes + valueSearch.replace(" ", "+");

    evt.preventDefault();

    request.open("GET", uriRequest, true);

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var response = JSON.parse(request.response),
                listSongs = document.getElementById("listSongs"),
                titlePage = document.getElementById("titlePage");

            results = [];
            removeAllChildsById("listSongs");

            if(response.results === undefined){
                titlePage.innerHTML = "Incorrect search parameters"
            } else {
                results = response.results;
                if (results.length == 0){
                    titlePage.innerHTML = "No results found for " + valueSearch;
                } else {
                    titlePage.innerHTML = "Results for " + valueSearch;
                    for (var iterRes = 0; iterRes < results.length; iterRes++) {
                        listSongs.appendChild(createLiResults(results[iterRes], iterRes));
                    }

                }

            }
        }
    };

    request.send();
}

/////////////////////////
// NAVIGATION FUNCTION //
/////////////////////////
function goBack(){
    var listSongs = document.getElementById("listSongs"),
        singleSong = document.getElementById("singleSong");

    listSongs.style.display = "block";
    singleSong.style.display = "none";
}


