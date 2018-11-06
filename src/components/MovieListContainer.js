import MovieList from "./MovieList";
import React from "react";
import { connect } from "react-redux";
import { fetchMovies } from "../actions/movieAction";

class MovieListContainer extends React.Component {
  constructor() {
    super();
    this.state = { movies: { items: [] } };
  }
  componentDidMount() {
    this.props.fetchMovies();
  }
  render() {
    const { movies } = this.props;
    return (
      <div>
        <MovieList movies={movies} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMovies: () => dispatch(fetchMovies())
  };
};

const mapStateToProps = state => ({
  movies: state.movies.items,
  loading: state.movies.loading,
  error: state.movies.error
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieListContainer);
