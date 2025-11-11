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

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const handleDeleteFromUI = (id) => {
    setMovies((prev) => prev.filter((movie) => movie._id !== id));
  };

  return (
    <div className=" max-w-11/12 py-8 mx-auto ">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-xl font-bold mb-2 flex justify-center items-center gap-2">
          <FaFilm /> My Movie <span className="text-primary">Collections</span>
        </h1>

        <div className="mt-3">
          <span className="bg-primary/10  px-4 py-1 rounded-full font-semibold text-sm md:text-base">
            Total Movies -{" "}
            <span className="text-primary">({movies.length})</span>
          </span>
        </div>
      </div>

      {/* Movie Table */}
      <motion.div
        className="overflow-x-auto w-full bg-base-200 rounded-2xl shadow-lg border border-primary/20 max-h-screen  overflow-y-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={sectionVariants}
      >
        <table className="table w-full min-w-full md:min-w-full">
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
                  onDelete={handleDeleteFromUI}
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
