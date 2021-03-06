import { addMovieComment, fetchMoviesComments } from "../actions/movieAction";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import PersonIcon from "@material-ui/icons/Person";
import React from "react";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";
import _ from "lodash";
import classNames from "classnames";
import { compose } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: "20px"
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

class MovieComments extends React.Component {
  constructor() {
    super();
    this.state = {
      addFormValue: ""
    };
  }

  componentWillMount() {
    this.props.fetchMoviesComments();
  }

  handleInputChange = event => {
    this.setState({ addFormValue: event.target.value });
  };

  handleFormSubmit = event => {
    const { addFormValue } = this.state;
    const { addMovieComment, selection } = this.props;
    const movieSelectedId = selection[0];
    event.preventDefault();
    addMovieComment({ [movieSelectedId]: addFormValue });
    this.setState({ addFormValue: "" });
  };

  renderAddForm = () => {
    const { addFormValue } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <div>
            <TextField
              id="outlined-full-width"
              label="Add a comment for the movie selected"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
              onChange={this.handleInputChange}
              value={addFormValue}
            />
            <Button
              type="submit"
              value="Submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              <SaveIcon
                className={classNames(classes.leftIcon, classes.iconSmall)}
              />
              Save
            </Button>
          </div>
        </form>
      </div>
    );
  };

  renderComment = (value, key) => {
    return (
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={value} />
      </ListItem>
    );
  };

  renderComments = () => {
    const { moviesComments } = this.props;
    const { selection } = this.props;
    const moviesCommentsSelected = moviesComments.map(moviesCommentsElement => {
      return Object.keys(moviesCommentsElement)
        .filter(key => {
          return key+'' === selection[0]+'';
        })
        .reduce((obj, key) => {
          return moviesCommentsElement[key];
        }, "");
    });
    const commments = _.map(moviesCommentsSelected, (value, key) => {
      return <List dense={true}>{value !== '' ? this.renderComment(value, key) : null}</List>;
    });
    if (!_.isEmpty(commments)) {
      return commments;
    }
    return null;
  };

  render() {
    const { selection, classes } = this.props;
    if (!_.isEmpty(selection))
      return (
        <Paper className={classes.root}>
          {this.renderAddForm()}
          {this.renderComments()}
        </Paper>
      );
    return null;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMoviesComments: () => dispatch(fetchMoviesComments()),
    addMovieComment: newMovieComment =>
      dispatch(addMovieComment(newMovieComment))
  };
};

const mapStateToProps = state => ({
  moviesComments: state.moviesComments.items
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
);

export default enhance(MovieComments);
