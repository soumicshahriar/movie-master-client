import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import MyCollectionsTable from "./MyCollectionsTable";

const MyCollections = () => {
  const [movies, setMovies] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:3000/all-movies?email=${user.email}`)
      .then((res) => setMovies(res.data))
      .catch((err) => console.error("Error fetching user movies:", err));
  }, [user]);

  return (
    <div className=" px-4 py-10">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-primary mb-2">
          🎬 My Movie Collections
        </h1>

        <div className="mt-3">
          <span className="bg-primary/10 text-primary px-4 py-1 rounded-full font-semibold">
            Total Movies: {movies.length}
          </span>
        </div>
      </div>

      {/* Movie Table */}
      <div className="overflow-x-auto bg-base-200 rounded-2xl shadow-lg border border-primary/20">
        <table className="table w-full">
          <thead className="bg-primary text-white text-sm">
            <tr>
              <th>Poster</th>
              <th>Title</th>
              <th>Genre</th>
              <th>Release Year</th>
              <th>Director</th>
              <th>Cast</th>
              <th>Rating</th>
              <th>Duration (min)</th>
              <th>Language</th>
              <th>Country</th>
              <th>Plot Summary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.length > 0 ? (
              movies.map((movie) => (
                <MyCollectionsTable key={movie._id} movie={movie} />
              ))
            ) : (
              <tr>
                <td colSpan="12" className="text-center py-10 text-gray-400">
                  You haven’t added any movies yet 🎥
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCollections;
