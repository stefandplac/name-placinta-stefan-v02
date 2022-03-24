import React, { Component } from 'react'

export default class MiniDisplayColors extends Component {
    render() {
      const divStyle={
          backgroundColor:`${this.props.color}`,
       }
      return (
     <>
      {this.props.selectedAtt.filter((item)=>item.id===this.props.attributeId && item.value===this.props.value).length>0? (
        
           <div style={divStyle} className={this.props.classSelected} key={this.props.attributeId}></div>
      ) : (
          <div style={divStyle} className={this.props.classUnselected} key={this.props.attributeId} ></div>
      ) 
      }
        
     </>
     
    )
  }
}
