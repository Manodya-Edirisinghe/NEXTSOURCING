import React from 'react';
import { Link } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  Box,
  Collapse,
  ListItemButton
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  Category as CategoryIcon,
  ShoppingCart as ProductsIcon,
  Store as WholesaleIcon,
  Search as SearchIcon,
  Assessment as ReportsIcon,
  ExpandLess,
  ExpandMore
} from '@mui/icons-material';

const drawerWidth = 240;

const Sidebar = ({ open }) => {
  const [inventoryOpen, setInventoryOpen] = React.useState(true);

  const handleInventoryClick = () => {
    setInventoryOpen(!inventoryOpen);
  };

  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar /> {/* This creates space for the AppBar */}
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          
          <ListItemButton onClick={handleInventoryClick}>
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Inventory" />
            {inventoryOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          
          <Collapse in={inventoryOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary="Assets" />
              </ListItemButton>
              
              <ListItemButton component={Link} to="/inventory" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ProductsIcon />
                </ListItemIcon>
                <ListItemText primary="Products" />
              </ListItemButton>
              
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <WholesaleIcon />
                </ListItemIcon>
                <ListItemText primary="Wholesale Products" />
              </ListItemButton>
            </List>
          </Collapse>
          
          <ListItem button>
            <ListItemIcon>
              <ReportsIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItem>
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default Sidebar;