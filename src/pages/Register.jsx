import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash, FaEnvelope, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import Logo from "../assets/logo.png";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    password: "",
    rol: "user", // fijo a usuario normal
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      if (storedUser.rol === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/register`, formData);
      toast.success("Usuario registrado correctamente. Redirigiendo...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error al registrar");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={Logo} alt=" Logo" className="h-14" />
        </div>

        <h2 className="text-2xl font-bold text-center mb-6 text-[#0056A6]">Crear Cuenta</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre con ícono */}
          <div className="relative">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre completo"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056A6] text-gray-700"
            />
            <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#0056A6]" />
          </div>

          {/* Correo con ícono */}
          <div className="relative">
            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={formData.correo}
              onChange={handleChange}
              required
              className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056A6] text-gray-700"
            />
            <FaEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#0056A6]" />
          </div>

          {/* Contraseña con ojito */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056A6] text-gray-700"
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#0056A6] cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* Botón registrar */}
          <button
            type="submit"
            className="w-full bg-[#0056A6] text-white px-4 py-3 rounded-lg hover:bg-[#004488] transition"
          >
            Registrarse
          </button>
        </form>

        {/* Enlaces abajo */}
        <div className="mt-6 flex flex-col items-center gap-2 text-sm text-[#0056A6]">
          <Link to="/login" className="font-medium hover:text-[#3399FF] transition">
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
          <Link to="/" className="font-medium hover:text-[#3399FF] transition">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
