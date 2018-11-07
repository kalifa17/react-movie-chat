import { addMovieComment, fetchMoviesComments } from "../actions/movieAction";

import MovieList from "./MovieList";
import React from "react";
import _ from "lodash";
import { connect } from "react-redux";

class MovieComments extends React.Component {
  constructor() {
    super();
    this.state = {
        addFormValue: ""
    };
    
  }
  componentDidMount() {
    // this.props.fetchMovies();
  }
  componentWillMount() {
    this.props.fetchMoviesComments();
  }

  handleInputChange = event => {
    this.setState({ addFormValue: event.target.value });
  };

  handleFormSubmit = event => {
    const { addFormValue } = this.state;
    const { addMovieComment } = this.props;
    event.preventDefault();
    addMovieComment({ 'iduniquemovie0': addFormValue });
    this.setState({ addFormValue: "" });
  };

  renderAddForm = () => {
    const { addFormValue } = this.state;
      return (
        <div id="todo-add-form">
          <form onSubmit={this.handleFormSubmit}>
            <div>
              <i>note_add</i>
              <input
                value={addFormValue}
                onChange={this.handleInputChange}
                id="toDoNext"
                type="text"
              />
              <label htmlFor="toDoNext">What To Do Next</label>
            </div>
          </form>
        </div>
      );
  };

  renderToDos() {
    const { moviesComments } = this.props;
    console.log("renderToDos");
    console.log(moviesComments);
    const toDos = _.map(moviesComments, (value, key) => {
    //   return <ToDoListItem key={key} todoId={key} todo={value} />;
      return <div key={key} todoId={key}>{value}</div>;
    });
    console.log("renderToDos");
    console.log(toDos);
    if (!_.isEmpty(toDos)) {
      return toDos;
    }
    return (
      <div>
        <h4>You have completed all the tasks</h4>
        <p>Start by clicking add button in the bottom of the screen</p>
      </div>
    );
  }

  render() {
    return (
      <div>
          {this.renderAddForm()}
          {/* {this.renderToDos()} */}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMoviesComments: () => dispatch(fetchMoviesComments()),
    addMovieComment: (newMovieComment) => dispatch(addMovieComment(newMovieComment))
  };
};

const mapStateToProps = state => ({
    moviesComments: state.moviesComments.items,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieComments);
