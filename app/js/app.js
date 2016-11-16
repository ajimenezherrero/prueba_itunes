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
        divProperties = document.getElementById('divProperties'),
        titlePage = document.getElementById("titlePage"),
        artworkUrl100 = document.createElement('img'),
        artistViewUrl = document.createElement('a'),
        collectionViewUrl = document.createElement('a'),
        trackViewUrl = document.createElement('a'),
        video = document.createElement('video'),
        previewUrl = document.createElement('source');

    while (divProperties.hasChildNodes()) {
        divProperties.removeChild(divProperties.firstChild);
    }

    listSongs.style.display = "none";
    singleSong.style.display = "block";

    titlePage.innerHTML = results[element].artistName + " - " + results[element].collectionName + " - " + results[element].trackName;

    artworkUrl100.src = results[element].artworkUrl100;
    divProperties.appendChild(artworkUrl100);

    artistViewUrl.setAttribute("class", "btn");
    artistViewUrl.innerHTML = "View Artist";
    artistViewUrl.href = results[element].artistViewUrl;
    divProperties.appendChild(artistViewUrl);

    collectionViewUrl.setAttribute("class", "btn");
    collectionViewUrl.innerHTML = "View Collection";
    collectionViewUrl.href = results[element].collectionViewUrl;
    divProperties.appendChild(collectionViewUrl);

    trackViewUrl.setAttribute("class", "btn");
    trackViewUrl.innerHTML = "View Track";
    trackViewUrl.href = results[element].trackViewUrl;
    divProperties.appendChild(trackViewUrl);

    previewUrl.src = results[element].previewUrl;
    previewUrl.type = "video/mp4";
    video.setAttribute("controls", true);
    video.appendChild(previewUrl);
    divProperties.appendChild(video);
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
    results = [];
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
        if (request.readyState != 4) return;
        var titlePage = document.getElementById("titlePage");
        if(request.status != 200) {
            titlePage.innerHTML = "Server error";
        }else {
            var response = JSON.parse(request.response),
                listSongs = document.getElementById("listSongs"),
                resultCount = response.resultCount;

            if(listSongs.hasChildNodes()) removeAllChildsById("listSongs");

            results = response.results;
            if (resultCount == 0){
                titlePage.innerHTML = "No results found for " + valueSearch;
            } else {
                titlePage.innerHTML = "Results for " + valueSearch;
                for (var iterRes = 0; iterRes < resultCount; iterRes++) {
                    listSongs.appendChild(createLiResults(results[iterRes], iterRes));
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


