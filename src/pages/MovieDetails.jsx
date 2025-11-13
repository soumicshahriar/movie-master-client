import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { FaHeart, FaPen } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import useAxios from "../hooks/useAxios";

const MovieDetails = () => {
  const axiosInstance = useAxios();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(`/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleAddToWatchList = async (movieId, userEmail) => {
    try {
      await axiosInstance.post("/users/watch-list", {
        userEmail,
        movieId,
      });
      Swal.fire({
        title: "Added!",
        text: "🎥 Movie added to your watchList.",
        icon: "success",
        confirmButtonColor: "#6366f1",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Already added!",
        text: "This movie is already in your watchList.",
        icon: "info",
        confirmButtonColor: "#60a5fa",
      });
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This movie will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`/movies/${id}`)
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "🎉 Movie deleted successfully!",
              icon: "success",
              background: "#ffe4e6",
              color: "#7f1d1d",
              confirmButtonColor: "#ec4899",
            }).then(() => {
              navigate("/");
            });
          })
          .catch((err) => {
            console.error(err);
            Swal.fire({
              title: "Error!",
              text: "Something went wrong while deleting.",
              icon: "error",
              confirmButtonColor: "#ef4444",
            });
          });
      }
    });
  };

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found</div>;

  const isOwner = user && user.email === movie.addedBy;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-transparent border-primary border-2 rounded-xl shadow-md mt-10 space-y-2">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="w-full max-h-[500px] object-cover mb-4 rounded-lg"
      />

      <p>
        <strong>Genre:</strong> {movie.genre}
      </p>
      <p>
        <strong>Release Year:</strong> {movie.releaseYear}
      </p>
      <p>
        <strong>Director:</strong> {movie.director}
      </p>
      <p>
        <strong>Cast:</strong> {movie.cast}
      </p>
      <p>
        <strong>Rating:</strong> {movie.rating}
      </p>
      <p>
        <strong>Duration:</strong> {movie.duration} min
      </p>
      <p>
        <strong>Plot Summary:</strong> {movie.plotSummary}
      </p>
      <p>
        <strong>Language:</strong> {movie.language}
      </p>
      <p>
        <strong>Country:</strong> {movie.country}
      </p>
      <p>
        <strong>Added By:</strong> {movie.addedBy}
      </p>

      {isOwner && (
        <div className="mt-4 flex gap-4">
          <button
            className="w-1/2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center gap-2"
            onClick={() => navigate(`/movies/update/${movie._id}`)}
          >
            <FaPen></FaPen> Edit
          </button>
          <button
            className="px-4 py-2 w-1/2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center gap-2"
            onClick={handleDelete}
          >
            <MdDeleteOutline /> Delete
          </button>
        </div>
      )}

      {user && (
        <button
          onClick={() => handleAddToWatchList(movie._id, user.email)}
          className="mt-4 w-full bg-primary text-white py-2 rounded-lg hover:bg-pink-500 flex  items-center justify-center gap-2"
        >
          <FaHeart></FaHeart> Add to WatchList
        </button>
      )}
    </div>
  );
};

export default MovieDetails;
