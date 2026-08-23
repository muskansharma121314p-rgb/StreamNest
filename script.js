console.log("StreamNest js is working");
const firstMovie = document.querySelector(".movie-card");

//get all movies
const movies = document.querySelectorAll(".movie-card");

//get all category buttpons
const categoryButtons = document.querySelectorAll(".category-btn");

//store selected  category
let selectedCategory = "All";

function filterMovies() {
  movies.forEach(function (movie) {
    //     if (movie.dataset.category === "Action") {
    //       movie.style.display = "flex";
    //     } else {
    //       movie.style.display = "none";
    //     }
    //   });
    // }
    const movieCategory = movie.dataset.category;
    console.log(movie.dataset.title, movieCategory, selectedCategory);

    if (selectedCategory === "All" || movieCategory === selectedCategory) {
      movie.style.display = "";
    } else {
      movie.style.display = "none";
    }
  });
}

//console.log(categoryButtons);
categoryButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    selectedCategory = button.dataset.category;

    console.log("Selected:", selectedCategory);
    filterMovies();
  });
});
const searchInput = document.querySelector("#searchInput");
searchInput.addEventListener("input", function () {
  const searchText = searchInput.value.toLowerCase();
  movies.forEach(function (movie) {
    const movieTitle = movie.dataset.title.toLowerCase();
    if (movieTitle.includes(searchText)) {
      movie.style.display = "";
    } else {
      movie.style.display = "none";
    }
  });
});

const heroTitle = document.querySelector(".hero-title");
const emailInput = document.querySelector(".email-input");
const message = document.querySelector(".message-text");

//SIGN-IN
//-----------------------
const signInButton = document.querySelector(".signin-btn");
const signInMessage = document.querySelector(".signin-message");

signInButton.addEventListener("click", function () {
  signInMessage.classList.toggle("hidden");

  if (signInMessage.classList.contains("hidden")) {
    // this ask does signinmessage curretly have the hidden class, it return either true or false
    signInButton.textContent = "About Project";
  } else {
    signInButton.textContent = "Close";
  }
});

//----------------------
//SERIES
//----------------------
const seriesLink = document.querySelector(".series-link");

seriesLink.addEventListener("click", function (event) {
  event.preventDefault(); //stops the default behaviour

  message.textContent = "Series section coming soon";
});

//--------------------------
//MOVIE CARDS
//--------------------------

const movieCards = document.querySelectorAll(".movie-card"); // finds all element having movie-card
//console.log(movieCards);

movieCards.forEach(function (card) {
  card.addEventListener("click", function () {
    const movieImage = card.querySelector("img");
    console.log(movieImage.alt);

    message.textContent = `You selected ${movieImage.alt}`;
    //this.style.transform = "scale(1.05)"; //refers to the movie card that was clicked
    this.classList.toggle("selected"); //adds or removes the selected class from the card u clicked
  });
});

//-----------------------
//MOVIE DATA
//-----------------------

const movie = [
  {
    title: "Baby Dance",
    image: "images/movie1.jpeg",
    badge: "NEW",
    category: "Dancing",
    video: "videos/movie1.mp4",
  },
  {
    title: "Speech",
    image: "images/movie2.jpeg",
    badge: "TOP 10",
    category: "Motivational",
    video: "videos/movie2.mp4",
  },
  {
    title: "Ride",
    image: "images/movie3.jpeg",
    badge: "NEW",
    category: "Action",
    video: "videos/movie3.mp4",
  },
  {
    title: "Girls",
    image: "images/movie4.jpeg",
    badge: "TOP 10",
    category: "Inspiration",
    video: "videos/movie4.mp4",
  },
];
let favorites = []; //let because contents of array will be keep on chnging

//-------------------
//SELECT CONTAINERS
//-------------------

const movieContainer = document.querySelector(".movie-container"); //it will slecet the div class of movies from html
//console.log(movieContainer);

const playMessage = document.querySelector(".play-message");

//const searchInput = document.querySelector(".search-input"); //get wht the user typed

//const favoritesContainer = document.querySelector(".favorites-conatiner");

//const categoryButtons = document.querySelectorAll(".category-btn");

//-------------
//SELECTED CATEGORY
//------------------
//let selectedCategory = "All";

//-----------------
//FUNCTION TO DISPLAY MOVIES
//-----------------

function displayMovie(filteredMovie) {
  movieContainer.innerHTML = "";

  if (filteredMovie.length === 0) {
    movieContainer.innerHTML = `
    <p class="no-movies"> No movies found😢</p>
    `;
    return;
  }

  filteredMovie.forEach(function (movie) {
    movieContainer.innerHTML += `
    <div class="movie-card">
    <span class= "badge"> ${movie.badge}</span>
    
    <img src = "${movie.image}" alt="${movie.title}">
    
    <button class = "play-btn" data-title="${movie.title}">
    Play </button>
    <button class="favorite-btn" data-title="${movie.title}">
    ❤️ Favorite
    </button>
    </div>
    `;
  });
}

//-----------------------
//DISPLAY FAVORITES
//-----------------------

function displayFavorites() {
  //start the function:display everything inside the favorites array.
  favoritesContainer.innerHTML = ""; //clear the container : clearing before rebuilding the list

  if (favorites.length === 0) {
    //checks whether there are favorites
    favoritesContainer.innerHTML = `<p> No favorite movies yet.</p>`;
    return;
  }
  favorites.forEach(function (movieTitle) {
    const foundMovie = movie.find(function (item) {
      //find the complete movie objct
      return item.title === movieTitle;
    });

    favoritesContainer.innerHTML += `<div class="movie-card">
    
    <img src ="${foundMovie.image}" alt="${foundMovie.title}">
    
    <h3> ${foundMovie.title}</h3>

    <button class="remove-favorite-btn" data-title="${movieTitle}">
    Remove ❌
    </button>
    </div>
    `;
  });
}

// movieContainer.addEventListener("click", function (event) {
//   if (event.target.classList.contains("play-btn")) {
//     const movieTitle = event.target.dataset.title;

//     alert("Now Playing: " + movieTitle + " 🎬 ");
//   }
// });
//---------------
//FILTER MOVIES
//---------------

function filterMovie() {
  const searchText = searchInput.value.toLowerCase();

  const filteredMovie = movie.filter(function (movie) {
    const matchesSearch = movie.title.toLowerCase().includes(searchText);

    const matchesCategory =
      selectedCategory === "All" || movie.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
  displayMovie(filteredMovie);
}

//--------------------
//DISPLAY MOVIES WHEN PAGE LOADS
//--------------------

displayMovie(movie);

displayFavorites();

//-------------------
//MOVIE CONTAINER CLICK EVENTS
//EVENT DELEGATION CODE , PLAY BUTTON INTERACTION
//-------------------
movieContainer.addEventListener("click", function (event) {
  //PLAY BUTTON

  if (event.target.classList.contains("play-btn")) {
    const movieTitle = event.target.dataset.title;
    //console.log("Play button clicked!");
    console.log(`Playing: ${movieTitle}`);

    playMessage.textContent = `▶ Now Playing: ${movieTitle}`;

    const selectedMovie = movie.find(function (item) {
      return item.title === movieTitle;
    });

    const videoPlayer = document.querySelector(".video-player");
    const movieVideo = document.querySelector("#movieVideo");

    movieVideo.src = selectedMovie.video;
    videoPlayer.classList.remove("hidden");
    movieVideo.play();
  }

  //FAVORITE BUTTON

  if (event.target.classList.contains("favorite-btn")) {
    const movieTitle = event.target.dataset.title;

    if (!favorites.includes(movieTitle)) {
      //ask does this array already conatin this value
      favorites.push(movieTitle);

      console.log("Favorites:", favorites);
      displayFavorites();
    } else {
      console.log(`${movieTitle} is already in favorites.`);
    }
  }
});

//Close Video Code

const closeVideo = document.querySelector(".close-video");
const videoPlayer = document.querySelector(".video-player");
const movieVideo = document.querySelector("#movieVideo");

closeVideo.addEventListener("click", function () {
  movieVideo.pause();
  movieVideo.src = "";

  videoPlayer.classList.add("hidden");
});

//--------------
// //ADD THE REMOVE FAVORITE CODE
//------------------
favoritesContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-favorite-btn")) {
    const movieTitle = event.target.dataset.title;

    favorites = favorites.filter(function (title) {
      return title !== movieTitle;
    });

    displayFavorites();
    displayMovie(movie);
  }
});

//------------------
//SEARCH EVENT
//------------------
searchInput.addEventListener("input", function () {
  //searchText = searchInput.value.toLowerCase();
  filterMovie(); //it will handle selected category and search text too
});

//---------------------
//CATEGORY BUTTON EVENTS
//---------------------

//const categoryButtons = document.querySelectorAll(".category-btn");

categoryButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    categoryButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });
    button.classList.add("active");
    selectedCategory = button.dataset.category;
    filterMovie();
    //  const filteredMovie = movie.filter(function (movie) {

    //   return selectedCategory === "All" || movie.category === selectedCategory;
    // });
    // displayMovie(filteredMovie);
    //console.log(button.dataset.category); //which category this button represents
  });
});
displayMovie(movie);

// const movies = document.querySelectorAll(".movie-card");
// console.log("MOVIES:", movies);
// console.log("FIRST MOVIE:", movies[0]);
// console.log("CATEGORY:", movies[0].getAttribute("data-category"));
// console.log("TITLE:", movies[0].getAttribute("data-title"));

// document.querySelectorAll(".movie-card").forEach(function (movie) {
//   console.log(movie.outerHTML);
// });

//console.log("Movie 4 category:", movies[3].dataset.category);
