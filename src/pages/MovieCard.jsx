import React from "react";
import { Link } from "react-router";

const MovieCard = ({ movie }) => {
  const { _id, posterUrl, title, rating, genre, releaseYear } = movie || {};

  return (
    <div className="bg-transparent border-primary border-2  rounded-2xl shadow-md shadow-primary overflow-hidden hover:shadow-lg transition-all duration-300 text-primary">
      <img
        src={posterUrl}
        alt={title}
        className="border w-full h-60 object-cover"
      />
      <div className="p-4 space-y-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p>🎭 Genre: {genre}</p>
        <p>📅 Year: {releaseYear}</p>
        <p className="text-yellow-500 font-medium">⭐ Rating: {rating}</p>
        <Link to={`/movies/${_id}`}>
          <button className="mt-3 bg-primary w-full text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors">
            Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
