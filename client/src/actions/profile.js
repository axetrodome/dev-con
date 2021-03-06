import axios from 'axios';
import { setAlert } from './alert';
import {
    ACCOUNT_DELETED,
    CLEAR_PROFILE,
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    GET_REPOS,
    UPDATE_PROFILE
} from './types';

export const getCurrentProfile = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

    } catch (err) {
        const { statusText, status } = err.response;

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: statusText, status}
        })
    }
}

//get all profiles
export const getProfiles = () => async (dispatch) => {
    dispatch({ type: CLEAR_PROFILE });
    try {
        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })

    } catch (err) {
        const { statusText, status } = err.response;

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: statusText, status }
        })
    }
}

//get profile by id
export const getProfileById = userId => async (dispatch) => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

    } catch (err) {
        const { statusText, status } = err.response;

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: statusText, status }
        })
    }
}

//get all github repos
export const getGithubRepos = username => async (dispatch) => {
    try {
        const res = await axios.get(`/api/profile/github/${username}`);
        dispatch({
            type: GET_REPOS,
            payload: res.data
        })

    } catch (err) {
        const { statusText, status } = err.response;

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: statusText, status }
        })
    }
}

//create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/profile', formData, config);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        const successMessage = edit ? 'Profile updated' : 'Profile created';

        dispatch(setAlert(successMessage, 'success'));


        if (!edit) {
            history.push('/dashboard');
        }

    } catch (err) {
        const { statusText, status } = err.response;

        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'));
            });
        }
        
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: statusText, status }
        })
    }
}

//add experience

export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/experience', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Added', 'success'));

        history.push('/dashboard');

    } catch (err) {
        const { statusText, status } = err.response;

        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'));
            });
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: statusText, status }
        })
    }
}

//add education

export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/education', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Added', 'success'));

        history.push('/dashboard');

    } catch (err) {
        const { statusText, status } = err.response;

        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'));
            });
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: statusText, status }
        })
    }
}

//Delete experiences
export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Deleted', 'success'));
    } catch (err) {
        const { statusText, status } = err.response;

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: statusText, status }
        })
    }
}

//Delete education
export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Deleted', 'success'));
    } catch (err) {
        const { statusText, status } = err.response;

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: statusText, status }
        })
    }
}

//Delete account
export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are you sure?')) {

        try {
            await axios.delete('/api/profile');
    
            dispatch({
                type: CLEAR_PROFILE,
            });

            dispatch({
                type: ACCOUNT_DELETED,
            });
    
            dispatch(setAlert('Account Deleted'));
        } catch (err) {
            const { statusText, status } = err.response;
    
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: statusText, status }
            })
        }
    }

}
