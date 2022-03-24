import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import store from './store/store';
import {Provider} from 'react-redux';



const client = new ApolloClient({
  uri:"http://localhost:4000/graphql",
  cache: new InMemoryCache()  
})
ReactDOM.render(
  <Provider store={store}>
  <ApolloProvider  client={client}>
    
    <App />
    
    
  </ApolloProvider>
  </Provider>
 ,
  document.getElementById('root')
);



