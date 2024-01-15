//includes function to show single book details
//includes function to load single book details

async function getBookByISBN(isbn) {
  const url = "http://localhost:4730/books/";
  const response = await fetch(url + isbn);
  const data = await response.json();
  console.log(data);
  return data;
}

getBookByISBN(1001606140805);
