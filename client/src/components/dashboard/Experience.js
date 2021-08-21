import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profile';
import FormatDate from '../common/FormatDate';

const Experience = ({ experience, deleteExperience }) => {
    const experiences = experience.map(exp => (
        <tr key={exp._id}>
            <td className="hide-sm">{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            <td>
                <FormatDate date={exp.from} /> - {
                    exp.to === null ? ('Now') : (<FormatDate date={exp.to} />)
                }               
            </td>
            <td>
                <button type="button" onClick={() => deleteExperience(exp._id)} className="btn btn-danger">Delete</button>
            </td>
        </tr>
    ))
    return (
        <Fragment>
            <h2 className="my-2">Experience Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                        <th className="hide-sm">Years</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {experiences}
                </tbody>
            </table>
        </Fragment>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired,
}


export default connect(null, { deleteExperience })(Experience);
