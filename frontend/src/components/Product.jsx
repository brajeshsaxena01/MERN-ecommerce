import React from "react";
import { Link } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/outline";

export const Product = (props) => {
  const { product } = props;
  return (
    <>
      <Link to="/product-details">
        <div
          key={product.id}
          className="group relative border-solid border-2 p-2"
        >
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
                ${product.price}
              </p>
              <p className="text-sm block line-through font-medium text-gray-400">
                $
                {Math.round(
                  product.price * (1 - product.discountPercentage / 100)
                )}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
