import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getuserProfile } from '../../actions/profile';
import Spiner from '../../components/layouts/Spiner';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
const Profile = ({
  getuserProfile,
  profile: { profile, loading },
  match,
  auth
}) => {
  useEffect(() => {
    getuserProfile(match.params.id);
  }, [getuserProfile, match.params.id]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spiner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile{' '}
              </Link>
            )}
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className='profile-exp bg-white p-2'>
              <h2 className='text-primary'>Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map(exp => (
                    <ProfileExperience key={exp._id} exp={exp} />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience credentials found</h4>
              )}
            </div>
            <div className='profile-edu bg-white p-2'>
              <h2 className='text-primary'>Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map(edu => (
                    <ProfileEducation key={edu._id} edu={edu} />
                  ))}
                </Fragment>
              ) : (
                <h4>No education credentials found</h4>
              )}
            </div>
            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getuserProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStatetoProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(
  mapStatetoProps,
  { getuserProfile }
)(Profile);
