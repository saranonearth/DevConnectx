import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from './types';

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
