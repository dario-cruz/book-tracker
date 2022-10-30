// Define html elements.
const library = document.getElementById('library')
const addBookButton = document.getElementById('addbook')


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

