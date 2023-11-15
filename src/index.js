import React from 'react'
import  ReactDOM  from 'react-dom'
import App from './App'
import './index.css'
import { ContextProvider } from './contexts/ContextProvider';
import { CartProvider } from './contexts/CartProvider';
ReactDOM.render(
<CartProvider> 
    <ContextProvider> 
        <App/>
    </ContextProvider>
</CartProvider>, 
document.getElementById('root'))