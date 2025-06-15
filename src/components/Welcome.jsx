import React from "react";
import Logo from "../assets/logo.png"; 
const Welcome = ({ user }) => {
  const rolTexto = user?.rol === "admin" ? "Administrador" : "Usuario";
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-4xl">
        <div className="flex flex-col items-center mb-8 text-center">
          <img src={Logo} alt="Farmacenter Logo" className="h-20 mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0056A6]">
            Bienvenido al Panel de Administración de Costehuilense
          </h1>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Bienvenido, <span className="text-[#0056A6]">{user?.nombre}</span>!
        </h2>
        <p className="text-gray-600 mb-6">
          Has ingresado como <span className="italic text-gray-800">{rolTexto}</span>.
        </p>

        {user?.rol === "admin" && (
          <div className="bg-[#E0F2FE] border-l-4 border-[#0056A6] p-4 rounded mb-4">
            <p className="text-[#0056A6] font-medium">
              Tienes acceso completo a todas las funcionalidades del panel.
            </p>
          </div>
        )}

        {user?.rol === "user" && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mb-4">
            <p className="text-yellow-700 font-medium">
              Puedes gestionar tu perfil y ver tus pedidos.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;