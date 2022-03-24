import React, { Component } from 'react'

export default class DisplayBig extends Component {
  render() {
    return (
      <div className="displayBigImageContainer">
          <img src={this.props.source} className="displayBigImage" alt=""></img>
         
      </div>
    )
  } 
}
