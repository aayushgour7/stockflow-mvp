import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    sku: "",
    description: "",
    quantity: 0,
    costPrice: "",
    sellingPrice: "",
    lowStockThreshold: 5,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/products", {
        ...form,
        quantity: Number(form.quantity),
        costPrice: Number(form.costPrice),
        sellingPrice: Number(form.sellingPrice),
        lowStockThreshold: Number(form.lowStockThreshold),
      });

      alert("Product created successfully");

      navigate("/products");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to create product"
      );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Add Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-lg"
      >
        <input
          name="name"
          placeholder="Product Name"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <input
          name="sku"
          placeholder="SKU"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <input
          type="number"
          name="costPrice"
          placeholder="Cost Price"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <input
          type="number"
          name="sellingPrice"
          placeholder="Selling Price"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <input
          type="number"
          name="lowStockThreshold"
          placeholder="Low Stock Threshold"
          className="border p-2 w-full mb-3"
          defaultValue={5}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;