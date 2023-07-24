import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
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
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';

import { tokens } from '../../admin/theme';
import './booking.scss';
import * as barberServices from '../../services/barberServices';
import * as worktimeServices from '../../services/worktimeServices';
import * as servicesServices from '../../services/servicesServices';
import * as bookingServices from '../../services/bookingServices';
import Header from '../Header';
import Footer from '../Footer/footer';

//Select services
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            backgroundColor: '#c2c2c2',
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
    };
}
//Select services

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Booking() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const user_id = localStorage.getItem('user_id');
    const navigate = useNavigate();

    //List customer's bookings
    const columns = [
        { field: 'id', headerName: 'ID' },
        {
            field: 'barberName',
            headerName: 'Barber Name',
            flex: 1,
            cellClassName: 'name-column--cell',
        },
        {
            field: 'bookingDate',
            headerName: 'Date',
            flex: 1,
        },
        {
            field: 'bookingTime',
            headerName: 'Time',
            flex: 1,
        },
        {
            field: 'services',
            headerName: 'Services Name',
            flex: 3,
            // renderCell: (params) => <Typography color={colors.greenAccent[500]}>${params.row.cost}</Typography>,
        },
        {
            field: 'state',
            headerName: 'State',
            flex: 1,
        },
    ];

    const [rows, setRows] = useState([]);

    const fetchBookingData = async () => {
        try {
            const result = await bookingServices.getListBookingByCusID(user_id);
            if (result.status == 200) {
                const bookings = result.data['bookings'];
                console.log(bookings);
                const dataBookings = bookings.map((booking) => {
                    const dataBooking = {
                        id: booking.bookingid,
                        barberName: booking.barber['barbername'],
                        bookingDate: booking.bookingdate,
                        bookingTime: booking.bookingtime,
                        services: booking.services.map((service) => service.servicename).join(', '),
                        state: booking.state,
                    };

                    return dataBooking;
                });
                setRows(dataBookings);
            }
        } catch (error) {
            console.error(error);
        }
    };

    //Dialog
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    //Booking Info
    const [bookingBarberID, setBookingBarberID] = useState(0);
    const [listServicesID, setListServicesID] = useState([]);

    //WorkTime
    const [worktime, setWorktime] = useState([]);
    //DateTime picker
    const [datetime, setDatetime] = useState(dayjs());

    //Var barber
    const [barber, setBarber] = useState('');
    const [iniBarbers, setIniBarbers] = useState([]);

    const handleChange = (event, key) => {
        const barberid = key.key.slice(2);
        getBarberWorktime(barberid);
        setBookingBarberID(barberid);
        setBarber(event.target.value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            if (user_id) {
                const result = await bookingServices.addNewBooking({
                    bookingdate: dayjs(datetime).format('YYYY-MM-DD'),
                    bookingtime: dayjs(datetime).format('HH:mm:00'),
                    barberid: bookingBarberID,
                    services: listServicesID,
                    customerid: user_id,
                });
                navigate('/');
                setOpenDialog(false);
                console.log(result);
            } else {
                navigate('/Login');
            }
        } catch (error) {}
    };

    //Select services
    const [initServices, setInitServices] = useState([]);
    const [services, setServices] = useState([]);

    const handleChangeServices = (event) => {
        const {
            target: { value },
        } = event;
        setServices(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );

        var arrayServices = event.target.value;
        var arrayServicesID = [];
        for (var i = 0, l = arrayServices.length; i < l; i++) {
            arrayServicesID.push(arrayServices[i].slice(0, 1));
        }

        setListServicesID(arrayServicesID);
    };

    //Select services

    //Call API to get list services
    const fetchListServices = async () => {
        try {
            const result = await servicesServices.getListServices();
            const services = result.data['services'];
            const dataServices = services.map((service) => {
                const dataService = {
                    serviceid: service.serviceid,
                    servicename: service.servicename,
                };

                return dataService;
            });
            const listServices = dataServices.map((service) => (
                <MenuItem
                    key={service.serviceid}
                    value={`${service.serviceid}.${service.servicename}`}
                    style={getStyles(service.servicename, services, theme)}
                >
                    <ListItemText primary={`${service.serviceid}.${service.servicename}`} />
                </MenuItem>
            ));
            setInitServices(listServices);
        } catch (error) {
            console.error(error);
        }
    };

    //Call API to get barber's worktime
    const getBarberWorktime = async (id) => {
        try {
            const result = await worktimeServices.getBarberWorktime(id);

            if (result.status === 404) {
                setWorktime([]);
            } else {
                const worktimes = result.data.worktimes;

                const dataWorktimes = worktimes.map((worktime) => {
                    const dataWorktime = {
                        id: worktime.worktimeid,
                        title: worktime.statework,
                        start: `${worktime.date}T${worktime.timefrom}`,
                        end: `${worktime.date}T${worktime.timeto}`,
                        color:
                            worktime.statework === 'Wait for confirmation '
                                ? colors.greenAccent[500]
                                : colors.grey[600],
                    };

                    return dataWorktime;
                });
                setWorktime(dataWorktimes);
            }
        } catch (error) {
            console.log(error);
        }
    };

    //Call API to get List Barber
    const getListBarbers = async () => {
        try {
            const result = await barberServices.getListBarbers();
            const barbers = result.data['barbers'];
            const dataBarbers = barbers.map((barber) => {
                const dataBarber = {
                    barberid: barber.barberid,
                    barberName: barber.barbername,
                };

                return dataBarber;
            });
            const listBarbers = dataBarbers.map((barber) => (
                <MenuItem key={barber.barberid} value={barber.barberName}>
                    {barber.barberName}
                </MenuItem>
            ));
            setIniBarbers(listBarbers);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getListBarbers();
        fetchListServices();
        fetchBookingData();
    }, []);

    return (
        <>
            <div className="container-header">
                <Header />
            </div>
            <Container fixed sx={{ mt: '100px', mb: '20px' }}>
                <Typography className="title-booking" variant="h2" sx={{ m: '0 0 10px 0' }}>
                    YOUR BOOKINGS
                </Typography>
                <DataGrid rows={rows} columns={columns} hideFooterSelectedRowCount />

                <Typography className="title-booking" variant="h2" sx={{ m: '20px 0 10px 0' }}>
                    ADD NEW BOOKING
                </Typography>

                <Typography className="subtitle-booking" variant="h3" fontWeight="bold" sx={{}}>
                    Barber's Worktime
                </Typography>

                {/* Select box choose barber */}
                <FormControl sx={{ m: 1, width: 200 }}>
                    <InputLabel id="demo-simple-select-label">Barbers</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={barber}
                        label="Barbers"
                        onChange={handleChange}
                    >
                        {iniBarbers}
                    </Select>
                </FormControl>

                {/* Calendar */}
                <Box display="flex" justifyContent="space-between">
                    {/* CALENDAR */}
                    <Box flex="1 1 100%">
                        <FullCalendar
                            height="75vh"
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                            headerToolbar={{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'timeGridWeek,timeGridDay,listMonth',
                            }}
                            initialView="timeGridWeek"
                            selectMirror={true}
                            dayMaxEvents={true}
                            events={worktime}
                        />
                    </Box>
                </Box>

                {/* Form info booking */}
                <Box>
                    <Typography className="subtitle-booking" variant="h3" fontWeight="bold" sx={{ m: '10px 0 10px 0' }}>
                        Booking info
                    </Typography>

                    <Box>
                        <FormControl sx={{ marginBottom: '15px', width: '270px' }}>
                            <InputLabel id="demo-multiple-checkbox-label">Services</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={services}
                                onChange={handleChangeServices}
                                input={<OutlinedInput label="Tag" />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {initServices}
                            </Select>
                        </FormControl>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimeField', 'DateTimeField']}>
                                <DateTimeField
                                    sx={{ marginBottom: '15px', width: '250px' }}
                                    label="Controlled field"
                                    value={datetime}
                                    onChange={(newValue) => setDatetime(newValue)}
                                    disablePast
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box>
                    <Box display="flex" justifyContent="center" mt="20px">
                        <Button
                            size="large"
                            type="submit"
                            color="success"
                            variant="contained"
                            onClick={handleClickOpenDialog}
                            sx={{ backgroundColor: '#9f7150' }}
                        >
                            BOOKING
                        </Button>
                        <Dialog
                            open={openDialog}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleCloseDialog}
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle>{'Confirm Booking'}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    Do you want to confirm your booking?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseDialog}>No</Button>
                                <Button onClick={handleFormSubmit}>Yes</Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                </Box>
            </Container>
            <Footer />
        </>
    );
}

export default Booking;
