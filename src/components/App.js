import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import LoadingBar from 'react-redux-loading';
import NewTweet from './NewTweet';
import TweetPage from './TweetPage';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const {loaded} = this.props
    return (
      <div>
        <LoadingBar style={{backgroundColor: 'teal', position: 'fixed', height: '5px'}} />
        {loaded === true?
          <TweetPage match={{params: {id: '8xf0y6ziyjabvozdd253nd'}}} />
        :null}
      </div>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loaded: authedUser !== null ? true : false
  }
}

export default connect(mapStateToProps)(App);