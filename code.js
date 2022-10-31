// Define html elements.
const library = document.getElementById('library')
const addBookButton = document.getElementById('addbook')
const modalClose = document.getElementsByClassName('close')
const modalDiv  = document.getElementById('modal')


// Create array to hold book objects to be displayed.
let myLibrary = [];

// Create Obj constructor for creating book objects.
function addBook(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        return `${title}, ${author}, ${pages} pages, ${read}`
    }
}
// Create func to add created books to myLibrary array. 
function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new addBook(`${title}`, `${author}`, `${pages}`, `${read}`))
}

// Add some books to array. 
myLibrary.push(new addBook('Game of Thrones', 'J.R.R. Martin', '500', 'No'))
myLibrary.push(new addBook('Linchpin: How to be Indispensible', 'Seth Godin', '200', 'Yes'))
myLibrary.push(new addBook('The Dip', 'Seth Godin', '100', 'No'))

// loop that adds books as cards to the dom.
for (book of myLibrary) {
    console.log(book);
    let elemTitle = "<p class='title'>" + book.title + "</p>"
    let elemAuthor = "<p class='author'>" + book.author + "</p>"
    let elemPages = "<p class='pages'>" + book.pages + "</p>"
    let elemRead = "<p class='read'>" + book.read + "</p>"
    library.innerHTML += "<div class='card'>" + elemTitle + elemAuthor + elemPages + elemRead + "</div>"
}

// Event for button when pressed.
addBookButton.addEventListener('click', () => {
    modalDiv.style.display = "block"
})
// When user clicks outside the modal content box close modal
window.onclick = (event) => {
    if (event.target == modalDiv) {
        modalDiv.style.display = "none"
    }
}