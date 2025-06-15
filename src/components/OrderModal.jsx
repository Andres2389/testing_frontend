// src/components/OrderModal.jsx
import React from "react";
import { FaTimes } from "react-icons/fa";

const OrderModal = ({ order, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={18} />
        </button>
        <h2 className="text-2xl font-bold mb-4">Pedido {order.codigoRecogida}</h2>
        <p className="text-sm text-gray-500 mb-4">
          Fecha: {new Date(order.createdAt).toLocaleString()}
        </p>

        <table className="w-full text-left mb-4">
          <thead>
            <tr>
              <th className="py-2">Producto</th>
              <th className="py-2">Cantidad</th>
              <th className="py-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((it) => (
              <tr key={it.product}>
                <td className="py-2">{it.nombre}</td>
                <td className="py-2">{it.cantidad}</td>
                <td className="py-2">${it.subTotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">Total:</span>
          <span className="font-bold">${order.total.toFixed(2)}</span>
        </div>

        <div className="text-right">
          <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
            {order.estado}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
