// Define html elements.
const library = document.getElementById('library')
const addBookButton = document.getElementById('addbook')
const modalClose = document.getElementsByClassName('close')
const modalDiv  = document.getElementById('modal')
const modalContent = document.getElementById('modal-content')
const submitBook = document.getElementById('submit-book')
const bookForm = document.getElementById('book-form')
const clearBtn = document.getElementById('clear-storage')

// Buttons for dom elems added. 
const cardRemove = document.createElement('button')
cardRemove.setAttribute('class', 'cardbtnrmv')
cardRemove.innerText = 'Remove'

const cardReadStatus = document.createElement('button')
cardReadStatus.setAttribute('class', 'cardbtnchg')
cardReadStatus.innerText = 'Change Status'


// Create array to hold book objects to be displayed.
let myLibrary = [];

// Class for adding books to array.
class book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
        this.elemId = this.title.replaceAll(' ', '-')
    }
 
    info() {
        // return this
        return `${this.title}, ${this.author}, ${this.pages} pages, Read? ${this.read}, ID: ${this.elemId}`
    }
    makeCard(targetElem) {
        // Create and set attributes for all dom elements. 
        // Append the final, completed, card element to the targetElem.
        
        let cardDiv = document.createElement('div')
        // Convert object title into usable ID for element.
        // let elemId = this.title.replaceAll(" ", "-")
        cardDiv.setAttribute('id', `${this.elemId}`)
        cardDiv.setAttribute('class', 'card')

        let cardContent = document.createElement('div')
        cardContent.setAttribute('class', 'card-content')
        
        let bookTitle = document.createElement('p')
        bookTitle.setAttribute('class', 'title')
        bookTitle.innerText = `${this.title}`

        let bookAuthor = document.createElement('p')
        bookAuthor.setAttribute('class', 'author')
        bookAuthor.innerText = `${this.author}`

        let bookPages = document.createElement('p')
        bookPages.setAttribute('class', 'pages')
        bookPages.innerText = `Pages: ${this.pages}`

        let bookStatus = document.createElement('p')
        bookStatus.setAttribute('class', 'status')
        bookStatus.innerText = `Read: ${this.read}`

        // Buttons for dom elems added. 
        let cardRemove = document.createElement('button')
        cardRemove.setAttribute('class', 'cardbtnrmv')
        cardRemove.innerText = 'Remove'

        let cardReadStatus = document.createElement('button')
        cardReadStatus.setAttribute('class', 'cardbtnchg')
        cardReadStatus.innerText = 'Change Status'

        // Append the dom elems.
        cardContent.append(bookTitle, bookAuthor, bookPages, bookStatus)
        
        cardDiv.append(cardContent, cardReadStatus, cardRemove)
        
        targetElem.append(cardDiv)

        // Events for all buttons.
        cardReadStatus.addEventListener('click', () => {
            this.changeStatus(this)
        })
    }
    // Class func for adjusting the status of a book.
    // Options should be READ, NOT READ, IN PROGRESS.
    changeStatus(targetObj) {
        let thisElem = document.getElementById(`${targetObj.elemId}`)
        console.log(thisElem)
        let bookStatus = document.querySelector(`[id = '${targetObj.elemId}'] > .card-content > .status`)
        console.log(bookStatus)
        console.log(`${targetObj.elemId}`)
        if (targetObj.read == 'Yes') {
            targetObj.read = 'No'
            bookStatus.innerText = `Read: ${targetObj.read}`
        } else {
            targetObj.read = 'Yes'
            bookStatus.innerText = `Read: ${targetObj.read}`
        }
    }
    removeCard() {

    }
}

// Function for injecting new book objects into localStorage.
function storeBookInfo(bookObj) {
    // Stringify the book object and store in in localStorage.
    localStorage.setItem(bookObj.title, JSON.stringify(bookObj))
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

// Func for clearing local storage.
function clearStorage() {
    localStorage.clear()
}

// Add some books to array. 
myLibrary.push(new book('Game of Thrones', 'J.R.R. Martin', '500', 'No'))
myLibrary.push(new book('Linchpin: How to be Indispensible', 'Seth Godin', '200', 'Yes'))
myLibrary.push(new book('The Dip', 'Seth Godin', '100', 'No'))


// loop that adds predefined books as cards to the dom.
for (book of myLibrary) {
    console.log(book.info());
    // Add the book to the dom.
    book.makeCard(library)
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

// calls the formSubmit to extract the form data.
bookForm.addEventListener('submit', formSubmit)

// Prevents default form behavior. Converts form info to object data.
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
// addBtnEvent()

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

// Create event for clearStorage button

clearBtn.addEventListener('click', clearStorage())


// Create form validation constraints for input elements.

const titleInput = document.getElementById('title')
titleInput.addEventListener('input', (event) => {
    if (titleInput.validity.patternMismatch) {
        titleInput.setCustomValidity('Titles can only contain letters and spaces')
    } else {
        titleInput.setCustomValidity('')
    }
})