import React from "react";
import Typography from "@material-ui/core/Typography";

const MovieList = ({ movies }) => (
  <div>
    {movies.map((movie, key) => (
      <div key={key}>{movie.title}</div>
    ))}
  </div>
);

export default MovieList;
