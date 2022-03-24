import * as actions from '../actionTypes/types';

export const addToCart=(product,totalP)=>(dispatch)=>{
    dispatch({type:actions.ADD_TO_CART,
               newProduct:product,
               total:totalP                
    })
} 
 

export const updateCurrencyLabel=(curLabel, curSymbol)=>(dispatch)=>{
    dispatch({type:actions.UPDATE_CURRENCY_LABEL,
              currencyLabel:curLabel,
              currencySymbol:curSymbol,
    })
}


