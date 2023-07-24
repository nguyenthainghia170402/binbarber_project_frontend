import { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Typography,
    useTheme,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
    Alert,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { tokens } from '../../theme';
import * as bookingServices from '../../../services/bookingServices';

const BookingList = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        { field: 'id', headerName: 'ID' },
        {
            field: 'customerName',
            headerName: 'Customer Name',
            flex: 1,
            cellClassName: 'name-column--cell',
        },
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
    const navigate = useNavigate();

    //Handle snackbar
    //Success
    const [openSuccessSnack, setOpenSuccessSnack] = useState(false);
    const handleCloseSuccessSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSuccessSnack(false);
    };

    //Success

    //Warining
    const [openWarningSnack, setOpenWarningSnack] = useState(false);
    const handleCloseWarningSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenWarningSnack(false);
    };
    //Warining

    //Info
    const [openInfoSnack, setOpenInfoSnack] = useState(false);
    const handleCloseInfoSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenInfoSnack(false);
    };
    //Info
    //Handle snackbar

    //Handle update
    const handleClickUpdate = () => {
        if (Object.keys(bookingSelected).length === 0 && bookingSelected.constructor === Object) {
            setOpenWarningSnack(true);
        } else if (bookingSelected.state == 'Confirmed') {
            setOpenInfoSnack(true);
        } else {
            navigate(`edit/${bookingSelected.id}`);
        }
    };
    //Handle update

    //Handle confirm
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const handleClickOpenConfirmDialog = () => {
        if (Object.keys(bookingSelected).length === 0 && bookingSelected.constructor === Object) {
            setOpenWarningSnack(true);
        } else if (bookingSelected.state == 'Confirmed') {
            setOpenInfoSnack(true);
        } else {
            setOpenConfirmDialog(true);
        }
    };

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
    };
    const handleConfirmBooking = async () => {
        try {
            if (Object.keys(bookingSelected).length === 0 && bookingSelected.constructor === Object) {
                console.log('Object rỗng');
            } else {
                const result = await bookingServices.confirmBooking(bookingSelected.id);
                if (result.status === 200) {
                    setOpenSuccessSnack(true);
                    setOpenConfirmDialog(false);
                    fetchBookingData();
                }
            }
        } catch (error) {
            console.error(error);
        }
    };
    //Handle confirm

    //Handle delete
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const handleClickOpenDeleteDialog = () => {
        if (Object.keys(bookingSelected).length === 0 && bookingSelected.constructor === Object) {
            setOpenWarningSnack(true);
        } else {
            setOpenDeleteDialog(true);
        }
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const handleDeleteBooking = async () => {
        try {
            if (Object.keys(bookingSelected).length === 0 && bookingSelected.constructor === Object) {
                console.log('Object rỗng');
            } else {
                const result = await bookingServices.deleteBooking(bookingSelected.id);
                if (result.status === 200) {
                    setOpenSuccessSnack(true);
                    setOpenDeleteDialog(false);
                    fetchBookingData();
                }
            }
        } catch (error) {
            console.error(error);
        }
    };
    //Handle delete
    const [rows, setRows] = useState([]);
    const [bookingSelected, setBookingSelected] = useState({});

    const fetchBookingData = async () => {
        try {
            const result = await bookingServices.getListBooking();
            const bookings = result.data['bookings'];
            console.log(bookings);
            const dataBookings = bookings.map((booking) => {
                const dataBooking = {
                    id: booking.bookingid,
                    customerName: booking.customer['customername'],
                    barberName: booking.barber['barbername'],
                    bookingDate: booking.bookingdate,
                    bookingTime: booking.bookingtime,
                    services: booking.services.map((service) => service.servicename).join(', '),
                    state: booking.state,
                };

                return dataBooking;
            });
            setRows(dataBookings);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchBookingData();
    }, []); // call fetchBookingData only once when loading the component

    //handle selected row
    const handleRowClick = (params) => {
        setBookingSelected(params.row);
    };

    return (
        <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
                '& .MuiDataGrid-root': {
                    border: 'none',
                },
                '& .MuiDataGrid-cell': {
                    borderBottom: 'none',
                },
                '& .name-column--cell': {
                    color: colors.greenAccent[300],
                },
                '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: 'none',
                },
                '& .MuiDataGrid-virtualScroller': {
                    backgroundColor: colors.primary[400],
                },
                '& .MuiDataGrid-footerContainer': {
                    borderTop: 'none',
                    backgroundColor: colors.blueAccent[700],
                },
                '& .MuiCheckbox-root': {
                    color: `${colors.greenAccent[200]} !important`,
                },
                '& .Mui-selected': {
                    backgroundColor: `${colors.blueAccent[500]} !important`,
                    '&:hover': {
                        backgroundColor: `${colors.blueAccent[600]} !important`,
                    },
                },
            }}
        >
            <Typography variant="h3" color={colors.grey[100]} fontWeight="bold" sx={{ m: '0 0 10px 0' }}>
                List bookings
            </Typography>
            <DataGrid rows={rows} columns={columns} onRowClick={handleRowClick} hideFooterSelectedRowCount />
            <Box display="flex" justifyContent="start" mt="20px">
                <Button component={Link} to="create" type="submit" sx={{ mr: 5 }} color="secondary" variant="contained">
                    Add Booking
                </Button>
                {/* <Button
                    component={Link}
                    to={`edit/${bookingSelected.id}`}
                    type="submit"
                    sx={{ mr: 5, color: colors.primary, bgcolor: colors.blueAccent[500] }}
                    color="secondary"
                    variant="contained"
                >
                    Update Booking
                </Button> */}
                <Button
                    type="submit"
                    sx={{ mr: 5, color: colors.primary, bgcolor: colors.blueAccent[500] }}
                    color="secondary"
                    variant="contained"
                    onClick={handleClickUpdate}
                >
                    Update Booking
                </Button>
                {/* {Confirm function} */}
                <Button
                    type="submit"
                    sx={{ mr: 5, color: colors.primary, bgcolor: colors.greenAccent[100] }}
                    color="secondary"
                    variant="contained"
                    onClick={handleClickOpenConfirmDialog}
                >
                    Confirm Booking
                </Button>
                <Dialog
                    open={openConfirmDialog}
                    onClose={handleCloseConfirmDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{'Confirm booking?'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">{`Confirm booking barber ${bookingSelected.barberName} with services ${bookingSelected.services} at ${bookingSelected.bookingTime} on ${bookingSelected.bookingDate}`}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            sx={{ color: 'white', fontWeight: 700, bgcolor: colors.redAccent[500] }}
                            onClick={handleCloseConfirmDialog}
                        >
                            No
                        </Button>
                        <Button
                            sx={{ color: 'white', fontWeight: 700, bgcolor: colors.greenAccent[500] }}
                            onClick={handleConfirmBooking}
                            autoFocus
                        >
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar open={openSuccessSnack} autoHideDuration={3000} onClose={handleCloseSuccessSnack}>
                    <Alert
                        onClose={handleCloseSuccessSnack}
                        severity="success"
                        sx={{ width: '100%', bgcolor: '#2E7D32' }}
                    >
                        Successfully!
                    </Alert>
                </Snackbar>
                <Snackbar open={openWarningSnack} autoHideDuration={3000} onClose={handleCloseWarningSnack}>
                    <Alert
                        onClose={handleCloseWarningSnack}
                        severity="warning"
                        sx={{ width: '100%', bgcolor: '#ED6C02' }}
                    >
                        Choose a booking please!
                    </Alert>
                </Snackbar>
                <Snackbar open={openInfoSnack} autoHideDuration={3000} onClose={handleCloseInfoSnack}>
                    <Alert onClose={handleCloseInfoSnack} severity="info" sx={{ width: '100%', bgcolor: '#0288D1' }}>
                        This booking was comfirmed!
                    </Alert>
                </Snackbar>
                {/* {Confirm function} */}
                {/* {Delete function} */}
                <Button
                    type="submit"
                    sx={{ mr: 5, color: colors.primary, bgcolor: colors.redAccent[500] }}
                    variant="contained"
                    onClick={handleClickOpenDeleteDialog}
                >
                    Delete Booking
                </Button>
                <Dialog
                    open={openDeleteDialog}
                    onClose={handleCloseDeleteDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{'Delete booking?'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">{`Delete booking barber ${bookingSelected.barberName} with services ${bookingSelected.services} at ${bookingSelected.bookingTime} on ${bookingSelected.bookingDate}`}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            sx={{ color: 'white', fontWeight: 700, bgcolor: colors.redAccent[500] }}
                            onClick={handleCloseDeleteDialog}
                        >
                            No
                        </Button>
                        <Button
                            sx={{ color: 'white', fontWeight: 700, bgcolor: colors.greenAccent[500] }}
                            onClick={handleDeleteBooking}
                            autoFocus
                        >
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
                {/* {Delete function} */}
            </Box>
        </Box>
    );
};

export default BookingList;
