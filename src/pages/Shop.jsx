import React , { useEffect, useState }from 'react'
import { collectionGroup, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { Spinner } from '../components';
import { useNavigate } from 'react-router-dom'

const Shop = () => {
  const [productList, setProductList] = useState([])
  const CustomCollectionRef = collectionGroup(db, "products")
  const [loading, setloading] = useState(false)

  const getProductsList = async() => {
    
    try{
      setloading(true)  
      const data = await getDocs(CustomCollectionRef)
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(), 
        id: doc.id,
      }))
      setProductList(filteredData)
      setloading(false)  
         
      } catch(err){console.error(err)}
  }
  useEffect(()=>
  {
      getProductsList()
  }, [])


  const navigate= useNavigate()
  return (
    <div >
<div className="container md:my-12 my-16 mx-auto px-4 md:px-12 ">
  <div className="flex flex-wrap -mx-1 lg:-mx-4 ">
    {productList.map((product)=>
    <div className="my-1 px-1 w-full min-[450px]:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 ">
      <div className="overflow-hidden rounded-lg shadow-lg hover:border-b-2 hover:border-[rgb(91,153,255,0.5)]">
        <a className='cursor-pointer' key={product.id} 
        onClick={()=> {navigate(`/shop/${product.id}` )}}>
          <img
          loading='lazy'
            alt={product.name}
            className="block h-auto w-full aspect-[3/2] object-contain   "
            src={product.imageUrl}
          />
        </a>
        <header className="flex items-center justify-between leading-tight p-2 md:p-4 mt-4">
          <h1 className="text-lg">
            <a className="no-underline text-black font-normal cursor-default" >
              {product.name}
            </a>
          </h1>
          <p className="text-grey-darker text-sm cursor-default ">${product.price}</p>
        </header>
        <footer className="flex items-center justify-center leading-none p-2 md:p-4">
          <a
            className="flex items-center no-underline"
               
          >
            
          </a>
        </footer>
      </div>
  
    </div>
 
    )}
   
    
  
 
 
  </div>
</div>

   {loading &&  <Spinner color='rgb(91,153,255,1)'/> }
    </div>      
  )
}

export default Shop