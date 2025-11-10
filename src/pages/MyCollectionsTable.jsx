import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router";

const MyCollectionsTable = ({ movie }) => {
  const {
    _id,
    posterUrl,
    title,
    genre,
    releaseYear,
    director,
    cast,
    rating,
    duration,
    language,
    country,
    plotSummary,
  } = movie || {};

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this movie?")) {
      fetch(`http://localhost:3000/movies/${id}`, { method: "DELETE" })
        .then((res) => res.json())
        .then(() => {
          alert("Movie deleted successfully!");
          window.location.reload();
        })
        .catch((err) => console.error("Delete failed:", err));
    }
  };

  return (
    <tr className="hover:bg-base-300 transition-all duration-200">
      <td>
        <img
          src={posterUrl}
          alt={title}
          className="w-16 h-20 object-cover rounded-lg border border-primary/30 shadow-sm"
        />
      </td>
      <td className="font-semibold">{title}</td>
      <td>{genre}</td>
      <td>{releaseYear}</td>
      <td>{director}</td>
      <td className="max-w-[200px] truncate" title={cast}>
        {cast}
      </td>
      <td className="font-medium text-yellow-400">{rating}</td>
      <td>{duration}</td>
      <td>{language}</td>
      <td>{country}</td>
      <td className="max-w-[300px] text-left truncate" title={plotSummary}>
        {plotSummary}
      </td>
      <td>
        <div className="flex gap-3 justify-center">
          <Link
            to={`/movies/update/${_id}`}
            className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white"
          >
            <FaEdit />
          </Link>
          <button
            onClick={() => handleDelete(_id)}
            className="btn btn-sm bg-red-600 hover:bg-red-700 text-white"
          >
            <FaTrashAlt />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default MyCollectionsTable;
