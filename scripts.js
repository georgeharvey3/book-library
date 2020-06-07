let myLibrary = JSON.parse(localStorage.getItem("myLibrary") || "[]");

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    }

function addBookToLibrary (input) {
    title = input[0];
    author = input[1];
    pages = input[2];
    status = input[3];

    let entry = new Book(title, author, pages, status)

    myLibrary.push(entry)
}

//addBookToLibrary(['Crime and Punishment', 'Fyodor Dosdoevsky', 550, 'read'])
//addBookToLibrary(['East of Eden', 'John Steinbeck', 600, 'read'])
//addBookToLibrary(['Catch-22', 'Jospeh Heller', 650, 'read'])

function getFormData() {
  let title = document.getElementById("title");
  let author = document.getElementById("author");
  let pages = document.getElementById("pages");
  let status = document.getElementById("status");

  let values = [title.value, author.value, pages.value, status.value]

  if (values.some(e => !e)) {
    alert('Please fill all fields!')
    return null
  }

  addBookToLibrary([title.value, author.value, pages.value, status.value])

  collapse()

  title.value = '';
  author.value = '';
  pages.value = '';
  status.value = 'not-read';

  let cards = Array.from(document.getElementsByClassName('book-card'))
  let container = document.getElementById('books-box')
  cards.forEach(card => container.removeChild(card))

  for (let i=0; i<myLibrary.length; i++) {
    render(myLibrary[i].title,
           myLibrary[i].author,
           myLibrary[i].pages,
           myLibrary[i].status, i)
  }
}

let submitButton = document.getElementById('submit')
submitButton.addEventListener('click', getFormData)

function render (title, author, pages, status, index) {
  let container = document.getElementById('books-box')

  let card = document.createElement('div');
  card.classList.add('book-card');

  let cardHeader = document.createElement('div');
  cardHeader.classList.add('card-header');
  
  let cardTitle = document.createElement('h2')
  cardTitle.classList.add('card-title')
  cardTitle.textContent = title;

  let exitIcon = document.createElement('img');
  exitIcon.src = 'images/trash.png'
  exitIcon.classList.add('exit')
  exitIcon.dataset.indexElement = index;
  exitIcon.addEventListener('click', removeBook)

  cardHeader.appendChild(cardTitle)
  cardHeader.appendChild(exitIcon)
  
  card.appendChild(cardHeader)

  let cardAuthor = document.createElement('h3');
  cardAuthor.textContent = author;
  cardAuthor.classList.add('card-author')
  card.appendChild(cardAuthor)
  
  let cardPages = document.createElement('h4');
  cardPages.textContent = `${pages} pages`;
  cardPages.classList.add('card-pages')
  card.appendChild(cardPages)

  let cardStatus = document.createElement('div');
  cardStatus.id = 'status';

  if (status == 'not-read') {
    let notReadButton = document.createElement('img');
    notReadButton.src = 'images/book.png'
    notReadButton.classList.add('status-icon');
    notReadButton.classList.add('not-read-status');
    notRead.dataset.indexElement = index;
    notReadButton.addEventListener('click', changeStatus);

    cardStatus.appendChild(notReadButton)
  }
  
  if (status == 'reading') {
    let readingButton = document.createElement('img');
    readingButton.src = 'images/education.png'
    readingButton.classList.add('status-icon');
    readingButton.classList.add('reading-status');
    readingButton.dataset.indexElement = index;
    readingButton.addEventListener('click', changeStatus);

    cardStatus.appendChild(readingButton)
  }

  if (status == 'read') {
    let readButton = document.createElement('img');
    readButton.src = 'images/book.png'
    readButton.classList.add('status-icon');
    readButton.classList.add('read-status');
    readButton.dataset.indexElement = index;
    readButton.addEventListener('click', changeStatus);

    cardStatus.appendChild(readButton)
  }

  card.appendChild(cardStatus)

  container.appendChild(card)

  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));}

function removeBook () {
  let i = this.dataset.indexElement;
  if (myLibrary.length > 1) {
    myLibrary.splice(i, 1);
  } else {
    myLibrary = [];
  }

  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));

  let cards = Array.from(document.getElementsByClassName('book-card'))
  let container = document.getElementById('books-box')
  cards.forEach(card => container.removeChild(card))
  for (let i=0; i<myLibrary.length; i++) {
    render(myLibrary[i].title,
           myLibrary[i].author,
           myLibrary[i].pages,
           myLibrary[i].status, i)
  }
}

function changeStatus () {
  index = this.dataset.indexElement
  if (this.classList.contains('not-read-status')) {
    this.classList.remove('not-read-status');
    this.classList.add('reading-status');
    this.src = 'images/education.png';
    myLibrary[index].status = 'reading'
  } else if (this.classList.contains('reading-status')){
    this.classList.remove('reading-status');
    this.classList.add('read-status');
    this.src = 'images/book.png';
    myLibrary[index].status = 'read'
  } else if (this.classList.contains('read-status')){
    this.classList.remove('read-status');
    this.classList.add('not-read-status');
    this.src = 'images/book.png';
    myLibrary[index].status = 'not-read'
  }
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}


let statusIcons = Array.from(document.getElementsByClassName('status-icon'))
statusIcons.forEach(icon => icon.addEventListener('click', changeStatus));


function collapse () {
  coll.classList.toggle("active");

  let arrow = document.getElementById('arrow-icon')

  let content = coll.nextElementSibling;
  if (content.style.maxHeight){
    content.style.maxHeight = null;
    arrow.style.transform = "rotate(0deg)";
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
    arrow.style.transform = "rotate(-180deg)";
  }
}
let coll = document.getElementsByClassName("collapsible")[0];
coll.addEventListener("click", collapse)

for (let i=0; i<myLibrary.length; i++) {
  render(myLibrary[i].title,
         myLibrary[i].author,
         myLibrary[i].pages,
         myLibrary[i].status, i)
}