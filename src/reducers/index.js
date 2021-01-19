import { combineReducers } from 'redux';
import authedUser from './authedUser';
import users from './users';
import tweets from './tweets';

const reducer = combineReducers({
    authedUser,
    users,
    tweets
});

export default reducer;