import React, { Component } from 'react'

export default class DisplayColors extends Component {
  updateSelectedAttribute=()=>{
    let value = this.props.value;
    let id = this.props.attributeId;
    this.props.updateAttribute(id, value);
    
  }
  render() {
      const divStyle={
          backgroundColor:`${this.props.color}`,
                      
      } 
      
    return (
      <>
      {this.props.inStock ? (
      <>
      {this.props.attSelected.filter((item)=>item.id===this.props.attributeId && item.value===this.props.value).length>0? (
        
        <div style={divStyle} className="colorBox colorBox-selected" key={this.props.attributeId}>
        
        </div>
      ) : (
        <div style={divStyle} className="colorBox " key={this.props.attributeId} onClick={this.updateSelectedAttribute}>
        
        </div>
      )
      }
        
     </>
     ):(
      <div style={divStyle} className="colorBox " >
        
      </div>
     )}
    </>
     
     
    )
  }
}
