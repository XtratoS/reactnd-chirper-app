import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import LoadingBar from 'react-redux-loading';
import NewTweet from './NewTweet';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const {loaded} = this.props
    return (
      <div>
        <LoadingBar style={{backgroundColor: 'teal'}} />
        {loaded === true?
          <NewTweet />
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