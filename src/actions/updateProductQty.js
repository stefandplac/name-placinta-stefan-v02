import * as actions from '../actionTypes/types';

export const updateProductQty=(index, cartProducts,qty)=>(dispatch)=>{
    let newCartList = [...cartProducts];
    newCartList[index].quantity = newCartList[index].quantity+qty;
 
 
    dispatch({type:actions.UPDATE_QUANTITY,
              cartList: newCartList
    })
}