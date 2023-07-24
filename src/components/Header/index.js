import './style.css';
import React, { useEffect, useState } from 'react';
// import { Home } from '../pages/Home';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../background/binbarber-shop-logo3.png';
import * as authServices from '../../services/authServices';

const Header = () => {
    const navigate = useNavigate();
    const logged = localStorage.getItem('user_id');

    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = () => {
        const scrollTop = window.pageYOffset;

        // Kiểm tra vị trí cuộn trang
        if (scrollTop > 0) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        // Đăng ký sự kiện cuộn trang
        window.addEventListener('scroll', handleScroll);

        // Hủy đăng ký sự kiện khi component bị hủy
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLogout = async () => {
        try {
            const result = await authServices.logout();
            if (result.status == 200) {
                localStorage.removeItem('user_id');
                navigate('/');
            }
        } catch (error) {}
    };

    return (
        <div className={`header ${isScrolled ? 'header-scroll' : ''}`}>
            <div className="header-logo">
                <img className="logo" src={logo} alt="Logo" />
                {/* <h1 className='container-title'> BINBARBER HAIRCUT</h1> */}
            </div>
            <div className="navbar">
                <Link className="navbar-link" to="/">
                    Home
                </Link>
                <Link className="navbar-link" to="/booking">
                    Booking
                </Link>
                <Link className="navbar-link" to="/blog">
                    Blog
                </Link>
                <Link className="navbar-link" to="/services">
                    Services
                </Link>
                <Link className="navbar-link" to="/staff">
                    Staff
                </Link>
                {logged ? (
                    <Link className="navbar-link" onClick={handleLogout}>
                        Logout
                    </Link>
                ) : (
                    <Link className="navbar-link" to="/login">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};
export default Header;
