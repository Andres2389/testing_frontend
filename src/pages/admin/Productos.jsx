// src/pages/admin/Productos.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import AdminProductsTable from "../../components/AdminProductsTable";
import AdminEditProductsModal from "../../components/AdminEditProductsModal";
import Logo from "../../assets/logo.png";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const itemsPerPage = 5;

  // Fetch productos dentro de un useEffect normal
  const fetchProductos = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/productos`);
      setProductos(data);
    } catch {
      toast.error("Error al obtener productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const eliminarProducto = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el producto permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/productos/${id}`);
        setProductos((p) => p.filter((x) => x._id !== id));
        toast.success("Producto eliminado correctamente");
      } catch {
        toast.error("Error al eliminar producto");
      }
    }
  };

  const openEditModal = (p) => {
    setSelectedProduct(p);
    setIsEditing(true);
    setShowModal(true);
  };

  const openCreateModal = () => {
    setSelectedProduct({
      nombre: "",
      cantidad: "",
      descripcion: "",
      categoria: "",
      imagen: null,
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      const form = new FormData();
      form.append("nombre", selectedProduct.nombre);
      form.append("cantidad", selectedProduct.cantidad);
      form.append("valor", selectedProduct.valor);
      form.append("descripcion", selectedProduct.descripcion);
      if (selectedProduct.imagen instanceof File) {
        form.append("imagen", selectedProduct.imagen);
      }
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/productos/${selectedProduct._id}`,
        form
      );
      setProductos((p) =>
        p.map((x) => (x._id === data.producto._id ? data.producto : x))
      );
      toast.success("Producto actualizado correctamente");
      setShowModal(false);
    } catch {
      toast.error("Error al actualizar producto");
    }
  };

  const handleCreateProduct = async () => {
    try {
      const form = new FormData();
      form.append("nombre", selectedProduct.nombre);
      form.append("cantidad", selectedProduct.cantidad);
      form.append("valor", selectedProduct.valor);
      form.append("descripcion", selectedProduct.descripcion);
      if (selectedProduct.imagen instanceof File) {
        form.append("imagen", selectedProduct.imagen);
      }
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/productos`,
        form
      );
      setProductos((p) => [...p, data.producto]);
      toast.success("Producto creado exitosamente");
      setShowModal(false);
    } catch {
      toast.error("Error al crear producto");
    }
  };

  const filtered = productos.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Cabecera */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 mb-6 flex items-center">
        <img src={Logo} alt="SENA Logo" className="h-10 mr-4" />
        <h1 className="text-2xl font-bold text-[#0056A6]-700">
          Gestión de Productos
        </h1>
      </div>

      {/* Tabla y buscador */}
      <AdminProductsTable
        productos={paginated}
        onEdit={openEditModal}
        onDelete={eliminarProducto}
        onCreate={openCreateModal}
        searchTerm={search}
        setSearchTerm={(val) => {
          setSearch(val);
          setCurrentPage(1);
        }}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Modal */}
      {showModal && selectedProduct && (
        <AdminEditProductsModal
          product={selectedProduct}
          onClose={() => setShowModal(false)}   
          onChange={setSelectedProduct}
          onSave={handleSaveChanges}
          onCreate={handleCreateProduct}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};

export default Productos;
