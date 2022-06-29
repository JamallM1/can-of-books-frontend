import React from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Carousel from 'react-bootstrap/Carousel'
import { Button, Modal, Form } from 'react-bootstrap';
import Book from './Book'

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      displayForm: false
    }
  }
  handleBookSubmit = (e) => {
    e.preventDefault();
    let newBook = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.checked
    }
    this.postBooks(newBook)
  }
  handleClick = () => {
    this.setState({
      displayForm: true
    })
  }
  handleOnHide =() => {
    this.setState({
      displayForm: false
    })
  }
  postBooks = async (newBookObj) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books`;
      let createdBook = await axios.post(url, newBookObj);

      this.setState({
        books: [...this.state.books, createdBook.data]
      });
    } catch (error) {
      console.log('we have an error creating books: ', error.response.data);
    }
  }

  getBooks = async () => {
    try {
      let results = await axios.get(`${process.env.REACT_APP_SERVER}/books`);
      this.setState({
        books: results.data
      })
    } catch (error) {
      console.log('we have an error getting books', error.response.data);
    }
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {
    console.log(this.state.displayForm);
    let books = this.state.books.map(book => {
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
        )
        }
        <Button onClick={this.handleClick}>
          Add Book
        </Button>
        {/* {this.state.displayForm ?( */}
          <>
            <Modal as ="modal" show={this.state.displayForm} onHide={this.handleOnHide}>
              <Modal.Header closeButton>
                <Modal.Title>
                  Add Book
                </Modal.Title>
                <Modal.Body>
                  <Form>
                    <Form.Group>
                      <Form.Label>Book Title</Form.Label>
                      <Form.Control type="text" placeholder="title" />
                      <Form.Label>Description</Form.Label>
                      <Form.Control type="text" placeholder="Description" />
                      <Form.Check type="checkbox" label="Status" />
                    </Form.Group>
                    <Button type="submit">Add Book</Button>
                  </Form>
                </Modal.Body>
              </Modal.Header>
            </Modal>
          </>
          {/* ): ('')} */}
      </>
    );
  }
}

export default BestBooks;
