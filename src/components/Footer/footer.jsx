import React, { useState, useEffect } from 'react';
import './footer.scss';

function Footer() {
    return (
        <footer class="footer">
            <div class="footer-content">
                <div className="footer-content-left">
                    <ul class="footer-links">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="#">Booking</a>
                        </li>
                        <li>
                            <a href="#">Blog</a>
                        </li>
                        <li>
                            <a href="#">Services</a>
                        </li>
                        <li>
                            <a href="#">Staff</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-content-center">
                    <p>+84 3363 79418</p>
                    <p>79A Đào Duy Từ - P4 - Đà Lạt</p>
                </div>
                <div className="footer-content-right">
                    <p>&copy; 2023 Binbarber Shop. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
