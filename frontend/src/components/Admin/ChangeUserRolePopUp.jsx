import React, { useState } from "react";
import { roles } from "../../assets/constants";
import { useDispatch } from "react-redux";
import { updateUserRole } from "../../redux/Auth/action";

export const ChangeUserRolePopUp = ({ user, onClose }) => {
  const [role, setRole] = useState("");
  console.log(role);

  const dispatch = useDispatch();
  const handleEdit = () => {
    // const updatedUser = { ...user, role: role };
    // console.log(updatedUser);
    dispatch(updateUserRole({ ...user, role: role }));
    onClose();
  };
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
        {/* <button className="block ml-auto" onClick={onClose}>
          <IoMdClose />
        </button> */}

        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>

        {/* <p>Name : {name}</p> */}
        <p>Email : {user.email}</p>

        <div className="flex items-center justify-between my-4 ">
          <p>Role :</p>
          <select
            className="border px-8 py-1"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value={""}>--choose role--</option>
            {Object.values(roles).map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex items-center justify-between my-4 ">
          <button
            className="w-fit mx-auto block  py-1 px-3 rounded-full bg-green-600 text-white hover:bg-green-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="w-fit mx-auto block  py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700"
            onClick={handleEdit}
          >
            Change Role
          </button>
        </div>
      </div>
    </div>
  );
};
