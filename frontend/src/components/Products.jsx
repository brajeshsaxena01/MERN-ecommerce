import React, { useEffect } from "react";
import { Product } from "./Product";
import { useSelector } from "react-redux";
import { ColorRing } from "react-loader-spinner";
export const Products = ({ products }) => {
  const loading = useSelector((store) => store.ecommerceData.loading);
  console.log("loading", loading);
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
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
              {products.map((product, indx) => (
                <Product key={indx} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
