// src/components/CartSidebar.jsx
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CartSidebar({ isOpen, onClose }) {
  const { items, totalItems, totalPrice, removeItem, clearCart } =
    useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user?._id) {
      toast.info("Por favor inicia sesión.");
      navigate("/login");
      return;
    }

    try {
      const payload = {
        userId: user._id,
        items: items.map(({ _id, cantidad }) => ({
          productId: _id,
          cantidad,
        })),
        total: totalPrice,
      };
      const { data } = await axios.post("/api/orders", payload);
      toast.success(`Pedido creado: ${data.order.codigo}`);
      clearCart();
      onClose();
      navigate("/pedidos");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error procesando pedido");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="flex-1" onClick={onClose} />

      {/* Sidebar */}
      <div
        className="w-80 bg-white shadow-xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-bold">Tu carrito ({totalItems})</h2>
          <button onClick={onClose}>
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-4">
          {items.length === 0 ? (
            <p>Carrito vacío</p>
          ) : (
            items.map((i) => (
              <div key={i._id} className="flex items-center mb-4">
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${i.imagen}`}
                  alt={i.nombre}
                  className="h-12 w-12 object-cover rounded mr-3"
                />
                <div className="flex-1">
                  <p className="font-medium">{i.nombre}</p>
                  <p>
                    {i.cantidad} × ${i.valor.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(i._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTimes />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t">
          <p className="font-semibold mb-2">Total: ${totalPrice.toFixed(2)}</p>
          <button
            onClick={handleCheckout}
            disabled={items.length === 0}
            className={`w-full py-2 rounded transition ${
              items.length === 0
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-[#0056A6] text-white hover:bg-[#004488]"
            }`}
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}
