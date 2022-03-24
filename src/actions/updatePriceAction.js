import * as actions from '../actionTypes/types';



export const updatePriceAction=(cartProducts, currencyLabel)=>(dispatch)=>{
  
    let newProductList=[];
    let newP={}; 
    
    for(let i=0;i<cartProducts.length;i++){
        newP ={
            name:cartProducts[i].name,
            photo:cartProducts[i].photo,
            quantity:cartProducts[i].quantity,
            price:{
                amount:cartProducts[i].allPrices?.filter((price)=>price.currency.label===currencyLabel)[0].amount,
                currencyLabel:cartProducts[i].allPrices?.filter((price)=>price.currency.label===currencyLabel)[0].currency.label,
                currencySymbol:cartProducts[i].allPrices?.filter((price)=>price.currency.label===currencyLabel)[0].currency.symbol,
            },
            attributes:[...cartProducts[i].attributes],
            allAttributes:[...cartProducts[i].allAttributes],
            allPrices:[...cartProducts[i].allPrices],
            gallery:[...cartProducts[i].gallery],
         };
         newProductList.push(newP);
    }
    
    //this.props.product.prices?.filter((price)=>price.currency.label===this.props.currencyLabel)[0].amount
    /*
    cartProducts.map((product)=>{
        newP ={
            name:product.name,
            photo:product.photo,
            quantity:product.quantity,
            price:{
                amount:product.allPrices?.filter((price)=>price.currency.label===currencyLabel)[0].amount,
                currencyLabel:product.allPrices?.filter((price)=>price.currency.label===currencyLabel)[0].currency.label,
                currencySymbol:product.allPrices?.filter((price)=>price.currency.label===currencyLabel)[0].currency.symbol,
            },
            attributes:[...product.attributes],
            allAttributes:[...product.allAttributes],
            allPrices:[...product.allPrices],
            gallery:[...product.gallery],
         };
         newProductList.push(newP);
    });*/


    dispatch({type:actions.UPDATE_PRICE_IN_CART,
              cartList: newProductList,
    });
}