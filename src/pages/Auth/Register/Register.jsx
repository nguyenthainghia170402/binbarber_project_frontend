import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AppRegistrationRounded } from '@mui/icons-material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import * as authServices from '../../../services/authServices';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const boxStyles = {
    display: 'block',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    border: 1,
    borderRadius: '16px',
    borderColor: 'secondary.main',
    padding: '15px',
    textAlign: 'center',
};

const marginEle = {
    margin: '20px 0 0 0',
};

const styleAll = {
    width: '400px',
};

const styleTitle = {
    display: 'block',
    position: 'absolute',
    left: '50%',
    top: '0',
    transform: 'translate(-50%, -50%)',
    border: 1,
    borderRadius: '16px',
    borderColor: 'transparent',
    padding: '15px',
    backgroundColor: 'white',
    fontSize: '25px',
};

export const Register = () => {
    const navigate = useNavigate();

    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [birthday, setBirthday] = useState(dayjs('2022-04-17'));
    const [phonenumber, setPhonenumber] = useState('');
    const [open, setOpen] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(account);
    };

    const handleSnack = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const vertical = 'bottom';
    const horizontal = 'center';

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const fetchApi = async () => {
        const result = await authServices.register({
            customername: fullname,
            birthday: birthday.format('YYYY-MM-DD'),
            phonenumber: phonenumber,
            account: account,
            password: password,
        });
        if (result.status === 200) {
            navigate('/Login');
        } else {
            handleSnack();
            console.log(result.status);
        }
    };

    return (
        <>
            <React.Fragment>
                <Box sx={{ ...boxStyles }}>
                    <form onSubmit={handleSubmit}>
                        <Typography sx={{ ...styleTitle }} color="secondary.main" gutterBottom>
                            REGISTER FORM
                        </Typography>
                        <Box>
                            <Typography
                                sx={{ ...marginEle, ...styleAll, fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                Fullname
                            </Typography>
                            <TextField
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                                id="outlined-basic"
                                label="Fullname"
                                variant="outlined"
                                sx={{ ...styleAll, margin: '7px' }}
                            />
                        </Box>

                        <Box>
                            <Typography
                                sx={{ ...marginEle, ...styleAll, fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                Birthday
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    sx={{ ...styleAll, margin: '7px' }}
                                    label={' "month", "day" and "year"'}
                                    views={['year', 'month', 'day']}
                                    value={birthday}
                                    onChange={(newValue) => setBirthday(newValue)}
                                />
                            </LocalizationProvider>
                        </Box>

                        <Box>
                            <Typography
                                sx={{ ...marginEle, ...styleAll, fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                Phone
                            </Typography>
                            <TextField
                                value={phonenumber}
                                onChange={(e) => setPhonenumber(e.target.value)}
                                id="outlined-basic"
                                label="Phone"
                                variant="outlined"
                                sx={{ ...styleAll, margin: '7px' }}
                            />
                        </Box>

                        <Box>
                            <Typography
                                sx={{ ...marginEle, ...styleAll, fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                Account
                            </Typography>
                            <TextField
                                value={account}
                                onChange={(e) => setAccount(e.target.value)}
                                id="outlined-basic"
                                label="Account"
                                variant="outlined"
                                sx={{ ...styleAll, margin: '7px' }}
                            />
                        </Box>

                        <Box>
                            <Typography
                                sx={{ ...marginEle, ...styleAll, fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                Password
                            </Typography>
                            <FormControl sx={{ ...styleAll, m: 1 }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                    sx={{ ...styleAll }}
                                />
                            </FormControl>
                        </Box>

                        <Button
                            variant="contained"
                            endIcon={<AppRegistrationRounded />}
                            sx={{
                                ...marginEle,
                                ...styleAll,
                                background: 'linear-gradient(to right, #ad5389, #3c1053)!important;',
                            }}
                            onClick={fetchApi}
                        >
                            Register
                        </Button>
                    </form>
                </Box>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical, horizontal }}
                    key={vertical + horizontal}
                >
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        Your registration failed!
                    </Alert>
                </Snackbar>
            </React.Fragment>
        </>
    );
};
