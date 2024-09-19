import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Products", to: "/", current: true, user: true },
  { name: "Products", to: "/admin", current: false, admin: true },
  { name: "Orders", to: "/admin/orders", current: false, admin: true },
  { name: "Users", to: "/admin/users", current: false, admin: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Navbar = ({ children }) => {
  const cartItems = useSelector((store) => store.cartItem.cart.cartItems);

  // console.log("cart items in navbar", cartItems);
  const user = useSelector((store) => store.auth.userInfo);
  const userNavigation = [
    { name: "My Profile", to: "/profile" },
    { name: "My Orders", to: "/my-orders" },
    { name: user ? "Sign out" : "Log In", to: user ? "/logout" : "login" },
  ];

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        limit={1}
      ></ToastContainer>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Link to="/">
                  <div className="flex-shrink-0">
                    <img
                      alt="Your Company"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      className="h-8 w-8"
                    />
                  </div>
                </Link>

                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) =>
                      item[user?.role] ? (
                        <Link
                          key={item.name}
                          to={item.to}
                          aria-current={item.current ? "page" : undefined}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                        >
                          {item.name}
                        </Link>
                      ) : null
                    )}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <Link to="/cart">
                    <button
                      type="button"
                      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />

                      {cartItems.length > 0 && (
                        <span className="inline-flex items-center rounded-md ml-5  bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                          {cartItems?.length > 0 ? cartItems?.length : ""}
                        </span>
                      )}
                      <ShoppingCartIcon
                        aria-hidden="true"
                        className="h-6 w-6"
                      />
                    </button>
                  </Link>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          alt=""
                          // src={user?.imageUrl}
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          className="h-8 w-8 rounded-full"
                        />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          <Link
                            to={item.to}
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                          >
                            {item.name}
                          </Link>
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block h-6 w-6 group-data-[open]:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden h-6 w-6 group-data-[open]:block"
                  />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) =>
                item[user?.role] ? (
                  <Link key={item.name} to={item.to}>
                    <DisclosureButton
                      as="a"
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                    >
                      {item.name}
                    </DisclosureButton>
                  </Link>
                ) : null
              )}
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    alt=""
                    src={user?.imageUrl}
                    className="h-10 w-10 rounded-full"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    {user?.name}
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    {user?.email}
                  </div>
                </div>
                <Link to="/cart">
                  <button
                    type="button"
                    className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    {cartItems.length > 0 && (
                      <span className="inline-flex items-center rounded-md ml-5  bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                        {cartItems?.length > 0 ? cartItems?.length : ""}
                      </span>
                    )}
                    <ShoppingCartIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </Link>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) => (
                  <Link key={item.name} to={item.to}>
                    <DisclosureButton
                      as="a"
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      {item.name}
                    </DisclosureButton>
                  </Link>
                ))}
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              E-Commerce
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Your content */}
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

// import { React } from "react";
// import {
//   Disclosure,
//   DisclosureButton,
//   DisclosurePanel,
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuItems,
// } from "@headlessui/react";
// import {
//   Bars3Icon,
//   ShoppingCartIcon,
//   XMarkIcon,
// } from "@heroicons/react/24/outline";
// import { Link } from "react-router-dom";

// const navigation = [
//   { name: "Dashboard", href: "#", current: true },
//   { name: "Team", href: "#", current: false },
//   { name: "Projects", href: "#", current: false },
//   { name: "Calendar", href: "#", current: false },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }
// export const Navbar = () => {
//   return (
//     <Disclosure as="nav" className="bg-gray-800">
//       <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//         <div className="relative flex h-16 items-center justify-between">
//           <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//             {/* Mobile menu button*/}
//             <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
//               <span className="absolute -inset-0.5" />
//               <span className="sr-only">Open main menu</span>
//               <Bars3Icon
//                 aria-hidden="true"
//                 className="block h-6 w-6 group-data-[open]:hidden"
//               />
//               <XMarkIcon
//                 aria-hidden="true"
//                 className="hidden h-6 w-6 group-data-[open]:block"
//               />
//             </DisclosureButton>
//           </div>
//           <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
//             <Link to="/">
//               {" "}
//               <div className="flex flex-shrink-0 items-center">
//                 <img
//                   alt="Your Company"
//                   src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
//                   className="h-8 w-auto"
//                 />
//               </div>
//             </Link>
//             <div className="hidden sm:ml-6 sm:block">
//               <div className="flex space-x-4">
//                 {navigation.map((item) => (
//                   <a
//                     key={item.name}
//                     href={item.href}
//                     aria-current={item.current ? "page" : undefined}
//                     className={classNames(
//                       item.current
//                         ? "bg-gray-900 text-white"
//                         : "text-gray-300 hover:bg-gray-700 hover:text-white",
//                       "rounded-md px-3 py-2 text-sm font-medium"
//                     )}
//                   >
//                     {item.name}
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//             <button
//               type="button"
//               className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//             >
//               <span className="absolute -inset-1.5" />
//               <span className="inline-flex items-center rounded-md ml-5 bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
//                 3
//               </span>
//               <ShoppingCartIcon aria-hidden="true" className="h-6 w-6" />
//             </button>

//             {/* Profile dropdown */}
//             <Menu as="div" className="relative ml-3">
//               <div>
//                 <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                   <span className="absolute -inset-1.5" />
//                   <span className="sr-only">Open user menu</span>
//                   <img
//                     alt=""
//                     src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                     className="h-8 w-8 rounded-full"
//                   />
//                 </MenuButton>
//               </div>
//               <MenuItems
//                 transition
//                 className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
//               >
//                 <MenuItem>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
//                   >
//                     Your Profile
//                   </a>
//                 </MenuItem>
//                 <MenuItem>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
//                   >
//                     Settings
//                   </a>
//                 </MenuItem>
//                 <MenuItem>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
//                   >
//                     Sign out
//                   </a>
//                 </MenuItem>
//               </MenuItems>
//             </Menu>
//           </div>
//         </div>
//       </div>

//       <DisclosurePanel className="sm:hidden">
//         <div className="space-y-1 px-2 pb-3 pt-2">
//           {navigation.map((item) => (
//             <DisclosureButton
//               key={item.name}
//               as="a"
//               href={item.href}
//               aria-current={item.current ? "page" : undefined}
//               className={classNames(
//                 item.current
//                   ? "bg-gray-900 text-white"
//                   : "text-gray-300 hover:bg-gray-700 hover:text-white",
//                 "block rounded-md px-3 py-2 text-base font-medium"
//               )}
//             >
//               {item.name}
//             </DisclosureButton>
//           ))}
//         </div>
//       </DisclosurePanel>
//     </Disclosure>
//   );
// };
