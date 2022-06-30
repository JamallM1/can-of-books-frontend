import React from 'react';
import { Carousel, Button } from 'react-bootstrap'
import UpdateForm from './UpdateForm';

class Books extends React.Component {
  render() {
    this.props.books.map(book=>(
      <Book
      book={book}
      key={book._id}
      deleteBooks={this.props.deleteBooks}
      ></Book>
    ))

    let bookCarousel = this.props.books.map(book=>{
      return(
        <Carousel.Item key={book._id}>
          <img
            src="https://via.placeholder.com/300"
            alt="placeholder"
          />
          <Carousel.Caption>
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <Button onClick={()=>this.props.handleClickUpdate(book)}>Edit</Button>
            <Button variant="danger" onClick={() => this.props.deleteBooks(book._id)}>Delete</Button>
          </Carousel.Caption>
        </Carousel.Item>
      )
    });

    return (
      <Carousel>
        {bookCarousel}
      </Carousel>
    )
  }
}

class Book extends React.Component {
  render(){
    return(
      <UpdateForm
      book={this.props.book}
      ></UpdateForm>
    )
  }
}

export default Books;
