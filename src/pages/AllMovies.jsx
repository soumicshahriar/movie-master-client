import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import MovieCard from "./MovieCard";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
import { motion } from "motion/react";
import useAxios from "../hooks/useAxios";

const AllMovies = () => {
  const [allMovies, setAllMovies] = useState([]);
  const { loading } = useContext(AuthContext);
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance.get("/movies").then((data) => {
      setAllMovies(data.data);
    });
  }, [axiosInstance]);

  if (loading) {
    return <Loader />;
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-xl font-bold text-center mb-8">
        All <span className="text-primary">Movies - ({allMovies.length})</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {allMovies?.map((movie, i) => (
          <motion.div
            key={movie._id}
            whileHover={{ scale: 1.05 }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={cardVariants}
          >
            <MovieCard movie={movie} index={i} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AllMovies;
