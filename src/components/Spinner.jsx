import React from 'react'
import {ImSpinner8} from 'react-icons/im'

const Spinner = ({color}) => {
  return (
    <div className='fixed z-10 bg-white bg-opacity-100 w-full h-full top-0 left-0 flex items-center justify-center'>
        <ImSpinner8  className='animate-spin text-8xl' style={{color}}/>
    </div>
  )
}

export default Spinner