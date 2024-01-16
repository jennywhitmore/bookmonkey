//includes function to show single book details
//includes function to load single book details

const fav = document.querySelector(".book-card");

async function getBookByISBN() {
  const isbn = location.search.replace(/^./, "");
  const url = "http://localhost:4730/books/";
  const response = await fetch(url + isbn);
  const data = await response.json();
  console.log(data);
  return data;
}

// rendering

function renderBook(book) {
  fav.innerHTML = "";
  const div = document.createElement("div");
  div.classList = "book-cover";
  const img = document.createElement("img");
  img.src = book.cover;
  img.classList = "book-cover";
  const anotherDiv = document.createElement("div");
  anotherDiv.classList = "book-content";
  const headline = document.createElement("h2");
  headline.textContent = book.title;
  headline.classList = "headline";
  const p1 = document.createElement("p");
  p1.textContent = book.auhtor;
  p1.classList = "author";
  const p2 = document.createElement("p");
  p2.textContent = book.isbn;
  p2.classList = "isbn";
  const p3 = document.createElement("p");
  p3.textContent = book.abstract;
  p3.classList = "book-description";
  fav.append(div, img, anotherDiv, headline, p1, p2, p3);
}

function init() {
  getBookByISBN().then((book) => {
    renderBook(book);
  });
}

init();
