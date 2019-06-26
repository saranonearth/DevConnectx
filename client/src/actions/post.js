import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from './types';

export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
    //dispatch(setAlert('POSTS FETCHED', 'success', 2000));
  } catch (error) {
    console.log('POST ACTION:', error);
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Add like

export const addLike = PostId => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${PostId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { PostId, like: res.data }
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Remove like

export const removeLike = PostId => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${PostId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { PostId, like: res.data }
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//Delete Post

export const deletePost = PostId => async dispatch => {
  try {
    axios.delete(`/api/posts/${PostId}`);

    dispatch({
      type: DELETE_POST,
      payload: PostId
    });
    dispatch(setAlert('Post Removed', 'success', 3000));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

//Add post

export const addPost = formData => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/posts', formData, config);
    console.log(res);
    dispatch({
      type: ADD_POST,
      payload: res.data
    });
    dispatch(setAlert('Post Added', 'success', 3000));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};
//Get post
export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data
    });
    //dispatch(setAlert('POSTS FETCHED', 'success', 2000));
  } catch (error) {
    console.log('POST ACTION:', error);
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//Add comment
export const addComment = (formData, PostId) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put(
      `/api/posts/comment/${PostId}`,
      formData,
      config
    );
    console.log(res);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });
    dispatch(setAlert('Comment Added', 'success', 3000));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

//Delete Comment

export const deleteComment = (PostId, CommentId) => async dispatch => {
  try {
    axios.delete(`/api/posts/comment/${PostId}/${CommentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: CommentId
    });
    dispatch(setAlert('Comment Removed', 'success', 3000));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};
