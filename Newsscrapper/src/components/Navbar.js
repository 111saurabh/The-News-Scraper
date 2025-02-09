import React from 'react'
// import logo123 from "../assets/Logo.svg"
import {Link} from "react-router-dom"
import  {toast} from "react-hot-toast"
import { GiNewspaper } from "react-icons/gi";

// import "./buttton.css"


import  { useState } from 'react';
// import { Link } from 'react-router-dom';

const Navbar = () => {


    const [activeLink, setActiveLink] = useState('/');

    const handleLinkClick = (path) => {
      setActiveLink(path);
    };
 
  return (
  




<div className='flex flex-col'>
    <div className='flex justify-between items-center bg-richblack-200 h-20 px-4 rounded-sm'>
      
        <div className='ml-5 h-20 w-20 flex items-center justify-center text-sky-50'>
            <GiNewspaper className='h-full w-full' />
        </div>
        {/* <nav className='w-full flex justify-between items-center'>
            <ul className='flex justify-center items-center text-lg m-4 w-full'>
                <div className='flex gap-5 text-xl hover:text-blue-400'>
                    <li >
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/login">Business</Link>
                    </li>
                    <li>
                        <Link to="/signup">Sports</Link>
                    </li>
                </div>
            </ul>
            <div className='ml-auto pr-4 text-xl hover:text-blue-400'>
                <Link to="/notes">MakeNote</Link>
            </div>
        </nav> */}


<nav className='w-full flex justify-between items-center'>
      <ul className='flex justify-center items-center text-lg m-4 w-full'>
        <div className='flex gap-6 text-xl text-sky-50'>
          <li className=  {activeLink === '/' ? 'bg-cyan-400 shadow-lg shadow-cyan-500/50  rounded-xl px-2 ' : ''}>
            <Link to="/"    onClick={() => handleLinkClick('/')}>Home</Link>
          </li>
          <li className={activeLink === '/login' ? 'bg-cyan-400 shadow-lg shadow-cyan-500/50  rounded-xl px-2' : ''}>
            <Link to="/login" onClick={() => handleLinkClick('/login')}>Business</Link>
          </li>
          <li className={activeLink === '/signup' ? 'bg-cyan-400 shadow-lg shadow-cyan-500/50  rounded-xl px-2' : ''}>
            <Link to="/signup" onClick={() => handleLinkClick('/signup')}>Sports</Link>
          </li>
          <li className={activeLink === '/tech' ? 'bg-cyan-400 shadow-lg shadow-cyan-500/50  rounded-xl px-2' : ''}>
            <Link to="/tech" onClick={() => handleLinkClick('/tech')}>Tech</Link>
          </li>
          <li className={activeLink === '/world' ? 'bg-cyan-400 shadow-lg shadow-cyan-500/50  rounded-xl px-2' : ''}>
            <Link to="/world" onClick={() => handleLinkClick('/world')}>World</Link>
          </li>
        </div>
      </ul>
      <div className='ml-auto pr-4 text-xl text-sky-50'>
        <Link to="/notes" className={activeLink === '/notes' ? 'bg-cyan-400 shadow-lg shadow-cyan-500/50  rounded-xl px-2' : ''} onClick={() => handleLinkClick('/notes')}>MakeNote</Link>
      </div>
      {/* <div className='ml-auto pr-4 text-xl'>

      <button class='glowing-btn'><span class='glowing-txt'>C<span class='faulty-letter'>L</span>ICK</span>
      <Link to="/notes" className={activeLink === '/notes' ? 'text-sky-400' : ''} onClick={() => handleLinkClick('/notes')}>MakeNote</Link></button>
        {/* <Link to="/notes" className={activeLink === '/notes' ? 'text-sky-400' : ''} onClick={() => handleLinkClick('/notes')}>MakeNote</Link> */}
      
    </nav>
    </div>
</div>




  )
}

export default Navbar
