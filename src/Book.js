import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'

class Book extends Component{
  render(){
    return(
      <Carousel.Item>
        <img
        src="https://via.placeholder.com/300"
        alt="placeholder"
        />
        <Carousel.Caption>
          <h3>this.props.title</h3>
          <p>this.props.desc</p>
        </Carousel.Caption>
      </Carousel.Item>
    )
  }
}

export default Book;
