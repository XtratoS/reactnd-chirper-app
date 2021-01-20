import { ADD_TWEET, RECEIVE_TWEETS, TOGGLE_TWEET } from '../actions/tweets'

export default function tweets(state = {}, action) {
    switch (action.type) {
        case RECEIVE_TWEETS:
            return {...state, ...action.tweets};
        case TOGGLE_TWEET:
            return {
                ...state, [action.id]: {
                    ...state[action.id],
                    likes: action.hasLiked === true
                        ? state[action.id].likes.filter((uid) => uid !== action.authedUser)
                        : state[action.id].likes.concat([action.authedUser])
                }
            }
        case ADD_TWEET:
            const { tweet } = action
            let tweetBeingRepliedTo = {};
            if (tweet.replyingTo !== null) {
                tweetBeingRepliedTo = {
                    [tweet.replyingTo]: {
                    ...state[tweet.replyingTo],
                    replies: state[tweet.replyingTo].replies.concat([tweet.id])
                }};
            }
            
            return {
                ...state,
                [tweet.id]: tweet,
                ...tweetBeingRepliedTo
            }
        default:
            return state;
    }
}