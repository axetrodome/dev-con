import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import FormatDate from '../common/FormatDate';

const ProfileEducation = ({ profile }) => {
    const { education } = profile;
    return (
        <div className="profile-edu bg-white p-2">
            <h2 className="text-primary">Education</h2>
            {
                education.length > 0 ? (
                    education.map((edu, index) => (
                        <div key={index}>
                            <h3 className="text-dark">{edu.school}</h3>
                            <p><FormatDate date={edu.from} /> - {
                                edu.to === null ? ('Now') : (<FormatDate date={edu.to} />)
                            }</p>
                            <p><strong>Degree: </strong>{edu.degree}</p>
                            <p><strong>Field of Study: </strong>{edu.fieldofstudy}</p>
                            <p>
                                <strong>Description: </strong>
                                {edu.description}
                            </p>
                        </div>
                    ))
                ) : <Fragment><h4>No education credentials</h4></Fragment>
            }

        </div>
    )
}

ProfileEducation.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileEducation
