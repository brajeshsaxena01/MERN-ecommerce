import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../redux/Auth/action";
import { PencilIcon } from "@heroicons/react/24/outline";
import moment from "moment"; //To fomat date in structured way.
import { ChangeUserRolePopUp } from "../../components/Admin/ChangeUserRolePopUp";
export const ListAllUsers = () => {
  const [user, setUser] = useState({});
  const [openPopUp, setOpenPopUp] = useState(false);
  const dispatch = useDispatch();

  const users = useSelector((store) => store.auth.allUsers);
  //   console.log("all users", users);

  const handleClose = () => {
    setOpenPopUp(false);
  };
  const fetchUsers = () => {
    dispatch(fetchAllUsers());
  };

  useEffect(() => {
    fetchUsers();
  }, [dispatch]);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-6">Users Table</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sr.
              </th>
              {/* <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th> */}
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created Date
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users?.map((user, index) => (
              <tr key={user.id}>
                <td className="py-4 px-6 whitespace-nowrap">{index + 1}</td>
                {/* <td className="py-4 px-6 whitespace-nowrap">{user.name}</td> */}
                <td className="py-4 px-6 whitespace-nowrap">{user.email}</td>
                <td className="py-4 px-6 whitespace-nowrap">{user.role}</td>
                <td className="py-4 px-6 whitespace-nowrap">
                  {moment(user?.createdAt).format("LL")}
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  {/* <button className="text-blue-500 hover:text-blue-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.232 5.232l3.536 3.536M9 13l6.536-6.536a2.5 2.5 0 113.536 3.536L12.5 16.5H9v-3.5z"
                      />
                    </svg>
                  </button> */}
                  <button className="text-blue-500 hover:text-blue-700">
                    <PencilIcon
                      onClick={() => {
                        setUser(user);
                        setOpenPopUp(true);
                      }}
                      className="h-6 w-6"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {openPopUp && <ChangeUserRolePopUp user={user} onClose={handleClose} />}
      </div>
    </div>
  );
};
