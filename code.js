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
const editFormBox = document.getElementById('edit-form-box')

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
        // Class global elements.
        this.modal = ''
        this.modalContainer = ''
        this.titleInput = ''
        this.authorInput = ''
        this.pagesInput = ''
        this.statusInput = ''
        this.theHeading = ''
    }
 
    info() {
        // return this
        return `${this.title}, ${this.author}, ${this.pages} pages, Read? ${this.read}, ID: ${this.elemId}`
    }

    updateBook(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
        this.elemId = this.title.replaceAll(' ', '-')
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
            
            // Update the heading of modal to reflect current obj.
            this.theHeading.innerText = `Editing: ${this.title}`

            // Update the values to match the target object.
            this.titleInput.value = this.title
            this.authorInput.value = this.author
            this.pagesInput.value = this.pages
            this.statusInput.value = this.read

            // Change the visibility of the needed element. 
            this.modal.style.visibility = "visible"
            this.modal.style.zIndex = "2"
            this.modalContainer.style.scale = "1"
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

    makeForm(targetElement) {
        // Modal container
        let tempModal = document.createElement('div')
        this.modal = tempModal

        console.log(this.modal)
        this.modal.setAttribute('id', `${this.elemId}-modal`)
        this.modal.setAttribute('class', 'modal-content')

        // Container for content
        let tempModalContainer = document.createElement('div')
        this.modalContainer = tempModalContainer

        this.modalContainer.setAttribute('id', `${this.elemId}-modal-content`)
        this.modalContainer.setAttribute('class', 'modal-content')

        // Container for heading
        let headingContainer = document.createElement('div')
        headingContainer.setAttribute('class', 'heading-box')
        // Heading content.
        let theHeading = document.createElement('h1')
        this.theHeading = theHeading
        this.theHeading.setAttribute('class', 'modal-heading')
        this.theHeading.innerText = `${this.title}`

        // Container for form.
        let formContainer = document.createElement('div')
        formContainer.setAttribute('id', `${this.elemId}-form-box`)
        formContainer.setAttribute('class', 'formbox')

        // Edit book form
        let editForm = document.createElement('form')
        editForm.setAttribute('action', '')
        editForm.setAttribute('id', `${this.elemId}-form`)

        // Title Input.
        let tempTitleInput = document.createElement('input')
        this.titleInput = tempTitleInput
        this.titleInput.setAttribute('type', 'text')
        this.titleInput.setAttribute('name', 'edit-title')
        this.titleInput.setAttribute('id', 'edit-title')
        this.titleInput.setAttribute('required', '')
        let titleLabel = document.createElement('label')
        titleLabel.setAttribute('id', 'edit-title-label')
        titleLabel.setAttribute('class', 'label')
        titleLabel.setAttribute('for', 'edit-title')
        titleLabel.innerText = 'Book Title'
        // Title Input container.
        let titleContainer = document.createElement('div')
        titleContainer.setAttribute('class', 'formtitle')

        // Author Input
        let tempAuthorInput = document.createElement('input')
        this.authorInput = tempAuthorInput
        this.authorInput.setAttribute('name', 'edit-author')
        this.authorInput.setAttribute('id', 'edit-author')
        this.authorInput.setAttribute('type', 'text')
        this.authorInput.setAttribute('required', '')
        let authorLabel = document.createElement('label')
        authorLabel.setAttribute('id', 'edit-author-label')
        authorLabel.setAttribute('class', 'label')
        authorLabel.setAttribute('for', 'edit-author')
        authorLabel.innerText = 'Author'
        // Author Input Container
        let authorContainer = document.createElement('div')
        authorContainer.setAttribute('class', 'formauthor')

        // Pages Input
        let pagesInput = document.createElement('input')
        this.pagesInput = pagesInput
        this.pagesInput.setAttribute('id', 'edit-pages')
        this.pagesInput.setAttribute('name', 'edit-pages')
        this.pagesInput.setAttribute('type', 'number')
        this.pagesInput.setAttribute('min', '1')
        this.pagesInput.setAttribute('max', '9000')
        let pagesLabel = document.createElement('label')
        pagesLabel.setAttribute('class', 'label')
        pagesLabel.setAttribute('id', 'edit-pages-label')
        pagesLabel.setAttribute('for', 'edit-pages')
        pagesLabel.innerText = 'Number of Pages'
        // Pages Input Container
        let pagesContainer = document.createElement('div')
        pagesContainer.setAttribute('class', 'formpages')

        // Read Status Input
        let statusInput = document.createElement('select')
        this.statusInput = statusInput
        this.statusInput.setAttribute('id', 'edit-status')
        this.statusInput.setAttribute('name', 'read-status')
        let statusLabel = document.createElement('label')
        statusLabel.setAttribute('class', 'label')
        statusLabel.setAttribute('for', 'edit-status')
        statusLabel.setAttribute('id', 'edit-status-label')
        statusLabel.innerText = 'Have You Read It?'
        let optionYes = document.createElement('option')
        optionYes.setAttribute('value', 'Yes')
        optionYes.innerText = 'Yes'
        let optionNo = document.createElement('option')
        optionNo.setAttribute('value', 'No')
        optionNo.innerText = 'No'
        // Read Status container.
        let statusContainer = document.createElement('div')
        statusContainer.setAttribute('class', 'readstatus')

        // Button Container
        let buttonContainer = document.createElement('div')
        buttonContainer.setAttribute('class', 'buttonbox')
        let formButton = document.createElement('button')
        formButton.setAttribute('type', 'submit')
        formButton.setAttribute('for', 'edit-book-form')

        // Events for form element.
        editForm.addEventListener('submit', (e) => {
            e.preventDefault()

            // Update object values with form input values.
            this.title = this.titleInput.value
            this.author = this.authorInput.value
            this.pages = this.pagesInput.value
            this.read = this.statusInput.value
            
            // Update the dom.
            library.innerHTML = ''
            myLibrary.forEach(item => item.makeCard(library))
            myLibrary.forEach(item => item.makeForm(document.body))
            
            // Update localStorage
            clearStorage()
            storeMyLibrary()
            
            //Close the modal. 
            this.modal.style.visibility = 'hidden'
            this.modal.style.zIndex = '1'
            this.modalContainer.style.scale = '0'
        })

        // Append all the elements in order.
        this.modal.append(this.modalContainer) 
        this.modalContainer.append(headingContainer,formContainer, buttonContainer)
        headingContainer.append(theHeading)
        formContainer.append(editForm)
        buttonContainer.append(formButton)
        editForm.append(titleContainer, authorContainer, pagesContainer, statusContainer)
        titleContainer.append(titleLabel, this.titleInput)
        authorContainer.append(authorLabel, this.authorInput)
        pagesContainer.append(pagesLabel, this.pagesInput)
        statusContainer.append(statusLabel, this.statusInput)
        this.statusInput.append(optionYes, optionNo)

        // Append the final result to the target.
        targetElement.append(this.modal)
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
    thisObj.updateBook(editTitle.value, editAuthor.value, editPage.value, editStatus.value)
    
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
        myLibrary.forEach(item => item.makeForm(document.body))
    } else {
        retrieveBooksFromLocal()
        myLibrary.forEach(item => item.makeCard(library))
        myLibrary.forEach(item => item.makeForm(document.body))
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

function editFormSubmit(targetObj) {

    editBookForm.removeEventListener('submit', (e) => {
        e.preventDefault()  // Prevents browser from refreshing. 
    
        // Update currentObj variable with data collected from form.
        targetObj.title = editTitle.value
        targetObj.author = editAuthor.value
        targetObj.pages = editPage.value
        targetObj.read = editStatus.value

        // Update the dom.
        library.innerHTML = ''
        myLibrary.forEach(item => item.makeCard(library))

        // Update localStorage
        clearStorage()
        storeMyLibrary()

        // Close edit modal.
        editModalDiv.style.visibility = "hidden"
        editModalDiv.style.zIndex = "1"
        editModalContent.style.scale = "0"
        console.log(targetObj)
    })

    // Update object that was edited, update DOM with new object data.
    editBookForm.addEventListener('submit', (e) => {
        e.preventDefault()  // Prevents browser from refreshing. 
    
        // Update currentObj variable with data collected from form.
        targetObj.title = editTitle.value
        targetObj.author = editAuthor.value
        targetObj.pages = editPage.value
        targetObj.read = editStatus.value


        // Update the dom.
        library.innerHTML = ''
        myLibrary.forEach(item => item.makeCard(library))

        // Update localStorage
        clearStorage()
        storeMyLibrary()

        // Close edit momdal.
        editModalDiv.style.visibility = "hidden"
        editModalDiv.style.zIndex = "1"
        editModalContent.style.scale = "0"
        console.log(targetObj)
    })
}


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