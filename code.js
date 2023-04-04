// Define html elements.
const library = document.getElementById('library')
const addBookButton = document.getElementById('addbook')
const modalClose = document.getElementsByClassName('close')
const modalDiv  = document.getElementById('modal')
const modalContent = document.getElementById('modal-content')
const submitBook = document.getElementById('submit-book')
const bookForm = document.getElementById('book-form')
const clearBtn = document.getElementById('clear-storage')
// Edit Modal elements.
const editModalDiv = document.getElementById('edit-modal')
const editModalContent = document.getElementById('edit-modal-content')
const editBookForm = document.getElementById('edit-book-form')
const editSubmitButton = document.getElementById('edit-submit-button')
const editTitle = document.getElementById('edit-title')
const editAuthor = document.getElementById('edit-author')
const editPage = document.getElementById('edit-pages')
const editStatus = document.getElementById('edit-status')

// Create array to hold book objects to be displayed.
let myLibrary = [];

// Variable for current object that is being edited.
let currentObj = {}

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

        let editBookBtn = document.createElement('button')
        editBookBtn.setAttribute('class', 'card-edit-button')
        editBookBtn.setAttribute('id', 'card-edit-button')
        editBookBtn.innerText = 'Edit'

        editBookBtn.addEventListener('click', (e) => {
            e.preventDefault()
            
            // Define all the the elements needed.
            let theHeading = document.querySelector('#edit-modal-content > .topbox > .modal-heading')

            // Update the heading of modal to reflect current obj.
            theHeading.innerText = `Editing: ${this.title}`

            // Update the values to match the target object.
            editTitle.value = this.title
            editAuthor.value = this.author
            editPage.value = this.pages
            editStatus.value = this.read

            // Change the visibility of the needed element. 
            editModalDiv.style.visibility = "visible"
            editModalDiv.style.zIndex = "2"
            editModalContent.style.scale = "1"
            currentObj = this
        })


        // Append the dom elems.
        cardContent.append(bookTitle, bookAuthor, bookPages, bookStatus)
        cardDiv.append(cardContent, cardReadStatus, cardRemove, editBookBtn)
        targetElem.append(cardDiv)

        // Events for all buttons.
        cardReadStatus.addEventListener('click', () => {
            this.changeStatus(this)
        })

        cardRemove.addEventListener('click', () => {
            this.removeCard(this)
        })
    }

    editSubmit(targetForm) {
        // Add event for updating the object and dom. 
        targetForm.addEventListener('submit', (e) => {
            e.preventDefault()
            updateEditedBook(targetForm)
        })

        // Remove all eventlisteners from the form to prevent even stacking and duplication.
        let cloneForm = targetForm.cloneNode(true)
        targetForm.parentNode.replaceChild(targetForm, cloneForm)
    }

    // Class func for adjusting the status of a book.
    // Options should be READ, NOT READ, IN PROGRESS.
    changeStatus(targetObj) {
        // Define bookStatus with query and css selector.
        let bookStatus = document.querySelector(`[id = '${targetObj.elemId}'] > .card-content > .status`)
        
        // Logic for changing object and dom book read status.
        if (targetObj.read == 'Yes') {
            targetObj.read = 'No'
            bookStatus.innerText = `Read: ${targetObj.read}`
        } else {
            targetObj.read = 'Yes'
            bookStatus.innerText = `Read: ${targetObj.read}`
        }
        
        // Update localStorage for changes made.
        clearStorage()
        storeMyLibrary()
    }
    removeCard(targetObj) {
        // Remove the target book from the library array.
        const removeBook = object => object.title !== targetObj.title
        myLibrary = myLibrary.filter(removeBook)
        console.log(myLibrary)

        // Remove the associated dom element.
        document.getElementById(`${targetObj.elemId}`).remove()

        // Update localStorage to reflect changes.
        clearStorage()
        storeMyLibrary()
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
    Object.keys(localStorage).forEach(function(key) {
        let value = localStorage.getItem(key)
        value = JSON.parse(value)
        console.log(value)
        // Set prototype of object to restore class funcs.
        Object.setPrototypeOf(value, book.prototype)

        // Add obtained data objects to the array
        myLibrary.push(value)
    })
}

// Update object and dom from edit form element.
function updateEditedBook(thisObj) {
    // Update object values with values from form. 
    thisObj.title = editTitle.value
    thisObj.author = editAuthor.value
    thisObj.pages = editPage.value
    thisObj.read = editStatus.value

    console.log(thisObj)

    // Update the dom.
    library.innerHTML = ''
    myLibrary.forEach(item => item.makeCard(library))

    // Update localStorage
    clearStorage()
    storeMyLibrary()
}

// IIFE for checking localStorage and adding starter content if there is none.
(function startUpSequence() {
    if (window.localStorage.length === 0) {
        // Add some books to array. 
        myLibrary.push(new book('Game of Thrones', 'J.R.R. Martin', '500', 'No'))
        myLibrary.push(new book('Linchpin: How to be Indispensible', 'Seth Godin', '200', 'Yes'))
        myLibrary.push(new book('The Dip', 'Seth Godin', '100', 'No'))
        storeMyLibrary()
        myLibrary.forEach(item => item.makeCard(library))
    } else {
        retrieveBooksFromLocal()
        myLibrary.forEach(item => item.makeCard(library))
    }
})()



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
window.onclick = (event) => {
    if (event.target == editModalDiv) {
        editModalDiv.style.visibility = "hidden"
        editModalDiv.style.zIndex = "1"
        editModalContent.style.scale = "0"
    }
}

// prevent the default behavior of the submit button for edit-modal.
// editSubmitButton.addEventListener('click', (e) => {
//     e.preventDefault()
// })

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
    lastAdded.makeCard(library) // Adds the last item to the dom.
    modalDiv.style.visibility = "hidden" // closes the modal
    modalDiv.style.zIndex = "1"
}

// Update object that was edited, update DOM with new object data.
editBookForm.addEventListener('submit', (e) => {
    e.preventDefault()  // Prevents browser from refreshing. 

    
    // Update currentObj variable with data collected from form.
    currentObj.title = editTitle.value
    currentObj.author = editAuthor.value
    currentObj.pages = editPage.value
    currentObj.read = editStatus.value

    // Close edit momdal.
    editModalDiv.style.visibility = "hidden"
    editModalDiv.style.zIndex = "1"
    editModalContent.style.scale = "0"
    console.log(currentObj)
})

// Func for clearing local storage.
function clearStorage() {
    localStorage.clear()
}

// Create event for clearStorage button
clearBtn.addEventListener('click', clearStorage())


// Create form validation constraints for input elements.

// const titleInput = document.getElementById('title')
// titleInput.addEventListener('input', (event) => {
//     if (titleInput.validity.patternMismatch) {
//         titleInput.setCustomValidity('Titles can only contain letters and spaces')
//     } else {
//         titleInput.setCustomValidity('')
//     }
// })