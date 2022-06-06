//initialize page after HTML loads
window.onload = function () {

   closeLightBox(); // close the lightbox because it's initially open in the CSS
   document.getElementById("button").onclick = function () {
      searchBook();
   };
   document.getElementById("lightbox").onclick = function () {
      closeLightBox();
   };
} // window.onload

function fetchCover() {

   let cover = document.getElementById("search").value;

   fetch('http://openlibrary.org/search.json?title=' + search)
      .then(response => response.json())
      .then(data => showSearchResults(data.docs));
} //

// get data from TV Maze
function searchBook() {
   document.getElementById("main").innerHTML = "";

   let search = document.getElementById("search").value;

   fetch('http://openlibrary.org/search.json?title=' + search)
      .then(response => response.json())
      .then(data => showSearchResults(data.docs));
} //


// change the activity displayed 
function showSearchResults(data) {

   // show data from search
   console.log(data);

   // show each tv show from search results in webpage
   for (let book in data) {
      createBook(data[book]);
   } // for


} // updatePage

// constructs one TV show entry on webpage
function createBook(bookJSON) {

   console.log(bookJSON);
   // get the main div tag
   var elemMain = document.getElementById("main");

   // create a number of new html elements to display tv show data
   var elemDiv = document.createElement("div");
   // var elemImage = document.createElement("img");

   var elemBookTitle = document.createElement("h4");
   elemBookTitle.classList.add("showtitle"); // add a class to apply css


   // add JSON data to elements
   elemBookTitle.style.textAlign = 'center';
   elemBookTitle.innerHTML = bookJSON.title;

   elemDiv.onclick = function () {
      let cover = "https://covers.openlibrary.org/b/id/" + bookJSON.cover_i + "-M.jpg";

      let s = "<h2>" + bookJSON.title + "</h2><h4>" + bookJSON.author_name + "<br>" + bookJSON.publisher[0] + "<br>" + bookJSON.language + "</h4><br>" + "<img src='" + cover + "'>";

      if (bookJSON.first_sentence != undefined) {
         s += "<h5>" + bookJSON.first_sentence + "</h5>";
      }
      showLightBox(s)

   }
   // add 5 elements to the div tag elemDiv
   elemDiv.appendChild(elemBookTitle);

   // add this tv show to main
   elemMain.appendChild(elemDiv);

} // createBook

// open lightbox and display episode info
function showLightBox(s) {

   document.getElementById("lightbox").style.display = "block";
   document.getElementById("message").style.display = "block";

   // show episode info in lightbox
   document.getElementById("message").innerHTML = s;

} // showLightBox


function showCategoryResults(data) {

   // show data from search
   console.log("in showcategory results:");
   console.log(data);

   document.getElementById("message").innerHTML = data.works; // data.works is an array of books

   // // show each tv show from search results in webpage
   for (let i = 0; i < data.works.length; i++) {
      categoryBooks(data.works[i]);
   } // for

}

function categoryBooks(book) {
   console.log("in CategoryBooks:");
   console.log(book);

   // get the main div tag
   var elemMain = document.getElementById("main");

   // create a number of new html elements to display tv show data
   var elemDiv = document.createElement("div");
   // var elemImage = document.createElement("img");

   var elemBookTitle = document.createElement("h4");

   elemBookTitle.classList.add("showtitle"); // add a class to apply css

   // add JSON data to elements;
   elemBookTitle.style.textAlign = 'center';
   elemBookTitle.innerHTML = book.title;


   elemDiv.onclick = function () {
      let cover = "https://covers.openlibrary.org/b/id/" + book.cover_id + "-M.jpg";

      let s = "<h2>" + book.title + "</h2><h4>" + book.authors[0].name + "</h4><br>" + "<img src='" + cover + "'>";

      if (book.first_sentence != undefined) {
         s += "<h5>" + book.first_sentence + "</h5>";
      }
	  
	  if (book.first_sentence != undefined) {
         s += "<h5>" + book.first_sentence + "</h5>";
      }
	  
      showLightBox(s)

   }
   // add 5 elements to the div tag elemDiv
   elemDiv.appendChild(elemBookTitle);

   // add this tv show to main
   elemMain.appendChild(elemDiv);

}


// close the lightbox
function closeLightBox() {
   document.getElementById("lightbox").style.display = "none";
} // closeLightBox 

function searchSubject() {
   document.getElementById("main").innerHTML = "";

   let search2 = document.getElementById("search2").value;

   fetch('http://openlibrary.org/subjects/' + search2 + ".json")
      .then(response => response.json())
      .then(data => showCategoryResults(data));
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}       