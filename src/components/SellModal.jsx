import React, {useEffect, useState} from 'react'
import { auth, db, } from "../firebase"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../firebase'
import {v4} from 'uuid'
import { addDoc, collection } from 'firebase/firestore'
import { useStateContext } from '../contexts/ContextProvider'
import Dropdown from './Dropdown'

const SellModal = ({setP}) => {
    
    const [didRender, setDidRender]=useState(false);
    const CustomCollectionRef = collection(db, "users",`${auth.currentUser.uid}`,"products")

    const [offlineFile, setOfflineFile] = useState()
    const [fileUpload, setFileUpload] = useState(null)

    const [price, setPrice] = useState(0)
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [desc, setdesc] = useState("")


    const{setSellModalOpen, popupOpen, setpopupOpen}= useStateContext()
    const [isChecked, setisChecked] = useState(false)
    const [selected, setselected] = useState("")
    const categories= ["Sneakers","Shirt", "Pants","Jacket","Shorts","Dress", "Suit", "Hat", "Skirt"]
    
    
    const uploadImage =async()=> {
      if(fileUpload==null) return;
      const imageRef = ref(storage, `images/${fileUpload.name + v4()}`)
      uploadBytes(imageRef, fileUpload).then((snapshot)=>{
          
            getDownloadURL(snapshot.ref).then(url => {addDoc(CustomCollectionRef, {imageUrl: url, creationDate: new Date().toDateString(), price: price, name:name, category: category, desc: desc});
             setP()}).then
            (setSellModalOpen(false), setpopupOpen(true))

      })

          
    }
        
    useEffect(() => {
      setDidRender(true)
    }, [])
    
    
    useEffect(()=>
    {if(didRender){
      try{ 
      setOfflineFile(URL.createObjectURL(fileUpload))}
      catch(e){}}
    }, [fileUpload])

    const exceptThisSymbols = ["e", "E", "+", "-", "."];

return (

<div className='fixed z-10 sm:bg-black sm:bg-opacity-25 bg-white  w-full h-full top-0 left-0 flex  sm:items-center sm:justify-center'>
  <div className='rounded-lg p-8  bg-white '> 
   <div className='sm:w-3/4 mx-auto max-sm:mt-12'> 
    <div >
    <label className='text-lg font-semibold	'>Add a new Product</label>
    </div>
    <div className='mt-2 text-left'> 
    <label className='text-slate-600'>Price ($)</label> 
    </div>
    <input type="number"  onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault()}  onChange={(e)=>setPrice(e.target.value) }  placeholder='$' className='mt-2 border-1 font-medium  tracking-wider focus:outline-none p-1 rounded-lg  w-full '/>
   
    <div className='mt-2 text-left'> 
    <label className='text-slate-600' >Product name</label>
    </div>
    <input type="text" onChange={(e)=>setName(e.target.value)} className='mt-2 border-1 p-1 rounded-lg  focus:outline-none font-medium tracking-wider w-full '/>
   
    <div className='mt-2 text-left'> 
    <label className='text-slate-600' >Category</label></div>
    <Dropdown selected={selected} setSelected={setselected} options={categories} setOpt={setCategory}/>
   
    <div className='mt-2 text-left'> 
    <label className='text-slate-600' >Description</label></div>
    <textarea name="desc" id="desc"  rows={isChecked ? '1' : '4'} className='mt-2 border-1 p-1 rounded-lg h- focus:outline-none font-medium tracking-wider w-full ' value={desc} onChange={(e)=>  setdesc(e.target.value) }></textarea>
    
   <input className=' mt-5 rounded-lg shadow  w-full 
   file:rounded-l-lg file:border-none file:bg-[rgb(91,153,255,0.5)]  file:py-2 file:px-3'
    type="file"   
    onChange={(event)=> {setFileUpload(event.target.files[0])}}/>
    
   {isChecked &&
    <div className='mt-4 shadow rounded-lg mx-auto overflow-hidden  border-1 w-[225px] h-[225px] 	'>
     <img src={offlineFile} className=' mx-auto object-contain h-full aspect-[3/2]' />
    </div>
    }
    <div className='mt-4 text-left'>
      <label>
       <input type="checkbox" className='' onChange={()=>setisChecked((prev)=>(!prev))}/> Preview Image
       </label>
  </div>
    <button className='p-2 font-medium rounded-md text-center mx-2 mt-3 bg-gray-200 hover:scale-110' onClick={() =>setSellModalOpen(false)}>Cancel</button>
    <button className='bg-[rgb(91,153,255,0.5)] mt-3 mx-2 rounded-md p-2 font-medium hover:scale-110' onClick={uploadImage}>Publish</button>
   </div> 
    </div>
      </div>
  )
}


export default SellModal