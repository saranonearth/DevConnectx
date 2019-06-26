import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Comments from '../postcomment/Comments';
import MainPost from '../postcomment/MainPost';
import AddComment from '../postcomment/AddComment';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
import { Link } from 'react-router-dom';
import Spiner from '../../components/layouts/Spiner';
const Comment = ({ getPost, match, Post: { post } }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);
  return (
    <>
      <Link to='/posts' className='btn btn-light'>
        {' '}
        Back To Posts
      </Link>

      {post === null ? (
        <Spiner />
      ) : (
        <>
          <MainPost post={post} />
          <AddComment postId={match.params.id} />

          {post.comments.length > 0 ? (
            <>
              {' '}
              {post.comments.map(comment => (
                <Comments
                  postId={match.params.id}
                  key={comment._id}
                  comment={comment}
                />
              ))}
            </>
          ) : null}
        </>
      )}
    </>
  );
};

Comment.propTypes = {
  getPost: PropTypes.func.isRequired,
  Post: PropTypes.object
};
const mapStatetoProps = state => ({
  Post: state.post
});
export default connect(
  mapStatetoProps,
  { getPost }
)(Comment);
