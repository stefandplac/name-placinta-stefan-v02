import React, { Component } from 'react'

export default class NavigationCategory extends Component {
  render() {
    
    return (
      <>
           {this.props.catName===this.props.categoryF ?(
               <div className="navigationItem navigationItem-selected" onClick={()=>{this.props.updateCategoryFilter(this.props.catName)}}>{this.props.catName}</div>
           ):(
            <div className="navigationItem" onClick={()=>{this.props.updateCategoryFilter(this.props.catName)}}>{this.props.catName}</div>
           )
        } 
      </>
    )
  }
}
