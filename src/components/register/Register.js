import React, { useState } from "react";
import './register.css';
import { Link } from "react-router-dom";
import { colors } from "@mui/material";

const Register = (props) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submit booking form for', props.bookingDate.format('YYYY-MM-DD'));
        // Thực hiện hành động đăng ký bằng dữ liệu được nhập từ form booking
    }

    return (
        <div>
            Register

            <form onSubmit={handleSubmit} style={{ width: '300px', height: '500px', backgroundColor: 'white', colors: 'black' }}>
                <h2>Booking for {props.bookingDate.format('YYYY-MM-DD')}</h2>
                <label>
                    Name:
                    <input type='text' name='name' />
                </label>
                <label>
                    Email:
                    <input type='email' name='email' />
                </label>
                <label>
                    Phone:
                    <input type='tel' name='phone' />
                </label>
                <label>
                    Service:
                    <select name='service'>
                        <option value='Haircut'>Haircut</option>
                        <option value='Beard trim'>Beard trim</option>
                        <option value='Shave'>Shave</option>
                        <option value='Coloring'>Coloring</option>
                    </select>
                </label>
                <input type='submit' value='Submit' style={{ fontSize: '25px' }} />
                <div className="title-register">
                    <p>Not a member? </p>
                    <Link to='/register'>Register</Link>
                </div>
            </form>

        </div>
    )
}

export default Register;