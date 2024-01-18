//main script with the basic functionality for the app
//includes function to initialize the app
//includes function to load all books from the api
//includes functions to navigate around the app

const list = document.getElementById("list");
const url = "http://localhost:4730/books/";

let books = [];

// CRUD - API

async function getAllBooks() {
  const response = await fetch(url);
  const data = await response.json();
  books.push(...data);
}

// rendering

function renderBooks() {
  list.innerHTML = "";
  books.forEach((element) => {
    const newDiv = document.createElement("div");
    newDiv.classList = "card";
    const newA = document.createElement("a");
    const newH2 = document.createElement("h2");
    const headlineText = document.createTextNode(element.title);
    const newh4 = document.createElement("h4");
    const subheadlineText = document.createTextNode(element.subtitle);
    const anotherDiv = document.createElement("div");
    const div3 = document.createElement("div");
    const authorP = document.createElement("p");
    const author = document.createTextNode("Author: " + element.author);
    const puplisherP = document.createElement("p");
    const puplisher = document.createTextNode(
      "Publisher: " + element.publisher
    );
    const priceP = document.createElement("p");
    const price = document.createTextNode("Price: " + element.price);
    const pagesP = document.createElement("p");
    const pages = document.createTextNode(
      "Number of Pages: " + element.numPages
    );
    const newImg = document.createElement("img");

    //changes made here
    const btn = document.createElement("button");
    btn.innerText = "♥️ Add To Favorites";
    btn.classList = "btn-favorites";
    btn.setAttribute("data-id", element.isbn); //Add data-id attribute to button
    if (favorites.includes(element.isbn)) {
      btn.classList.add("added-to-fav");
      btn.innerText = "💔 Remove from Favorites";
    }
    newDiv.appendChild(btn);
    list.appendChild(newDiv);
    newDiv.appendChild(newA);
    newA.appendChild(newH2);
    newA.href = "book.html" + "?" + element.isbn;
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
    newImg.src = element.cover;
  });
}

// events

list.addEventListener("click", (event) => {
  console.log(event.target.attributes[1].nodeValue);
  if (
    event.target.className === "btn-favorites" ||
    "btn-favorites added-to-fav"
  ) {
    toggleFavorite(event.target.attributes[1].nodeValue);
  }
});

// initialization

function init() {
  getAllBooks().then(() => {
    renderBooks();
  });
}

init();

let favorites = JSON.parse(localStorage.getItem("Favourite Books")) || [];

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

function updateLocalStorage() {
  localStorage.setItem("Favourite Books", JSON.stringify(favorites));
}

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
