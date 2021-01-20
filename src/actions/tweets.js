import { saveLikeToggle } from "../utils/api";

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const TOGGLE_TWEET = 'TOGGLE_TWEET';

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