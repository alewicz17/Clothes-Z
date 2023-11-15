import React from 'react'
import { NavLink } from 'react-router-dom'


const MobMenu = ({show, active, lout, setActive}) => {

  return (
    <div className={active ? 'flex-col flex items-center fixed z-10 inset-0 left-1/3 bg-[rgb(201,213,235)] md:hidden p-8 gap-8 justify-center shadow' : "hidden"}>
        <NavLink to={'/home'} onClick={() =>setActive(!active)}> <span className='capitalize inline-flex font-medium	p-2 text-2xl '> Home </span> </NavLink>
        <NavLink to={'/shop'} onClick={() =>setActive(!active)}> <span className='capitalize inline-flex font-medium	p-2 text-2xl'> Shop </span> </NavLink>
        <NavLink to={'/account'} onClick={() =>setActive(!active)}> <span className='capitalize inline-flex font-medium	p-2 text-2xl'> Account </span> </NavLink>
        {localStorage.getItem("isAuth") &&
          <button onClick={() =>
            {lout()
           setActive(!active)
           }}>   
            <span className='capitalize inline-flex font-medium	p-2 text-2xl'> Logout </span>
             </button>
        }
    </div>
  )
}

export default MobMenu