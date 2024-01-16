let favorites = JSON.parse(localStorage.getItem("Favourite Books")) || [];

//add or remove book to/from fav-list
function toggleFavorite(bookId) {
  const index = favorites.indexOf(bookId); //find index of book in array
  if (index === -1) {
    //if not there, push in
    favorites.push(bookId);
  } else {
    //if there, take out
    favorites.splice(index, 1);
  }
  updateLocalStorage();
  updateFavoriteButton(bookId);
}

//saves fav-array to local storage (needs to be string)
function updateLocalStorage() {
  localStorage.setItem("Favourite Books", JSON.stringify(favorites));
}

//Change button label
function updateFavoriteButton(bookId) {
  const button = document.querySelector(`.btn-favorites[data-id="${bookId}"]`); //for each id seperately
  if (favorites.includes(bookId)) {
    button.textContent = "Added to Favorites";
  } else {
    button.textContent = "Add to Favorites";
  }
}
//list all fav-books
function displayFavorites() {
  const container = document.getElementById("favoritesList");
  container.innerHTML = ""; // Clear existing content

  // Iterate over each ISBN in the favorites array
  favorites.forEach((isbn) => {
    fetch(`/books/${isbn}`)
      .then((response) => response.json())
      .then((bookData) => {
        // Create and append the book element to the container
        const bookElement = document.createElement("div");
        bookElement.textContent = `Book: ${bookData.title} (ISBN: ${isbn})`;
        container.appendChild(bookElement);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
      });
  });
}

// Event listeners for adding/removing favorites
document.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("btn-favorites")) {
    const bookId = e.target.getAttribute("data-id");
    toggleFavorite(bookId);
  }
});

// check if you are on favorites site
if (window.location.pathname.includes("favorites.html")) {
  displayFavorites();
}
