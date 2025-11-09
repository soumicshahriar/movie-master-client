import React, { useEffect, useState } from "react";
import axios from "axios";

import { motion } from "framer-motion";
import MovieCard from "./MovieCard";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  // const [stats, setStats] = useState({ totalMovies: 0, totalUsers: 0 });

  useEffect(() => {
    // Fetch all movies
    axios
      .get("http://localhost:3000/movies")
      .then((res) => setMovies(res.data));

    // Fetch top rated
    axios
      .get("http://localhost:3000/movies/top-rated?limit=5")
      .then((res) => setTopRated(res.data));

    // Fetch recently added
    axios
      .get("http://localhost:3000/movies/recent?limit=6")
      .then((res) => setRecentlyAdded(res.data));

    // Fetch stats
    // axios.get("/api/stats").then((res) => setStats(res.data));
  }, []);

  console.log(movies, recentlyAdded, topRated);

  return (
    <div className="space-y-20">
      {/* Hero Section: Featured Movies Carousel */}
      <section className="relative h-96 w-full">
        <motion.div
          className="h-full w-full flex overflow-x-auto space-x-4 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {movies.slice(0, 5).map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </motion.div>
      </section>

      {/* Statistics Section */}
      {/* <section className="text-center py-10 bg-linear-to-r from-purple-500 via-pink-500 to-red-400 rounded-2xl text-white space-y-4">
        <h2 className="text-3xl font-bold">Platform Statistics</h2>
        <div className="flex justify-center space-x-10 text-xl font-medium">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            🎬 Movies: {stats.totalMovies}
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            👥 Users: {stats.totalUsers}
          </motion.div>
        </div>
      </section> */}

      {/* Top Rated Movies */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Top Rated Movies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {topRated.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Recently Added */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Recently Added</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {recentlyAdded.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Genre Section */}
      <section className="space-y-4 text-center py-10 bg-gray-100 rounded-xl">
        <h2 className="text-2xl font-bold">Genres</h2>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {["Action", "Drama", "Comedy", "Horror", "Sci-Fi", "Romance"].map(
            (genre) => (
              <span
                key={genre}
                className="px-4 py-2 bg-purple-500 text-white rounded-full shadow-lg hover:scale-105 transition-transform"
              >
                {genre}
              </span>
            )
          )}
        </div>
      </section>

      {/* About Platform Section */}
      <section className="py-10 px-6 text-center bg-gradient-to-r from-pink-400 to-purple-600 text-white rounded-xl space-y-4">
        <h2 className="text-3xl font-bold">About MovieMaster Pro</h2>
        <p className="max-w-3xl mx-auto text-lg">
          MovieMaster Pro is your ultimate movie database platform, featuring a
          dynamic collection of movies, user ratings, and personalized
          recommendations. Discover, explore, and enjoy movies like never
          before!
        </p>
      </section>
    </div>
  );
};

export default HomePage;
