import React from 'react';
import { Form, Button } from 'react-bootstrap'

class UpdateForm extends React.Component {

  handleUpdateBook = (e)=>{
    e.preventDefault();
    let bookToUpdate = {
      title: e.target.title.value || this.props.bookToUpdate.title,
      description: e.target.description.value || this.props.bookToUpdate.description,
      status: e.target.status.checked || this.props.bookToUpdate.status,
      _id: this.props.bookToUpdate._id,
      __v: this.props.bookToUpdate.__v
    }
    this.props.updateBooks(bookToUpdate);
    this.props.handleOnHide();
  }

  render() {
    return (
      <Form onSubmit={this.handleUpdateBook}>
        <Form.Group>
          <Form.Label>Book Title</Form.Label>
          <Form.Control name="title" type="text" placeholder={this.props.bookToUpdate.title}/>
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" type="text" placeholder={this.props.bookToUpdate.description}/>
          <Form.Check name="status" type="checkbox" label="Status"/>
        </Form.Group>
        <Button type="submit">Update Book</Button>
      </Form>
    )
  }
}

export default UpdateForm;
