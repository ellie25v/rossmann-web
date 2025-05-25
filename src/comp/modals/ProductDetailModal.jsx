// ProductDetailModal.jsx
import { X, Plus, Minus } from "lucide-react";
import { useState } from "react";

export default function ProductDetailModal({ product, onClose, addToCart }) {
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={product.image_url}
              alt={product.name}
              className="max-h-96 object-contain"
            />
          </div>

          <div className="w-full md:w-1/2">
            <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
            <p className="text-sm text-gray-500 mb-1">{product.category}</p>
            {product.discount > 0 && (
              <p className="text-2xl  line-through font-semibold mb-2">
                {product.price ?? "100"}€
              </p>
            )}
            <p className="text-3xl font-semibold text-red-700 my-3">
              {product.priceToPay} €
            </p>
            <p className="text-gray-700 text-sm mb-4">{product.description}</p>

            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md overflow-hidden">
                <button
                  onClick={decrease}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                >
                  <Minus size={16} />
                </button>
                <div className="px-4">{quantity}</div>
                <button
                  onClick={increase}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={() => addToCart(product, quantity)}
                className="bg-[#c3012d] text-white font-medium px-5 py-2 rounded-full hover:bg-[#610514] transition"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
