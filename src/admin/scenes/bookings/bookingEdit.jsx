import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
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

function BookingEdit() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    let { bookingId } = useParams();

    //Booking Detail
    const [oldBookingDetail, setOldBookingDetail] = useState({});

    //Booking Info
    const [bookingBarberID, setBookingBarberID] = useState(0);
    const [listServicesID, setListServicesID] = useState([]);

    //WorkTime
    const [worktime, setWorktime] = useState([]);
    //DateTime picker
    const [datetime, setDatetime] = useState(dayjs());

    //Handle Submit
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await bookingServices.editBooking(bookingId, {
                bookingdate: dayjs(datetime).format('YYYY-MM-DD'),
                bookingtime: dayjs(datetime).format('HH:mm:00'),
                oldbarberid: oldBookingDetail.barber.barberid,
                newbarberid: bookingBarberID,
                services: listServicesID,
                worktimeid: oldBookingDetail.worktimeid,
                customerid: 1,
            });
            navigate('/Admin/bookings');
            // console.log(bookingBarberID);
            // console.log(services);
            // console.log(datetime);
            console.log(result);
        } catch (error) {}
    };

    //Var barber
    const [barber, setBarber] = useState('');
    const [iniBarbers, setIniBarbers] = useState([]);

    const handleChange = (event, key) => {
        const barberid = key.key.slice(2);
        getBarberWorktime(barberid);
        setBookingBarberID(barberid);
        setBarber(event.target.value);
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
            const listServices = dataServices.map((service) => {
                return (
                    <MenuItem
                        key={service.serviceid}
                        value={`${service.serviceid}. ${service.servicename}`}
                        style={getStyles(service.servicename, services, theme)}
                    >
                        <ListItemText primary={`${service.serviceid}. ${service.servicename}`} />
                    </MenuItem>
                );
            });
            setInitServices(listServices);
        } catch (error) {
            console.error(error);
        }
    };

    //Call API to get List Barber
    const fetchListBarbers = async () => {
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

    //Call API to get booking detail have to edit
    const getBookingDetail = async () => {
        try {
            const result = await bookingServices.getBookingByID(bookingId);
            const bookingDetail = result.data;
            console.log(bookingDetail, 'bookingDetail');
            setOldBookingDetail(bookingDetail);
            //Set current booking services detail
            const tempServices = bookingDetail.services.map(
                (service) => `${service.serviceid}. ${service.servicename}`,
            );
            var arrayServicesID = [];
            for (var i = 0, l = tempServices.length; i < l; i++) {
                arrayServicesID.push(tempServices[i].slice(0, 1));
            }
            setListServicesID(arrayServicesID);
            setServices(tempServices);
            //Set current booking barber detail
            setBarber(bookingDetail.barber.barbername);
            getBarberWorktime(bookingDetail.barber.barberid);
            setBookingBarberID(bookingDetail.barber.barberid);
            //Set current booking datetime detail
            setDatetime(dayjs(`${bookingDetail.bookingdate}T${bookingDetail.bookingtime}`));
        } catch (error) {
            console.error(error);
        }
    };

    //Call API to get barber's worktime
    const getBarberWorktime = async (id) => {
        try {
            if (!oldBookingDetail.worktimeid) {
                return;
            }
            const result = await worktimeServices.getBarberWorktime(id);

            if (result.status === 404) {
                setWorktime([]);
            } else {
                const worktimes = result.data.worktimes;

                const dataWorktimes = worktimes.map((worktime) => {
                    console.log(oldBookingDetail.worktimeid, 'test');
                    const dataWorktime = {
                        id: worktime.worktimeid,
                        title: worktime.statework,
                        start: `${worktime.date}T${worktime.timefrom}`,
                        end: `${worktime.date}T${worktime.timeto}`,
                        color:
                            worktime.worktimeid === oldBookingDetail.worktimeid
                                ? colors.redAccent[500]
                                : worktime.statework === 'Wait for confirmation '
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

    useEffect(() => {
        getBookingDetail();
        fetchListBarbers();
        fetchListServices();
    }, []);
    useEffect(() => {
        getBarberWorktime(bookingBarberID); // Gọi hàm getBarberWorktime khi bookingBarberID thay đổi
    }, [bookingBarberID]);

    return (
        <Box>
            <Typography variant="h2" color={colors.blueAccent[500]} fontWeight="bold" sx={{ m: '0 0 10px 0' }}>
                EDIT BOOKING
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
                    MenuProps={MenuProps}
                >
                    {iniBarbers}
                </Select>
            </FormControl>

            {/* Calendar */}
            {oldBookingDetail.bookingdate === undefined ? (
                <div></div>
            ) : (
                <Box display="flex" justifyContent="space-between">
                    {/* CALENDAR */}
                    <Box flex="1 1 100%">
                        {console.log(oldBookingDetail.bookingdate, 'đâsdas')}
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
                            initialDate={oldBookingDetail.bookingdate}
                            events={worktime}
                        />
                    </Box>
                </Box>
            )}

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
                                    label="Booking Time"
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

export default BookingEdit;
