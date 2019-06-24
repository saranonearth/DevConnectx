import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar }
  }
}) => {
  return (
    <div className='profile-top bg-primary p-2'>
      <img className='round-img my-1' src={avatar} alt='img' />

      <h1 className='large'>{name}</h1>
      <p className='lead'>{status}</p>
      <p>{location}</p>
      <div className='icons my-1'>
        {social && social.website ? (
          <a href={social.website}>
            <i className='fas fa-globe fa-2x' />
          </a>
        ) : null}
        {social && social.twitter ? (
          <a href={social.twitter}>
            <i className='fab fa-twitter fa-2x' />
          </a>
        ) : null}
        {social && social.facebook ? (
          <a href={social.facebook}>
            <i className='fab fa-facebook fa-2x' />
          </a>
        ) : null}

        {social && social.linkedin ? (
          <a href={social.linkedin}>
            <i className='fab fa-linkedin fa-2x' />
          </a>
        ) : null}
        {social && social.instagram ? (
          <a href={social.instagram}>
            <i className='fab fa-instagram fa-2x' />
          </a>
        ) : null}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;
