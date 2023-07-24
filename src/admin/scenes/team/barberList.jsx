import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme, Avatar, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { tokens } from '../../theme';
import { mockDataTeam } from '../../data/mockData';
import * as barberServices from '../../../services/barberServices';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';

function BarberList() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        { field: 'id', headerName: 'ID', width: 20 },
        {
            field: 'barberName',
            headerName: 'Name',
            width: 150,
            cellClassName: 'name-column--cell',
        },
        // {
        //     field: 'age',
        //     headerName: 'Age',
        //     type: 'number',
        //     headerAlign: 'left',
        //     align: 'left',
        // },
        {
            field: 'birthday',
            headerName: 'Date',
            width: 120,
        },
        {
            field: 'phone',
            headerName: 'Phone Number',
            width: 90,
        },
        {
            field: 'forte',
            headerName: 'Forte',
            width: 120,
        },
        {
            field: 'address',
            headerName: 'Address',
            width: 150,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 400,
            renderCell: ({ row: { description } }) => {
                return (
                    <Typography display="block" width="400px" variant="body2" gutterBottom wrap="true">
                        {description}
                    </Typography>
                );
            },
        },
        {
            field: 'image',
            headerName: 'Avatar',
            width: 100,
            // renderCell: ({ row: { access } }) => {
            //     return (
            //         <Box
            //             width="60%"
            //             m="0 auto"
            //             p="5px"
            //             display="flex"
            //             justifyContent="center"
            //             backgroundColor={
            //                 access === 'admin'
            //                     ? colors.greenAccent[600]
            //                     : access === 'manager'
            //                     ? colors.greenAccent[700]
            //                     : colors.greenAccent[700]
            //             }
            //             borderRadius="4px"
            //         >
            //             {access === 'admin' && <AdminPanelSettingsOutlinedIcon />}
            //             {access === 'manager' && <SecurityOutlinedIcon />}
            //             {access === 'user' && <LockOpenOutlinedIcon />}
            //             <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
            //                 {access}
            //             </Typography>
            //         </Box>
            // );
            // },
            renderCell: ({ row: { image } }) => {
                return (
                    <Box width="60%" m="0 auto" p="5px" display="flex" justifyContent="center" borderRadius="4px">
                        <Avatar
                            src={require(`../../../assets/barberImages/${image}`)}
                            sx={{ width: '100px', height: '100px' }}
                        />
                    </Box>
                );
            },
        },
    ];

    //Get list barbers
    const [rows, setRows] = useState([]);
    const [barberSelected, setBarberSelected] = useState({});
    const getListBarbersData = async () => {
        try {
            const result = await barberServices.getListBarbers();
            const barbers = result.data['barbers'];
            console.log(barbers);
            const dataBarbers = barbers.map((barber) => {
                const dataBarber = {
                    id: barber.barberid,
                    barberName: barber.barbername,
                    birthday: barber.birthday,
                    phone: barber.phonenumber,
                    forte: barber.forte,
                    address: barber.address,
                    description: barber.description,
                    image: barber.image,
                };
                return dataBarber;
            });
            setRows(dataBarbers);
        } catch (error) {
            console.error(error);
        }
    };

    //handle selected row
    const handleRowClick = (params) => {
        setBarberSelected(params.row);
    };

    useEffect(() => {
        getListBarbersData();
    }, []); // call getListBarbersData only once when loading the component
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
            }}
        >
            <Typography variant="h3" color={colors.grey[100]} fontWeight="bold" sx={{ m: '0 0 10px 0' }}>
                List barbers
            </Typography>
            <DataGrid
                rows={rows}
                columns={columns}
                onRowClick={handleRowClick}
                hideFooterSelectedRowCount
                getRowHeight={() => 'auto'}
            />
            <Box display="flex" justifyContent="start" mt="20px">
                <Button component={Link} to="create" type="submit" sx={{ mr: 5 }} color="secondary" variant="contained">
                    Add Barber
                </Button>
            </Box>
        </Box>
    );
}

export default BarberList;
