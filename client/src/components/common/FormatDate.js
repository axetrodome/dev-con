import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const FormatDate = ({ date }) => {
    return <Moment format="YYYY/MM/DD">{date}</Moment>
}

FormatDate.propTypes = {
    date: PropTypes.string.isRequired,
}

export default FormatDate

