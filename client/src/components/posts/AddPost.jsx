import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import PropTypes from 'prop-types';

const AddPost = ({ addPost }) => {
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
    addPost(formData);
    setFormData({ text: '' });
  };
  return (
    <>
      <div className='post-form-header bg-primary'>
        <h3>Say Something...</h3>
      </div>
      <form onSubmit={e => handleSubmit(e)} className='form my-1'>
        <textarea
          value={formData.text}
          onChange={e => handleChange(e)}
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
        />
        <input type='submit' value='Submit' className='btn btn-dark my-1' />
      </form>
    </>
  );
};

AddPost.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPost }
)(AddPost);
