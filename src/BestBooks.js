import React from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Carousel from 'react-bootstrap/Carousel'
import Book from './Book'

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  getBooks = async () =>{
  try{
    let results = await axios.get(`${process.env.REACT_APP_SERVER}/books`);
    this.setState({
      books: results.data
    })
  } catch(error){
    console.log('we have an error getting books', error.response.data)
  }
  }

  componentDidMount(){
  this.getBooks();
  }

  render() {    
    let books=this.state.books.map(book=>{
      return <Book
      key={book._id}
      title={book.title}
      desc={book.description}
      ></Book>
    });

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <>
            <h2>Books</h2>
            <Carousel>
              {books}
            </Carousel>
          </>
        ) : (
          <Alert variant="danger">Book collection empty.</Alert>
        )}
      </>
    )
  }
}

export default BestBooks;
