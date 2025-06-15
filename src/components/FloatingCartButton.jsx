// src/components/FloatingCartButton.jsx
import { FaShoppingCart } from "react-icons/fa";

export default function FloatingCartButton({ totalItems = 0, onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 right-6 z-50 bg-white/80 backdrop-blur-md border border-blue-300 hover:bg-blue-100 transition-colors duration-300 p-4 rounded-full shadow-xl flex items-center justify-center"
      title="Ver carrito"
    >
      <FaShoppingCart size={24} className="text-blue-600" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-md">
          {totalItems}
        </span>
      )}
    </button>
  );
}
