import React, { useContext } from "react";
import { useLoaderData } from "react-router";
import MovieCard from "./MovieCard";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

const AllMovies = () => {
  const allMovies = useLoaderData();
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <Loader />;
  }

  // Motion variants for cards
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        All <span className="text-primary">Movies</span>
      </h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.02 }}
        variants={sectionVariants}
      >
        {allMovies?.map((movie, i) => (
          <motion.div
            key={movie._id}
            variants={sectionVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <MovieCard movie={movie} index={i} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AllMovies;
