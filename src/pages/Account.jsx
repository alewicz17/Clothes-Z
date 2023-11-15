import React, {useEffect, useState} from 'react'
import {  db } from "../firebase"
import { useStateContext } from "../contexts/ContextProvider"
import { collection, getDocs } from 'firebase/firestore'
import SellModal from '../components/SellModal'
import { useNavigate } from 'react-router-dom'
import { Spinner, Popup } from '../components'

const Account = () => {
  const { SellModalOpen, setSellModalOpen, popupOpen}= useStateContext();
  const [loading, setloading] = useState(false)
  
  const navigate = useNavigate()

  
  const [productList, setProductList] = useState([])

  const CustomCollectionRef = collection(db, "users",`${localStorage.uid}`,"products")

  const getProductsList = async () => {
    setloading(true)
    try{  
    const data = await getDocs(CustomCollectionRef)
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(), 
      id: doc.id,
    }))
    setProductList(filteredData)
    setloading(false)
       
    } catch(err){console.error(err)}
  }
    
      
    

      useEffect(() => {
        getProductsList()
        
       
      }, [])
   

     
      
  
      

 return (
<>
  <div className='w-auto md:flex flex-col text-center	p-16  hidden '>
          <table className='rounded-2xl  shadow  overflow-hidden 	 '>
          <tr >
              <th className='py-2'>Product</th>
              <th className='py-2'> Name</th>
              <th className='py-2'>Category</th>
              <th className='py-2'>Price</th>
              <th className='py-2'>Date</th>
            </tr>
          {productList.map((product) => (
          <tr className= "" > 
            <img src={product.imageUrl}  className='mx-auto  w-24 h-24 object-fill mt-1 cursor-pointer' onClick={()=> {navigate(`/shop/${product.id}` )}}/>
            <td className='p-7'>{product.name}</td>
            <td className='p-7'>{product.category}</td>
            <td className='p-7'>{product.price}</td>
            <td className='p-7'>{product.creationDate}</td>
          
           
          </tr>
          ))}
          </table>  
          <div className='mt-10'>
            <button className='ml-2 text-lg p-2 rounded-lg border-1 hover:bg-[rgb(91,153,255,0.5)]'onClick={() =>setSellModalOpen(true)}>Add Product</button>
            </div>
            {SellModalOpen &&  <SellModal setP={getProductsList} />}
            {popupOpen && <Popup msg="Your product has been uploaded successfully"/>}
     {loading &&  <Spinner color='rgb(91,153,255,1)'/> } 
 
      
  </div>
  <div className='md:hidden mt-10 p-4 min-[600px]:p-16'  >
   {productList.map((product) => (
     <div className=' rounded-2xl flex border shadow w-full overflow-hidden cursor-pointer mb-8'onClick={()=> {navigate(`/shop/${product.id}` )}}>
       <div>
        <ul className='p-2'> <span className='font-medium'>Product: </span>{product.name}</ul>
        <ul className='p-2'> <span className='font-medium'>Category: </span>{product.category}</ul>
        <ul className='p-2'> <span className='font-medium'>Price: </span>{product.price}</ul>
        <ul className='p-2'> <span className='font-medium'>Date: </span>{product.creationDate}</ul>
       </div>
       <div className='ml-auto max-[330px]:hidden '>
       <img src={product.imageUrl}  className=' min-[400px]:w-32  min-[400px]:h-32 min-[400px]:mt-1 w-24 h-24 object-fill mt-6  ' loading='lazy'/>
       </div>
     </div>
   ))}
  </div>
  </>
 )}

export default Account