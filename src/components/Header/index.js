import './style.css'
import React, { useState } from 'react';
import Calendar from 'react-calendar'


const ReactCalendar = () => {
    const [date, setDate] = useState(new Date());
    const onChange = date => {
        setDate(date);
    };
    return (
        <div>
            <Calendar className=" custom-calendar" onChange={onChange} values={date} />
        </div>
    );
};

function Header() {
    return (
        <div className='container'>
            <nav>
                <a>
                    <svg id="logo-38" width="78" height="32" viewBox="0 0 78 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z" class="ccustom" fill="#FF7A00"></path> <path d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z" class="ccompli1" fill="#FF9736"></path> <path d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z" class="ccompli2" fill="#FFBC7D"></path> </svg>
                </a>
                <div>
                    <ul id="navbar">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Booking</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Sftaff</a></li>

                    </ul>
                </div>
            </nav>
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

                    <ReactCalendar className='english-text' />
                </div>

            </div>

        </div>

    )
}

export default Header;  