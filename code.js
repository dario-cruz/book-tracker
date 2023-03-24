// Define html elements.
const library = document.getElementById('library')
const addBookButton = document.getElementById('addbook')
const modalClose = document.getElementsByClassName('close')
const modalDiv  = document.getElementById('modal')
const modalContent = document.getElementById('modal-content')
const submitBook = document.getElementById('submit-book')
const bookForm = document.getElementById('book-form')

// Buttons for dom elems added. 
const cardRemove = "<button class='cardbtnrmv'>Remove</button>"
const cardReadStatus = "<button class='cardbtnchg'>Change Status</button>"


// Create array to hold book objects to be displayed.
let myLibrary = [];

// Class for adding books to array.
class book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
 
    info() {
        return `${title}, ${author}, ${pages} pages, ${read}`
    }
    add() {
        let elemTitle = `<p class='title'> ${this.title} </p>`
        let elemAuthor = `<p class='author'> ${this.author} </p>`
        let elemPages = `<p class='pages'>Pages: ${this.pages}</p>`
        let elemRead = `<p class='read'>Read: ${this.read}</p>`
        let elemId = this.title.replaceAll(" ", "")
        library.innerHTML += `<div id='${elemId}' class='card'>` + "<div class='cardtext'>" + elemTitle + elemAuthor + elemPages + elemRead + "</div>" + "<div class='btncontainer'>" + cardReadStatus + cardRemove + "</div>" + "</div>"
    }
}

// Function for injecting new book objects into localStorage.
function storeBookInfo(bookObj) {
    // Stringify the book object and store in in localStorage.
    localStorage.setItem(bookObj, JSON.stringify(bookObj))
}

// Function for storing all books 
function storeMyLibrary() {
    myLibrary.forEach(book => storeBookInfo(book))
}

// Function for retrieving stored books from localStorage.
function retrieveBooksFromLocal() {
    for (let key of localStorage.keys()) {
        let value = localStorage.getItem(key)
        value = JSON.parse(value)
        myLibrary.push(value)
    }
}

// Add some books to array. 
myLibrary.push(new book('Game of Thrones', 'J.R.R. Martin', '500', 'No'))
myLibrary.push(new book('Linchpin: How to be Indispensible', 'Seth Godin', '200', 'Yes'))
myLibrary.push(new book('The Dip', 'Seth Godin', '100', 'No'))


// loop that adds predefined books as cards to the dom.
for (book of myLibrary) {
    console.log(book);
    // Add the book to the dom.
    book.add()
}

// Event for button when pressed.
addBookButton.addEventListener('click', () => {
    modalDiv.style.visibility = "visible"
    modalDiv.style.zIndex = "2"
    modalContent.style.scale = "1"
})
// When user clicks outside the modal content box close modal
window.onclick = (event) => {
    if (event.target == modalDiv) {
        modalDiv.style.visibility = "hidden"
        modalDiv.style.zIndex = "1"
        modalContent.style.scale = "0"
    }
}

// Prevent the default form submit behavior.
// calls the formSubmit to extract the form data.
bookForm.addEventListener('submit', formSubmit)

// Prevents default form behaviour. Converts form info to object data.
function formSubmit(event) {
    event.preventDefault() // Prevents normal form submit. 
    let myFormData = new FormData(event.target) 
    let processedFormData = {}
    myFormData.forEach((key, value) => (processedFormData[value] = key))
    console.log(processedFormData)
    let newBook = new book(processedFormData.title, processedFormData.author, processedFormData.pages, processedFormData.read)
    myLibrary.push(newBook)
    let lastAdded = myLibrary[myLibrary.length - 1] // Defines the last obj added to array.
    lastAdded.add() // Adds the last item to the dom.
    modalDiv.style.visibility = "hidden" // closes the modal
    modalDiv.style.zIndex = "1"
    addBtnEvent()
}

// Add button functions on all dom buttons. 
addBtnEvent()

// Remove button functionality.

// func to add event listener to dynamically added cards
function addBtnEvent() {
    let deleteBtns = document.querySelectorAll('.cardbtnrmv');
    
    deleteBtns.forEach( button => {
        button.addEventListener('click', () => {
            button.closest('.card').remove()
        })
    })
    
    let cardObj = document.querySelectorAll('.card')
    let chgReadBtn = document.querySelectorAll('.cardbtnchg')
    
    chgReadBtn.forEach( button => {
        let readText = button.closest('.read')
        if (readText.innerHTML == 'Read: Yes') {
            readText.innerHTML = 'Read: No'
        } else {
            readText.innerHTML = 'Read: Yes'
        }
    })
}