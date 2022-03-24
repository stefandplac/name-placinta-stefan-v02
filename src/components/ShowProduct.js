import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {addToCart} from '../actions/actions';
import { updateProductQty } from '../actions/updateProductQty';
import * as q from '../queries/queries';
import {client} from '../apollo/apollo';

class ShowProduct extends Component{
    constructor(props){
        super(props);
        this.state={
            cartIcon:'hidden',
            product:{}
        } 
    }
    fetchProduct= async()=>{
        await client.resetStore();
        await client.query({ 
                            query:q.GET_PRODUCT,
                          variables:{productId: this.props.product.id}
                        })
                        .then((response)=>{
                                            this.setState({product:response.data.product});
                         })
                        .catch((err)=> {
                          this.setState({error:err.message});
                          console.log(this.state.error);
                        });
      }
      
    
    addToCart=async ()=>{
        //we will add product to the cart with predefined attributes
        await this.fetchProduct();
        console.log(this.state.product);
       console.log(`${this.props.product.id} id-ul transmis`);
        
        let p={};
        let  allCartContent=[...this.props.cartContent];
        
        let defaultAttributes =[];
        let attribute = {};
        for (let q=0;q<this.state.product.attributes.length;q++){
            attribute= {
                id:this.state.product.attributes[q].id,
                value:this.state.product.attributes[q].id==="Color" ? this.state.product.attributes[q].items[0].displayValue:this.state.product.attributes[q].items[0].value,
            }; 
            defaultAttributes.push(attribute);
        };
        console.log(defaultAttributes);
        
         p ={
            name:this.state.product.name,
            photo:this.state.product.gallery[0],
            quantity:1,
            brand:this.state.product.brand,
            price:{
                amount:this.state.product.prices?.filter((price)=>price.currency.label===this.props.currencyLabel)[0].amount,
                currencyLabel:this.state.product.prices?.filter((price)=>price.currency.label===this.props.currencyLabel)[0].currency.label,
                currencySymbol:this.state.product.prices?.filter((price)=>price.currency.label===this.props.currencyLabel)[0].currency.symbol,
            },
            gallery:[...this.state.product.gallery],
            attributes:[...defaultAttributes],
            allAttributes:[...this.state.product.attributes],
            allPrices:[...this.state.product.prices],
         };
       
       
        if(allCartContent.filter((item)=>item.name===this.state.product.name).length===0){
                    allCartContent.push(p);
                   this.props.addProduct(allCartContent);

                   return;
        }
        else {
            
            for(let w=0;w<allCartContent.length;w++){
                let r=0;
                if(allCartContent[w].name===this.state.product.name)
                {
                    for(let i=0;i<allCartContent[w].attributes.length;i++)
                    {
                        for(let j=0;j<defaultAttributes.length;j++)
                        {
                            if(allCartContent[w].attributes[i].id===defaultAttributes[j].id)
                            {
                                if(allCartContent[w].attributes[i].value===defaultAttributes[j].value)
                                {
                                   r=r+1;
                                   if(r===defaultAttributes.length){
                                       //case in which we cheked all the attributes and the product exists in the cart with the same identical attributes
                                       //we will update the quantity in the cart
                                       let qty = 1;
                                       this.props.updateQty(w, this.props.cartContent,qty);
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
           
           
        }
        
        
    }




    
    render(){
        
        return(
           
             <div className={this.props.classN} onMouseEnter={()=>{this.setState({cartIcon:"visible"})}}  onMouseLeave={()=>{this.setState({cartIcon:"hidden"})}}> 
                       <div className="productImageContainer">
                             <Link to={`/product/${this.props.product.id}`} className="linkStyle">
                             
                                 <img className="productImage" src={this.props.product.gallery[0]} alt=""></img>
                                 </Link>
                       </div>
                       
                        
                        <div className="cardTitlePrice">
                            <div className="cardTitle">
                                <> {this.props.product.name} </>
                                
                            </div>
                            <div className="productCartIconDiv"  onClick={this.addToCart} >
                                {this.props.product.inStock===true ? (
                                     <img src='img/cart-icon.svg' alt="" className="productCartIcon" style={{visibility:`${this.state.cartIcon}`}}/>
                                ):(<></>)}
                           </div>
                        </div>
                        <div className="cardPriceBox"> 
                            {`${this.props.product.prices.filter((price)=>price.currency.label===this.props.currencyLabel)[0].currency.symbol}
                              ${this.props.product.prices.filter((price)=>price.currency.label===this.props.currencyLabel)[0].amount}`}
                           
                        </div>
                        <>
                         {this.props.product.inStock===false? (<img className="outofstockImg" src="img/outofstock.svg" alt=""/>)
                         :(<></>)}
                       </>
                       
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
export default connect(mapStateToProps,mapDispatchToProps)(ShowProduct);