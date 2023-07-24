import { useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { ColorModeContext, useMode } from '../theme';
import Topbar from '../scenes/global/TopBar';
import Sidebar from '../scenes/global/SideBar';
import Dashboard from '../scenes/dashboard/index';
import Team from '../scenes/team/index';
import Bookings from '../scenes/bookings/index';
import Contacts from '../scenes/contacts/index';
import Bar from '../scenes/bar/index';
import Form from '../scenes/form/index';
import Line from '../scenes/line/index';
import Pie from '../scenes/pie/index';
import FAQ from '../scenes/faq/index';
import Calendar from '../scenes/calendar/index';

import BookingList from '../scenes/bookings/bookingList';
import BookingCreate from '../scenes/bookings/bookingCreate';
import BookingEdit from '../scenes/bookings/bookingEdit';

const AdminApp = () => {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <Sidebar isSidebar={isSidebar} />
                    <main className="content">
                        <Topbar setIsSidebar={setIsSidebar} />
                        <Routes>
                            <Route path="" element={<Dashboard />} />
                            <Route path="team/*" element={<Team />} />
                            <Route path="contacts/*" element={<Contacts />} />
                            <Route path="bookings/*" element={<Bookings />} />
                            <Route path="form" element={<Form />} />
                            <Route path="bar" element={<Bar />} />
                            <Route path="pie" element={<Pie />} />
                            <Route path="line" element={<Line />} />
                            <Route path="faq" element={<FAQ />} />
                            <Route path="calendar" element={<Calendar />} />
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default AdminApp;
