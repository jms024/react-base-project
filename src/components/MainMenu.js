/*
* App top menu for navigation. It features 2 menus; dropdown menu which appears for xs viewport and tab menu for md
* viewport and bigger
*/

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltop, MenuItem }from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const pages = [
    {name: 'page1', path: '/page1', label: 'Page 1'},
    {name: 'page2', path: '/page2', label: 'Page 2'},
    {name: 'page3', path: '/page3', label: 'Page 3'}
];

export default React.memo((props) => {
    const [activeTab, setActiveTab] = React.useState(null),
        isNavOpen = !!activeTab,
        navigate = useNavigate();

    const handleOpenMenu = (e) => {
        setActiveTab(e.currentTarget);
    }

    const handleCloseMenu = () => {
        setActiveTab(null);
    }

    const handleMenuItemClick = (path) => {
        navigate(path);
        setActiveTab(null);
    }

    return (
        <AppBar>
            <Toolbar>
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                    <IconButton
                        size="large"
                        onClick={handleOpenMenu}
                        color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <Menu id="sm-main-menu"
                          open={isNavOpen}
                          onClose={handleCloseMenu}
                          anchorEl={activeTab}
                          keepMounted>
                        { pages.map((page) => (
                            <MenuItem
                                key={page.name}
                                onClick={() => handleMenuItemClick(page.path)}>
                                <Typography>{ page.label }</Typography>
                            </MenuItem>
                        )) }
                    </Menu>
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    { pages.map((page) => (
                        <Button
                            key={page.name}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            onClick={() => handleMenuItemClick(page.path)}>
                            { page.label }
                        </Button>
                    )) }
                </Box>
            </Toolbar>
        </AppBar>
    )
})