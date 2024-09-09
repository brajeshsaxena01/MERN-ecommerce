import React, { useState, Fragment, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { increment, incrementAsync, selectCount } from "./cartSlice";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  deleteItemInCart,
  updateCartItemQuantity,
} from "../redux/Cart/action";
import { discountedPrice } from "../assets/constants";
import { Modal } from "../components/Modal";

export const Cart = () => {
  const [open, setOpen] = useState(true);
  const [openModal, setOpenModal] = useState(-1);
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cartItem.cart.cartItems);
  const selectedProduct = useSelector(
    (store) => store.ecommerceData.selectedProduct
  );
  // console.log("cartItems", cartItems);
  const totalAmount = cartItems?.reduce(
    (sum, item) => sum + discountedPrice(item) * item.quantity,
    0
  );
  const totalItems = cartItems?.reduce((sum, currentValue) => {
    return sum + currentValue.quantity;
  }, 0);

  // console.log("total items", totalItems);

  const addQuantityToCart = async (item, quantity) => {
    // console.log('cart_item', item, quantity);

    // Check before adding to the cart the product is in stock or not
    if (selectedProduct?.stock < quantity) {
      window.alert("The product is out of stock");
      return;
    }
    if (quantity < 0) {
      window.alert("The quantity can't be less than zero.");
      return;
    }
    // console.log("item", item);
    dispatch(updateCartItemQuantity({ ...item, quantity: quantity }));
  };

  const handleRemove = (itemToRemove) => {
    dispatch(deleteItemInCart(itemToRemove));
  };

  return (
    <>
      {!cartItems.length && <Navigate to="/" replace={true}></Navigate>}

      <div>
        <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
              Cart
            </h1>
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartItems?.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col ">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={product.href}>{product.title}</a>
                          </h3>
                          <p className="ml-4">${discountedPrice(product)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.brand}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          ${product.price}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        {/* <div className="text-gray-500">
                          <label
                            htmlFor="quantity"
                            className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                          >
                            Qty
                          </label>
                          <select>
                            <option value="1">1</option>
                            <option value="2">2</option>
                          </select>
                        </div> */}
                        <div className=" flex items-center gap-3 mt-1">
                          <button
                            className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                            onClick={() =>
                              addQuantityToCart(product, product.quantity - 1)
                            }
                          >
                            -
                          </button>
                          <span>{product?.quantity}</span>
                          <button
                            className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                            onClick={() =>
                              addQuantityToCart(product, product.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>

                        <div className="flex">
                          <Modal
                            title={`Delete ${product.title}`}
                            message="Are you sure, you want to delete this item in the cart?"
                            dangerOption="Delete"
                            cancelOption="Cancel"
                            cancelAction={() => {
                              setOpenModal(-1);
                            }}
                            dangerAction={(e) => {
                              handleRemove(product);
                            }}
                            showModal={openModal === product.id}
                          ></Modal>
                          <button
                            onClick={() => {
                              setOpenModal(product.id);
                            }}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${totalAmount?.toFixed(2)}</p>
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Total Items in cart</p>
              <p>{totalItems} items</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <Link to="/checkout">
                <a
                  href="#"
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Checkout
                </a>
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <Link to="/">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={() => setOpen(false)}
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
