import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Avatar } from '@mui/material';
import { Menu as MenuIcon, Notifications, ExitToApp } from '@mui/icons-material';

const Header = ({ toggleSidebar }) => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleSidebar}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Garment Inventory Management
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* <Button color="inherit" sx={{ mr: 2 }}>
            Manage Suppliers
          </Button>
          <Button color="inherit" sx={{ mr: 2 }}>
            Orders
          </Button>
          <Button color="inherit" sx={{ mr: 2 }}>
            Stock Alerts
          </Button>
          <IconButton color="inherit" sx={{ mr: 2 }}>
            <Notifications />
          </IconButton> */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ mr: 1 }}>
              Welcome, Inventory Manager!
            </Typography>
            <Avatar sx={{ width: 32, height: 32, mr: 1 }}>IM</Avatar>
            <IconButton color="inherit">
              <ExitToApp />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;