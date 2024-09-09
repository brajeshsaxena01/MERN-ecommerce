import React from "react";
import { Link } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/outline";
import { addToCart } from "../redux/Cart/action";
import { useDispatch, useSelector } from "react-redux";
import { discountedPrice } from "../assets/constants";

export const Product = (props) => {
  const { product } = props;
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.userInfo);

  console.log("product", product);

  // const handleCart = (product) => {
  //   delete product["id"];
  //   dispatch(addToCart({ ...product, quantity: 1, user: user.id }));
  // };
  return (
    <>
      <div
        key={product.id}
        className="group relative border-solid border-2 p-2"
      >
        <Link to={`/product-details/${product.id}`}>
          <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
            <img
              alt={product.title}
              src={product.thumbnail}
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                <div href={product.thumbnail}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.title}
                </div>
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                <StarIcon className="w-6 h-6 inline"></StarIcon>
                <span className="align-bottom"> {product.rating}</span>
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                ${discountedPrice(product)}
              </p>
              <p className="text-sm block line-through font-medium text-gray-400">
                ${product.price}
              </p>
            </div>
          </div>
          {product.deleted && (
            <div>
              <p className="text-sm text-red-400">product deleted</p>
            </div>
          )}
          {product.stock <= 0 && (
            <div>
              <p className="text-sm text-red-400">Out Of Stock</p>
            </div>
          )}
        </Link>
        {/* <button
          onClick={() => {
            handleCart(product);
          }}
          type="submit"
          className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add to cart
        </button> */}
      </div>
    </>
  );
};
