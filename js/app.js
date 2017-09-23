const searchBtn = document.getElementById('searchBtn');
const artistName = document.getElementById('artistSearch');
const clearResultBtn = document.getElementById('clearResultBtn');
const albumContainer = document.getElementById('albumContainer');
 const currentAlbum = [];



class Albums {
    constructor(artist, albumTitle, albumId, albumGenre, art, releaseDate,  albumPrice, albumLink) {
        this.artist = artist;
        this.albumTitle = albumTitle;
        this.albumId = albumId;
        this.albumGenre = albumGenre;
        this.art = art;
        this.releaseDate = releaseDate;
       
        this.albumPrice = albumPrice;
        this.albumLink = albumLink;
        this.dataUrl = `https://itunes.apple.com/lookup?id=${this.albumId}&entity=song&callback=?`;
        this.songList = getSongs(this.dataUrl);
    }
}
// var p = `https://itunes.apple.com/lookup?id${1233964603}&entity=song&callback=?`;
// console.log('this is p' + p);

 const getAlbums = () => {
 	 const url = `https://itunes.apple.com/search?term=${artistSearch.value}&entity=album&limit=25`;
 	 	 $.getJSON(url, (data) => {
 	 	 	 const results = data.results;
 	 	 	 $.each(results, function(key, val) {
 	 	 	 	  

                 currentAlbum.push(new Albums(val.artistName, val.collectionName, val.collectionId, 
                 	                    val.primaryGenreName, val.artworkUrl100,val.releaseDate, 
                                         val.collectionPrice, val.collectionViewUrl
                 	                     ));


                  // create li & a 
 	 	 	  let list = document.createElement('li');
 	 	 	  let link = document.createElement('a');

 	 	 	  list.classList.add('list-group-item');
 	 	 	  link.innerText = val.collectionName;
 	 	 	  link.id = val.collectionId;
 	 	 	  link.addEventListener('click', getAlbumDetails);
 	 	 	  list.appendChild(link);
 	 	 	  albumContainer.appendChild(list);
 	 	 	 });

 	 	 	
 	 	 });
 	 
 }

 const getAlbumDetails = (ev) => {
   
    const albumArt = document.getElementById("albumArt");
 	const artist = document.getElementById("artist");
 	const album = document.getElementById('album');
 	const releaseDate = document.getElementById('releaseDate');
 	const genre = document.getElementById('genre');
 	const price= document.getElementById('price');
    const songList = document.getElementById("songList");
    const buyLink = document.getElementById("buyLink");
    

    console.log(currentAlbum);

    let albumDetails = "";
    
    
    for (var i = 0; i < currentAlbum.length; i++){
    	 if(ev.currentTarget.id == currentAlbum[i].albumId) {
            alert('test');
            albumDetails = currentAlbum[i];
            break;
    	 }
    }

 let x = albumDetails;
    albumArt.src = x.albumArtLarge;
    album.innerText = x.albumTitle;
    artist.innerText = x.artist;


}

 const getSongs = (uri) => {
  
    let songs = [];
    $.getJSON(uri, (data) => {
        let songObject = data.results;
        $.each(songObject, (key, val) => {
            songs.push(val.trackName);
        })
    })
    return songs;
 }
 // Event Listener for Get Albums
const clearSearch = () => {
   artistSearch.value = " " ;
   albumContainer.innerText = " ";
}

 searchBtn.addEventListener('click', getAlbums);
 clearResultBtn.addEventListener('click', clearSearch);