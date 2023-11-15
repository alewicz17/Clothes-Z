import React, {createContext, useContext, useState} from 'react';

const CartContext = createContext();

export const CartProvider = ({children}) =>{
   const [cartProducts, setcartProducts] = useState([])

    const getProductQuantity = (product)=>{
        const quantity = cartProducts.find(item => item.product.id  === product.id)?.quantity
        if(quantity ===undefined){
            return 0;
        }
        return quantity;
    }

    const addtoCart = (product)=>{
        const quantity = getProductQuantity(product)
        if(quantity===  0){
            setcartProducts(
                [...cartProducts,
                 {  
                    product: product,
                    quantity: 1
                 }
                ])
        } else{
            setcartProducts(
                cartProducts.map(
                    item => item.product.id === product.id ? {...item, quantity: item.quantity + 1} : item
                )
            )
        }
    }

    const singleRemove = (product)=>{
        const quantity = getProductQuantity(product)
        if(quantity== 1 ) {
            deletefromCart(product)
        } else{
            setcartProducts(
                cartProducts.map(
                    item => item.product.id === product.id ? {...item, quantity: item.quantity - 1} : item
                )
            )
        }
    }

    const deletefromCart = (product) =>{
        setcartProducts(
            cartProducts=> cartProducts.filter(current => {
                return current.product != product
            })
        )
    }

    const getTotal = () =>{
        let total= 0
        cartProducts.map((item) =>{
        total += ( item.product.price * item.quantity)
        })
        return total
    }

    return(  
        <CartContext.Provider value={{ getProductQuantity, addtoCart, singleRemove, deletefromCart, getTotal, cartProducts}}>
            {children}

        </CartContext.Provider>
    )   
    }
export const useCartContext = () => useContext(CartContext)