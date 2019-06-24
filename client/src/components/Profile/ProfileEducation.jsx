import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({
  edu: { school, degree, fieldofstudy, current, to, from, description }
}) => {
  return (
    <div>
      <h3 className='text-dark'>{school}</h3>
      <p>
        <Moment format='DD/MM/YY'>{from}</Moment> -{' '}
        {!to ? 'NOW' : <Moment format='DD/MM/YY'>{to}</Moment>}
      </p>
      <p>
        <strong>Degree:</strong>
        {degree}
      </p>
      <p>
        <strong>Field of Study:</strong>
        {fieldofstudy}
      </p>
      <p>
        <strong>Description</strong>
        {description}
      </p>
    </div>
  );
};

ProfileEducation.propTypes = {
  profile: PropTypes.object
};

export default ProfileEducation;
