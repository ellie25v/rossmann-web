import React from "react";

export const CartModal = ({ cart, onClose, onRemove, onChangeQty }) => {
  const total = cart.reduce(
    (sum, item) => sum + item.product.priceToPay * item.quantity,
    0
  );

  const handlProductMinusQuant = (item) => {
    if (item.quantity > 1) {
      onChangeQty(item.product, item.quantity - 1);
    } else {
      onRemove(item.product);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#c3012d]">Shopping Cart</h2>
          <button
            className="text-gray-500 hover:text-[#c3012d]"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="divide-y divide-gray-200 max-h-[60vh] overflow-y-auto">
          {cart.map((item, idx) => (
            <div key={idx} className="flex p-4 gap-4 items-center">
              <img
                src={item.product.image_url}
                alt={item.product.name}
                className="w-20 h-20 object-contain rounded"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.product.name}
                </h3>
                <p className="text-sm text-gray-600">{item.product.variant}</p>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="text-green-600">✓ In stock</span>
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => handlProductMinusQuant(item)}
                    className="px-2 py-1 border border-gray-300 text-sm rounded hover:bg-[#f5f5f5]"
                  >
                    –
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => onChangeQty(item.product, item.quantity + 1)}
                    className="px-2 py-1 border border-gray-300 text-sm rounded hover:bg-[#f5f5f5]"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between h-full">
                <span className="font-medium text-gray-800">
                  €{(item.product.priceToPay * item.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => onRemove(item.product)}
                  className="text-sm text-[#c3012d] hover:text-[#610514] mt-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex justify-between text-lg font-semibold text-gray-800 mb-3">
            <span>Subtotal</span>
            <span>€{total.toFixed(2)}</span>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Shipping and taxes will be calculated at checkout.
          </p>
          <button className="w-full bg-[#c3012d] hover:bg-[#610514] text-white py-3 rounded-lg font-semibold">
            Checkout
          </button>
          <p className="text-center text-sm text-gray-500 mt-2">
            or{" "}
            <span
              className="text-[#c3012d] hover:text-[#610514] cursor-pointer"
              onClick={onClose}
            >
              Continue Shopping →
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
