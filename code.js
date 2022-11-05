// Define html elements.
const library = document.getElementById('library')
const addBookButton = document.getElementById('addbook')
const modalClose = document.getElementsByClassName('close')
const modalDiv  = document.getElementById('modal')
const modalContent = document.getElementById('modal-content')
const submitBook = document.getElementById('submit-book')
const bookForm = document.getElementById('book-form')
// Buttons for dom elems added. 
const cardRemove = "<button id='cardRmv' class='cardbtn'>Remove</button>"
const cardReadStatus = "<button id='cardChgStat' class='cardbtn'>Change Status</button>"


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
    this.add = () => {
        let elemTitle = "<p class='title'>" + this.title + "</p>"
        let elemAuthor = "<p class='author'>" + this.author + "</p>"
        let elemPages = "<p class='pages'>" + "Pages: " + this.pages + "</p>"
        let elemRead = "<p class='read'>" +"Read: "+ this.read + "</p>"
        let elemId = this.title.replaceAll(" ", "")
        library.innerHTML += `<div id='${elemId}' class='card'>` + "<div class='cardtext'>" + elemTitle + elemAuthor + elemPages + elemRead + "</div>" + "<div class='btncontainer'>" + cardReadStatus + cardRemove + "</div>" + "</div>"
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

// loop that adds predefined books as cards to the dom.
for (book of myLibrary) {
    console.log(book);
    let elemTitle = "<p class='title'>" + book.title + "</p>"
    let elemAuthor = "<p class='author'>" + book.author + "</p>"
    let elemPages = "<p class='pages'>" + "Pages: " + book.pages + "</p>"
    let elemRead = "<p class='read'>" +"Read: "+ book.read + "</p>"
    let elemId = book.title.replaceAll(" ", "")
    library.innerHTML += `<div id='${elemId}' class='card'>` + "<div class='cardtext'>" + elemTitle + elemAuthor + elemPages + elemRead + "</div>" + "<div class='btncontainer'>" + cardReadStatus + cardRemove + "</div>" + "</div>"
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
// calls the callbackFunction to extract the form data.
bookForm.addEventListener('submit', callbackFunction)

// 
function callbackFunction(event) {
    event.preventDefault() // Prevents normal form submit. 
    let myFormData = new FormData(event.target) 
    let formDataObject = new addBook()
    myFormData.forEach((value, key) => (formDataObject[key] = value))
    myLibrary.push(formDataObject)
    let lastAdded = myLibrary[myLibrary.length - 1] // Defines the last obj added to array.
    lastAdded.add() // Adds the last item to the dom.
    modalDiv.style.visibility = "hidden" // closes the modal
    modalDiv.style.zIndex = "1"
}

// Remove button functionality.
const deleteBtns = document.querySelectorAll('#cardRmv');

deleteBtns.forEach( button => {
    button.addEventListener('click', removeCard())
})

function removeCard() {
}



// function changestatus() {
//     let pageStatus = this.clos
//     if (pageStatus.innerHTML == "Read: No") {
//         pageStatus.innerHTML = "Read: Yes";
//     } else {
//         pageStatus.innerHTML = "Read: No"
//     }
// }




// const changeStatusBtn = document.getElementById('cardChgStat')
// changeStatusBtn.addEventListener('click', changestatus())