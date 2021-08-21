import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';
import { Link } from 'react-router-dom';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';


const Post = ({ post, getPost, match }) => {
    const { post: postData, loading } = post;

    useEffect(() => {
        getPost(match.params.id);
    }, [getPost]);

    return loading || postData === null ? <Spinner /> : (
        <Fragment>
            <Link to="/posts" className="btn">Back To Posts</Link>
            <PostItem post={postData} showActions={false} />
            <CommentForm postId={postData._id} />

            <div className="comments">
                {
                    postData.comments.map(comment => (
                        <CommentItem key={comment._id} comment={comment} postId={postData._id} />
                    ))
                }
                
            </div>
        </Fragment>
    )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPost })(Post);
