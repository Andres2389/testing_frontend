// src/components/AdminProductsTable.js
import React from "react";
import { FaSearch, FaBox, FaEdit, FaTrash } from "react-icons/fa";

const AdminProductsTable = ({
  productos,
  onEdit,
  onDelete,
  onCreate,
  searchTerm,
  setSearchTerm,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-5xl mx-auto mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#0056A6] flex items-center gap-2">
          <FaBox /> Lista de Productos
        </h2>
        <button
          onClick={onCreate}
          className="bg-[#0056A6] text-white px-4 py-2 rounded hover:bg-[#3399FF] transition"
        >
          + Nuevo Producto
        </button>
      </div>

      <div className="relative max-w-sm mx-auto mb-6">
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre..."
          className="w-full pl-10 pr-4 py-2 border border-[#B0C4DE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[700px] w-full text-sm text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-[#0056A6] text-white">
              <th className="px-4 py-3">Imagen</th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Cantidad</th>
              <th className="px-4 py-3">Valor</th>
              <th className="px-4 py-3">Descripción</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr
                key={p._id}
                className="bg-gray-50 hover:bg-[#0056A6]/10 transition"
              >
                <td className="px-4 py-3">
                  {p.imagen ? (
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${p.imagen}`}
                      alt="producto"
                      className="h-12 w-12 object-cover rounded-md"
                    />
                  ) : (
                    <span className="text-gray-400 italic">Sin imagen</span>
                  )}
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {p.nombre}
                </td>
                <td className="px-4 py-3 text-gray-700">{p.cantidad}</td>
                <td className="px-4 py-3 text-gray-700">{p.valor}</td>
                <td className="px-4 py-3 text-gray-700">{p.descripcion}</td>
                <td className="px-4 py-3 text-center space-x-2">
                  <button
                    onClick={() => onEdit(p)}
                    className="text-yellow-500 hover:text-yellow-600 text-xl"
                    title="Editar"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete(p._id)}
                    className="text-red-600 hover:text-red-700 text-xl"
                    title="Eliminar"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => onPageChange(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-[#0056A6]-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProductsTable;
