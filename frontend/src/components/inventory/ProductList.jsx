// InventoryList.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import "./productList.css";

const ProductList = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products/");
      setInventory(res.data);
    } catch (err) {
      console.error("Error fetching inventory:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (id) => {
    navigate(`/inventory/editProduct/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;
  
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      
      // Remove the deleted item from the state
      setInventory((prevInventory) => prevInventory.filter((item) => item._id !== id));
      
      alert("Item deleted successfully!");
    } catch (err) {
      console.error("Error deleting item:", err);
      alert("Failed to delete item. Please try again.");
    }
  };
  

  return (
    <div className="inventory-container">
      <Typography variant="h4" className="inventory-title">
        Product Management
      </Typography>
      <input
        type="text"
        className="search-input"
        placeholder="Search Inventory"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button
        className="add-button"
        onClick={() => navigate("/inventory/addProduct")}
      >
        ➕ Add New Item
      </Button>

      <TableContainer component={Paper}>
        <Table className="inventory-table">
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Price (Rs.)</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : filteredInventory.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No records found
                </TableCell>
              </TableRow>
            ) : (
              filteredInventory.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    {item.stock <= 10 ? (
                      <span className="low-stock">{item.stock}</span>
                    ) : (
                      item.stock
                    )}
                  </TableCell>
                  <TableCell>Rs.{item.price.toFixed(2)}</TableCell>
                  <TableCell>{item.supplier}</TableCell>
                  <TableCell>
                    <span
                      className="action-icons edit-icon"
                      onClick={() => handleEdit(item._id)}
                    >
                      ✏
                    </span>
                    <span 
                      className="action-icons delete-icon" 
                      onClick={() => handleDelete(item._id)}
                    >
                      🗑
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductList;
