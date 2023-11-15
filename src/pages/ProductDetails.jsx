import React, { useEffect, useState } from 'react'
import Spinner from '../components/Spinner'
import {   getDocs, collectionGroup, where } from 'firebase/firestore'
import { db } from '../firebase';
import { useParams } from 'react-router'
import { useCartContext } from '../contexts/CartProvider';
const ProductDetails = () => {

  const {productId} = useParams()
  const [product, setproduct] = useState({})
  const [loading, setloading] = useState(false)

  const docRef = collectionGroup(db, "products",  where('products', '==', productId) )
  const getData= async() => {
    setloading(true)
    try{
     const docSnap= await getDocs(docRef)

     const data = docSnap.docs.map((doc) => 
     ({
      ...doc.data(),
      id: doc.id,
    }))
    data.map((d) => ({
      ...d.id==productId ? setproduct(d) : null
      
    }))
    setloading(false)
    }catch(e){console.error(e)}
  }
  useEffect(()=>
  {
      getData()
  }, [])

  const { getProductQuantity, addtoCart, cartProducts} = useCartContext()

  console.log(cartProducts)
 
  return (
    <div className="bg-white min-h-screen flex flex-col md:flex-row mt-14 md:mt-4">
      <div className="container mx-auto flex flex-col md:flex-row">
     
        <div className="w-full md:w-2/5 p-4 md:p-8 text-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto md:max-w-md max-h-96 object-contain rounded-lg shadow-md mx-auto"
          />
        </div>

        <div className="w-full md:w-3/5 p-4 md:p-8">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">{product.name}</h1>
          <p className="text-gray-700 text-base md:text-lg mb-4">{product.desc}</p>
          <div className='flex '> 
          <label className='text-gray-900 font-medium text-base md:text-lg mb-4 mr-1'>Category: </label>
          <p className="text-gray-700 text-base md:text-lg mb-4">{product.category}</p>
          </div>
          <div className="text-3xl md:text-4xl font-bold text-black mb-4">
            ${product.price}
          </div>
          
          <button className="bg-[rgb(91,153,255,1)] hover:scale-105 text-white text-lg md:text-xl px-6 py-2 md:px-8 md:py-3 rounded-2xl"
          onClick={()=> {if(getProductQuantity(product)===0) {addtoCart(product)} else{return} }}>
            Add to cart
          </button>
      
        </div>
      </div>
      {loading &&  <Spinner color='rgb(91,153,255,1)'/> }

    </div>
    
  )
}

export default ProductDetails