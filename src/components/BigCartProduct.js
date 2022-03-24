import React, { Component } from 'react';
import MiniDisplayColors from './MiniDisplayColors';
import MiniDisplayAttribute from './MiniDisplayAttribute';
import { connect } from 'react-redux';
import {updateProductQty} from '../actions/updateProductQty';
import {deleteProduct} from '../actions/deleteProduct';
import DisplayAttributeText from './DisplayAttributeText';


class BigCartProduct extends Component {
    constructor(props){
        super(props);
        this.state={
            photo:this.props.product.photo,
            idx:0,
       
        }
    }
    swapPhoto=(event)=>{
        let x=this.state.idx;
        let gLength = this.props.product.gallery.length-1;
        
        if(event.target.id ==="swapLeft") {
            if(this.state.idx === 0 ) {
                this.setState({idx:gLength}); 
                
                return;
               
            } 
            x= x-1;
             this.setState({idx: x});
             return;
            
        } else  {
            if (this.state.idx ===gLength) {
                    this.setState({idx:0});  
                    
                return;        
            }
            x=x+1;
            this.setState({idx:x});
            return;
        }
    }
   
    
    updateQuantity=(event)=>{
        //here we will update the quantity in the store in cart product list or delete the product if quantity reach 0
        //we know the position of the product by index
        if(event.target.id==="increaseBtn"){
            let x = 1;
              this.props.updateProductQty(this.props.index,this.props.cartProducts,x);
        }
        else {
            
            let x = -1;
            if((this.props.product.quantity-1)===0){
                this.props.deleteProduct(this.props.index, this.props.cartProducts);
                this.setState({idx:0});
                
            }
            else{
                this.props.updateProductQty(this.props.index, this.props.cartProducts,x);
            }
     
        }
       
    }
    changeBtnBack=(event)=>{
        event.target.className==="bigQuantityPDown" ? event.target.className="bigQuantityP" : event.target.className="bigQuantityPDown";
    }
    
   
  render() {
    return (
       
    <div className="bigCartContainer">
      <div className="bigCartBoxCol">
              <div className="bigCartPTitle">
                  {this.props.product.name}
              </div>
              <div className="productBrand">
                 {this.props.product.brand}
              </div>
              <div className="bigPPrice">
                  {`${this.props.product.price.currencySymbol} ${this.props.product.price.amount}`}
              </div>
              <div className="attributeBottom">
                    {this.props.product.allAttributes?.map((attribute)=>(
                        <div key={attribute.name}>
                        {(attribute.items[0].displayValue==="Yes"||attribute.items[0].displayValue==="No") ? (
                               
                                <>
                                <div className="maxAttributeName">{attribute.name}</div>
                                <div className="miniAttributeTextBox maxAtt" >
                                {attribute.items?.map((item, index)=>(
                                    <DisplayAttributeText selectedAtt={this.props.product.attributes} key={index} color={item.value} attributeId={attribute.id} value={item.displayValue} classSelected="attributeBox attributeBox-selected" classUnselected="attributeBox"/>
                                ))}
                                </div>
                                </>
                                
                        )            
                         :  attribute.name==="Color" ? ( 
                                <div className="bigPAttributeBox"> 
                                    {attribute.items?.map((item)=>(
                                         <MiniDisplayColors   selectedAtt={this.props.product.attributes} key={item.id} color={item.value} attributeId={attribute.id} value={item.displayValue} classSelected="colorBox colorBox-selected" classUnselected="colorBox"/>                 
                                     ))}
                                 </div>
                          )     
                          :(
                                <div className="bigPAttributeBox"> 
                                    {attribute.items?.map((item)=>(
                                         <MiniDisplayAttribute   selectedAtt={this.props.product.attributes} key={item.id} value={item.value} attributeId={attribute.id} item={item} classSelected="attributeBox attributeBox-selected" classUnselected="attributeBox"/>             
                                    ))}
                                </div>
                           ) } 
                         </div>
                    ))}
              </div>
      </div>
      <div className="bigCartBoxRow">
              
              <div className="bigCartQuantityBox">
                    <div className="bigQuantityP" id="increaseBtn" onClick={this.updateQuantity} onMouseDown={this.changeBtnBack} onMouseUp={this.changeBtnBack}>+</div>
                    <div className="bigQuantityInput" name="quantity">{this.props.product.quantity} </div> 
                    <div className="bigQuantityP" id="decreaseBtn" onClick={this.updateQuantity} onMouseDown={this.changeBtnBack} onMouseUp={this.changeBtnBack}>-</div>
              </div>
              <div className="bigCartPhotoContainer">
                     <div style={{backgroundImage:`url(${this.props.product.gallery[this.state.idx]})`}} className="bigCartPhotoDisplayX">
                        {this.props.product.gallery.length>1 ? (
                            <>
                            <div className="swapLeft" id="swapLeft" onClick={this.swapPhoto}>
                                <div>{`<`}</div>
                            </div>
                            <div className="swapRight" id="swapRight" onClick={this.swapPhoto}>
                                {`>`}
                            </div>
                            </>
                        ) 
                        :(
                            <></>

                        )}
                        
                        
                     </div>
              </div>
      </div>
      
    </div>
   

    ) 
  }
}
const mapStateToProps=(state)=>{
    return{
        cartProducts:state.cartR.cartProducts,
        totalPrice:state.cartR.total,
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
         updateProductQty:(index,cartP,qty)=>{dispatch(updateProductQty(index,cartP,qty))},
         deleteProduct:(index,cartP,qty)=>{dispatch(deleteProduct(index,cartP,qty))},
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BigCartProduct);
