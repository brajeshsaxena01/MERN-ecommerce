import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "../redux/Auth/action";
import { useForm } from "react-hook-form";
import { AddNewAddressForm } from "../components/AddNewAddressForm";
import { EditAddressForm } from "../components/EditAddressForm";

export const MyProfile = () => {
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const user = useSelector((store) => store.auth.userInfo);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleAdd = (address) => {
    const newUserDetails = { ...user, addresses: [...user.addresses, address] }; //for shallow copy issue
    dispatch(updateUserDetails(newUserDetails));
    setShowAddressForm(false);
  };
  const handleNewAddressForm = () => {
    setShowAddressForm(true);
    setSelectedEditIndex(-1); // to close the edit form
    // setValue("name", "");
    // setValue("email", "");
    // setValue("city", "");
    // setValue("state", "");
    // setValue("pinCode", "");
    // setValue("phone", "");
    // setValue("street", "");
    reset();//to clear the all set values so that if add new address form open then all field should be empty.
  };

  const handleEditForm = (index) => {
    setShowAddressForm(false);
    setSelectedEditIndex(index);
    const address = user.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pinCode", address.pinCode);
    setValue("phone", address.phone);
    setValue("street", address.street);
  };

  const handleEdit = (updatedAddress, index) => {
    const newUserDetails = { ...user, addresses: [...user.addresses] }; //for shallow copy issue
    newUserDetails.addresses.splice(index, 1, updatedAddress);
    dispatch(updateUserDetails(newUserDetails));
    //any two of them can use to dispatch the data work is same only naming difference
    // dispatch(saveShipingAddressSuccess(newUserDetails))
    setSelectedEditIndex(-1);
  };
  const handleRemove = (index) => {
    const newUserDetails = { ...user, addresses: [...user.addresses] }; //for shallow copy issue
    newUserDetails.addresses.splice(index, 1);
    dispatch(updateUserDetails(newUserDetails));
  };
  return (
    <div>
      <div>
        <h1 className="mx-auto text-2xl">My Profile</h1>
        <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
              Name: {user.name ? user.name : "New User"}
            </h1>
            <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
              Email address: {user.email}
            </h3>
            {user.role === "admin" && (
              <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                Role: {user.role}
              </h3>
            )}
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <button
              onClick={handleNewAddressForm}
              type="submit"
              className="rounded-md m-5 bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add New Address
            </button>
            {showAddressForm ? (
              <AddNewAddressForm
                handleSubmit={handleSubmit}
                handleAdd={handleAdd}
                reset={reset}
                register={register}
                setShowAddressForm={setShowAddressForm}
              />
            ) : null}
            <p className="mt-0.5 text-sm text-gray-500"> Your Addresses :</p>
            {user.addresses.map((address, indx) => (
              <div>
                {selectedEditIndex === indx ? (
                  <EditAddressForm
                    handleSubmit={handleSubmit}
                    handleEdit={handleEdit}
                    indx={indx}
                    setSelectedEditIndex={setSelectedEditIndex}
                    reset={reset}
                    register={register}
                  />
                ) : null}

                <div
                  key={indx}
                  className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                >
                  <div className="flex gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {address.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {address.street}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {address.pinCode}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      Phone: {address.phone}
                    </p>
                    <p className="text-sm leading-6 text-gray-500">
                      {address.city}
                    </p>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <button
                      onClick={() => {
                        handleEditForm(indx);
                      }}
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        handleRemove(indx);
                      }}
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
