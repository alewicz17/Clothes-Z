import React, {useState} from 'react'
import {RiArrowDropDownLine, RiArrowDropUpLine} from 'react-icons/ri'
const Dropdown = ({selected, setSelected, options,setOpt}) => {
    const [isOpen, setisOpen] = useState(false)
    
  return (
    <div >
        <button 
        placeholder='Choose'
        className='mt-2 border-1 p-1 rounded-lg  focus:outline-none tracking-wider w-full cursor-default font-medium inline-flex   '
        onClick={(e)=>setisOpen((prev)=>(!prev))}>  <span className='ml-2'>{selected} </span>
           {!isOpen? ( <RiArrowDropDownLine className='ml-auto  text-xl'/>
           
                ): (<RiArrowDropUpLine className='ml-auto text-xl'/>)
            }</button>
            {isOpen &&
            <div className='w-full  rounded-2xl mt-2 grid grid-cols-3 gap-2'> 
                {options.map((opt)=>(
                  <div className='bg-gray-100 rounded-lg shadow py-3 sm:px-5  md:text-base text-sm	max-[450px]:text-xs font-medium 
                  hover:border-[rgb(91,153,255,0.5)] hover:border-b-1 
                  focus:border-[rgb(91,153,255,0.5)] focus:border-b-1  '
                onClick={(e)=> {
                    setSelected(opt)
                    setisOpen(false)
                    setOpt(e.currentTarget.textContent)
                }}>
                  {opt}  
                </div>  
                ))}
                
            </div>
            }
        
    </div>
  )
}

export default Dropdown