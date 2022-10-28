function addBook(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        return `${title}, ${author}, ${pages} pages, ${read}`
    }
}

const GameOfThrones = new addBook('Game of Thrones', 'J.R.R. Martin', '500', 'not read yet')
const Linchpin = new addBook('Linchpin: How to be Indispensible', 'Seth Godin', '200', 'Read many times.')