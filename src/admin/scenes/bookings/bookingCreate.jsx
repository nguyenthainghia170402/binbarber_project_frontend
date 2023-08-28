import { useState, useEffect } from 'react';
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
} from '@mui/material';
import * as yup from 'yup';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';

import { tokens } from '../../theme';
import * as barberServices from '../../../services/barberServices';
import * as worktimeServices from '../../../services/worktimeServices';
import * as servicesServices from '../../../services/servicesServices';
import * as bookingServices from '../../../services/bookingServices';

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

function BookingCreate() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

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
            const result = await bookingServices.addNewBooking({
                bookingdate: dayjs(datetime).format('YYYY-MM-DD'),
                bookingtime: dayjs(datetime).format('HH:mm:00'),
                barberid: bookingBarberID,
                services: listServicesID,
                customerid: 1,
            });
            navigate('/Admin/bookings');
            console.log(result);
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
                    {/* <Checkbox checked={services.indexOf(service.servicename) > -1} /> */}
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
    }, []);

    return (
        <Box>
            <Typography variant="h2" color={colors.blueAccent[500]} fontWeight="bold" sx={{ m: '0 0 10px 0' }}>
                NEW BOOKING
            </Typography>

            <Typography variant="h3" color={colors.grey[100]} fontWeight="bold" sx={{ m: '0 0 10px 0' }}>
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
                        // editable={true}
                        // selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        // select={handleDateClick}
                        // eventClick={handleEventClick}
                        // eventsSet={(events) => setCurrentEvents(events)}
                        events={worktime}
                    />
                </Box>
            </Box>

            {/* Form info booking */}
            <Box>
                <Typography variant="h3" color={colors.grey[100]} fontWeight="bold" sx={{ m: '10px 0 10px 0' }}>
                    Booking info
                </Typography>

                <form onSubmit={handleFormSubmit}>
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
                    <Box display="flex" justifyContent="start" mt="20px">
                        <Button type="submit" color="secondary" variant="contained">
                            BOOKING
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}

const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
    firstName: yup.string().required('required'),
    lastName: yup.string().required('required'),
    email: yup.string().email('invalid email').required('required'),
    contact: yup.string().matches(phoneRegExp, 'Phone number is not valid').required('required'),
    address1: yup.string().required('required'),
    address2: yup.string().required('required'),
});
const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    address1: '',
    address2: '',
};

export default BookingCreate;
