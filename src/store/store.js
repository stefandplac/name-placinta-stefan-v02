import {createStore, compose, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {cartR} from '../reducers/cartR';
import {dataR} from '../reducers/dataR';

const preloadedState={
    dataR:{
        currencyLabel:'USD',
        currencySymbol:'$'
    },
    cartR:{
        cartProducts:[],
        total:{
            amount:0,
            currencyLabel:'',
            currencySymbol:'',
          
        }, 
        quantity:0
    }
   
} ;
const rootReducers = combineReducers({
    cartR,
    dataR
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSIONS_COMPOSE__ || compose;

const store = createStore(rootReducers, preloadedState, composeEnhancer(applyMiddleware(thunk)));
export default store;