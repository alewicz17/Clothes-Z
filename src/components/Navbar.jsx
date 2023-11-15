import React, {useState} from 'react'
import {FiShoppingCart} from 'react-icons/fi'
import {NavLink, useNavigate} from 'react-router-dom';
import MobMenu from './MobMenu';
import {AiOutlineMenu} from 'react-icons/ai'
import {signOut } from "firebase/auth"
import { auth } from "../firebase"
const NavButton = ({Func, icon, color})=>{
    return(
        <button 
        type='button' 
        onClick={Func} 
        style={{color}}
        className='relative text-xl rounded-full p-3 hover:md:hover:shadow-[0_4px_2px_-2px_rgb(0_0_0_/_0.05)]'>
            <span 
            className='absolute inline-flex rounded-full h-2 w-2  '/>
                {icon}        
        </button> 
  )}
  

const Navbar = () => {
  
  const [isActive, setisActive] = useState(false)

  const handleVisibility = ()=>{
    setisActive(!isActive)
  }
  const navigate = useNavigate()

  const logout =async() => {
    try{
    await signOut(auth)
    navigate('/')
    } catch(err){
        console.error(err)
    }
  }

  return (
    <> 
    <div className='hidden md:flex justify-center p-2 mx-5  lg:mx-24  '>
        <div className='flex justify-between '> 
         <NavLink to={'/home'}> <span className='capitalize p-3 inline-flex  font-medium	 text-24 md:hover:shadow-[0_4px_2px_-2px_rgb(0_0_0_/_0.05)]'> Home </span> </NavLink>
         <NavLink to={'/shop'}> <span className='capitalize p-3 inline-flex  font-medium	 text-24 md:hover:shadow-[0_4px_2px_-2px_rgb(0_0_0_/_0.05)]'> Shop </span> </NavLink>
         <NavLink to={'/account'}> <span className='capitalize p-3 inline-flex  font-medium	 text-24 md:hover:shadow-[0_4px_2px_-2px_rgb(0_0_0_/_0.05)]'> Account </span> </NavLink>
         <NavButton title="Cart"  Func={()=> navigate('/cart')}  icon={<FiShoppingCart size={25}/> } /> 
        {localStorage.getItem("isAuth") &&
          <button onClick={logout}>   
            <span className='capitalize p-3 inline-flex  font-medium	text-24 md:hover:shadow-[0_4px_2px_-2px_rgb(0_0_0_/_0.05)]'> Logout </span>
             </button>
        }
    </div>
    </div>
    <button onClick={handleVisibility} className='fixed top-4 right-4 md:hidden z-50 text-xl'><AiOutlineMenu /> </button>
    <MobMenu show={handleVisibility} active={isActive} lout={logout} setActive={setisActive} > </MobMenu>
    <div className='fixed top-0 right-8 md:hidden z-50 '> 
    <NavButton title="Cart"  Func={()=> navigate('/cart') }  icon={<FiShoppingCart size={25}/> }/> 
    </div>
    </>
  )
}

export default Navbar;