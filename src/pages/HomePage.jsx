import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import MovieCard from "./MovieCard";
import { FaUsers, FaFilm, FaStar } from "react-icons/fa";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const [stats, setStats] = useState({ totalMovies: 0, totalUsers: 0 });

  useEffect(() => {
    axios
      .get("http://localhost:3000/movies")
      .then((res) => setMovies(res.data));
    axios
      .get("http://localhost:3000/movies/top-rated?limit=5")
      .then((res) => setTopRated(res.data));
    axios
      .get("http://localhost:3000/movies/recent?limit=6")
      .then((res) => setRecentlyAdded(res.data));
    axios.get("http://localhost:3000/stats").then((res) => setStats(res.data));
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="space-y-20 mt-10 max-w-7xl mx-auto px-4">
      {/* Hero Section */}
      <motion.section
        className="relative h-112 sm:h-96 w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={sectionVariants}
      >
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={20}
          loop
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1440: { slidesPerView: 4 },
          }}
          className="h-full w-full"
        >
          {movies.slice(0, 5).map((movie) => (
            <SwiperSlide key={movie._id}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={cardVariants}
              >
                <MovieCard movie={movie} />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="text-center py-10 border border-primary rounded-2xl bg-gray-900 text-white space-y-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={sectionVariants}
      >
        <h2 className=" text-xl md:text-3xl font-bold">
          Platform <span className="text-primary">Statistics</span>
        </h2>
        <div className="md:flex justify-center md:space-x-10 text-xl font-medium">
          <motion.div
            className="flex items-center gap-2 justify-center"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
          >
            <FaFilm className="text-primary text-2xl" /> Movies:{" "}
            <span className="text-primary">{stats.totalMovies}</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-2 justify-center"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FaUsers className="text-primary text-2xl" /> Users:{" "}
            <span className="text-primary">{stats.totalUsers}</span>
          </motion.div>
        </div>
      </motion.section>

      {/* Top Rated Movies */}
      <motion.section
        className="space-y-6 shadow-lg shadow-primary p-5 rounded-xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.02 }}
        variants={sectionVariants}
      >
        <h2 className=" text-xl md:text-3xl font-bold text-center">
          <FaStar className="inline text-yellow-400 mr-2" /> Top Rated{" "}
          <span className="text-primary">Movies</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {topRated.map((movie) => (
            <motion.div
              key={movie._id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Recently Added */}
      <motion.section
        className="space-y-6 shadow-lg shadow-primary p-5 rounded-xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.02 }}
        variants={sectionVariants}
      >
        <h2 className="text-xl md:text-3xl font-bold text-center ">
          Recently <span className="text-primary">Added</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recentlyAdded.map((movie) => (
            <motion.div
              key={movie._id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Genres */}
      <motion.section
        className="space-y-4 text-center py-10 rounded-xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.01 }}
        variants={sectionVariants}
      >
        <h2 className="text-2xl font-bold">Genres</h2>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {["Action", "Drama", "Comedy", "Horror", "Sci-Fi", "Romance"].map(
            (genre) => (
              <motion.span
                key={genre}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
                className="px-4 py-2 bg-primary text-white rounded-full shadow-lg cursor-pointer transition-transform"
              >
                {genre}
              </motion.span>
            )
          )}
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        className="py-10 px-6 text-center bg-linear-to-r from-pink-500 to-pink-700 text-white rounded-xl space-y-4 shadow-lg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={sectionVariants}
      >
        <motion.h2 className="text-3xl font-bold" variants={cardVariants}>
          About MovieMaster Pro
        </motion.h2>
        <motion.p className="max-w-3xl mx-auto text-lg" variants={cardVariants}>
          MovieMaster Pro is your ultimate movie database platform, featuring a
          dynamic collection of movies, user ratings, and personalized
          recommendations. Discover, explore, and enjoy movies like never
          before!
        </motion.p>
      </motion.section>
    </div>
  );
};

export default HomePage;
