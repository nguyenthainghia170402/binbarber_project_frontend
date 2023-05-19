import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const Register = () => {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(account);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="account">Account</label>
                <input value={account} onChange={(e) => setAccount(e.target.value)} placeholder="Your account" />
                <label htmlFor="password">Password</label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="********"
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label={'"year", "month" and "day"'} views={['year', 'month', 'day']} />
                </LocalizationProvider>
                <button type="submit">Log In</button>
            </form>
            <button>Don't have an account? Register here.</button>
        </>
    );
};
