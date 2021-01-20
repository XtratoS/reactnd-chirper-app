import { combineReducers } from 'redux';
import authedUser from './authedUser';
import users from './users';
import tweets from './tweets';
import { loadingBarReducer } from 'react-redux-loading';

const reducer = combineReducers({
    authedUser,
    users,
    tweets,
    loadingBar: loadingBarReducer
});

export default reducer;