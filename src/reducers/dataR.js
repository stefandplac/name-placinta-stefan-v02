import * as actions from '../actionTypes/types';
export const dataR=(state={currencyLabel:'USD', currencySymbol:'$'},action)=>{
    switch(action.type){
        case actions.UPDATE_CURRENCY_LABEL:
            return {...state, currencyLabel:action.currencyLabel, currencySymbol: action.currencySymbol};
        default:
            return state; 
    }
}