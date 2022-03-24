import * as actions from '../actionTypes/types';

export const cartR=(state={cartProducts:[], total:{ amount:0,currencyLabel:'',currencySymbol:'', quantity:0}}, action)=>{
    switch(action.type){
        case actions.ADD_TO_CART:
            return {cartProducts: [...action.newProduct], total:action.total}
        case actions.UPDATE_PRODUCT_DETAILS:
            return {...state, cartProducts: [...action.cartList]};
        case actions.UPDATE_PRICE_IN_CART:
            return {...state,cartProducts: [...action.cartList]};
        case actions.UPDATE_QUANTITY:
            return {...state, cartProducts: [...action.cartList]};
        case actions.DELETE_PRODUCT:
            return {...state, cartProducts: [...action.cartList]}; 
        case actions.UPDATE_TOTAL_CART:
            return {...state, total: {...action.totalCart}, quantity:action.totalQty};
        default:
            return state;
    }
}