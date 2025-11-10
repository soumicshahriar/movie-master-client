import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import MyCollectionsTable from "./MyCollectionsTable";
import { motion } from "framer-motion";
import { FaFilm, FaTrashAlt, FaEdit } from "react-icons/fa";

const MyCollections = () => {
  const [movies, setMovies] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:3000/movies/my-collection?email=${user.email}`)
      .then((res) => setMovies(res.data))
      .catch((err) => console.error("Error fetching user movies:", err));
  }, [user]);

  return (
    <div className="md:px-4 py-10 max-w-11/12 mx-auto">
      {/* Header Section */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-xl md:text-4xl font-extrabold text-primary mb-2 flex justify-center items-center gap-2">
          <FaFilm /> My Movie Collections
        </h1>

        <div className="mt-3">
          <span className="bg-primary/10  px-4 py-1 rounded-full font-semibold text-sm md:text-base">
            Total Movies: <span className="text-primary">{movies.length}</span>
          </span>
        </div>
      </motion.div>

      {/* Movie Table */}
      <motion.div
        className="overflow-x-auto bg-base-200 rounded-2xl shadow-lg border border-primary/20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <table className="table w-full min-w-[900px] md:min-w-full">
          <thead className="bg-primary text-white text-xs md:text-sm">
            <tr>
              <th>Poster</th>
              <th>Title</th>
              <th>Genre</th>
              <th>Year</th>
              <th>Director</th>
              <th>Cast</th>
              <th>Rating</th>
              <th>Duration</th>
              <th>Language</th>
              <th>Country</th>
              <th>Plot</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.length > 0 ? (
              movies.map((movie) => (
                <MyCollectionsTable
                  key={movie._id}
                  movie={movie}
                  motionComponent={motion} // Pass motion to table rows for animation
                  icons={{ FaTrashAlt, FaEdit }} // Pass icons for actions
                />
              ))
            ) : (
              <tr>
                <td colSpan="12" className="text-center py-10 text-gray-400">
                  You haven’t added any movies yet 🎥
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default MyCollections;
