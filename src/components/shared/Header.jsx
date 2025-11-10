import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
  FaHome,
  FaFilm,
  FaFolderOpen,
  FaPlusCircle,
} from "react-icons/fa";

const Header = () => {
  const { user, dbUser, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  console.log(dbUser);

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold flex items-center gap-1"
              : "text-gray-400 flex items-center gap-1"
          }
        >
          <FaHome /> Home
        </NavLink>
      </li>
      <li>
        <NavLink
          end
          to="/movies"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold flex items-center gap-1"
              : "text-gray-400 flex items-center gap-1"
          }
        >
          <FaFilm /> All Movies
        </NavLink>
      </li>
      <li>
        <NavLink
          end
          to="/movies/my-collection"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold flex items-center gap-1"
              : "text-gray-400 flex items-center gap-1"
          }
        >
          <FaFolderOpen /> My Collections
        </NavLink>
      </li>
      <li>
        <NavLink
          end
          to="/movies/add"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold flex items-center gap-1"
              : "text-gray-400 flex items-center gap-1"
          }
        >
          <FaPlusCircle /> Add Movie
        </NavLink>
      </li>
    </>
  );

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/");
        setShowDropdown(false);
      })
      .catch(() => {});
  };

  return (
    <nav className="navbar shadow-md shadow-primary bg-base-100 px-4 py-2 fixed top-0 left-0 right-0 z-10">
      {/* Start */}
      <div className="navbar-start flex items-center">
        {/* Hamburger menu for small screens */}
        <div className="md:hidden">
          <button
            onClick={() => !isAnimating && setMenuOpen(!menuOpen)}
            className={`btn btn-ghost text-primary p-2 ${
              isAnimating ? "pointer-events-none" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>

          {/* Sliding menu */}
          <AnimatePresence>
            {menuOpen && (
              <>
                {/* Overlay */}
                <motion.div
                  className="fixed inset-0 bg-black/40 z-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setMenuOpen(false)}
                />

                <motion.ul
                  initial={{ x: "-100%", y: 0 }}
                  animate={{ x: 0, y: 0 }}
                  exit={{ x: "-100%", y: 0 }}
                  transition={{ type: "tween", duration: 0.3 }}
                  onAnimationStart={() => setIsAnimating(true)}
                  onAnimationComplete={() => setIsAnimating(false)}
                  className="fixed top-18 left-0 h-screen w-64 bg-base-100 shadow-lg p-6 flex flex-col space-y-4 z-50 overflow-y-auto"
                >
                  {user && (
                    <div className="flex flex-col items-center border-b-2 border-b-primary pb-4 mb-3">
                      <div className="avatar mb-2">
                        <div className="w-16 rounded-full border-4 border-primary">
                          <img
                            src={
                              dbUser?.photo ||
                              user?.photoURL ||
                              "https://i.ibb.co/MBtjqXQ/default-avatar.png"
                            }
                            alt="User Avatar"
                          />
                        </div>
                      </div>
                      <p className="font-semibold text-primary text-center">
                        {dbUser?.name || user?.displayName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 text-center">
                        {dbUser?.email || user?.email}
                      </p>
                    </div>
                  )}

                  {links}

                  {user ? (
                    <li>
                      <button
                        onClick={() => {
                          handleLogOut();
                          setMenuOpen(false);
                        }}
                        className="btn w-full bg-primary hover:bg-pink-600 flex items-center justify-center gap-2"
                      >
                        <FaSignOutAlt /> Logout
                      </button>
                    </li>
                  ) : (
                    <li>
                      <Link
                        to="/login"
                        onClick={() => setMenuOpen(false)}
                        className="btn w-full bg-primary hover:bg-pink-600 flex items-center justify-center gap-2"
                      >
                        <FaSignInAlt /> Login / Register
                      </Link>
                    </li>
                  )}
                </motion.ul>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="text-xs md:text-xl lg:text-2xl font-bold ml-2 z-50 relative"
        >
          Movie <span className="text-primary">Master</span>
        </Link>
      </div>

      {/* Center links for medium+ screens */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 space-x-1">{links}</ul>
      </div>

      {/* End */}
      <div className="navbar-end hidden md:flex relative">
        {user ? (
          <div className="relative">
            {/* Profile Avatar */}
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full border-4 border-primary">
                <img
                  src={
                    dbUser?.photo ||
                    user?.photoURL ||
                    "https://i.ibb.co/MBtjqXQ/default-avatar.png"
                  }
                  alt="User Avatar"
                />
              </div>
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-52 bg-base-100 shadow-lg rounded-xl p-3 z-50"
                >
                  <p className="px-3 py-1 text-sm font-semibold text-primary border-b mb-2">
                    {dbUser?.name || user?.displayName || "User"}
                  </p>
                  <p className="px-3 py-1 text-xs text-gray-500 mb-2">
                    {dbUser?.email || user?.email}
                  </p>

                  <button
                    onClick={handleLogOut}
                    className="w-full text-left flex items-center gap-2 px-3 py-2 hover:bg-primary cursor-pointer rounded-md"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn bg-primary hover:bg-pink-600 flex items-center gap-2"
          >
            <FaSignInAlt /> Login / Register
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
