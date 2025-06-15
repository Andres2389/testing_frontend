// src/pages/Pedidos.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderTable from "../components/OrderTable";
import OrderModal from "../components/OrderModal";
import { toast } from "react-toastify";

const Pedidos = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user._id) {
        toast.info("Por favor inicia sesión.");
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/orders/my?userId=${user._id}`
        );
        setOrders(res.data);
      } catch {
        toast.error("Error al cargar tus pedidos");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
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
      {/* Cabecera */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 mb-6 text-center">
        <h1 className="text-3xl font-bold text-[#0056A6]">Mis Pedidos</h1>
      </div>

      {/* Buscador */}
      <div className="max-w-6xl mx-auto mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por código..."
          className="w-full sm:w-1/2 mx-auto block pl-4 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0056A6]"
        />
      </div>

      {/* Tabla */}
      <OrderTable
        orders={filtered}
        onView={(order) => {
          setSelectedOrder(order);
          setShowModal(true);
        }}
      />

      {/* Modal */}
      {showModal && selectedOrder && (
        <OrderModal order={selectedOrder} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default Pedidos;
