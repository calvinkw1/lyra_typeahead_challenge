import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Lyra Typeahead Challenge</h2>
        </div>
        <div className="input-field">
          <p>
            <input type="text" onKeyUp={ getBooks } autoFocus />
          </p>
          <div id="results"></div>
        </div>
      </div>
    );
  }
}

function getBooks() {
  let input = document.getElementsByTagName("input")[0].value;
  let booksArray = [];
  makeRequest(input).then((result) => {
    for (let i = 0; i < result.length; i++) {
      let book = {
        title: result[i].volumeInfo.title,
        authors: result[i].volumeInfo.authors
      }
      booksArray.push(book);
    }
    createBookElement(booksArray);
  });
  
}

function makeRequest(input) {
  const url = "https://www.googleapis.com/books/v1/volumes?q=" + input + "&maxResults=5"
  return fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data.items;
    })
    .catch(function(ex) {
    console.log("Error", ex)
  })
}

function createBookElement(books) {
  console.log(books);
  let booksList = books.map((book) =>
      <ul>{book.title}, {book.authors} </ul>
    )
  ReactDOM.render(
    <div>{booksList}</div>,
    document.getElementById('results')
  );
}

export default App;
