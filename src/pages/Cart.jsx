import React from 'react'
import { useCartContext } from '../contexts/CartProvider'
import { useNavigate } from 'react-router-dom'
import { Popup } from '../components'
import { useStateContext } from '../contexts/ContextProvider'
const Cart = () => {

  const { addtoCart, singleRemove, deletefromCart, getTotal, cartProducts} = useCartContext()
  const{setpopupOpen, popupOpen}= useStateContext()
  const navigate = useNavigate()
  

  const checkout =async()=>{
    if(cartProducts.reduce((sum,product)=> sum + product.quantity, 0)==0){
      setpopupOpen((prev)=>!prev)
    }else{
    await fetch("http://localhost:4000/",{
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({products: cartProducts})
    }).then((res)=>{
      return res.json()
    }).then((res)=>{
      if(res.url){
        window.location.assign(res.url)
      }
    })
  }}


  return (
     
    <div className="md:container md:px-0 sm:px-2 mx-auto mt-10 ">
      <div className="sm:flex shadow-md md:my-10 sm:my-14 rounded-md ">
        <div className="sm:w-3/4 bg-white md:px-10 px-4 py-10">
          <div className="flex justify-between sm:border-b sm:pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{cartProducts.reduce((sum,product)=> sum + product.quantity, 0)} Items</h2>
          </div>
          <div className="sm:flex mt-10 mb-5 hidden">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5 ">Product Details</h3>
            <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
          </div>
          {cartProducts.map((item)=>
          <div className="sm:flex items-center -mx-8 px-6 py-5 rounded-md">
            <div className="flex sm:w-2/5"> 
              <img className="w-24 h-24 object-fill" src={item.product.imageUrl} alt={item.product.name}/>

              <div className="flex sm:flex-col flex-row max-[449px]:flex-col justify-between ml-4 flex-grow max-sm:mt-6 ">
                <span className="font-bold text-sm">{item.product.name}</span>
                <span className="text-[rgb(91,153,255,1)] text-sm sm:mx-0 min-[450px]:mx-auto ">{item.product.category}</span>
                <span onClick={()=>deletefromCart(item.product)} className="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer sm:mx-0 min-[450px]:mx-auto ">Remove</span>
              </div>
            </div>
            <div className="flex justify-center sm:w-1/5 max-[449px]:mt-5">
              <button className='' onClick={()=>singleRemove(item.product)}> 
              <svg className="fill-current text-gray-600 md:w-3 w-2 max-sm:w-4 hover:text-[rgb(91,153,255,1)]" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
              </svg></button>

              <input className="mx-2 border rounded-sm text-center md:w-8 w-6 max-sm:w-8" type="text" value={item.quantity}/>

              <button className='' onClick={()=>addtoCart(item.product)}>
              <svg className="fill-current text-gray-600 md:w-3 w-2 max-sm:w-4  hover:text-[rgb(91,153,255,1)]" viewBox="0 0 448 512"><path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
              </svg> </button>
            </div>
            
            <span className="text-center w-[19.5%] font-semibold text-sm tracking-wider max-sm:hidden">${item.product.price}</span>
            <span className="text-center w-[19.8%] font-semibold text-sm tracking-wider max-sm:hidden	">${item.product.price * item.quantity}</span>
          </div>
     )}
          <label onClick={()=> {navigate("/shop")}} className="flex font-semibold text-[rgb(91,153,255,0.75)] text-sm sm:mt-10  mt-4 cursor-pointer">
        
            <svg className="fill-current mr-2 text-[rgb(91,153,255,0.75)] w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/></svg>
            Continue Shopping
          </label>
        </div>
  
        <div  className="sm:w-1/4 px-8 sm:py-10 py-4">
          <h1 className="font-semibold text-2xl sm:border-b sm:pb-8">Order Summary</h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">Items </span>
          </div>
          <div>
            {cartProducts.map((item)=> 
            <label className="font-[350] block mb-3 text-sm uppercase"> {item.product.name} ({item.quantity})</label>
            )}  
          </div>
              
    
          <div className="sm:border-t mt-8">
            <div className="md:flex  max-sm:flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span className='max-md:block max-md:mt-2  max-sm:mt-0   '>$ {getTotal()}</span>
            </div>
            <button className="bg-[rgb(91,153,255,1)]   font-semibold hover:scale-105 py-3 text-sm text-white uppercase rounded-md w-full"
            onClick={()=>checkout()}>Checkout</button>
          </div>
        </div>
        

      </div>
      {popupOpen && <Popup msg={"Please add something to your cart in order to checkout!"} />}
    </div>
    
    
  )
}

export default Cart