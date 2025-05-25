import { useState, useEffect } from "react";
import Header from "./comp/header/Header";
import ProductCatalog from "./comp/ProductCatalog";
import ProductDetailModal from "./comp/modals/ProductDetailModal";
import { CartModal } from "./comp/modals/CartModal";
import { fetchUsers, updateUserCartItem, fetchUserCart } from "./services/api";
import { testUsers } from "./services/testProducts";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [productOpen, setProductOpen] = useState();
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    // Load users data
    const loadData = async () => {
      try {
        const usersData = await fetchUsers();
        let newUsers = transformUsers(usersData);
        setUser(newUsers[0]);
      } catch (error) {
        setUsers(testUsers);
        let newUsers = transformUsers(testUsers);
        setUser(newUsers[0]);
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }
  const transformUsers = (us) => {
    const newUsers = us.map((user, ind) => {
      return {
        ...user,
        city: ind % 3 === 2 ? 3 : ind % 3 === 1 ? 2 : 1,
      };
    });
    setUsers(newUsers);
    return newUsers;
  };

  const openProductCard = (product) => {
    setProductModalOpen(true);
    setProductOpen(product);
  };

  const toggleCart = () => {
    setCartModalOpen(!cartModalOpen);
  };

  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex(
        (item) => item.product.product_id === product.product_id
      );
      let updated = [...prevCart];
      if (index !== -1) {
        // product exists — update quantity
        updated[index] = {
          ...updated[index],
          quantity: updated[index].quantity + quantity,
        };
      } else {
        // new product
        updated = [...prevCart, { product, quantity }];
      }
      updateUserCartItem(
        user.user_id,
        product.product_id,
        updated.find((item) => item.product.product_id === product.product_id)
          ?.quantity || quantity
      );
      return updated;
    });
  };

  const deleteFromCart = (product) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.product_id !== product.product_id)
    );
    updateUserCartItem(user.user_id, product.product_id, 0);
  };

  const changeQuantInCart = (product, newQ) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.product_id === product.product_id
          ? { ...item, quantity: newQ }
          : item
      )
    );
    updateUserCartItem(user.user_id, product.product_id, newQ);
  };

  const setSelectedUser = async (newUser) => {
    if (newUser.user_id != user.user_id) {
      setCart([]);
      await fetchUserCart(newUser.user_id, products, setCart);
      setUser(newUser);
    }
  };

  const updateFirstUser = (products) => {
    fetchUserCart(
      user.user_id != undefined ? user.user_id : 1,
      products,
      setCart
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Header
          toggleCart={toggleCart}
          users={users}
          selectedUser={user}
          setSelectedUser={setSelectedUser}
        />
        <ProductCatalog
          onProductClick={openProductCard}
          addToCart={addToCart}
          city={user.city ?? 1}
          products={products}
          setProducts={setProducts}
          updateFirstUser={updateFirstUser}
        />
        {productModalOpen && (
          <ProductDetailModal
            product={productOpen}
            onClose={() => setProductModalOpen(false)}
            addToCart={addToCart}
          />
        )}
        {cartModalOpen && (
          <CartModal
            cart={cart}
            onClose={() => setCartModalOpen(false)}
            onRemove={deleteFromCart}
            onChangeQty={changeQuantInCart}
          />
        )}
      </div>
    </>
  );
}

export default App;
