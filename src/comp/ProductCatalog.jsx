import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { testProducts, testCategories } from "../services/testProducts";
import { fetchProducts, fetchCategories } from "../services/api";

const ProductCatalog = ({ products, setProducts, onProductClick, addToCart, city, updateFirstUser }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const transformProducts = (pr, cat) => {
    const categoriesMap = cat.reduce((map, cat) => {
      map[cat.category_id] = cat.name;
      return map;
    }, {});

    const newProducts = pr.map((item) => {
      const { product, price, discount } = item;
      let priceToPay =
        discount > 0 ? (price - price * discount).toFixed(2) : price;
      return {
        ...product,
        price,
        discount,
        // ...item,
        category: categoriesMap[product.category_id],
        priceToPay,
      };
    });
    if(loading) {
      updateFirstUser(newProducts);
    }
    setProducts(newProducts);
  };

  useEffect(() => {
    // load data in order (first categories, then products)
    const loadData = async () => {
      try {
        let categoriesData = testCategories;
        if (categories.length == 0) {
          categoriesData = await fetchCategories();
          setCategories(categoriesData);
        } else {
          categoriesData = categories;
        }
        const productsData = await fetchProducts(city);
        // setProducts(productsData);
        transformProducts(productsData, categoriesData);
      } catch (error) {
        setCategories(testCategories);
        setProducts(testProducts);
        transformProducts(testProducts, testCategories);
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [city]);

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f8f4f0] p-10 text-black">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Catalog</h1>
        {/* Filters and Sort buttons can go here if needed */}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
        {products.map((product) => (
          <ProductCard
            key={product.product_id}
            product={product}
            onProductClick={onProductClick}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
    // <section class="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
    //   <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
    //     <div class="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
    //       <div class="flex items-center space-x-4">
    //         <button
    //           data-modal-toggle="filterModal"
    //           data-modal-target="filterModal"
    //           type="button"
    //           class="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto"
    //         >
    //           <svg
    //             class="-ms-0.5 me-2 h-4 w-4"
    //             aria-hidden="true"
    //             xmlns="http://www.w3.org/2000/svg"
    //             width="24"
    //             height="24"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //           >
    //             <path
    //               stroke="currentColor"
    //               stroke-linecap="round"
    //               stroke-width="2"
    //               d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"
    //             />
    //           </svg>
    //           Filters
    //           <svg
    //             class="-me-0.5 ms-2 h-4 w-4"
    //             aria-hidden="true"
    //             xmlns="http://www.w3.org/2000/svg"
    //             width="24"
    //             height="24"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //           >
    //             <path
    //               stroke="currentColor"
    //               stroke-linecap="round"
    //               stroke-linejoin="round"
    //               stroke-width="2"
    //               d="m19 9-7 7-7-7"
    //             />
    //           </svg>
    //         </button>
    //         <button
    //           id="sortDropdownButton1"
    //           data-dropdown-toggle="dropdownSort1"
    //           type="button"
    //           class="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto"
    //         >
    //           <svg
    //             class="-ms-0.5 me-2 h-4 w-4"
    //             aria-hidden="true"
    //             xmlns="http://www.w3.org/2000/svg"
    //             width="24"
    //             height="24"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //           >
    //             <path
    //               stroke="currentColor"
    //               stroke-linecap="round"
    //               stroke-linejoin="round"
    //               stroke-width="2"
    //               d="M7 4v16M7 4l3 3M7 4 4 7m9-3h6l-6 6h6m-6.5 10 3.5-7 3.5 7M14 18h4"
    //             />
    //           </svg>
    //           Sort
    //           <svg
    //             class="-me-0.5 ms-2 h-4 w-4"
    //             aria-hidden="true"
    //             xmlns="http://www.w3.org/2000/svg"
    //             width="24"
    //             height="24"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //           >
    //             <path
    //               stroke="currentColor"
    //               stroke-linecap="round"
    //               stroke-linejoin="round"
    //               stroke-width="2"
    //               d="m19 9-7 7-7-7"
    //             />
    //           </svg>
    //         </button>
    //         <div
    //           id="dropdownSort1"
    //           class="z-50 hidden w-40 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
    //           data-popper-placement="bottom"
    //         >
    //           <ul
    //             class="p-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400"
    //             aria-labelledby="sortDropdownButton"
    //           >
    //             <li>
    //               <a
    //                 href="#"
    //                 class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
    //               >
    //                 {" "}
    //                 The most popular{" "}
    //               </a>
    //             </li>
    //             <li>
    //               <a
    //                 href="#"
    //                 class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
    //               >
    //                 {" "}
    //                 Newest{" "}
    //               </a>
    //             </li>
    //             <li>
    //               <a
    //                 href="#"
    //                 class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
    //               >
    //                 {" "}
    //                 Increasing price{" "}
    //               </a>
    //             </li>
    //             <li>
    //               <a
    //                 href="#"
    //                 class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
    //               >
    //                 {" "}
    //                 Decreasing price{" "}
    //               </a>
    //             </li>
    //             <li>
    //               <a
    //                 href="#"
    //                 class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
    //               >
    //                 {" "}
    //                 No. reviews{" "}
    //               </a>
    //             </li>
    //             <li>
    //               <a
    //                 href="#"
    //                 class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
    //               >
    //                 {" "}
    //                 Discount %{" "}
    //               </a>
    //             </li>
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //     <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4"></div>
    //   </div>
    // </section>
  );
};

export default ProductCatalog;
