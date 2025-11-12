import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxios from "../hooks/useAxios";

const UpdateMovie = () => {
  const axiosInstance = useAxios();
  const movie = useLoaderData();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const genres = [
    "Action",
    "Drama",
    "Comedy",
    "Horror",
    "Sci-Fi",
    "Romance",
    "Thriller",
  ];

  const handleUpdate = async (e) => {
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
      addedBy: form.addedBy.value,
    };

    try {
      await axiosInstance.patch(`/movies/update/${movie._id}`, movieData);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "🎉 Movie Updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/movies");
    } catch (error) {
      console.error(error);
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "❌ Failed To Update Movie!",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h3 className="text-md md:text-xl font-bold text-center my-4">
        Update <span className="text-primary">Movie</span>
      </h3>
      <form onSubmit={handleUpdate} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          name="title"
          defaultValue={movie.title}
          placeholder="Title"
          className="input input-bordered w-full focus:outline-none focus:border-2 focus:border-primary text-sm md:text-base"
          required
        />

        {/* Genre */}
        <select
          name="genre"
          defaultValue={movie.genre}
          className="input input-bordered w-full focus:outline-none focus:border-2 focus:border-primary text-sm md:text-base"
          required
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

        {/* Release Year */}
        <input
          type="number"
          name="releaseYear"
          defaultValue={movie.releaseYear}
          placeholder="Release Year"
          className="input input-bordered w-full focus:outline-none focus:border-2 focus:border-primary text-sm md:text-base"
          required
        />

        {/* Director */}
        <input
          type="text"
          name="director"
          defaultValue={movie.director}
          placeholder="Director"
          className="input input-bordered w-full focus:outline-none focus:border-2 focus:border-primary text-sm md:text-base"
          required
        />

        {/* Cast */}
        <input
          type="text"
          name="cast"
          defaultValue={movie.cast}
          placeholder="Cast (comma separated)"
          className="input input-bordered w-full focus:outline-none focus:border-2 focus:border-primary text-sm md:text-base"
        />

        {/* Rating */}
        <input
          type="number"
          name="rating"
          defaultValue={movie.rating}
          placeholder="Rating"
          step="0.1"
          className="input input-bordered w-full focus:outline-none focus:border-2 focus:border-primary text-sm md:text-base"
        />

        {/* Duration */}
        <input
          type="number"
          name="duration"
          defaultValue={movie.duration}
          placeholder="Duration (minutes)"
          className="input input-bordered w-full focus:outline-none focus:border-2 focus:border-primary text-sm md:text-base"
        />

        {/* Plot Summary */}
        <textarea
          name="plotSummary"
          placeholder="Plot Summary"
          defaultValue={movie.plotSummary}
          className="textarea textarea-bordered w-full focus:outline-none focus:border-2 focus:border-primary text-sm md:text-base"
        ></textarea>

        {/* Poster URL */}
        <input
          type="text"
          name="posterUrl"
          defaultValue={movie.posterUrl}
          placeholder="Poster URL"
          className="input input-bordered w-full focus:outline-none focus:border-2 focus:border-primary text-sm md:text-base"
        />

        {/* Language */}
        <input
          type="text"
          name="language"
          defaultValue={movie.language}
          placeholder="Language"
          className="input input-bordered w-full focus:outline-none focus:border-2 focus:border-primary text-sm md:text-base"
        />

        {/* Country */}
        <input
          type="text"
          name="country"
          defaultValue={movie.country}
          placeholder="Country"
          className="input input-bordered w-full focus:outline-none focus:border-2 focus:border-primary text-sm md:text-base"
        />

        {/* Email */}
        <input
          type="email"
          name="addedBy"
          value={user?.email}
          readOnly
          className="input input-bordered w-full focus:outline-none focus:border-2 focus:border-primary text-sm md:text-base cursor-not-allowed bg-gray-100 text-gray-500"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn bg-primary hover:bg-pink-600 w-full text-sm md:text-base"
        >
          {loading ? "Updating..." : "Update Movie"}
        </button>
      </form>
    </div>
  );
};

export default UpdateMovie;
