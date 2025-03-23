import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  TextField,
  Box,
  Typography,
  Button,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Chip
} from '@mui/material';
import { Edit, Delete, Add, FilterList } from '@mui/icons-material';

// Mock data for inventory items
const mockInventoryItems = [
  { id: 1, name: 'Cotton T-Shirt', category: 'T-Shirts', stock: 120, price: 15.99, supplier: 'Cotton Suppliers Inc.' },
  { id: 2, name: 'Denim Jeans', category: 'Jeans', stock: 85, price: 39.99, supplier: 'Denim World' },
  { id: 3, name: 'Summer Dress', category: 'Dresses', stock: 45, price: 29.99, supplier: 'Fashion Fabrics' },
  { id: 4, name: 'Winter Jacket', category: 'Jackets', stock: 30, price: 89.99, supplier: 'Winter Wear Ltd.' },
  { id: 5, name: 'Pleated Skirt', category: 'Skirts', stock: 60, price: 24.99, supplier: 'Fashion Fabrics' },
  { id: 6, name: 'Silk Blouse', category: 'Tops', stock: 40, price: 34.99, supplier: 'Silk Road Textiles' },
  { id: 7, name: 'Wool Sweater', category: 'Sweaters', stock: 25, price: 49.99, supplier: 'Winter Wear Ltd.' },
  { id: 8, name: 'Cargo Pants', category: 'Pants', stock: 70, price: 44.99, supplier: 'Denim World' },
  { id: 9, name: 'Formal Shirt', category: 'Shirts', stock: 55, price: 32.99, supplier: 'Cotton Suppliers Inc.' },
  { id: 10, name: 'Leather Belt', category: 'Accessories', stock: 90, price: 19.99, supplier: 'Leather Goods Co.' },
  { id: 11, name: 'Cotton Socks', category: 'Accessories', stock: 8, price: 5.99, supplier: 'Cotton Suppliers Inc.' },
  { id: 12, name: 'Denim Shorts', category: 'Shorts', stock: 65, price: 29.99, supplier: 'Denim World' },
];

// Mock categories and suppliers for filters
const categories = ['T-Shirts', 'Jeans', 'Dresses', 'Jackets', 'Skirts', 'Tops', 'Sweaters', 'Pants', 'Shirts', 'Accessories', 'Shorts'];
const suppliers = ['Cotton Suppliers Inc.', 'Denim World', 'Fashion Fabrics', 'Winter Wear Ltd.', 'Silk Road Textiles', 'Leather Goods Co.'];

const InventoryList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [supplierFilter, setSupplierFilter] = useState('');
  const [lowStockOnly, setLowStockOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Handle sorting
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter and sort data
  const filteredData = mockInventoryItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === '' || item.category === categoryFilter;
    const matchesSupplier = supplierFilter === '' || item.supplier === supplierFilter;
    const matchesLowStock = !lowStockOnly || item.stock < 30; // Assuming items with stock < 30 are low stock

    return matchesSearch && matchesCategory && matchesSupplier && matchesLowStock;
  });

  // Sort data
  const sortedData = filteredData.sort((a, b) => {
    const isAsc = order === 'asc';
    if (orderBy === 'name' || orderBy === 'category' || orderBy === 'supplier') {
      return isAsc ? a[orderBy].localeCompare(b[orderBy]) : b[orderBy].localeCompare(a[orderBy]);
    } else {
      return isAsc ? a[orderBy] - b[orderBy] : b[orderBy] - a[orderBy];
    }
  });

  // Paginate data
  const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setSupplierFilter('');
    setLowStockOnly(false);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="div">
          Inventory Management
        </Typography>
        <Button variant="contained" color="primary" startIcon={<Add />}>
          Add New Item
        </Button>
      </Box>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <TextField
              label="Search Inventory"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: '40%' }}
            />
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </Button>
          </Box>

          {showFilters && (
            <Box sx={{ mb: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={categoryFilter}
                      label="Category"
                      onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                      <MenuItem value="">All Categories</MenuItem>
                      {categories.map((category) => (
                        <MenuItem key={category} value={category}>{category}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Supplier</InputLabel>
                    <Select
                      value={supplierFilter}
                      label="Supplier"
                      onChange={(e) => setSupplierFilter(e.target.value)}
                    >
                      <MenuItem value="">All Suppliers</MenuItem>
                      {suppliers.map((supplier) => (
                        <MenuItem key={supplier} value={supplier}>{supplier}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Stock Status</InputLabel>
                    <Select
                      value={lowStockOnly ? 'low' : 'all'}
                      label="Stock Status"
                      onChange={(e) => setLowStockOnly(e.target.value === 'low')}
                    >
                      <MenuItem value="all">All Items</MenuItem>
                      <MenuItem value="low">Low Stock Only</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button variant="outlined" onClick={clearFilters} fullWidth>
                    Clear Filters
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {searchTerm && (
              <Chip label={`Search: ${searchTerm}`} onDelete={() => setSearchTerm('')} />
            )}
            {categoryFilter && (
              <Chip label={`Category: ${categoryFilter}`} onDelete={() => setCategoryFilter('')} />
            )}
            {supplierFilter && (
              <Chip label={`Supplier: ${supplierFilter}`} onDelete={() => setSupplierFilter('')} />
            )}
            {lowStockOnly && (
              <Chip label="Low Stock Only" onDelete={() => setLowStockOnly(false)} />
            )}
          </Box>

          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'name'}
                      direction={orderBy === 'name' ? order : 'asc'}
                      onClick={() => handleRequestSort('name')}
                    >
                      Item Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'category'}
                      direction={orderBy === 'category' ? order : 'asc'}
                      onClick={() => handleRequestSort('category')}
                    >
                      Category
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      active={orderBy === 'stock'}
                      direction={orderBy === 'stock' ? order : 'asc'}
                      onClick={() => handleRequestSort('stock')}
                    >
                      Stock
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      active={orderBy === 'price'}
                      direction={orderBy === 'price' ? order : 'asc'}
                      onClick={() => handleRequestSort('price')}
                    >
                      Price ($)
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'supplier'}
                      direction={orderBy === 'supplier' ? order : 'asc'}
                      onClick={() => handleRequestSort('supplier')}
                    >
                      Supplier
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((item) => (
                  <TableRow hover key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        {item.stock < 30 ? (
                          <Chip size="small" label={item.stock} color="warning" sx={{ mr: 1 }} />
                        ) : (
                          item.stock
                        )}
                      </Box>
                    </TableCell>
                    <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell align="center">
                      <IconButton size="small" color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default InventoryList;