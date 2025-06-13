import React from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    IconButton,
    Avatar,
    useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import Logo from '../Assest/Images/beleaf_logo.webp';

const Navbar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <AppBar position="static" sx={{ background: 'linear-gradient(to right, #00c9a7, #1cb5e0)' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box display="flex" alignItems="center">
                    {isMobile && (
                        <IconButton color="inherit" edge="start" sx={{ mr: 1 }}>
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography variant="h6" noWrap component="div">
                        <img
                            src={Logo}
                            alt="logo"
                            style={{
                                height: '50px',
                                width: 'auto',
                                objectFit: 'contain',
                            }}
                        />
                    </Typography>

                </Box>

                <Box display="flex" alignItems="center">
                    <IconButton>
                        <Avatar
                            alt="Profile"
                            src="https://mui.com/static/images/avatar/1.jpg"
                            sx={{ width: 36, height: 36 }}
                        />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
