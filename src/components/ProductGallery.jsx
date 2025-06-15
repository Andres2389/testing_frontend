// src/components/ProductGallery.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import ProductModal from "./ProductModal";
import { FaSyringe, FaTimes, FaUtensils } from "react-icons/fa";

const ProductGallery = ({ openSidebar }) => {
  const [productos, setProductos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 8;

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      try {
        const endpoint = searchTerm
          ? `${import.meta.env.VITE_API_BASE_URL}/api/productos/buscar?query=${searchTerm}`
          : `${import.meta.env.VITE_API_BASE_URL}/api/productos/productos-gallery?page=${page}&limit=${limit}`;
        const res = await axios.get(endpoint);
        const nuevos = searchTerm ? res.data : res.data.productos;
        if (searchTerm) {
          setProductos(nuevos);
          setHasMore(false);
        } else {
          setProductos(nuevos);
          setHasMore(nuevos.length === limit);
        }
      } catch (err) {
        console.error("Error cargando productos", err);
      }
      setLoading(false);
    };
    fetchProductos();
  }, [page, searchTerm]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setPage(1);
    setProductos([]);
    setHasMore(!value);
  };

  // reset search on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setSearchTerm("");
        setPage(1);
        setProductos([]);
        setHasMore(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="py-12 w-full max-w-7xl mx-auto px-4">
      {/* Header + buscador */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-6 bg-white p-6 rounded-xl shadow-lg border border-blue-100">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-800 flex items-center gap-2">
          <FaUtensils className="text-blue-600" />
          CARTA DE COSTEHUILENSE
        </h2>
        <div className="w-full sm:w-[400px] relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="🔍 Buscar producto por nombre..."
            className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
          {searchTerm && (
            <button
              onClick={() => handleSearchChange({ target: { value: "" } })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productos.map((p, i) => (
          <div
            key={`${p._id}-${i}`}
            className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 cursor-pointer flex flex-col justify-between"
            onClick={() => setSelected(p)}
          >
            <div>
              <div className="w-full h-40 flex items-center justify-center mb-4">
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${p.imagen}`}
                  alt={p.nombre}
                  className="max-h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold">{p.nombre}</h3>
              <p className="text-[#0056A6] font-bold">${p.valor}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      {loading && <p className="text-center mt-4">Cargando productos...</p>}
      {!loading && productos.length === 0 && (
        <p className="text-center mt-4 text-red-500">No hay productos.</p>
      )}
      {!searchTerm && productos.length > 0 && (
        <div className="flex justify-center mt-10 space-x-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-500"
          >
            Anterior
          </button>
          <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
            Página {page}
          </span>
          <button
            onClick={() => hasMore && setPage((p) => p + 1)}
            disabled={!hasMore}
            className="px-4 py-2 rounded-lg border bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-500"
          >
            Siguiente
          </button>
        </div>
      )}

      {/* Modal */}
      {selected && (
        <ProductModal
          product={selected}
          onClose={() => setSelected(null)}
          openSidebar={openSidebar}
        />
      )}
    </section>
  );
};

export default ProductGallery;
