import MovieComments from "./MovieComments";
import MovieList from "./MovieList";
import React from "react";
import { connect } from "react-redux";
import { fetchMovies } from "../actions/movieAction";

class MovieListContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: { items: [] },
      sorting: [{ columnName: "year", direction: "desc" }]
    };
    this.changeSorting = sorting => this.setState({ sorting });
    this.changeSelection = selection => {
      this.setState({ selection });
    };
  }
  componentDidMount() {
    this.props.fetchMovies();
  }

  render() {
    const { movies } = this.props;
    const { sorting, selection } = this.state;
    const propsMovieList = {
      movies,
      sorting,
      changeSorting: this.changeSorting,
      changeSelection: this.changeSelection
    };
    return (
      <div>
        <MovieComments selection={selection} />
        <MovieList {...propsMovieList} />
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
