import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Formik } from 'formik';
import * as yup from 'yup';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
    Box,
    Button,
    useTheme,
    Typography,
    OutlinedInput,
    ListItemText,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    TextField,
    useMediaQuery,
} from '@mui/material';

import { tokens } from '../../theme';
import * as barberServices from '../../../services/barberServices';

function BarberCreate() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery('(min-width:600px)');

    //State info of barber
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [forte, setForte] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [birthday, setBirthday] = useState(dayjs('2022-04-17'));
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await barberServices.addNewBarber({
                barbername: fullName,
                birthday: dayjs(birthday).format('YYYY-MM-DD'),
                phonenumber: phone,
                address: address,
                forte: forte,
                description: description,
                image: imageUrl,
            });
            navigate('/Admin/team');
            console.log(result);
        } catch (error) {}
    };

    //Handle image
    const [imageUrl, setImageUrl] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        console.log(file, 'sád');
        const reader = new FileReader();

        reader.onloadend = () => {
            setImageUrl(reader.result);
            console.log(reader.result);
        };

        reader.readAsDataURL(file);
    };

    return (
        <Box>
            <Typography variant="h2" color={colors.blueAccent[500]} fontWeight="bold" sx={{ m: '0 0 10px 0' }}>
                NEW BARBER
            </Typography>

            <form onSubmit={handleFormSubmit}>
                <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                        '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
                    }}
                >
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Full Name"
                        onChange={(event) => setFullName(event.target.value)}
                        value={fullName}
                        name="fullname"
                        sx={{ gridColumn: 'span 2' }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Phone Number"
                        onChange={(event) => setPhone(event.target.value)}
                        value={phone}
                        name="phonenumber"
                        sx={{ gridColumn: 'span 2' }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Address"
                        onChange={(event) => setAddress(event.target.value)}
                        value={address}
                        name="address"
                        sx={{ gridColumn: 'span 2' }}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Birthday"
                            value={birthday}
                            onChange={(newValue) => setBirthday(newValue)}
                            sx={{ gridColumn: 'span 2' }}
                        />
                    </LocalizationProvider>

                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Barber Forte"
                        onChange={(event) => setForte(event.target.value)}
                        value={forte}
                        name="forte"
                        sx={{ gridColumn: 'span 4' }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Description"
                        onChange={(event) => setDescription(event.target.value)}
                        value={description}
                        name="description"
                        sx={{ gridColumn: 'span 4' }}
                    />
                    <Box
                        sx={{
                            gridColumn: 'span 4',
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                        }}
                    >
                        {!imageUrl ? (
                            <img
                                src={require(`../../../assets/webImages/no_image.jpg`)}
                                alt="No Available Image"
                                height="200"
                            />
                        ) : (
                            <img src={imageUrl} alt="Uploaded Image" height="200" />
                        )}
                        <label htmlFor="upload-image">
                            <Button variant="contained" component="span" size="large">
                                Upload
                            </Button>
                            <input id="upload-image" hidden accept="image/*" type="file" onChange={handleFileUpload} />
                        </label>
                    </Box>
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                    <Button type="submit" color="secondary" variant="contained">
                        Create New User
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

export default BarberCreate;
