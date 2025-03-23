import React from 'react';
import { Grid, Paper, Typography, Box, Card, CardContent, List, ListItem, ListItemText, Divider } from '@mui/material';
import { WarningAmber, Inventory, LocalShipping, Store } from '@mui/icons-material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Mock data for the dashboard
  const stats = {
    totalItems: 1245,
    lowStockItems: 18,
    pendingOrders: 7,
    activeSuppliers: 12
  };

  // Mock data for low stock alerts
  const lowStockAlerts = [
    { id: 1, name: 'Cotton Fabric - Blue', category: 'Fabric', currentStock: 5, minStock: 10 },
    { id: 2, name: 'Buttons - Small White', category: 'Accessories', currentStock: 20, minStock: 50 },
    { id: 3, name: 'Zipper - 6 inch', category: 'Accessories', currentStock: 15, minStock: 30 }
  ];

  // Mock data for the chart
  const chartData = {
    labels: ['T-Shirts', 'Jeans', 'Dresses', 'Jackets', 'Skirts'],
    datasets: [
      {
        label: 'Sales Last Month',
        data: [65, 59, 80, 81, 56],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Top Selling Products',
      },
    },
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom component="div">
        Dashboard
      </Typography>
      
      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}> {/* Reduced spacing */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#e3f2fd' }}>
            <CardContent>
              <Inventory sx={{ fontSize: 40, color: '#1976d2', mb: 1 }} />
              <Typography variant="h5" component="div">
                {stats.totalItems}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Items in Inventory
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#fff8e1' }}>
            <CardContent>
              <WarningAmber sx={{ fontSize: 40, color: '#ff9800', mb: 1 }} />
              <Typography variant="h5" component="div">
                {stats.lowStockItems}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Low Stock Alerts
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#e8f5e9' }}>
            <CardContent>
              <LocalShipping sx={{ fontSize: 40, color: '#43a047', mb: 1 }} />
              <Typography variant="h5" component="div">
                {stats.pendingOrders}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending Orders
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#f3e5f5' }}>
            <CardContent>
              <Store sx={{ fontSize: 40, color: '#9c27b0', mb: 1 }} />
              <Typography variant="h5" component="div">
                {stats.activeSuppliers}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Suppliers
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Charts and Tables */}
      <Grid container spacing={2}> {/* Reduced spacing */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 400 }}>
            <Typography variant="h6" gutterBottom component="div">
              Sales Overview
            </Typography>
            <Box sx={{ height: '90%', position: 'relative' }}>
              <Bar options={chartOptions} data={chartData} />
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 400 }}>
            <Typography variant="h6" gutterBottom component="div">
              Low Stock Alerts
            </Typography>
            <List sx={{ width: '100%', bgcolor: 'background.paper', overflow: 'auto', maxHeight: 320 }}>
              {lowStockAlerts.map((item) => (
                <React.Fragment key={item.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={item.name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {item.category}
                          </Typography>
                          {` — Current Stock: ${item.currentStock} (Min: ${item.minStock})`}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;