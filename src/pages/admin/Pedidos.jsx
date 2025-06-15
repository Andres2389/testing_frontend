// src/pages/admin/AdminOrderList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminOrderTable from "../../components/AdminOrderTable";
import AdminOrderModal from "../../components/AdminOrderModal";

export default function AdminOrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/orders`)
      .then(({ data }) => setOrders(data))
      .catch(() => toast.error("Error al cargar pedidos"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = orders.filter((o) =>
    o.codigoRecogida.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Cargando pedidos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 mb-6 text-center">
        <h1 className="text-3xl font-bold text-[#0056A6]">Pedidos (Admin)</h1>
      </div>

      {/* Search */}
      <div className="max-w-6xl mx-auto mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por código..."
          className="w-full sm:w-1/2 mx-auto block pl-4 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0056A6]"
        />
      </div>

      {/* Table */}
      <AdminOrderTable
        orders={filtered}
        onView={(order) => {
          setSelectedOrder(order);
          setShowModal(true);
        }}
      />

      {/* Modal */}
      {showModal && selectedOrder && (
        <AdminOrderModal
          order={selectedOrder}
          onClose={() => setShowModal(false)}
          onDelivered={(updated) => {
            // actualizar estado en tabla
            setOrders((prev) =>
              prev.map((o) => (o._id === updated._id ? updated : o))
            );
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
