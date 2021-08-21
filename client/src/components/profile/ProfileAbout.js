import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { capitalFirst } from '../../utils/commonFunctions';
const ProfileAbout = ({ profile }) => {
    const { 
        bio,
        skills,
        user
     } = profile;

     const { name } = user;

    return (
        <div className="profile-about bg-light p-2">
            {
                <Fragment>
                    <h2 className="text-primary">{capitalFirst(name)}'s Bio</h2>
                    <p>
                        {bio}
                    </p>
                </Fragment>
            }
            
            <div className="line"></div>
            <h2 className="text-primary">Skill Set</h2>
            <div className="skills">
                {
                    skills.map((skill, index) => (
                        <div className="p-1" key={index}>
                            <i className="fa fa-check"></i> {skill}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileAbout
