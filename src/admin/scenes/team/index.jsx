import { Box } from '@mui/material';
import { Route, Routes } from 'react-router';
import Header from '../../components/Header';
import BarberList from './barberList';
import BarberCreate from './barberCreate';
import BarberEdit from './barberEdit';
const Team = () => {
    return (
        <Box m="20px">
            <Header title="TEAM" subtitle="Managing the Team Members" />
            <Box>
                <Routes>
                    <Route path="" element={<BarberList />} />
                    <Route path="create" element={<BarberCreate />} />
                    <Route path="edit/:barberId" element={<BarberEdit />} />
                </Routes>
            </Box>
        </Box>
    );
};

export default Team;
