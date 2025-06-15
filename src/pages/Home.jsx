// src/pages/Home.jsx
import { useEffect, useState, useContext } from "react";
import Logo from "../assets/logohome.png";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserTie,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaUserPlus,
} from "react-icons/fa";
import ProductGallery from "../components/ProductGallery";
import FloatingWhatsAppButton from "../components/FloatingWhatsAppButton";
import ScrollToTopButton from "../components/ScrollToTopButton";
import FloatingCartButton from "../components/FloatingCartButton";
import CartSidebar from "../components/CartSidebar";
import { CartContext } from "../context/CartContext";


const Home = () => {
  const [user, setUser] = useState(null);
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { totalItems } = useContext(CartContext);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

const cerrarSesion = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  setUser(null);           // Limpiar estado local
  navigate("/");      // Redirigir al login
};

  return (
    <div className="min-h-screen bg-[#E6F0FA] flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-[#003366] text-white">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center py-4 px-4 sm:px-6 gap-4">
          <img src={Logo} alt="Logo" className="h-15" />
          <div className="flex items-center flex-wrap justify-center gap-4">
           {!user ? (
                    <>
                      <Link
                        to="/register"
                        className="hidden sm:flex px-4 py-2 border-2 border-white rounded-full text-sm hover:bg-white hover:text-[#0056A6] transition"
                      >
                        <FaUserPlus /> Registrarse
                      </Link>
                      <Link
                        to="/login"
                        className="hidden sm:flex px-4 py-2 border-2 border-white rounded-full text-sm hover:bg-white hover:text-[#0056A6] transition"
                      >
                        <FaUserTie /> Iniciar Sesión
                      </Link>
                    </>
                  ) : (
                    <>
                      <span className="hidden sm:block text-sm">
                        Bienvenido, <strong>{user.nombre}</strong>
                      </span>
                      {user.rol === "admin" ? (
                        <Link
                          to="/admin"
                          className="px-4 py-2 border-2 border-white rounded-full text-sm hover:bg-white hover:text-[#0056A6] transition"
                        >
                          Panel Admin
                        </Link>
                      ) : (
                        <Link
                          to="/dashboard"
                          className="px-4 py-2 border-2 border-white rounded-full text-sm hover:bg-white hover:text-[#0056A6] transition"
                        >
                          Mi Panel
                        </Link>
                      )}
                      <button
                        onClick={cerrarSesion}
                        className="px-4 py-2 border-2 border-white rounded-full text-sm hover:bg-white hover:text-[#0056A6] transition"
                      >
                        Cerrar sesión
                      </button>
                    </>
                  )}

            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/19CbmLLyFg/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={24} className="hover:text-[#3399FF]" />
              </a>
              
              <a
                href="https://wa.me/57233170328"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp size={24} className="hover:text-[#3399FF]" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Product Gallery + Cart */}
      <ProductGallery openSidebar={() => setSidebarOpen(true)} />
      <FloatingCartButton
        onClick={() => setSidebarOpen(true)}
        totalItems={totalItems}
      />
      <CartSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Other Floating Buttons */}
      <FloatingWhatsAppButton />
      <ScrollToTopButton />

      {/* Footer */}
      <footer className="w-full bg-[#003366] text-white py-8 px-4 mt-auto">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h4 className="text-2xl font-semibold mb-1 inline-block">
              Contacto
              <span className="block h-0.5 bg-white mt-1 w-[50vw] max-w-[300px]" />
            </h4>
            <p>📍 Cra 4 # 5-23, Garzon, Huila</p>
            <p>📞 3233170328</p>

            <h4 className="text-2xl font-semibold mb-1 inline-block mt-6">
              Síguenos
              <span className="block h-0.5 bg-white mt-1 w-[50vw] max-w-[300px]" />
            </h4>
            <div className="flex items-center space-x-5 mt-4">
              <a
                href="https://www.facebook.com/share/19CbmLLyFg/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={24} className="hover:text-[#0056A6]" />
              </a>
              
              <a
                href="https://wa.me/573233170328"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp size={24} className="hover:text-[#0056A6]" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-2xl font-semibold mb-1 inline-block">
              Ubicación
              <span className="block h-0.5 bg-white mt-1 w-[50vw] max-w-[300px]" />
            </h4>
            <iframe
              title="Ubicación Costehuilense"
              src="https://www.google.com/maps/embed?pb=!4v1749935607126!6m8!1m7!1sKvH3DO4xm2j8Ospf_7D7rg!2m2!1d2.19771803568001!2d-75.62784225015639!3f209.9005!4f0!5f0.7820865974627469"
              width="100%"
              height="200"
              allowFullScreen=""
              loading="lazy"
              className="rounded-xl border-2 border-white shadow-lg mt-4"
            />
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-200 border-t border-white pt-4">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold">Costehuilense</span>. Todos los derechos
          reservados.
        </div>
      </footer>
    </div>
  );
};

export default Home;
