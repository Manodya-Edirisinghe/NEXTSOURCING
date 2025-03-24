import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./addProducts.css";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    supplier: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      const product = await response.json();
      setFormData({
        name: product.name,
        price: product.price,
        stock: product.stock,
        supplier: product.supplier,
      });
    } catch (error) {
      setMessage("Error fetching product data.");
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Price must be greater than 0";
    if (!formData.stock || formData.stock < 0)
      newErrors.stock = "Stock must be a positive number";
    if (!formData.supplier.trim())
      newErrors.supplier = "Supplier name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          supplier: formData.supplier,
        }),
      });

      if (response.ok) {
        setMessage("Product updated successfully!");
        navigate("/inventory");
      } else {
        setMessage("Error updating product. Please try again.");
      }
    } catch (error) {
      setMessage("Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Edit Product</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="form">
        <fieldset className="form-group">
          <label>
            Product Name
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            {errors.name && <p className="error">{errors.name}</p>}
          </label>

          <label>
            Price (LKR)
            <input type="number" name="price" value={formData.price} onChange={handleChange} required />
            {errors.price && <p className="error">{errors.price}</p>}
          </label>

          <label>
            Stock Quantity
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />
            {errors.stock && <p className="error">{errors.stock}</p>}
          </label>

          <label>
            Supplier Name
            <input type="text" name="supplier" value={formData.supplier} onChange={handleChange} required />
            {errors.supplier && <p className="error">{errors.supplier}</p>}
          </label>
        </fieldset>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}
