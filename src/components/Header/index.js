import './style.css';
import React, { useState } from 'react';
// import { Home } from '../pages/Home';
import Cal from '../../components/Header/calender.js';
import moment from 'moment';

function Header() {
    const [bookingDate, setBookingDate] = useState(null);

    const handleDayClick = (event) => {
        const date = event.currentTarget.getAttribute('data-mui-pickers-day');
        setBookingDate(moment(date));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submit booking form for', bookingDate.format('YYYY-MM-DD'));
        // Thực hiện hành động đăng ký bằng dữ liệu được nhập từ form booking
    };
    return (
        <div className="container">
            <nav>
                <a>
                    <svg
                        id="logo-38"
                        width="78"
                        height="32"
                        viewBox="0 0 78 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {' '}
                        <path d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z" class="ccustom" fill="#FF7A00"></path>{' '}
                        <path d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z" class="ccompli1" fill="#FF9736"></path>{' '}
                        <path d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z" class="ccompli2" fill="#FFBC7D"></path>{' '}
                    </svg>
                </a>
                <div>
                    <ul id="navbar">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/Booking">Booking</a>
                        </li>
                        <li>
                            <a href="/Blog">Blog</a>
                        </li>
                        <li>
                            <a href="/Services">Services</a>
                        </li>
                        <li>
                            <a href="/Staff">Staff</a>
                        </li>
                        <li>
                            <a href="/Login">Login</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="main">
                <div className="main-content">
                    <div>
                        <h1>Being a barber is about taking care of the people.</h1>
                    </div>
                    <div>
                        <p>
                            {' '}
                            Rem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
                        </p>
                    </div>
                </div>

                <div className="main-calendar">
                    <Cal onDayClick={handleDayClick} />
                    {bookingDate && (
                        <form onSubmit={handleSubmit}>
                            <h2>Booking for {bookingDate.format('YYYY-MM-DD')}</h2>
                            <label>
                                Name:
                                <input type="text" name="name" />
                            </label>
                            <label>
                                Email:
                                <input type="email" name="email" />
                            </label>
                            <label>
                                Phone:
                                <input type="tel" name="phone" />
                            </label>
                            <label>
                                Service:
                                <select name="service">
                                    <option value="Haircut">Haircut</option>
                                    <option value="Beard trim">Beard trim</option>
                                    <option value="Shave">Shave</option>
                                    <option value="Coloring">Coloring</option>
                                </select>
                            </label>
                            <input type="submit" value="Submit" />
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
