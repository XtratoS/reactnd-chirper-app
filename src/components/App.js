import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import LoadingBar from 'react-redux-loading';

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
          <Dashboard />
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