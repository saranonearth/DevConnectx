import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  auth,
  post: { _id, text, name, avatar, user, like, comments, date },
  addLike,
  removeLike,
  deletePost
}) => {
  return (
    <>
      <div className='post bg-white my-1 p-1'>
        <div>
          <Link to={`/profile/${_id}`}>
            <img className='round-img' src={avatar} alt='avatar' />
            <h4>{name}</h4>
          </Link>
        </div>

        <div>
          <p className='my-1'>{text}</p>
          <p className='post-date text-primary'>
            Posted on <Moment format={'YYYY/MM/DD'}>{date}</Moment>{' '}
          </p>

          <button className='btn' onClick={() => addLike(_id)}>
            <i className='fas fa-thumbs-up' />{' '}
            {like.length > 0 ? <span>{like.length}</span> : null}
          </button>
          <button className='btn' onClick={() => removeLike(_id)}>
            <i className='fas fa-thumbs-down' />
          </button>
          <Link to={`/posts/${_id}`} className='btn btn-primary'>
            Comments{' '}
            {comments.length > 0 ? (
              <span className='comment-count'>{comments.length}</span>
            ) : null}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              type='button'
              className='btn btn-danger'
              onClick={() => deletePost(_id)}
            >
              {' '}
              <i className='fas fa-times' />{' '}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStatetoProps = state => ({
  auth: state.auth
});
export default connect(
  mapStatetoProps,
  { addLike, deletePost, removeLike }
)(PostItem);
