import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import { FaTrashAlt, FaInfoCircle } from "react-icons/fa";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

const WatchList = () => {
  const { user, loading } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // ✅ Fetch watch-list movies
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3000/users/watch-list/${user.email}`)
        .then(async (res) => {
          const moviePromises = res.data.map((item) =>
            axios.get(`http://localhost:3000/movies/${item.movieId}`)
          );
          const movieResults = await Promise.all(moviePromises);
          setMovies(movieResults.map((r) => r.data));
        })
        .catch((err) => console.error(err));
    }
  }, [user]);
  console.log(movies);

  // ✅ Remove movie from watchList
  const handleRemove = async (movie) => {
    Swal.fire({
      title: "Remove from WatchList?",
      text: "Do you really want to remove this movie?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3b82f6",
      confirmButtonText: "Yes, remove it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `http://localhost:3000/users/watch-list/${movie._id}/${user.email}`
          )
          .then(() => {
            setMovies((prev) => prev.filter((m) => m._id !== movie._id));
            Swal.fire("Removed!", "Movie removed from watchList.", "success");
          })
          .catch((err) => console.error(err));
      }
    });
  };

  // ✅ Open DaisyUI modal for movie details
  const openDetailsModal = (movie) => {
    setSelectedMovie(movie);
    document.getElementById("movie_details_modal").showModal();
  };

  if (loading) return <Loader />;
  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={sectionVariants}
      className="max-w-6xl mx-auto p-6"
    >
      <h1 className="text-xl font-bold mb-6 text-center ">
        🎬 My{" "}
        <span className="text-primary">WatchList - ({movies.length})</span>
      </h1>

      {movies.length === 0 ? (
        <p className="text-center text-gray-500">Your WatchList is empty.</p>
      ) : (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={cardVariants}
          className="grid grid-cols-1 md:grid-cols-3  gap-6"
        >
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="bg-transparent border-2 border-primary rounded-xl shadow-md shadow-primary overflow-hidden hover:shadow-lg transition-all duration-300 text-primary flex flex-col"
            >
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-4 flex flex-col justify-between grow">
                <div>
                  <h3 className="text-xl font-semibold truncate">
                    {movie.title}
                  </h3>
                  <p>🎭 Genre: {movie.genre}</p>
                  <p>⭐ Rating: {movie.rating}</p>
                </div>

                <div className="flex gap-2 mt-3">
                  {/* Details Button */}
                  <button
                    onClick={() => openDetailsModal(movie)}
                    className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
                  >
                    <FaInfoCircle /> Details
                  </button>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(movie)}
                    className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 flex items-center justify-center gap-2"
                  >
                    <FaTrashAlt /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* 🎥 Movie Details Modal (DaisyUI) */}
      <dialog id="movie_details_modal" className="modal">
        <div className="modal-box max-w-3xl bg-base-100 text-base-content ">
          {selectedMovie && (
            <>
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>

              <h3 className="font-bold text-2xl mb-3 text-center text-primary">
                {selectedMovie.title}
              </h3>
              <img
                src={selectedMovie.posterUrl}
                alt={selectedMovie.title}
                className="w-full h-96 object-cover  rounded-2xl border-2 shadow-md shadow-white mb-4"
              />
              <div className="grid md:grid-cols-2 gap-2 text-sm">
                <p>
                  <strong>🎭 Genre:</strong> {selectedMovie.genre}
                </p>
                <p>
                  <strong>📅 Year:</strong> {selectedMovie.releaseYear}
                </p>
                <p>
                  <strong>🎬 Director:</strong> {selectedMovie.director}
                </p>
                <p>
                  <strong>⭐ Rating:</strong> {selectedMovie.rating}
                </p>
                <p>
                  <strong>🕒 Duration:</strong> {selectedMovie.duration} min
                </p>
                <p>
                  <strong>🌍 Language:</strong> {selectedMovie.language}
                </p>
                <p>
                  <strong>🏳️ Country:</strong> {selectedMovie.country}
                </p>
              </div>

              <hr className="my-3" />

              <p className=" leading-relaxed text-gray-500 text-center text-sm">
                {selectedMovie.plotSummary}
              </p>

              <div className="modal-action">
                <form method="dialog">
                  <button className="btn btn-primary w-full">Close</button>
                </form>
              </div>
            </>
          )}
        </div>
      </dialog>
    </motion.div>
  );
};

export default WatchList;
