import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({
  exp: { company, title, location, current, to, from, description }
}) => {
  return (
    <div>
      <h3 className='text-dark'>{company}</h3>
      <p>
        <Moment format='DD/MM/YY'>{from}</Moment> -{' '}
        {!to ? 'NOW' : <Moment format='DD/MM/YY'>{to}</Moment>}
      </p>
      <p>
        <strong>Postion:</strong>
        {title}
      </p>
      <p>
        <strong>Description:</strong>
        {description}
      </p>
    </div>
  );
};

ProfileExperience.propTypes = {
  profile: PropTypes.object
};

export default ProfileExperience;
