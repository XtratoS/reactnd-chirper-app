import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import LoadingBar from 'react-redux-loading';
import NewTweet from './NewTweet';
import TweetPage from './TweetPage';
import Nav from './Nav';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const {loaded} = this.props
    return (
      <Router>
        <Fragment>
          <LoadingBar style={{backgroundColor: 'teal', position: 'fixed', height: '5px'}} />
          <div className="container">
            <Nav />
            {loaded === true?
            <div>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/tweet/:id" component={TweetPage} />
              <Route exact path="/new" component={NewTweet} />
            </div>
            :null}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loaded: authedUser !== null ? true : false
  }
}

export default connect(mapStateToProps)(App);