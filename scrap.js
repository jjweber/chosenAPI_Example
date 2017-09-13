var searchField = document.querySelector('#userSelections');
var submit = document.querySelector('.js-search-button');
var resultEl = document.querySelector('#searchedArticles');
var apiKey = "0d7756c1218343da88921149462e1cb7";

/* Creating event listener that listens for the click of the search button.
submit.addEventListener('click', function(e) {
  console.log("Click");
  // Calling my makeRequest function and passing it api url with perameters and apikey.
  makeRequest(`https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=0d7756c1218343da88921149462e1cb7`);
})
*/

// Creating a function to make a request and get data from News api.
function makeRequest() {
  if (searchField.value != 'none') {
    // Creating request.
    var request = new XMLHttpRequest();
    // Opening the request and performing a get request.

    request.open('GET', `https://newsapi.org/v1/articles?&sortBy=top&source=${searchField.value}&apiKey=0d7756c1218343da88921149462e1cb7`, true);
    //request.open('GET', `https://newsapi.org/v1/sources?&sortBysAvailable=top&language=en&category=${searchField.value}&apiKey=0d7756c1218343da88921149462e1cb7`, true);

    // Creating onload function to handle request status.
    request.onload = function() {
      // If it recieves a request between 200 and 400 it will continue.
      if (request.status >= 200 && request.status < 400) {
        // Creating a variable to hold my parsed json data.
        var apiData = JSON.parse(request.responseText)
        // Calling function to render results
        console.log(apiData);
        renderPage(apiData.articles);
        searchField.value="none";
      }
      else {
        console.log('response error', request);
      }
    }
    request.onerror = function() {
      console.log('connection error');
    }

    request.send();
  }

}

// Creating Data Object to hold game match details.
class ArticleDO {
  constructor() {
  this.id = 0;
  this.title = "";
  this.urlToImage = "";
  this.description = "";
  this.author = "";
  this.url = ""
  }
}


function renderPage(articles) {
  var news = articles;
  var displayField = document.getElementById("cardContainer");
  var newsArticles = new Array;
  var newArticle;

  // Reseting and emptying table to get rid of any existing values.
  cardContainer.innerHTML = "";

  for (var i = 0; i < news.length; i++) {
     var Result = news[i];
     newsArticles.push(Result);
  }

  for (var i = 0; i < newsArticles.length; i++) {
    newArticle = newsArticles[i];
    console.log(newArticle);


    // Creating a table row to hold the new data/cells
    var card = document.createElement("li");
    //card.className = "col-sm-12 col-md-6 col-lg-3";

    // Creating a table data/cell that will display the articles title.
    var item = document.createElement("h3");
    var itemText = document.createTextNode(newArticle.title);
    item.appendChild(itemText);
    card.appendChild(item);

    // Creating a table data/cell that will display the articles urlToImage.
    var item = document.createElement("div");
    var imgPath = newArticle.urlToImage;
    var imgHtml = '<img class="newsImages" src="' + imgPath + '">';
    item.innerHTML = imgHtml;
    card.appendChild(item);

    // Creating a table data/cell that will display the articles description.
    var item = document.createElement("p");
    var itemText = document.createTextNode(newArticle.description);
    item.appendChild(itemText);
    card.appendChild(item);

    /*
    // Creating a table data/cell that will display the articles url.
    var item = document.createElement("p");
    var urlPath = newArticle.url;
    var urlHtml = '<a href="' + urlPath + '">' + urlPath + '</a>';
    if (newArticle.author === null) {
      var articleAuthor = "Unknown";
    } else {
      var articleAuthor = newArticle.author;
    }
    var authorHtml = '<p class= "newsAuthor">' + articleAuthor + '</p>';

    item.innerHTML = 'Author: ' + articleAuthor + '<br><br>' + 'Found At: ' + urlHtml;
    card.appendChild(item);
    */

    // Creating a table data/cell that will display the articles url.
    var item = document.createElement("p");
    var modalButton = '<a id="modalBtn" data-toggle="modal" data-target="#myModal">Larger View</a>';
    item.innerHTML = modalButton;
    card.appendChild(item);

    // Appending the new row to my table.
    cardContainer.appendChild(card);
  }
}


function theFunction(e)
{ alert(e.target.id);}
