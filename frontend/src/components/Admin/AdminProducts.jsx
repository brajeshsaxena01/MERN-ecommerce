import React, { useEffect } from "react";

import { AdminProduct } from "./AdminProduct";
import { Link } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { useSelector } from "react-redux";
export const AdminProducts = ({ products }) => {
  const loading = useSelector((store) => store.ecommerceData.loading);

  return (
    <>
      {/* Product grid */}
      {loading ? (
        <div className="flex justify-center items-center">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      ) : (
        <div className="lg:col-span-3 py-0">
          <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
            <Link
              to="/admin/product-form"
              type="submit"
              className="rounded-md my-1 bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add New Product
            </Link>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
              {products.map((product, indx) => (
                <div key={indx}>
                  <AdminProduct product={product} />
                  <Link to={`/admin/product-form/edit/${product.id}`}>
                    <button
                      type="submit"
                      className="rounded-md my-1 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Edit Product
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
