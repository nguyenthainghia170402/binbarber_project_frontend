import { Box, useTheme } from '@mui/material';
import { Route, Routes } from 'react-router';
import Header from '../../components/Header';
import BookingList from './bookingList';
import BookingCreate from './bookingCreate';
import BookingEdit from './bookingEdit';

const Bookings = () => {
    return (
        <Box m="20px">
            <Header title="BOOKINGS" subtitle="List of Booking Balances" />
            <Box>
                <Routes>
                    <Route path="" element={<BookingList />} />
                    <Route path="create" element={<BookingCreate />} />
                    <Route path="edit/:bookingId" element={<BookingEdit />} />
                </Routes>
            </Box>
        </Box>
    );
};

export default Bookings;
