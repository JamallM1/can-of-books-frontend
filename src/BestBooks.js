import React from 'react';
import axios from 'axios';
import { Alert, Button, Modal, Form } from 'react-bootstrap';
import Books from './Books'
import UpdateForm from './UpdateForm';
import './BestBooks.css';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      displayForm: false,
      displayUpdate: false,
      bookToUpdate: null
    }
  }
  
  handleAddBook = (e) => {
    e.preventDefault();
    let newBook = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.checked
    }
    this.handleOnHide();
    this.postBooks(newBook);
  }

  handleClickAdd = () => {
    this.setState({
      displayForm: true
    })
  }

  handleClickUpdate = (book) => {
    this.setState({
      displayUpdate: true,
      bookToUpdate: book
    })
  }

  handleOnHide = () => {
    this.setState({
      displayForm: false,
      displayUpdate: false
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

  deleteBooks = async (id)=>{
    try{
      let url=`${process.env.REACT_APP_SERVER}/books/${id}`;
      await axios.delete(url);
      let updatedBooks=this.state.books.filter(book=>book._id !== id);
      this.setState({
        books: updatedBooks
      })
    }catch(error){
      console.log('we have an error deleting books: ', error.response.data);
    }
  }

  updateBooks = async (bookToUpdate) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books/${bookToUpdate._id}`;
      let updatedBook = await axios.put(url, bookToUpdate);
      let updatedBookArray = this.state.books.map(existingBook => {
        return existingBook._id === bookToUpdate._id
          ? updatedBook.data
          : existingBook
      });
      this.setState({
        books: updatedBookArray
      });
    } catch(error) {
      console.log('we have an error updating books: ', error.response.data);
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
    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        {this.state.books.length ? (
          <>
            <h2>Books</h2>
            <Books
            books={this.state.books}
            deleteBooks={this.deleteBooks}
            updateBooks={this.updateBooks}
            handleClickUpdate={this.handleClickUpdate}
            bookToUpdate={this.state.bookToUpdate}
            ></Books>
          </>
        ) : (
          <Alert variant="danger">Book collection empty.</Alert>
        )
        }
        <Button onClick={this.handleClickAdd}>
          Add Book
        </Button>
        <>
          <Modal as="modal" show={this.state.displayForm} onHide={this.handleOnHide}>
            <Modal.Header closeButton>
              <Modal.Title>
                Add Book
              </Modal.Title>
              <Modal.Body>
                <Form onSubmit={this.handleAddBook}>
                  <Form.Group>
                    <Form.Label>Book Title</Form.Label>
                    <Form.Control name="title" type="text" placeholder="title"/>
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="description" type="text" placeholder="Description"/>
                    <Form.Check name="status" type="checkbox" label="Status"/>
                  </Form.Group>
                  <Button type="submit">Add Book</Button>
                </Form>
              </Modal.Body>
            </Modal.Header>
          </Modal>
        </>
        <>
          <Modal as="modal" show={this.state.displayUpdate} onHide={this.handleOnHide}>
            <Modal.Header closeButton>
              <Modal.Title>
                Update Book
              </Modal.Title>
              <Modal.Body>
                <UpdateForm
                bookToUpdate={this.state.bookToUpdate}
                handleOnHide={this.handleOnHide}
                updateBooks={this.updateBooks}
                ></UpdateForm>
              </Modal.Body>
            </Modal.Header>
          </Modal>
        </>
      </>
    );
  }
}

export default BestBooks;
