const library = [];
let formOpen = false;
let editIndex = 0;

const grid = document.querySelector('.library');
const newbtn = document.querySelector('#new');
const formDiv = document.querySelector('#formDiv');
const form = document.querySelector('#bkForm');
const overlay = document.querySelector('#overlay');
const addBookBtn = document.querySelector('#bkForm');
const errorPG = document.querySelector('#errorPG');
const errorPR = document.querySelector('#errorPR');
const editSubmit = document.querySelector('#editSubmit');
const editPR = document.querySelector('#editPR');
const editDiv = document.querySelector('.editDiv');

newbtn.addEventListener('click', () => {
  openForm();
});
overlay.addEventListener('click', () => {
  closeForm();
});
addBookBtn.addEventListener('submit', (e) => {
  e.preventDefault();
  let pr = document.forms['bkForm']['pagesRead'].value;
  let pg = document.forms['bkForm']['bookPages'].value;
  if (pg < pr) {
    errorPR.innerHTML = 'Pages read cannot be greater than book pages!';
    return;
  }
  createBook();
});

function Book(title, author, pages, pagesRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.pagesRead = pagesRead;
}

function displayLib() {
  for (let i = 0; i < library.length; i++) {
    let card = document.createElement('div');
    card.classList.toggle('cards');
    formatBookDisplay(library[i], card);
    grid.appendChild(card);
  }
}

function formatBookDisplay(book, card) {
  let dTitle = document.createElement('p');
  dTitle.innerHTML = `TITLE: ${book.title}`;
  card.appendChild(dTitle);
  let dAuthor = document.createElement('p');
  dAuthor.innerHTML = `AUTHOR: ${book.author}`;
  card.appendChild(dAuthor);
  let dPagesRead = document.createElement('p');
  dPagesRead.innerHTML = `PAGES READ: ${book.pagesRead}`;
  card.appendChild(dPagesRead);
  let dPages = document.createElement('p');
  dPages.innerHTML = `PAGES: ${book.pages}`;
  card.appendChild(dPages);
  let btnDiv = document.createElement('div');
  let pgValue = document.createElement('button');
  let rmBook = document.createElement('button');
  rmBook.setAttribute('onclick', 'deleteBook(this)');
  pgValue.setAttribute('onclick', 'displayEdit(this)');
  btnDiv.classList.toggle('bookbtn');
  pgValue.innerHTML = 'Read';
  rmBook.innerHTML = 'Remove';
  btnDiv.appendChild(pgValue);
  btnDiv.appendChild(rmBook);
  card.appendChild(btnDiv);
}

function openForm() {
  formDiv.setAttribute('style', 'display: flex');
  overlay.setAttribute('style', 'display:flex');
  formOpen = true;
}

function closeForm() {
  formDiv.setAttribute('style', 'display: none');
  overlay.setAttribute('style', 'display:none');
  editDiv.setAttribute('style', 'display: none');
  formOpen = false;
  form.reset();
  editPR.value = '';
}

function createBook() {
  let n = document.forms['bkForm']['bookName'].value;
  let a = document.forms['bkForm']['author'].value;
  let pr = document.forms['bkForm']['pagesRead'].value;
  let pg = document.forms['bkForm']['bookPages'].value;
  let newBk = new Book(n, a, pg, pr);
  library.push(newBk);
  closeForm();
  deleteOld();
  displayLib();
}

function deleteOld() {
  let allCards = document.querySelectorAll('.cards');
  for (let i = 0; i < allCards.length; i++) {
    allCards[i].remove();
  }
}

function deleteBook(a) {
  let bookEle = a.parentNode.parentNode;
  let eleTitle = bookEle.firstChild.innerHTML;
  for (let i = 0; i < library.length; i++) {
    let temp = `TITLE: ${library[i].title}`;
    if (temp === eleTitle) {
      library.splice(i, 1);
    }
  }
  deleteOld();
  displayLib();
}

function displayEdit(a) {
  editDiv.setAttribute('style', 'display: flex');
  overlay.setAttribute('style', 'display:flex');
  let bookEle = a.parentNode.parentNode;
  let eleTitle = bookEle.firstChild.innerHTML;
  for (let i = 0; i < library.length; i++) {
    let temp = `TITLE: ${library[i].title}`;
    if (temp === eleTitle) {
      editIndex = i;
      editPR.setAttribute('placeholder', `${library[i].pagesRead}`);
    }
  }
}

function editPages() {
  if (editPR.value <= library[editIndex].pagesRead) {
    errorPG.innerHTML = 'New pages read cant be less than previous';
    editPR.value = '';
    return;
  }
  if (editPR.value > library[editIndex].pages) {
    errorPG.innerHTML = 'Pages read cant be higher than pages';
    editPR.value = '';
    return;
  }
  library[editIndex].pagesRead = editPR.value;
  deleteOld();
  displayLib();
  closeForm();
}
