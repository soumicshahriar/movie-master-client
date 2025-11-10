import React from "react";
import { useLoaderData } from "react-router";
import MovieCard from "./MovieCard";

const AllMovies = () => {
  const allMovies = useLoaderData();
  console.log(allMovies);

  return (
    <div className="max-w-11/12 mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        All <span className="text-primary">Movies</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allMovies?.map((movie, i) => (
          <MovieCard key={movie._id} movie={movie} index={i} />
        ))}
      </div>
    </div>
  );
};

export default AllMovies;
