import React from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import {GrClose} from 'react-icons/gr'

const Popup = ({msg}) => {
  const{setpopupOpen}= useStateContext()
  
  return (
    <div className='fixed z-10 bg-black bg-opacity-25 w-full h-full top-0 left-0 flex items-center justify-center'>
      <div className='rounded-lg p-6 bg-white relative overflow-hidden'>   
      
      <button onClick={()=> setpopupOpen(false)} className='py-1 px-1  absolute right-0 top-0  hover:bg-[rgb(91,153,255,0.5)]'> <GrClose/> </button>

       <label className='mx-auto text-xl'>{msg}</label>
       <div class="mb-1 text-base font-medium "></div>

      </div>
      
    </div>
  )
}

export default Popup