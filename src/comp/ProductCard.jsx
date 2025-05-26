import React from "react";
import { Heart, ShoppingBasket } from "lucide-react";

const ProductCard = ({ product, onProductClick, addToCart }) => {
  return (
    <div
      className="bg-[#fefefe] shadow-m rounded-2xl p-4 shadow hover:shadow-lg transition cursor-pointer text-black"
      onClick={() => onProductClick(product)}
    >
      <div className="mb-3 relative">
        <img
          src={`http://localhost:1100/${product.image_url}`}
          // src={`${product.image_url}`}
          alt={product.name}
          className="w-full h-40 object-contain bg-white rounded-lg"
        />
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-[#c3012d] text-xs px-2 py-1 rounded text-white">
            Up to {product.discount * 100}% off
          </div>
        )}
        <div className="absolute top-2 right-2 flex gap-2 text-gray-300">
          {/* <Eye className="w-4 h-4 hover:text-[#c3012d]" /> */}
          <Heart className="w-6 h-6 hover:text-[#c3012d]" />
        </div>
      </div>

      <h3 className="text-m font-semibold mb-1">{product.name}</h3>
      <p className="text-sm mb-1 text-gray-500">{product.category}</p>
      <p className="text-2xl text-[#c3012d] font-bold mb-2">
        {product.discount > 0 && (<span className="text-2xl text-black line-through font-semibold mr-4 mb-2">{product.price ?? "100"}€</span>)}
        {product.priceToPay ?? product.price}€
      </p>

      <button
        className="w-full flex items-center justify-center gap-2 bg-[#c3012d] hover:bg-[#610514] text-white py-2 rounded-lg text-sm"
        onClick={(e) => {
          e.stopPropagation();
          addToCart(product, 1);
        }}
      >
        {/* <ShoppingCart className="w-4 h-4" />  */}
        <ShoppingBasket size={20} />
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
