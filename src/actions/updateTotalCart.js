import * as actions from '../actionTypes/types';
 
export const updateTotalCart=(cartContent)=>(dispatch)=> {
    let total={};
    let qty=0;
    let amountX=0;
    let symbol=cartContent[0]?.price.currencySymbol;
    let label=cartContent[0]?.price.currencyLabel;
    for(let i=0;i<cartContent.length;i++){
            amountX +=cartContent[i].price.amount;
            qty +=cartContent[i].quantity;
          
    };
    total={
      amount:amountX.toFixed(2),
      currencyLabel:label,
      currencySymbol:symbol,
    }
 
    dispatch({type:actions.UPDATE_TOTAL_CART,
              totalCart:total,
              totalQty:qty,
     })
}
