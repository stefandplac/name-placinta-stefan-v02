import React, { Component } from 'react';
import {connect} from 'react-redux';
import BigCartProduct from '../components/BigCartProduct';

class Cart extends Component {
  
  render() {
    
    return (
      <>
      {this.props.cartContent.length<1 ? (
        <div>
        <h1>CART</h1>
        
        <div><h2 className="emptyCartWarning" >Your cart is empty , please add some products 
        <img src="img/Smiley.png" className="cartEmptySmile"  alt=""/>
        </h2>
        
        </div>
        </div>
      ):(
      <div className="cartPage">
        <div className="cartPageTitle">
            <h1>CART</h1>
           
        </div>
        
        <div className="cartPageContent">
        {this.props.cartContent.map((product,index)=>(
               <BigCartProduct key={index} product={product} index={index}/>
         ))}
        </div>
        <div className="totalCartBox" >
              <div>Total &nbsp;</div>
              <div className="">
                {`   ${this.props.totalPrice?.currencySymbol}${this.props.totalPrice?.amount}`}
                <br/> 
                <br/>
              </div>
       </div> 
      </div>
      )}
      </>
    )
  }
}
const mapStateToProps=(state)=>{
  return{
    cartContent:state.cartR.cartProducts,
    totalPrice:state.cartR.total,

  }
}
const mapDispatchToProps=(dispatch)=>{
  return{

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
