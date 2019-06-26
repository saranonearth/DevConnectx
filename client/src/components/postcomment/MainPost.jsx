import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MainPost = ({ post }) => {
  return (
    <>
      <div className='post bg-white p-1 my-1'>
        <div>
          <Link to={`/profile/${post.user}`}>
            <img className='round-img' src={post.avatar} alt='profile-img' />
            <h4>{post.name}}</h4>
          </Link>
        </div>
        <div>
          <p className='my-1'>{post.text}</p>
        </div>
      </div>
    </>
  );
};

MainPost.propTypes = {
  post: PropTypes.object
};

export default MainPost;
