import axios from "axios";

const API_BASE_URL = "http://localhost:1300";
const API_PIC_URL = "http://localhost:1100";

// Axios instance (optional: add interceptors later)
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

// PRODUCTS
export const fetchProducts = async (city) => {
  const response = await api.get(`/city_products/${city}/menu`, {
    params: {
      page: 1,
      page_size: 30,
    },
  });
  return response.data;
};

// CATEGORIES
export const fetchCategories = async () => {
  const response = await api.get("/categories");
  return response.data;
};

// USERS
export const fetchUsers = async () => {
  const response = await api.get(`/users`);
  return response.data;
};

// CART
export const fetchUserCart = async (userId, products, setCart) => {
  try {
    const response = await api.get(`/users/${userId}/shopping_cart`);
    const cartItems = response.data;

    const fullCart = Object.entries(cartItems)
      .map(([productId, quantity]) => {
        const product = products.find(
          (p) => p.product_id === parseInt(productId)
        );
        return product ? { product, quantity } : null;
      })
      .filter((item) => item !== null);

    setCart(fullCart);
  } catch (error) {
    console.error("Помилка при завантаженні корзини:", error);
  }
};

export const updateUserCartItem = async (userId, productId, quantity) => {
  try {
    await api.patch(
      `/users/${userId}/shopping_cart`, { product_id: productId, quantity }
    );
  } catch (error) {
    console.error("Помилка при оновленні корзини:", error);
  }
};

export default {
  fetchProducts,
  fetchCategories,
  fetchUsers,
  fetchUserCart,
  updateUserCartItem,
};
