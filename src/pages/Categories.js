import React, { Component } from 'react';
import ShowProduct from '../components/ShowProduct';
import {client} from '../apollo/apollo';
import * as q from '../queries/queries';


 export default class Categories extends Component {
   constructor(props){
     super(props);
     this.state={
              products:[],
              errorCategory:'',
              categoryFilter:'',
     }
   }
  updateProducts= async (category)=>{   
     
    await client.query({
                        query:q.GET_CATEGORY,
                        variables:{input:{title:category}}
                       })
                       .then((response)=>{
                        this.setState({products:response.data.category.products});
                        this.setState({categoryFilter:category});
                        
                       }) 
                       .catch((err)=> this.setState({errorCategory:err.message}));
                      
      
  }
  componentDidMount(){
    this.updateProducts(this.props.categoryFilter);
  }
  componentDidUpdate(){
    this.state.categoryFilter !==this.props.categoryFilter &&  this.updateProducts(this.props.categoryFilter);
  }
  
  render() {
    return (
   <>
      
         {this.state.errorCategory!=='' ? (
          <>
                <div className="errorCategoryFetch" >
                  
                  <div className="errorClass">
                    
                    {`#### Error: ${this.props.errorM}        :(  `}</div>
                 
                </div>
          </>
        ) 
       
        : (
          <>
           
            <div className="showProducts">
              
                   {this.state.products?.map((product)=>(
                    <div key={product.id}>
                       {product.inStock===true ? (
                              <ShowProduct key={product.id}  product={product} classN={`productCard `}/>
                      ):(
                        <ShowProduct key={product.id}  product={product} id={product.id} classN={`productCard productCart-unavailable`}/>
             
                      )}
                     </div>
                    ))}
               
         
             </div>
          </>
          
        )}

    </>
     
    )
  }
}


/*
in case I need to modify the design back

 <div className="" style={{border:"1px solid red", padding:"5px"}}>
             <select className="" id="categories" name="categories" value={this.props.categoryFilter} onChange={this.handleChange}>
               <option value="all" >all</option>
               <option value="clothes">clothes</option>
               <option value="tech">tech</option>
             </select>
           </div>
*/

