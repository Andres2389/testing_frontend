// src/components/AdminOrderTable.jsx
import React from "react";

export default function AdminOrderTable({ orders, onView }) {
  if (!orders.length) {
    return (
      <p className="text-center text-gray-600 mt-10">
        No hay pedidos por el momento.
      </p>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-6xl mx-auto mt-6 overflow-x-auto">
      <table className="min-w-[700px] w-full text-sm text-left border-separate border-spacing-y-2">
        <thead>
          <tr className="bg-[#0056A6] text-white">
            <th className="px-4 py-3">Código</th>
            <th className="px-4 py-3">Cliente</th>
            <th className="px-4 py-3">Total</th>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id} className="bg-gray-50 hover:bg-gray-100 transition">
              <td className="px-4 py-3">{o.codigoRecogida}</td>
              <td className="px-4 py-3">{o.user.nombre}</td>
              <td className="px-4 py-3">${o.total.toFixed(2)}</td>
              <td className="px-4 py-3 capitalize">{o.estado}</td>
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => onView(o)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Ver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
