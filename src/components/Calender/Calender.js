import React, { useState } from "react";

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { TextField } from "@mui/material";
import './calender.css';
import moment from 'moment'
import { useNavigate } from 'react-router-dom';

function Calender() {
    const navigate = useNavigate();
    const [value, setVaule] = React.useState(new Date());
    const [bookingDate, setBookingDate] = useState(null);

    const handleDayClick = (event) => {
        const date = event.currentTarget.getAttribute('data-mui-pickers-day');
        setBookingDate(moment(date));

    };

    if (bookingDate) {
        navigate('/login');
    }


    return (
        <div className="calender-container">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                    orientation="portrait"
                    openTo="day"
                    value={value}
                    className="calender-delete"
                    onChange={(date) => setBookingDate(date)}
                    onDayClick={handleDayClick}
                    disablePast

                    // onChange={(NewValue) => {
                    //     setVaule(NewValue);
                    // }}
                    renderInput={(params) => <TextField {...params} />
                    }
                    showToolbar={false} // Tắt toolbar
                />

            </LocalizationProvider>
            {/* {bookingDate && <Register />} */}


        </div>
    )
}
export default Calender;
