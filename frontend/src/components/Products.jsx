import React, { useEffect } from "react";
import { Product } from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/Products/action";

export const Products = () => {
  const products = useSelector((store) => store.ecommerceData.products);
  const productStore = useSelector((store) => store.ecommerceData);
  console.log("product store is", productStore);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  return (
    <>
      {/* Product grid */}
      <div className="lg:col-span-3 py-0">
        <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
            {products.map((product, indx) => (
              <Product key={indx} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
