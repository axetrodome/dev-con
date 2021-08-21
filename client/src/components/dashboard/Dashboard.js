import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardAction from './DashboardAction';
import Experience from './Experience';
import Education from './Education';
import { deleteAccount } from '../../actions/profile';

const Dashboard = ({ getCurrentProfile, auth, profile, deleteAccount }) => {
    const { loading, profile: userProfile } = profile;
    const { user } = auth;
    //run get profile once
    useEffect(() => {
        getCurrentProfile();
        
    }, [getCurrentProfile]);

    return loading && userProfile === null ? <Spinner /> : (
        <Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Weclome { user && user.name }
            </p>

            {userProfile !== null ? (
                <Fragment>
                    <DashboardAction />
                    <Experience experience={userProfile.experience} />
                    <Education education={userProfile.education} />
                    <div className="my-2">
                        <button className="btn btn-danger" onClick={() => deleteAccount()}>
                            <i className="fas fa-user-minus"></i> Delete Account
                        </button>
                    </div>
                </Fragment>
            ) : (
                <Fragment>
                    Please add info <Link to="/create-profile" className="btn btn-primary my-1">Create profile</Link>
                </Fragment>
            )}
        </Fragment>
    )
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard)
