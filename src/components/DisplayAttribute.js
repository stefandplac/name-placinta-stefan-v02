import React, { Component } from 'react'

export default class DisplayAttribute extends Component {
  
  updateSelectedAttribute=()=>{
    let value = this.props.value;
    let id = this.props.attributeId;
    this.props.updateAttribute(id, value);
   
  }

  render(){ 
        
    return (
      <>{this.props.inStock ? (
        <>
         {this.props.attSelected.filter((item)=>item.id===this.props.attributeId && item.value===this.props.value).length>0? (
           <div className="attributeBox attributeBox-selected" key={this.props.attributeId}>
                 {this.props.value}
           </div>
         ) : (
          <div className="attributeBox" key={this.props.attributeId} onClick={this.updateSelectedAttribute}>
                 {this.props.value}
          </div>
         )
         }
       </>
       ):(
        <div className="attributeBox attributeBox-unavailable" >
            {this.props.value}
        </div>
       )}
      </>
        
    )
  }
}
