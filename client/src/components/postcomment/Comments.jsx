import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/post';

const Comments = ({
  deleteComment,
  postId,
  auth,
  comment: { _id, user, avatar, text, name, date }
}) => {
  return (
    <>
      <div className='post bg-white p-1 my-1'>
        <div>
          <Link to={`/profile/${user}`}>
            <img className='round-img' src={avatar} alt='profile-img' />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className='my-1'>{text}</p>
          <p className='text-primary'>
            Posted on <Moment format={'DD/MM/YYYY'}>{date}</Moment>
          </p>
        </div>
        {!auth.loading && auth.user._id === user && (
          <button
            onClick={() => deleteComment(postId, _id)}
            className='btn btn-danger'
          >
            <i className='fas fa-times' />
          </button>
        )}
      </div>
    </>
  );
};

Comments.propTypes = {
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStatetoProps = state => ({
  auth: state.auth,
  deleteComment: PropTypes.func.isRequired
});
export default connect(
  mapStatetoProps,
  { deleteComment }
)(Comments);
