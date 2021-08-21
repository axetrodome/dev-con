import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import FormatDate from '../common/FormatDate';

const ProfileExperience = ({ profile }) => {
    const { experience } = profile;
    return (
        <div className="profile-exp bg-white p-2">
            <h2 className="text-primary">Experience</h2>
            {
                experience.length > 0 ? (
                    experience.map((exp, index) => (
                        <div key={index}>
                            <h3 className="text-dark">{exp.company}</h3>
                            <p><FormatDate date={exp.from} /> - {
                                exp.to === null ? ('Now') : (<FormatDate date={exp.to} />)
                            }</p>
                            <p><strong>Position: </strong>{exp.title}</p>
                            <p>
                                <strong>Description: </strong>
                                {exp.description}
                            </p>
                        </div>
                    ))
                ) : <Fragment><h4>No experience credentials</h4></Fragment>
            }
            
        </div>
    )
}

ProfileExperience.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileExperience
