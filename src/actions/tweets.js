import { hideLoading, showLoading } from "react-redux-loading";
import { saveLikeToggle, saveTweet } from "../utils/api";

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const TOGGLE_TWEET = 'TOGGLE_TWEET';
export const ADD_TWEET = 'ADD_TWEET';

function addTweet (tweet) {
    return {
        type: ADD_TWEET,
        tweet
    }
}

export function handleAddTweet(tweetMiniInfo) {
    return function (dispatch, getState) {
        const { text, replyingTo } = tweetMiniInfo;
        const { authedUser } = getState();
        dispatch(showLoading());
        return saveTweet({
            text,
            author: authedUser,
            replyingTo
        }).then((savedTweet) => dispatch(addTweet(savedTweet)))
        .then(() => dispatch(hideLoading()));
    }
}

export function receiveTweets(tweets) {
    return {
        type: RECEIVE_TWEETS,
        tweets
    }
}

function toggleTweet({id, authedUser, hasLiked}) {
    return {
        type: TOGGLE_TWEET,
        id,
        authedUser,
        hasLiked
    }
}

export function handleToggleTweet(info) {
    return function(dispatch) {
        dispatch(toggleTweet(info));

        return saveLikeToggle(info)
            .catch((error) => {
                console.warn(`Error in handleToggleTweet: `, error);
                dispatch(toggleTweet(info));
                alert(`There was an error liking the tweet. Please refresh the page and try again.`);
            });
    }
}