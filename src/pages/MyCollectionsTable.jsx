import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxios from "../hooks/useAxios";

const MyCollectionsTable = ({ movie, onDelete }) => {
  const axiosInstance = useAxios();
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

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/movies/${_id}`);

          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "🎉 Movie deleted successfully!",
            showConfirmButton: false,
            timer: 1500,
          });

          // Update parent state after deletion
          onDelete(_id);
        } catch (error) {
          console.error("Delete failed:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      }
    });
  };

  return (
    <tr className="hover:bg-base-300 transition-all duration-200 text-xs ">
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
