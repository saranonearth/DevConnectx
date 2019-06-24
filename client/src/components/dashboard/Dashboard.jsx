import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { Link } from 'react-router-dom';
import Spiner from '../layouts/Spiner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({
  auth: { user },
  profile: { profile, loading },
  getCurrentProfile,
  deleteAccount
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spiner />
  ) : (
    <Fragment>
      {' '}
      <h1 className='large text-primary'>Dashboard</h1>
      <p>
        <i className='fas fa-user' /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div>
            <button onClick={() => deleteAccount()} className='btn btn-danger'>
              <i className='fas fa-user-minus' /> Delete Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You haven't setup a profile yet.</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            {' '}
            Create Profile{' '}
          </Link>
          <div>
            <button onClick={() => deleteAccount()} className='btn btn-danger'>
              <i className='fas fa-user-minus' /> Delete Account
            </button>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStatetoProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStatetoProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
