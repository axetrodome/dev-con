import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';


const Profile = ({ getProfileById, profile, auth, match }) => {

    useEffect(() => {
        getProfileById(match.params.id);

    }, [getProfileById, match]);

    const { profile: userProfile, loading } = profile;

    return (
        <Fragment>
            {userProfile === null || loading ? <Spinner /> :
                <Fragment>
                    <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>
                    {auth.isAuthenticated && auth.loading === false && (
                        <Link to="/edit-profile" className="btn btn-dark">
                            Edit Profile
                        </Link>

                    )}
                    <div className="profile-grid my-1">
                        <ProfileTop profile={userProfile} />
                        <ProfileAbout profile={userProfile} />
                        <ProfileExperience profile={userProfile} />
                        <ProfileEducation profile={userProfile} />
                        <ProfileGithub profile={userProfile} />
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfileById: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
})

export default connect(mapStateToProps, { getProfileById })(Profile)
