import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {
  FaFilm,
  FaUserTie,
  FaClock,
  FaLanguage,
  FaGlobe,
  FaStar,
} from "react-icons/fa";
import { MdCategory, MdOutlineDateRange, MdOutlineEmail } from "react-icons/md";
import { BiCameraMovie } from "react-icons/bi";
import Swal from "sweetalert2";

const AddMovie = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const genres = [
    "Action",
    "Drama",
    "Comedy",
    "Horror",
    "Sci-Fi",
    "Romance",
    "Thriller",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const movieData = {
      title: form.title.value,
      genre: form.genre.value,
      releaseYear: parseInt(form.releaseYear.value),
      director: form.director.value,
      cast: form.cast.value,
      rating: parseFloat(form.rating.value),
      duration: parseInt(form.duration.value),
      plotSummary: form.plotSummary.value,
      posterUrl: form.posterUrl.value,
      language: form.language.value,
      country: form.country.value,
      addedBy: user?.email,
    };

    try {
      await axios.post("http://localhost:3000/movies/add", movieData);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "🎉 Movie added successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      form.reset();
    } catch (error) {
      console.error(error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "❌ Failed to add movie. Please try again.",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto bg-base-100 p-8 rounded-2xl shadow-lg border border-primary/20 mt-10"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-xl font-bold mb-8 text-center">
        🎬 Add a <span className="text-primary">New Movie</span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="form-control">
          <label className="label font-semibold">
            <FaFilm className="inline mr-2 text-primary" /> Movie Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter movie title"
            className="input input-bordered w-full focus:border-primary focus:outline-0 transition-all"
            required
          />
        </div>

        {/* Genre & Release Year */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label font-semibold">
              <MdCategory className="inline mr-2 text-primary" /> Genre
            </label>
            <select
              name="genre"
              className="input input-bordered w-full focus:border-primary focus:outline-0 transition-all"
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select Genre
              </option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <label className="label font-semibold">
              <MdOutlineDateRange className="inline mr-2 text-primary" />{" "}
              Release Year
            </label>
            <input
              type="number"
              name="releaseYear"
              placeholder="e.g., 2014"
              className="input input-bordered w-full focus:border-primary focus:outline-0 transition-all"
              required
            />
          </div>
        </div>

        {/* Director & Cast */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label font-semibold">
              <FaUserTie className="inline mr-2 text-primary" /> Director
            </label>
            <input
              type="text"
              name="director"
              placeholder="Director name"
              className="input input-bordered w-full focus:border-primary focus:outline-0 transition-all"
              required
            />
          </div>
          <div className="form-control">
            <label className="label font-semibold">
              <BiCameraMovie className="inline mr-2 text-primary" /> Cast
            </label>
            <input
              type="text"
              name="cast"
              placeholder="Comma separated (e.g. Anne Hathaway, Matt Damon)"
              className="input input-bordered w-full focus:border-primary focus:outline-0 transition-all"
            />
          </div>
        </div>

        {/* Rating & Duration */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label font-semibold">
              <FaStar className="inline mr-2 text-primary" /> Rating
            </label>
            <input
              type="number"
              name="rating"
              placeholder="e.g., 8.6"
              step="0.1"
              min="0"
              max="10"
              className="input input-bordered w-full focus:border-primary focus:outline-0 transition-all"
            />
          </div>
          <div className="form-control">
            <label className="label font-semibold">
              <FaClock className="inline mr-2 text-primary" /> Duration
              (minutes)
            </label>
            <input
              type="number"
              name="duration"
              placeholder="e.g., 169"
              className="input input-bordered w-full focus:border-primary focus:outline-0 transition-all"
            />
          </div>
        </div>

        {/* Plot Summary */}
        <div className="form-control">
          <label className="label font-semibold">
            <BiCameraMovie className="inline mr-2 text-primary" /> Plot Summary
          </label>
          <textarea
            name="plotSummary"
            placeholder="Brief description of the movie plot..."
            className="textarea textarea-bordered w-full focus:border-primary focus:outline-0 transition-all min-h-[100px]"
          ></textarea>
        </div>

        {/* Poster URL */}
        <div className="form-control">
          <label className="label font-semibold">
            <BiCameraMovie className="inline mr-2 text-primary" /> Poster URL
          </label>
          <input
            type="text"
            name="posterUrl"
            placeholder="https://i.ibb.co/example.jpg"
            className="input input-bordered w-full focus:border-primary focus:outline-0 transition-all"
          />
        </div>

        {/* Language & Country */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label font-semibold">
              <FaLanguage className="inline mr-2 text-primary" /> Language
            </label>
            <input
              type="text"
              name="language"
              placeholder="e.g., English"
              className="input input-bordered w-full focus:border-primary focus:outline-0 transition-all"
            />
          </div>
          <div className="form-control">
            <label className="label font-semibold">
              <FaGlobe className="inline mr-2 text-primary" /> Country
            </label>
            <input
              type="text"
              name="country"
              placeholder="e.g., USA"
              className="input input-bordered w-full focus:border-primary focus:outline-0 transition-all"
            />
          </div>
        </div>

        {/* Added By */}
        <div className="form-control">
          <label className="label font-semibold">
            <MdOutlineEmail className="inline mr-2 text-primary" /> Added By
          </label>
          <input
            type="email"
            name="addedBy"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100 focus:outline-none cursor-not-allowed text-gray-500"
          />
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full text-white font-semibold mt-4 flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          )}
          {loading ? "Adding Movie..." : "Add Movie 🎥"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddMovie;
