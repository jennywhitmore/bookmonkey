export let favorites =
  JSON.parse(localStorage.getItem("Favourite Books")) || [];

//add or remove book to/from fav-list
export function toggleFavorite(isbn) {
  const index = favorites.indexOf(isbn); //find index of book in array
  if (index === -1) {
    //if not there, push in
    favorites.push(isbn);
  } else {
    //if there, take out
    favorites.splice(index, 1);
  }
  updateLocalStorage();
  updateFavoriteButton(isbn);
}

//saves fav-array to local storage (needs to be string)
function updateLocalStorage() {
  localStorage.setItem("Favourite Books", JSON.stringify(favorites));
}

//Change button label
function updateFavoriteButton(isbn) {
  const button = document.querySelector(`.btn-favorites[data-id="${isbn}"]`); //for each id seperately
  if (favorites.includes(isbn)) {
    button.textContent = "Added to Favorites";
  } else {
    button.textContent = "Add to Favorites";
  }
}

//list all fav-books
export function displayFavorites() {
  const container = document.getElementById("favoritesList");
  container.innerHTML = ""; // Clear existing content

  // Iterate over each ISBN in the favorites array
  favorites.forEach((isbn) => {
    console.log("hallohallo");
    fetch(`http://localhost:4730/books/${isbn}`)
      .then((response) => response.json())
      .then((bookData) => {
        console.log(bookData);
        // Create and append the book element to the container
        const bookElement = document.createElement("p");
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
  console.log(e);
  if (e.target && e.target.classList.contains("btn-favorites")) {
    const isbn = e.target.getAttribute("data-id");
    toggleFavorite(isbn);
  }
});

displayFavorites();
