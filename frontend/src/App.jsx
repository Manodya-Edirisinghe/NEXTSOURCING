import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/layout/Layout'
import Dashboard from './components/dashboard/Dashboard'
import InventoryList from './components/inventory/ProductList'
import AddProductForm from './components/inventory/forms/addProducts'
import EditProductForm from './components/inventory/forms/editProducts'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventory" element={<InventoryList />} />
          <Route path="/inventory/addProduct" element={<AddProductForm />} />
          <Route path="/inventory/editProduct/:id" element={<EditProductForm />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
