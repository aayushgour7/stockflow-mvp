import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalProducts: 0,
    totalInventory: 0,
    lowStockItems: [],
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/dashboard");

      setDashboardData(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load dashboard");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>
      <div className="mb-4">
  <Link
    to="/products"
    className="bg-black text-white px-4 py-2 rounded"
  >
    Products
  </Link>
</div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="border rounded p-4">
          <h2 className="text-lg font-medium">
            Total Products
          </h2>

          <p className="text-3xl font-bold">
            {dashboardData.totalProducts}
          </p>
        </div>

        <div className="border rounded p-4">
          <h2 className="text-lg font-medium">
            Total Inventory
          </h2>

          <p className="text-3xl font-bold">
            {dashboardData.totalInventory}
          </p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">
        Low Stock Items
      </h2>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">SKU</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Threshold</th>
          </tr>
        </thead>

        <tbody>
          {dashboardData.lowStockItems.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.sku}</td>
              <td className="border p-2">{item.quantity}</td>
              <td className="border p-2">
                {item.lowStockThreshold}
              </td>
            </tr>
          ))}

          {dashboardData.lowStockItems.length === 0 && (
            <tr>
              <td
                colSpan="4"
                className="border p-4 text-center"
              >
                No low stock items
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;