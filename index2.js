const bookListContainer = document.getElementById("list");
let bookListItem;
const showPanelDiv = document.getElementById("show-panel");
let currentBook; // Store the current book in a higher scope

const urlBooks = "http://localhost:3000/books";

function renderShowPanel(book) {
  showPanelDiv.innerHTML = '';

  const bookImg = document.createElement("img");
  const bookTitle = document.createElement("h2");
  const bookSubTitle = document.createElement("h3");
  const bookAuthor = document.createElement("h3");
  const bookDesc = document.createElement("p");
  const bookUserList = document.createElement("ul");
  const likeButton = document.createElement("button");

  book.users.forEach(user => {
    const userItem = document.createElement("li");
    userItem.textContent = user.username;
    bookUserList.appendChild(userItem);
  });

  bookImg.src = book.img_url;
  bookTitle.textContent = book.title;
  bookSubTitle.textContent = book.subtitle;
  bookAuthor.textContent = book.author;
  bookDesc.textContent = book.description;
  likeButton.textContent = "Like";

  showPanelDiv.appendChild(bookImg);
  showPanelDiv.appendChild(bookTitle);
  showPanelDiv.appendChild(bookSubTitle);
  showPanelDiv.appendChild(bookAuthor);
  showPanelDiv.appendChild(bookDesc);
  showPanelDiv.appendChild(bookUserList);
  showPanelDiv.appendChild(likeButton);

  likeButton.addEventListener("click", () => {
    const bookId = currentBook.id;

    fetch(`${urlBooks}/${bookId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        users: [...currentBook.users, { id: 1, username: "pouros" }], // Replace with the actual user data
      }),
    })
      .then(response => response.json())
      .then(updatedBook => {
        bookUserList.innerHTML = '';
        updatedBook.users.forEach(user => {
          const userItem = document.createElement("li");
          userItem.textContent = user.username;
          bookUserList.appendChild(userItem);
        });
      })
      .catch(error => console.error("Error updating book:", error));
  });
}

function renderBookList(books) {
  books.forEach(book => {
    bookListItem = document.createElement("li");
    bookListItem.textContent = book.title;
    bookListContainer.appendChild(bookListItem);

    bookListItem.addEventListener("click", () => {
      currentBook = book; // Store the current book details
      renderShowPanel(book);
    });
  });
}

fetch(urlBooks)
  .then(response => response.json())
  .then(books => {
    renderBookList(books);
  })
  .catch(error => console.error("Error fetching books:", error));
