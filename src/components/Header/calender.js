import React from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { TextField } from "@mui/material";
import './calender.css';


function Cal() {
    const [value, setVaule] = React.useState(new Date());

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker
                orientation="portrait"
                openTo="day"
                value={value}
                className="calender-delete"

                onChange={(NewValue) => {
                    setVaule(NewValue);
                }}
                renderInput={(params) => <TextField {...params} />
                }
                showToolbar={false} // Tắt toolbar
            />
        </LocalizationProvider>
    )
}
export default Cal;
