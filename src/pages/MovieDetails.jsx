import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      axios
        .delete(`http://localhost:3000/movies/${id}`)
        .then(() => {
          alert("Movie deleted successfully");
          navigate("/"); // Redirect to home page after deletion
        })
        .catch((err) => console.error(err));
    }
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
            className="w-1/2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => navigate(`/movies/update/${movie._id}`)}
          >
            Edit
          </button>
          <button
            className="px-4 py-2 w-1/2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
