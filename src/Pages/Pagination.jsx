import React, { useEffect, useState } from "react";
import { fetchProducts } from "../API/api";

const Pagination = () => {
  const [products, setProducts] = useState(null);
  const [page, setPage] = useState(1);

  const GetProducts = async () => {
    const productData = await fetchProducts();
    setProducts(productData);
  };

  useEffect(() => {
    GetProducts();
  }, []);

  const handlePage = (selectedPage) => {
    // if (
    //   selectedPage >= 1 &&
    //   selectedPage <= products?.products?.length / 10 &&
    //   selectedPage != page
    // ) {0               
      setPage(selectedPage);
    // }

  };
  return (
    <div>
      <h1>Pagination</h1>
      <div className="grid grid-cols-3 gap-3 p-10">
        {products?.products
          ?.slice(page * 10 - 10, page * 10)
          .map((item, index) => (
            <img
              src={item.thumbnail}
              alt="images"
              className="bg-gray-300 rounded"
              width={400}
              key={item.id}
            />
          ))}
      </div>
      {products?.products.length > 0 && (
        <div className="flex gap-2 justify-center items-center w-full">
          <button
            className=""
            disabled={page === 1}
            onClick={() => handlePage(page - 1)}
          >
            Prev
          </button>
          {[...Array(products?.products.length / 10)].map((_, index) => (
            <span
              className={`bg-gray-300 p-2 px-3 cursor-pointer border border-solid ${
                page === index + 1 ? "bg-gray-600" : ""
              }`}
              key={index}
              onClick={() => handlePage(index + 1)}
            >
              {index + 1}
            </span>
          ))}
          <button
            className=""
            disabled={page === products?.products?.length / 10}
            onClick={() => handlePage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
