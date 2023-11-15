import React from 'react'
import { Button } from '../components'
import { useNavigate } from 'react-router'

const Home = () => {
  const navigate = useNavigate()
  const hawaian = require('../assets/278-2787281_hawaiian-shirt-png-transparent-png-download.png')
  const shorts = require ('../assets/69-694784_iridescent-mystique-shorts-shorts.jpg')
  const shirt = require('../assets/762-7627166_womens-long-sleeve-executive-oxford-dress-shirt-grey.jpg')
  return (
    <div className='md:mt-4 mt-16 '>
        <div className='md:mx-36  text-center  '> 
         <p className='mt-8 font-medium md:text-4xl text-2xl'> Clothes-Z</p>
          <p className='mt-2 '> Buy and Sell your clothes just in a few clicks</p>
          <div className='mt-8 '> 
            <Button text={'Buy'} Func={()=> navigate('/shop')}></Button>
            <Button text={'Sell'}Func={()=> navigate('/account')}></Button>
          </div>
        
   
        </div>
        <div className="container mt-16 md:mx-auto px-4 md:px-12 relative"> 
          <div className='flex flex-wrap '>
          <div className="my-1 px-2 w-1/3  lg:my-4 lg:px-4 lg:w-1/3 rotate-2 z-50 ">
      <article className="overflow-hidden rounded-lg shadow-lg mt-4 bg-opacity-100 	bg-gray-100 -mr-12 ">
        <a>
          <img
            alt="Placeholder"
            loading='lazy'
            className="block h-auto w-full aspect-[3/2] cursor-default	"
            src={hawaian}
          />
        </a>
        <header className="flex items-center justify-between leading-tight sm:p-2 md:p-4">
          
   
        </header>
        <footer className="flex items-center justify-between leading-none sm:p-2 md:p-4">
        

        </footer>
      </article>
    
    </div>
   
    <div className="my-1 w-1/3  lg:my-4 lg:px-4 lg:w-1/3 z-20 	">
      <article className="overflow-hidden rounded-lg shadow-lg bg-opacity-100 bg-gray-100	">
        <a >
          <img
            alt="Placeholder"
            loading='lazy'
            className="block h-auto w-full aspect-[3/2] cursor-default	"
            src={shorts}
          />
        </a>
        <header className="flex items-center justify-between leading-tight sm:p-2 md:p-4">
        
        </header>
        <footer className="flex items-center justify-between leading-none sm:p-2 md:p-4">
       
         
        </footer>
      </article>
      
    </div>
   
    <div className="my-2 px-2 w-1/3  lg:my-6 lg:px-6 lg:w-1/3 -rotate-3 z-0 ">
      <article className="overflow-hidden rounded-lg shadow-lg md:mt-4 md:-ml-14 -ml-8 mt-2 bg-gray-100 bg-opacity-100	">
        <a >
          <img
            alt="Placeholder"
            loading='lazy'
            className="block h-auto w-full aspect-[3/2] cursor-default	"
            src={shirt}
          />
        </a>
        <header className="flex items-center justify-between leading-tight  sm:p-2 md:p-4">
          
          
        </header>
        <footer className="flex items-center justify-between leading-none sm:p-2 md:p-4">
         
        </footer>
      </article>
      
    </div>
   
    
          </div>
        </div>

     
        
    </div>
  )
}

export default Home