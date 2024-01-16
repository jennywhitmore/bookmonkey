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
    const newA = document.createElement("a");
    const newH2 = document.createElement("h2");
    const headlineText = document.createTextNode(element.title);
    const newh4 = document.createElement("h4");
    const subheadlineText = document.createTextNode(element.subtitle);
    const abstractP = document.createElement("p");
    const abstract = document.createTextNode(element.abstract);
    const authorP = document.createElement("p");
    const author = document.createTextNode(element.author);
    const puplisherP = document.createElement("p");
    const puplisher = document.createTextNode(element.publisher);
    const priceP = document.createElement("p");
    const price = document.createTextNode(element.price);
    const pagesP = document.createElement("p");
    const pages = document.createTextNode(element.numPages);
    const newImg = document.createElement("img");
    const btn = document.createElement("button");
    list.appendChild(newDiv);
    newDiv.appendChild(newA);
    newA.appendChild(newH2);
    newA.href = "book.html" + "?" + element.isbn;
    newH2.appendChild(headlineText);
    newDiv.appendChild(newh4);
    newh4.appendChild(subheadlineText);
    newDiv.appendChild(abstractP);
    abstractP.appendChild(abstract);
    newDiv.appendChild(abstractP);
    authorP.appendChild(author);
    newDiv.appendChild(puplisherP);
    puplisherP.appendChild(puplisher);
    newDiv.appendChild(priceP);
    priceP.appendChild(price);
    newDiv.appendChild(pagesP);
    pagesP.appendChild(pages);
    newDiv.appendChild(newImg);
    newImg.src = element.cover;
    newDiv.appendChild(btn);
    btn.innerText = "Favorisieren";
  });
}

// events

list.addEventListener("click", (event) => {
  console.log(event);
});

// initialization

function init() {
  getAllBooks().then(() => {
    renderBooks();
  });
}

init();
