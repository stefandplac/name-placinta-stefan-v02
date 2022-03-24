import * as actions from '../actionTypes/types';

export const deleteProduct=(index, cartProducts)=>(dispatch)=>{
    let newCartList = [...cartProducts];
    newCartList.splice(index,1);
 

    dispatch({type:actions.DELETE_PRODUCT,
            cartList: newCartList,
    })
} 