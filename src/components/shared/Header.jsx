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
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

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
      .then(() => navigate("/"))
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
                  className="fixed top-18 left-0 h-screen w-64 bg-base-100 shadow-lg p-6 flex flex-col space-y-4 z-50"
                >
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
      <div className="navbar-end hidden md:flex">
        {user ? (
          <button
            onClick={handleLogOut}
            className="btn bg-primary hover:bg-pink-600 flex items-center gap-2"
          >
            <FaSignOutAlt /> Logout
          </button>
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
