import React, { Component } from 'react';
import parse from 'html-react-parser';
import { connect } from 'react-redux';
import DisplayColors from './DisplayColors';
import DisplayAttribute from './DisplayAttribute';
import {addToCart} from '../actions/actions';
import {updateProductQty} from '../actions/updateProductQty';


class ProductInfo extends Component {
    constructor(props){
        super(props);
        this.state={
            pAttributes:[],
            quantity:1,
            attributesOK:true,
           
            
        }
    }
    componentDidMount(){
        this.setState({pAttributes:[]});
        
    }
    componentDidUpdate(){
  
    }
    updateAtrribute=(id, value)=>{
        let attributesList=[];
        attributesList = [...this.state.pAttributes];
        let y ={
            id:id,
            value:value,
        };
        
        
        if(attributesList.filter((item)=>item.id===id).length===0){
            attributesList.push(y);
            this.setState({pAttributes:attributesList});
             if(this.props.product.attributes.length===attributesList.length){
                this.setState({attributesOK:true});
            }
           
            return;
            
        }
        else {
           for(let m=0;m<attributesList.length;m++){
              if(attributesList[m].id===id){
                  attributesList[m].value=value;
                  this.setState({pAttributes:attributesList});
              }
           }
           
        }
        
     
    }  
    addToCart=()=>{
        //checking if all attributes have been selected before adding the product to the cart
        let p={};
        let  allCartContent=[...this.props.cartContent];
        if(this.props.product.attributes.length===this.state.pAttributes.length)
        {
        
         p ={
            name:this.props.product.name,
            photo:this.props.product.gallery[0],
            quantity:this.state.quantity,
            brand:this.props.product.brand,
            price:{
                amount:this.props.product.prices?.filter((price)=>price.currency.label===this.props.currencyLabel)[0].amount,
                currencyLabel:this.props.product.prices?.filter((price)=>price.currency.label===this.props.currencyLabel)[0].currency.label,
                currencySymbol:this.props.product.prices?.filter((price)=>price.currency.label===this.props.currencyLabel)[0].currency.symbol,
            }, 
            gallery:[...this.props.product.gallery],
            attributes:this.state.pAttributes,
            allAttributes:[...this.props.product.attributes],
            allPrices:[...this.props.product.prices],
         };
       
       
        if(allCartContent.filter((item)=>item.name===this.props.product.name).length===0){
                    allCartContent.push(p);
                   this.props.addProduct(allCartContent);

                   //reset all locall state values to default values
                   this.setState({ 
                    pAttributes:[],
                    quantity:1,
                   
                });
                   return;
        }
        else {
            
            for(let w=0;w<allCartContent.length;w++){
                let r=0;
                if(allCartContent[w].name===this.props.product.name)
                {
                    for(let i=0;i<allCartContent[w].attributes.length;i++)
                    {
                        for(let j=0;j<this.state.pAttributes.length;j++)
                        {
                            if(allCartContent[w].attributes[i].id===this.state.pAttributes[j].id)
                            {
                                if(allCartContent[w].attributes[i].value===this.state.pAttributes[j].value)
                                {
                                   r=r+1;
                                   if(r===this.state.pAttributes.length){
                                       //case in which we cheked all the attributes and the product exists in the cart with the same identical attributes
                                       //we will update the quantity in the cart
                                       let qty = this.state.quantity;
                                       this.props.updateQty(w, this.props.cartContent,qty);
                                       this.setState({ 
                                        pAttributes:[],
                                        quantity:1,
                                       });                       
                                       return;



                                   }
                                }
 
                            }
                        }
                    }
                }
               
            }
            allCartContent.push(p);
            this.props.addProduct(allCartContent);
            this.setState({ pAttributes:[], quantity:1});
            
        }
            
        

       
    }
    else {
        this.setState({attributesOK:false});
        return;
         }
    }

    increaseQ=()=>{
        let x= this.state.quantity+1;
        this.setState({quantity:x});

    }
    decreaseQ=()=>{
        if(this.state.quantity===1){
            this.setState({quantity:1});
            return;
        }{
            let x = this.state.quantity - 1;
            this.setState({quantity:x});
        }

    }
    changeBtnBack=(event)=>{
        event.target.className==="addToCartDown" ? event.target.className="addToCartButton" : event.target.className="addToCartDown";
    }
   
    changeBtnBack2=(event)=>{
        event.target.className==="bigQuantityPDown" ? event.target.className="bigQuantityP" : event.target.className="bigQuantityPDown";
    }
    
   
  render() {
    
   
    return (
      <div className="productInfoContainer" >
          <div className="productInfoTitle">
              {this.props.product.name}
             
          </div>
          <div className='bigPBrand'>
               {this.props.product.brand}
          </div>
          <div className="">
              {this.props.product.attributes?.map((attribute)=>(
                  <div key={attribute.name}>
                  
                    <div className="attributeName" > {attribute.name} :</div>
                    
                    {attribute.name==="Color" ? ( 
                          <div className="productInfoAttributeBox"> 
                             {attribute.items?.map((item)=>(
                                 
                                 <DisplayColors  updateAttribute={this.updateAtrribute} attSelected={this.state.pAttributes} key={item.id} color={item.value} attributeId={attribute.id} value={item.displayValue} inStock={this.props.product.inStock}/>                 
                              
                        
                             ))}
                          </div>
                    ) 
                    :(
                             <div className="productInfoAttributeBox"> 
                                {attribute.items?.map((item)=>(
                                
                                <DisplayAttribute  updateAttribute={this.updateAtrribute} attSelected={this.state.pAttributes} key={item.id} value={item.value} attributeId={attribute.id} item={item} inStock={this.props.product.inStock}/>             
                                
                        
                             ))}
                          </div>


                    ) }
                   </div>
             ))}
          </div>
          <div className="productInfoPriceBox">
               
              <div className="priceLabel">PRICE:</div>
              <div className="priceContent">{`${this.props.product.prices?.filter((price)=>price.currency.label===this.props.currencyLabel)[0].currency.symbol} ${this.props.product.prices?.filter((price)=>price.currency.label===this.props.currencyLabel)[0].amount}`}</div>
              {this.props.product.inStock? (
                  <div></div>
              ):(
                  <div className="outOfStockDiv" >Out of stock</div>
              )}   

              {this.state.attributesOK? (
                  <div></div>
              ):(
                  <div className="selectWarning" >You need to select all product options before adding it to cart</div>
              )}           
              
          </div>
          <div className="quantityBox">
               <div className="priceLabel" >QUANTITY:</div>
              {this.props.product.inStock? (
                  <>
                    <button className="bigQuantityP" onClick={this.decreaseQ} onMouseDown={this.changeBtnBack2} onMouseUp={this.changeBtnBack2}>-</button>
                    <div className="bigQuantityInput" name="quantity" id="quantity">{this.state.quantity} </div>
                    <button className="bigQuantityP" onClick={this.increaseQ} onMouseDown={this.changeBtnBack2} onMouseUp={this.changeBtnBack2}>+</button> 
                    
                   

                  </>
               ) : (
               <>
                   <button className="quantityP" >-</button>
                    <input type="number" id="otherI" className="quantityInput"   />
                    <button className="quantityP" >+</button>
               </>
              )}  
          </div>
          <div className="">
              {this.props.product.inStock? (
              <button className="addToCartButton" id="addToCartPD" onClick={this.addToCart} onMouseDown={this.changeBtnBack} onMouseUp={this.changeBtnBack}>Add to cart</button>
              ) : (
                <button className="addToCartButton addToCartButton-notInStock">Add to cart</button>
              )
            }
          </div>
          <div className="productDescription">
            {parse(`${this.props.description}`)}
        </div>
        
      </div>
    )
  }
}
const mapStateToProps=(state)=>{
    return{
        currencyLabel: state.dataR.currencyLabel,
        cartContent:state.cartR.cartProducts,
        totalCart:state.cartR.total,
       
        
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        addProduct:(p)=>{dispatch(addToCart(p))},
        updateQty:(index,cartP, qty)=>{dispatch(updateProductQty(index,cartP,qty))},
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductInfo);