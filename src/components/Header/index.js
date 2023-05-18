import './style.css'
import React, { useState } from 'react';
// import { Home } from '../pages/Home';
import Cal from '../Calender/Calender.js';
import { Link } from 'react-router-dom';


function Header() {

    return (

        <div className='container'>
            <div className='header'>
                <div className='header-logo'>
                    <a className='logo'>
                        <svg id="logo-38" width="78" height="32" viewBox="0 0 78 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z" class="ccustom" fill="#FF7A00"></path> <path d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z" class="ccompli1" fill="#FF9736"></path> <path d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z" class="ccompli2" fill="#FFBC7D"></path> </svg>
                    </a>
                    <h1 className='container-title'> BINBARBER HAIRCUT</h1>
                </div>
                <div className='navbar'>
                    <Link className='navber-link' to="/">Home</Link>
                    <Link className='navber-link' to="/booking">Booking</Link>
                    <Link className='navber-link' to="/blog">Blog</Link>
                    <Link className='navber-link' to="/services">Services</Link>
                    <Link className='navber-link' to="/staff">Staff</Link>
                    <Link className='navber-link' to='/login'>Login</Link>
                </div>
            </div>
            <div className='main'>
                <div className='main-content'>
                    <div>
                        <h1>Being a barber is about taking care of the people.</h1>
                    </div>
                    <div>
                        <p> Rem ipsum dolor sit amet, consectetur adipisicing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
                    </div>
                </div>

                <div className='main-calendar'>
                    <Cal />
                </div>


            </div>

        </div>

    )
}

export default Header;  