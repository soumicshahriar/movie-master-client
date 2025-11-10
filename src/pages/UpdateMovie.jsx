import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLoaderData, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

const UpdateMovie = () => {
  const movie = useLoaderData();
  console.log(movie);
  const { user } = useContext(AuthContext);
  console.log(user);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault(); // fixed capitalization
    setLoading(true);

    const form = e.target; // get the form element
    const title = form.title.value;
    const genre = form.genre.value;
    const releaseYear = parseInt(form.releaseYear.value);
    const director = form.director.value;
    const cast = form.cast.value;
    const rating = parseFloat(form.rating.value);
    const duration = parseInt(form.duration.value);
    const plotSummary = form.plotSummary.value;
    const posterUrl = form.posterUrl.value;
    const language = form.language.value;
    const country = form.country.value;
    const addedBy = form.addedBy.value;

    const movieData = {
      title,
      genre,
      releaseYear,
      director,
      cast,
      rating,
      duration,
      plotSummary,
      posterUrl,
      language,
      country,
      addedBy,
    };

    try {
      await axios.patch(
        `http://localhost:3000/movies/update/${movie._id}`,
        movieData
      );
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "🎉 Movie Updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/movies");

      //   e.target.reset();
    } catch (error) {
      console.error(error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "🎉 Failed To Update Movie!",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-7xl mx-auto">
      <h3 className="text-md md:text-xl font-bold text-center my-4 ">
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
        <input
          type="text"
          name="genre"
          defaultValue={movie.genre}
          placeholder="Genre"
          className="input input-bordered w-full focus:outline-none focus:border-2 focus:border-primary text-sm md:text-base"
          required
        />

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
          placeholder="Your Email"
          value={user?.email}
          className="input input-bordered w-full focus:outline-none focus:border-2 focus:border-primary text-sm md:text-base"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn bg-primary hover:bg-pink-600 w-full text-sm md:text-base"
        >
          {loading ? "Adding..." : "Update Movie"}
        </button>
      </form>
    </div>
  );
};

export default UpdateMovie;
