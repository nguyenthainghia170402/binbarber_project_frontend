import { Box, IconButton, useTheme } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import { InputBase } from '@mui/material';
import { useNavigate } from 'react-router';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import * as authServices from '../../../services/authServices';

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const logged = localStorage.getItem('user_id');
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            const result = await authServices.logout();
            if (result.status == 200) {
                localStorage.removeItem('user_id');
                navigate('/Login');
            }
        } catch (error) {}
    };
    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            {/*Search Bar*/}
            <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>

            {/*ICON*/}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
                </IconButton>
                <IconButton>
                    <NotificationsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <SettingsOutlinedIcon />
                </IconButton>
                {/* <IconButton>
                    <PersonOutlinedIcon />
                </IconButton> */}
                <IconButton onClick={handleLogout}>
                    <LogoutOutlinedIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Topbar;
