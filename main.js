var path = window.location.pathname;
var page = path.split("/").pop();

if (page == index.html) {

  // Creating event listener on the window on load to create an instance of my singleton.
  window.addEventListener("load", function(){
    console.log("Page loaded");
    // Instantiate Singleton
    var myAssignment = Weber_DPW.getInstance();
  });

  // Singleton Pattern
  class Weber_DPW {
    constructor() {
      console.log("Singleton created.");

      (function init() {
        // Setting global variables to window at start of the program.
        window.searchField = document.querySelector('#userSelections');
        window.submit = document.querySelector('.js-search-button');
        window.resultEl = document.querySelector('#searchedArticles');
        window.displayField = document.getElementById("cardContainer");
        window.apiKey = "0d7756c1218343da88921149462e1cb7";

        // Adding event listener to Add Employee button to call addEmployee function.
        document.getElementById("searchBtn").addEventListener("click", makeRequest);
      })();

      // Creating a function to make a request and get data from marvel api.
      function makeRequest() {
        displayField.innerHTML = "";
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
              //renderPage(apiData.articles);
              lookupArticles(apiData);
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

      function lookupArticles(apiData){
        // Intializing Controller instance.
        var controller = new Controller(apiData);
      }

    }

    static getInstance(){
      if (!Weber_DPW._instance) {
        Weber_DPW._instance = new Weber_DPW();
        return Weber_DPW._instance;
      }
      else {
        throw "Trying to create a second Singleton!";
      }
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

  // Collecting the data from the user and has references to model and view class.
  class Controller{
    constructor(apidata){
      console.log("controller created");
      // Reference to Model class.
      this.model = new Model();
      // Reference to View class.
      this.view = new View();

      this.newsArticles = new Array;

      for (var i = 0; i < apidata.articles.length; i++) {
        // Instantiating instance of GameDO data object.
        this.articleDO = new ArticleDO;
        this.articleDO.title = apidata.articles[i].title;
        this.articleDO.urlToImage = apidata.articles[i].urlToImage;
        this.articleDO.description = apidata.articles[i].description;
        this.articleDO.author = apidata.articles[i].author;
        this.articleDO.url = apidata.articles[i].url;

        this.newsArticles.push(this.articleDO);
      }

      // For each item in the games array I am printing the details of the item.
      for (var i = 0; i < this.newsArticles.length; i++) {
        // Calling the displayDetails method on my View class and passing it the item in this iteration.
        this.view.renderPage(this.newsArticles[i]);
      }
    }
  }

  // Recieving data from controller which is being processed and then sent back to the controller.
  class Model {
    constructor(){
      console.log("model created");
    }
    // Creating method to calculate the K/D ratio.
    process(){

    }
  }

  // Dispalying the information to the screen.
  class View {
    constructor(){
      console.log("view created");
    }

    renderPage(d) {
      this.displayField = document.getElementById("cardContainer");
      this.news = d;

      // Creating a table row to hold the new data/cells
      this.card = document.createElement("li");
      //card.className = "col-sm-12 col-md-6 col-lg-3";

      // Creating a table data/cell that will display the articles title.
      this.item = document.createElement("h3");
      this.itemText = document.createTextNode(this.news.title);
      this.item.appendChild(this.itemText);
      this.card.appendChild(this.item);

      // Creating a table data/cell that will display the articles urlToImage.
      this.item = document.createElement("div");
      this.imgPath = this.news.urlToImage;
      this.imgHtml = '<img class="newsImages" src="' + this.imgPath + '">';
      this.item.innerHTML = this.imgHtml;
      this.card.appendChild(this.item);

      // Creating a table data/cell that will display the articles description.
      this.item = document.createElement("p");
      this.itemText = document.createTextNode(this.news.description);
      this.item.appendChild(this.itemText);
      this.card.appendChild(this.item);

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
      this.item = document.createElement("p");
      this.modalButton = '<a id="modalBtn" data-toggle="modal" data-target="#myModal">Larger View</a>';
      this.item.innerHTML = this.modalButton;
      this.card.appendChild(this.item);

      // Appending the new row to my table.
      displayField.appendChild(this.card);


    }
  }
}
