import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatTweet, formatDate } from '../utils/helpers';
import { TiArrowBackOutline } from 'react-icons/ti';
import { TiHeartOutline } from 'react-icons/ti';
import { TiHeartFullOutline } from 'react-icons/ti';
import { handleToggleTweet } from '../actions/tweets';
import { Link, withRouter } from 'react-router-dom';

class Tweet extends Component {
    redirectToParent = (event, parentId) => {
        event.preventDefault();
        console.log(event.target, parentId);
        this.props.history.push(`/tweet/${parentId}`);
    }

    handleLike = (event) => {
        event.preventDefault();
        const { dispatch, tweet, authedUser } = this.props;
        
        dispatch(handleToggleTweet({
            id: tweet.id,
            hasLiked: tweet.hasLiked,
            authedUser
        }));
    }

    render() {
        const { tweet } = this.props;

        if (tweet === null) {
            return (<p>Tweet doesn't exist!</p>)
        }
        
        const { name, avatar, timestamp, parent, text, replies, likes, hasLiked, id } = tweet;

        return (
            <Link className="tweet" to={`/tweet/${id}`}>
                <img
                    src={avatar}
                    alt={`Avatar of @${name}`}
                    className="avatar"
                />
                <div className="tweet-info">
                    <div>
                        <span>{name}</span>
                        <div>{formatDate(timestamp)}</div>
                        {parent ?
                            <button className="replying-to" onClick={(e) => {this.redirectToParent(e, parent.id)}}>
                                Replying to @{parent.author}
                            </button>
                        :null}
                        <p>{text}</p>
                    </div>
                    <div className="tweet-icons">
                        <TiArrowBackOutline className="tweet-icon" />
                        <span>{replies > 0 ? replies : null}</span>
                        <button className="heart-button" onClick={(e) => {this.handleLike(e)}}>
                            {hasLiked === true
                                ? <TiHeartFullOutline className="tweet-icon" color="red" />
                                : <TiHeartOutline className="tweet-icon" />
                            }
                        </button>
                        <span>{likes > 0 ? likes : null}</span>
                    </div>
                </div>
            </Link>
        )
    }
}

function mapStateToProps({users, tweets, authedUser}, {id}) {
    const tweet = tweets[id]

    const authorName = tweet ? tweet.author : null;
    const author = users[authorName];

    const parentTweetId = tweet ? tweet.replyingTo : null;
    const parentTweet = tweets[parentTweetId];

    return {
        authedUser,
        tweet: tweet
            ? formatTweet(tweet, author, authedUser, parentTweet)
            : null
    }
}

export default withRouter(connect(mapStateToProps)(Tweet));
