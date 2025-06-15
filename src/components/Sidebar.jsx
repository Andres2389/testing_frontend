import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaUser, FaBox, FaDashcube, FaCartArrowDown } from "react-icons/fa";
import Logo from "../assets/logo.png";

const Sidebar = ({ user: propUser, onLogout, menuOpen, setMenuOpen }) => {
  const [user, setUser] = useState(propUser || null);

  useEffect(() => {
    if (!propUser) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) setUser(storedUser);
    } else {
      setUser(propUser);
    }
  }, [propUser]);

  const isAdmin = user?.rol === "admin";

  const adminItems = [
    { name: "Dashboard", icon: <FaDashcube />, path: "/dashboard" },
    { name: "Usuarios",   icon: <FaUser />,     path: "/admin/usuarios" },
    { name: "Productos",  icon: <FaBox />,      path: "/admin/productos" },
    { name: "Pedidos",  icon: <FaCartArrowDown />,      path: "/admin/pedidos" },

  ];

  const userItems = [
    { name: "Dashboard", icon: <FaDashcube />, path: "/dashboard" },
    { name: "Pedidos", icon: <FaCartArrowDown />, path: "/pedidos" },
  
  ];

  const menuItems = isAdmin ? adminItems : userItems;

  return (
    <>
      {menuOpen && (
        <div
          className="fixed inset-0 bg-[#0056A]/20 backdrop-blur-sm z-10 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div
        className={`bg-[#0056A] w-64 shadow-lg fixed md:relative z-20 transition-transform duration-300 md:translate-x-0 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:block flex flex-col justify-start h-screen`}
      >
        {/* Logo y título */}
        <div className="p-4 flex items-center justify-between bg-[#0056A]">
          <div className="flex items-center">
            <img src={Logo} alt="SENA Logo" className="h-20 mr-2" />
          </div>
          <button
            className="md:hidden text-[#0056A]"
            onClick={() => setMenuOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        {/* Contenido alineado arriba */}
        <div className="p-4 text-left overflow-y-auto flex-1">
          <div className="mb-6">
            <p className="font-medium">Bienvenido,</p>
            <p className="font-semibold">{user?.nombre || "Usuario"}</p>
            <p className="text-sm italic capitalize">{user?.rol || "usuario"}</p>
          </div>

          <nav className="flex flex-col gap-3">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 text-[#0056A] hover:text-[#0056A] transition-colors p-2 rounded-md"
            >
              <FaDashcube /> Inicio
            </Link>
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-gray-700 hover:text-[#0056A6] transition-colors p-2 rounded-md"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Botón de logout */}
        <div className="p-4">
          <button
            onClick={onLogout}
            className="w-full bg-[#0056A6] text-white px-4 py-2 rounded hover:bg-[#0056A6] transition"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
