import React, { Component } from 'react';
import { useParams } from "react-router-dom";
import DisplayBig from '../components/DisplayBig';
import ProductInfo from '../components/ProductInfo';
//refactoring the app 
import {client} from '../apollo/apollo';
import * as q from '../queries/queries';

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class Product extends Component {
  //let productId= useParams();
    constructor(props) {
        super(props);
        this.state={
            product:{},
             imgSrc: "",
             error:'',
          }
    } ;
  fetchProduct= async()=>{
    await client.resetStore();
    await client.query({ 
                        query:q.GET_PRODUCT,
                      variables:{productId: this.props.params.id}
                    })
                    .then((response)=>{
                                        this.setState({product:response.data.product}) ;
                                        this.setState({imgSrc:response.data.product.gallery[0]});
                                       
                    })
                    .catch((err)=> { 
                      this.setState({error:err.message});
                      console.log(this.state.error);
                    }); 
  }
  
  componentDidMount(){
    this.fetchProduct();
    
    }
    
  handleClick=(event)=>{
    this.setState({imgSrc:event.target.src});
  }
  
  render() {
    
    return (
      <div className="productDetailsPage">
        <div className="carouselContainer">
          
                   {this.state.product.gallery?.map((photo,index)=>(
                       <div className="imageCarouselContainer" key={index}>
                           <img src={photo} className="displayImageCarousel" onClick={this.handleClick} alt=""></img>
                      </div>
                    
                   ))}
        </div>
        <div className="displayBigContainer" >
            <DisplayBig source={this.state.imgSrc}/>
        </div>
        <div className="productInfo">
            <ProductInfo product={this.state.product} description={this.state.product.description}/>
        </div>
        
       
        
         
      </div>
    )
  }
}


export default withParams(Product);
