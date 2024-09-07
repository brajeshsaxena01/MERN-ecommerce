import React from "react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-white py-16">
      {" "}
      {/* Increased padding for more height */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Left Section */}
          <div className="md:w-1/3 mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              {/* Replace with your logo */}
              <img
                src="path-to-logo.png"
                alt="Logo"
                className="w-12 h-12"
              />{" "}
              {/* Increased logo size */}
            </div>
            <p className="text-lg mb-6">
              {" "}
              {/* Larger text size */}
              Making the world a better place through constructing elegant
              hierarchies.
            </p>
            <div className="flex space-x-6">
              {" "}
              {/* Increased space between icons */}
              {/* Social Media Icons */}
              <a
                href="#"
                aria-label="Facebook"
                className="text-white hover:text-gray-400 text-xl"
              >
                {" "}
                {/* Larger icons */}
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-white hover:text-gray-400 text-xl"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-white hover:text-gray-400 text-xl"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="text-white hover:text-gray-400 text-xl"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="text-white hover:text-gray-400 text-xl"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div className="grid grid-cols-2 gap-8 md:flex md:space-x-10">
            <div>
              <h4 className="font-semibold mb-4 text-lg">Solutions</h4>{" "}
              {/* Larger heading */}
              <ul className="space-y-2 text-base">
                {" "}
                {/* Increased list text size */}
                <li>
                  <a href="#" className="hover:text-gray-400">
                    Marketing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-400">
                    Analytics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-400">
                    Commerce
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-400">
                    Insights
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Support</h4>
              <ul className="space-y-2 text-base">
                <li>
                  <a href="#" className="hover:text-gray-400">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-400">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-400">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-400">
                    API Status
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Company</h4>
              <ul className="space-y-2 text-base">
                <li>
                  <a href="#" className="hover:text-gray-400">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-400">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-400">
                    Jobs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-400">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-400">
                    Partners
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Legal</h4>
              <ul className="space-y-2 text-base">
                <li>
                  <a href="#" className="hover:text-gray-400">
                    Claim
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-400">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-400">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-base">
          {" "}
          {/* Larger bottom text */}
          <p>© {currentYear} Your Company, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
