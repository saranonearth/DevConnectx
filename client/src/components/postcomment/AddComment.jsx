import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const AddComment = ({ addComment, postId }) => {
  const [formData, setFormData] = useState({
    text: ''
  });
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    addComment(formData, postId);
    setFormData({ text: '' });
  };
  return (
    <div>
      <div className='post-form'>
        <div className='post-form-header bg-primary'>
          <h3>Leave A Comment</h3>
        </div>
        <form onSubmit={e => handleSubmit(e)} className='form my-1'>
          <textarea
            value={formData.text}
            onChange={e => handleChange(e)}
            name='text'
            cols='30'
            rows='5'
            placeholder='Comment on this post'
          />
          <input type='submit' className='btn btn-dark my-1' value='Submit' />
        </form>
      </div>
    </div>
  );
};

AddComment.propTypes = {
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.string
};

export default connect(
  null,
  { addComment }
)(AddComment);
