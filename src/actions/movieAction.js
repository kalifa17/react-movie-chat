import * as actionTypes from "./actionTypes";
import * as movies from "../data/movies";

import { databaseRef } from "../config/firebase";

export const fetchMoviesSuccess = movies => ({
  type: actionTypes.FETCH_MOVIES_SUCCESS,
  payload: { movies }
});

export const fetchMoviesError = error => ({
  type: actionTypes.FETCH_MOVIES_FAILURE,
  payload: { error }
});

export function fetchMovies() {
  const header = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "multipart/form-data"
  });
  const sendData = {
    mode: "cors",
    header: header
  };
  return dispatch => {
    return fetch(
      "https://tender-mclean-00a2bd.netlify.com/web/movies.json",
      sendData
    )
      .then(res => res.json())
      .then(json => {
        console.log(json);
        dispatch(fetchMoviesSuccess(json));
        return json;
      })
      .catch(handleErrors => {
        //Only because server does not support CORS
        dispatch(fetchMoviesSuccess(movies.default));
        return movies.default;
      });
  };
}

function handleErrors(response) {
  if (!response.ok) {
    console.error(response);
    throw Error(response.statusText);
  }
  return response;
}

export const addMovieComment = (newMovieComment, uid) => async dispatch => {
  databaseRef
    .child("movieComments")
    .push()
    .set(newMovieComment);
};

export const fetchMoviesComments = uid => async dispatch => {
  databaseRef.child("movieComments").on("value", snapshot => {
    let movieComments = [];
    snapshot.forEach(childSnapshot => {
      movieComments.push(childSnapshot.val());
    });
    dispatch({
      type: actionTypes.FETCH_MOVIES_COMMENTS,
      payload: movieComments
    });
  });
};
