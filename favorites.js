let favorites = JSON.parse(localStorage.getItem("Favourite Books")) || [];
const placeholder = document.querySelector(".message");

//add or remove book to/from fav-list
function toggleFavorite(isbn) {
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
  const button = document.querySelector(`button[data-id="${isbn}"]`);
  console.log(button);
  if (favorites.includes(isbn)) {
    button.textContent = "💔 Remove from Favorites";
    button.classList.add("added-to-fav");
  } else {
    button.textContent = "♥️ Add To Favorites";
    button.classList.remove("added-to-fav");
  }
}

//list all fav-books
function displayFavorites() {
  const container = document.getElementById("favoritesList");
  container.innerHTML = ""; // Clear existing content
  if (favorites.length !== 0) {
    placeholder.innerHTML = "";
    placeholder.classList = "";
  }
  if (favorites.length === 0) {
    const placeholderP = document.createElement("p");
    const placeholderText = document.createTextNode("no favorites yet");
    placeholderP.appendChild(placeholderText);
    placeholderP.classList = "no-favorites";
    placeholder.appendChild(placeholderP);
    placeholder.classList = "message";
  }
  // Iterate over each ISBN in the favorites array
  favorites.forEach((isbn) => {
    fetch(`http://localhost:4730/books/${isbn}`)
      .then((response) => response.json())
      .then((bookData) => {
        // Create and append the book element to the container
        const newDiv = document.createElement("div");
        newDiv.classList = "card";
        const newA = document.createElement("a");
        const newH2 = document.createElement("h2");
        const headlineText = document.createTextNode(bookData.title);
        const newh4 = document.createElement("h4");
        const subheadlineText = document.createTextNode(bookData.subtitle);
        const anotherDiv = document.createElement("div");
        const div3 = document.createElement("div");
        const authorP = document.createElement("p");
        const author = document.createTextNode("Author: " + bookData.author);
        const puplisherP = document.createElement("p");
        const puplisher = document.createTextNode(
          "Publisher: " + bookData.publisher
        );
        const priceP = document.createElement("p");
        const price = document.createTextNode("Price: " + bookData.price);
        const pagesP = document.createElement("p");
        const pages = document.createTextNode(
          "Number of Pages: " + bookData.numPages
        );
        const newImg = document.createElement("img");

        //changes made here
        const btn = document.createElement("button");
        btn.innerText = "♥️ Add To Favorites";
        btn.classList = "btn-favorites";
        btn.setAttribute("data-id", bookData.isbn); //Add data-id attribute to button
        if (favorites.includes(bookData.isbn)) {
          btn.classList.add("added-to-fav");
          btn.innerText = "💔 Remove from Favorites";
        }
        newDiv.appendChild(btn);
        container.appendChild(newDiv);
        newDiv.appendChild(newA);
        newA.appendChild(newH2);
        newA.href = "book.html" + "?" + bookData.isbn;
        newH2.appendChild(headlineText);
        newDiv.appendChild(newh4);
        newh4.appendChild(subheadlineText);
        newDiv.appendChild(anotherDiv);
        anotherDiv.classList = "details-and-cover";
        anotherDiv.appendChild(div3);
        div3.append(authorP, puplisherP, priceP, pagesP);
        authorP.appendChild(author);
        puplisherP.appendChild(puplisher);
        priceP.appendChild(price);
        pagesP.appendChild(pages);
        anotherDiv.appendChild(newImg);
        newImg.src = bookData.cover;
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
    displayFavorites();
  }
});

displayFavorites();
