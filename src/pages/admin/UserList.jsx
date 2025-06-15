import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminUserTable from "../../components/AdminUserTable";
import AdminEditUserModal from "../../components/AdminEditUserModal";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Logo from "../../assets/logo.png";

const UserList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchUsuarios = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users`);
      setUsuarios(data);
    } catch {
      toast.error("Error al obtener usuarios");
    } finally {
      setLoading(false);
    }
  };

  const eliminarUsuario = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará al usuario permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/users/${id}`);
        setUsuarios((u) => u.filter((x) => x._id !== id));
        toast.success("Usuario eliminado correctamente");
      } catch {
        toast.error("Error al eliminar usuario");
      }
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/${selectedUser._id}`,
        selectedUser
      );
      setUsuarios((u) =>
        u.map((x) => (x._id === data.user._id ? data.user : x))
      );
      setShowModal(false);
      toast.success("Usuario actualizado correctamente");
    } catch {
      toast.error("Error al actualizar usuario");
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const filtered = usuarios.filter(
    (u) =>
      u.nombre.toLowerCase().includes(search.toLowerCase()) ||
      u.correo.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Cargando usuarios...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Cabecera centrada y responsive */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 mb-6 flex flex-col items-center text-center">
        <img src={Logo} alt="Farmacenter Logo" className="h-20 mb-4" />
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0056A6]">
          Gestión de Usuarios
        </h1>
      </div>

      {/* Tabla y buscador */}
      <AdminUserTable
        usuarios={paginated}
        onEdit={openEditModal}
        onDelete={eliminarUsuario}
        searchTerm={search}
        setSearchTerm={(val) => {
          setSearch(val);
          setCurrentPage(1);
        }}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Modal de edición */}
      {showModal && selectedUser && (
        <AdminEditUserModal
          selectedUser={selectedUser}
          onClose={() => setShowModal(false)}
          onChange={setSelectedUser}
          onSave={handleSaveChanges}
        />
      )}
    </div>
  );
};

export default UserList;
