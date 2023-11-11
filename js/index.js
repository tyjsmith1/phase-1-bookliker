const bookListContainer = document.getElementById("list")
let bookListItem
const showPanelDiv = document.getElementById("show-panel")

const urlBooks = "http://localhost:3000/books"
const urlUsers = "http://localhost:3000/Users"

function renderShowPanel (books) {
    // When a user clicks the title of a book, display the book's thumbnail, description, 
    // and a list of users who have liked the book. 
    // This information should be displayed in the div#show-panel element.

    showPanelDiv.innerHTML = ''

    const bookImg = document.createElement("img")
    const bookTitle = document.createElement("h2")
    const bookSubTitle = document.createElement("h3")
    const bookAuthor = document.createElement("h3")
    const bookDesc = document.createElement("p")
    const bookUserList = document.createElement("ul")
    const likeButton = document.createElement("button")
    
    books.users.forEach(user => {
        const userItem = document.createElement("li")
        userItem.textContent = user.username
        bookUserList.appendChild(userItem)
    })

    bookImg.src = books.img_url
    bookTitle.textContent = books.title
    bookSubTitle.textContent = books.subtitle
    bookAuthor.textContent = books.author
    bookDesc.textContent = books.description
    likeButton.textContent = "Like"


    showPanelDiv.appendChild(bookImg)
    showPanelDiv.appendChild(bookTitle)
    showPanelDiv.appendChild(bookSubTitle)
    showPanelDiv.appendChild(bookAuthor)
    showPanelDiv.appendChild(bookDesc)
    showPanelDiv.appendChild(bookUserList)
    showPanelDiv.appendChild(likeButton)

    likeButton.addEventListener("click", (e) => {
        e.preventDefault

        const bookId = book.id

        fetch(`${urlBooks}/${bookId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                users: [...book.users, {id: 1, username: "pouros" }]
            })
        })
        .then(response => response.json())
        .then(updatedBook => {
            bookUserList.innerHTML = '';
            updatedBook.users.forEach(user => {
                const userItem = document.createElement("li");
                userItem.textContent = user.username;
                bookUserList.appendChild(userItem);
        })

    })

})}

function renderBookList (books) {
    books.forEach(books => {
        bookListItem = document.createElement("li")
        bookListItem.textContent = books.title
        bookListContainer.appendChild(bookListItem)

        bookListItem.addEventListener("click", (e) => {
            e.preventDefault()
            renderShowPanel(books)
        })
    }
    )

}

fetch(urlBooks)
.then(response => response.json())
.then(books => {
    renderBookList(books)
})

