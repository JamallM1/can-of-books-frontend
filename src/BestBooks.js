import React from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Carousel from 'react-bootstrap/Carousel'
import { Button, Modal, Form } from 'react-bootstrap';

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
    this.postBooks(newBook);
  }
  handleClick = () => {
    this.setState({
      displayForm: true
    })
  }
  handleOnHide = () => {
    this.setState({
      displayForm: false
    })
  }
  postBooks = async (newBookObj) => {
    console.log(newBookObj);
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
    let books = this.state.books.map(book => {
      return (
        <Carousel.Item key={book._id}
        >
          <img
            src="https://via.placeholder.com/300"
            alt="placeholder"
          />
          <Carousel.Caption>
            <h3>{book.title}</h3>
            <p>{book.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      )
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
          <Modal as="modal" show={this.state.displayForm} onHide={this.handleOnHide}>
            <Modal.Header closeButton>
              <Modal.Title>
                Add Book
              </Modal.Title>
              <Modal.Body>
                <Form onSubmit={this.handleBookSubmit}>
                  <Form.Group>
                    <Form.Label>Book Title</Form.Label>
                    <Form.Control name="title" type="text" placeholder="title" />
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="description" type="text" placeholder="Description" />
                    <Form.Check name="status" type="checkbox" label="Status" />
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
