import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/layout/Layout'
import Dashboard from './components/dashboard/Dashboard'
import InventoryList from './components/inventory/InventoryList'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventory" element={<InventoryList />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
