import React from 'react'

const Button = ({Func,text}) => {
  return (

     <button 
     className='md:mx-2 md:h-12 md:w-48 mx-1 h-8 w-32 min-[354px]:h-10  min-[354px]:w-40 overflow-hidden rounded-lg bg-white text-lg shadow hover:scale-110  hover:bg-[rgb(91,153,255,0.5)] '
     onClick={Func}> 
     {text}
     </button>
     
 
 



  )
}

export default Button