import React, { Component } from 'react';
import {connect} from 'react-redux';
import MiniPDisplay from './MiniPDisplay';
import {Link} from 'react-router-dom';


class MiniCart extends Component {
  render() {
    
    return (
        
        

      <div className="minicartBox">
          <div className="minicartHeader" >
                {`My Bag  ${this.props.cartQuantity} items`} 
          </div>
          <div className="minicartContent" >
              <>
              {this.props.cartContent.map((product,index)=>(
                  <div key={index}>
                 
                       <MiniPDisplay  product={product} index={index}/>
                  
                  </div>
                  
              ))}
               
               
                       
            </>    
          </div>
          <div className="totalPrice">
              <div >Total &nbsp;</div>
              {this.props.cartContent.length<1 ?(<></>)
              :(<div >{`${this.props.totalPrice?.currencySymbol} ${this.props.totalPrice?.amount}`}</div>
              )}
          </div>
          <div className="minicartFooter" >
          <Link to="/cart" className="linkStyle" ><button className="minicartViewBag" >VIEW BAG</button></Link>
                 <button className="minicartCheckout" >CHECK OUT</button>
          </div> 
  
     </div>
     
    )
  }
}
const mapStateToProps=(state)=>{
    return{
        cartContent:state.cartR.cartProducts,
        totalPrice:state.cartR.total,
        cartQuantity:state.cartR.quantity,
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);