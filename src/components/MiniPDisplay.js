import React, { Component } from 'react';
import MiniDisplayAttribute from './MiniDisplayAttribute';
import MiniDisplayColors from './MiniDisplayColors';
import DisplayAttributeText from './DisplayAttributeText';
import {connect} from 'react-redux';
import {updateProductQty} from '../actions/updateProductQty';
import {deleteProduct} from '../actions/deleteProduct';

 class MiniPDisplay extends Component {
  updateQuantity=(event)=>{
    //here we will update the quantity in the store in cart product list or delete the product if quantity reach 0
    //we know the position of the product by index
    if(event.target.id==="increaseBtnMini"){
        let x = 1;
          this.props.updateProductQty(this.props.index,this.props.cartProducts,x);
    }
    else {
        
        let x = -1;
        if((this.props.product.quantity-1)===0){
            this.props.deleteProduct(this.props.index, this.props.cartProducts);
        }
        else{
            this.props.updateProductQty(this.props.index, this.props.cartProducts,x);
        }

    }
}
changeBtnBack=(event)=>{
  event.target.className==="miniQuantityPDown" ? event.target.className="miniQuantityP" : event.target.className="miniQuantityPDown";
}
  render() {
    return (
      <div className="miniPDislayContainer">
          <div className="miniPDisplayBoxCol">
              <div className="miniPTitle">
                  {this.props.product.name} <br/>
                 {this.props.product.brand}

              </div> 
              
              <div className="miniPPrice">
                  {`${this.props.product.price.currencySymbol} ${this.props.product.price.amount}`}
              </div>
              <div className="attributeBottom">
                    {this.props.product.allAttributes?.map((attribute)=>(
                        <div key={attribute.name}>
                         
                        {(attribute.items[0].displayValue==="Yes"||attribute.items[0].displayValue==="No") ? (
                                <>
                                <div className="miniAttributeName">{attribute.name}</div>
                                <div className="miniAttributeTextBox" >
                                {attribute.items?.map((item, index)=>(
                                    <DisplayAttributeText selectedAtt={this.props.product.attributes}  key={index} color={item.value} attributeId={attribute.id} value={item.displayValue} classSelected="miniAttBox miniAttBox-selected" classUnselected="miniAttBox"/>
                                ))}
                                </div>
                                </>
                        )            
                         :  attribute.name==="Color" ? ( 
                                <div className="miniPAttributeBox"> 
                                    {attribute.items?.map((item)=>(
                                         <MiniDisplayColors   selectedAtt={this.props.product.attributes} key={item.id} color={item.value} attributeId={attribute.id} value={item.displayValue} classSelected="miniColorBox-selected" classUnselected="miniColorBox"/>                 
                                     ))}
                                 </div>
                          )     
                          :(
                                <div className="miniPAttributeBox"> 
                                    {attribute.items?.map((item)=>(
                                         <MiniDisplayAttribute   selectedAtt={this.props.product.attributes} key={item.id} value={item.value} attributeId={attribute.id} item={item} classSelected="miniAttBox miniAttBox-selected" classUnselected="miniAttBox"/>             
                                    ))}
                                </div>
                           ) }
                         </div>
                    ))}
              </div>

          </div>
          <div className="miniPDisplayBoxRow">
                 <div className="miniPQuantityBox">
                    <div className="miniQuantityP" id="increaseBtnMini" onClick={this.updateQuantity} onMouseDown={this.changeBtnBack} onMouseUp={this.changeBtnBack}>+</div>
                    <div className="miniQuantityInput" name="quantity">{this.props.product.quantity} </div> 
                    <div className="miniQuantityP" id="decreaseBtnMini" onClick={this.updateQuantity} onMouseDown={this.changeBtnBack} onMouseUp={this.changeBtnBack}>-</div>

                 </div>
                 <div className="miniPPhotoContainer">
                        
                            <img src={this.props.product.photo} className="miniPPhotoBox" alt=""/>
                       
                 </div>
          </div>
        
      </div>
    )
  }
}
const mapStateToProps=(state)=>{
  return{
      cartProducts:state.cartR.cartProducts,
     
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
       updateProductQty:(index,cartP,qty)=>{dispatch(updateProductQty(index,cartP,qty))},
       deleteProduct:(index,cartP,qty)=>{dispatch(deleteProduct(index,cartP,qty))},
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MiniPDisplay);
