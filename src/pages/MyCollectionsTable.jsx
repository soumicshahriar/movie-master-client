import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyCollectionsTable = ({ movie, onDelete }) => {
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

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/movies/${_id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "🎉 Movie deleted successfully!",
              showConfirmButton: false,
              timer: 1500,
            });

            // Call parent callback to remove the movie from state
            onDelete(_id);
          })
          .catch((err) => {
            console.error("Delete failed:", err);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          });
      }
    });
  };

  return (
    <tr className="hover:bg-base-300 transition-all duration-200 ">
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
