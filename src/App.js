import { useEffect,useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';

import Categories from './pages/Categories';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Product from './pages/Product';
import Cart from './pages/Cart';
import MiniCart from './components/MiniCart';
import {updatePriceAction} from './actions/updatePriceAction';
import {updateTotalCart} from './actions/updateTotalCart';
import NavigationCategory from './components/NavigationCategory';
import {client} from './apollo/apollo';
import * as q from './queries/queries';
import {updateCurrencyLabel} from './actions/actions';
import CurrencyDiv from './components/CurrencyDiv';


function  App() {
  
  const dispatch = useDispatch();
  
  
  const cartQuantity=useSelector((state)=>state.cartR.quantity);
  const cartProducts = useSelector((state)=>state.cartR.cartProducts);
  const currencySymbol=useSelector((state)=>state.dataR.currencySymbol);
  
 

  const [minicart, setMinicart]=useState("hidden");
  const [mainBack, setMainBack]=useState("#ffffff");
  const [currencyBox,setCurrencyBox]=useState("hidden");
 

  //refactoring
  
  const [getCategories,setGetCategories]=useState([]);
  const [categoryFilter,setCategoryFilter]=useState('all');
  const [currencies, setCurrencies]=useState([]);
  
  //
  
useEffect(()=>{
  
  fetchCategories();
  //getCurrencies();
  async function getCurrencies (){
    await client.query({query:q.CURRENCY,
                     })
                     .then((response)=> {
                                        setCurrencies(response.data.currencies);
                                       console.log(currencies);
                     })
                     .catch((err)=>console.log(err.message));
   }
  getCurrencies();
},[currencies]);


  useEffect(()=>{
        dispatch(updateTotalCart(cartProducts));
  },[cartProducts,dispatch]);

  
   function updateCategoryFilter(category){    
            setCategoryFilter(category);
                        
  }
  async function fetchCategories(){
    
    await client.query({
                       query:q.GET_CATEGORIES,
                     })
                     .then((response)=> {setGetCategories(response.data.categories);
                                       // console.log("response.data.categories")
                                        //console.log(response.data.categories);
                    } ); 
                  

  }
  function minicartDisplayIn(){
    setMinicart("visible");
    setMainBack("rgba(57,55,72,0.22)");
    
  }
  function minicartDisplayOut(){
    setMinicart("hidden");
    setMainBack("#ffffff");
  }
  function currencyBoxDisplayIn(){
    setCurrencyBox('visible');
  }
  function currencyBoxDisplayOut(){
    setCurrencyBox('hidden');
  }
  function changeCurrencyViz(){
    setCurrencyBox('hidden');
  }
  function currencyUpdate(curLabel, curSymbol){  
    
    console.log(curLabel);
    dispatch(updateCurrencyLabel(curLabel,curSymbol));
    dispatch(updatePriceAction(cartProducts, curLabel));
  }

 
 
  return (
  <Router>
    <div className="grid-container">
      <header >
        <div className="navigation">
          {getCategories.map((category,index)=>(
                   <Link to="/" className="linkStyle" key={index}>
                              <NavigationCategory catName={category.name} updateCategoryFilter={updateCategoryFilter} categoryF={categoryFilter}/>
                    </Link>
          ))}
          </div>
         <div id="logo" className="a-logo">
           <Link to="/"><img src='/img/a-logo.svg' alt="page logo"/></Link>
         </div>
         <div className="actions" onMouseLeave={minicartDisplayOut}>
                <div className="currency_symbol">
                    <div className="selectCurrency2" name="currencySelector" id="currencySelector" onClick={currencyBoxDisplayIn}> 
                        {currencySymbol} 
                        <span  >
                             <img src={currencyBox==='visible'? "/img/angle_up.png": "/img/angle_down.png"} className="currencyIconSwitch" alt=""/>
                        </span>
                    </div>
                    <div className="currencyContainer" style={{visibility:`${currencyBox}`}} onMouseLeave={currencyBoxDisplayOut}>
                        <div className="currencyBoxSmall" ></div> 
                        <div className="currencyBox ">
                           {currencies.map((currency)=>(
                             <CurrencyDiv currencyUpdate={currencyUpdate} changeVisibility={changeCurrencyViz} key={currency.symbol} currencyLabel={currency.label} currencySymbol={currency.symbol}/>
                           ))}
                        </div>
                    </div>
                 
               </div>
               <div className="minicartDiv" >
                   <img src="/img/empty_cart.svg" alt="empty cart" onClick={minicartDisplayIn}/>
                   {cartQuantity===0? (<></>) 
                   :(
                     <div className='minicartBadge'   onClick={minicartDisplayIn}>
                          <span className="minicartBadgeSpan">{cartQuantity}</span>
                   </div>
                   )}
                   <div className="minicartContainer" style={{visibility:`${minicart}`}}>
                      <div className="minicartBoxSmall" ></div>    
                      <div   id="minicart"  name="minicart" className="minicart"  >
                          <MiniCart />
                      </div>
                   </div>
      
               </div>
         </div>
          </header> 
      
      <main style={{backgroundColor:`${mainBack}`}}>
        
        <Routes>
          <Route path="/" element={ <Categories  categoryFilter={categoryFilter}/>}></Route>
          <Route path="/product/:id"  element={<Product />} ></Route>
        
          <Route path="/cart" element={<Cart />}></Route>
    
        </Routes>
          
     </main>
         <footer className="row center">
           
         </footer>
    
    </div>
  </Router>
  );
}

export default App;

/*
<select className="selectCurrency" id="currencySelector"  value={currencyLabel} onChange={currencyUpdate} >
                    
                 {currencies.map((currency)=>(
                       <option className="currencyOption shadow" key={currency.label} value={currency.label}>{`${currency.symbol} ${currency.label}`}</option>
                     ))}
                 </select>
                 */