import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleAddTweet } from '../actions/tweets';

class NewTweet extends Component {
    state = {
        text: '',
        inputDisabled: false,
        redirectTo: null
    }

    handleChange = (event) => {
        event.preventDefault();
        const text = event.target.value;
        this.setState({text});
    }

    submitTweet = (event) => {
        event.preventDefault();
        const { text } = this.state;
        const { dispatch, id } = this.props;
        this.setState({text: ''});
        dispatch(handleAddTweet({text, replyingTo: id})).then(() => {
            this.setState({redirectTo: id ? null : '/'});
        });
    }

    render() {
        const { text, redirectTo } = this.state;

        const charsLeft = 280 - text.length;

        return (
            <Fragment>
                {redirectTo && <Redirect to={redirectTo} />}
                <div>
                    <h3 className="center">Compose New Tweet</h3>
                    <form
                        className="new-tweet"
                    >
                        <textarea
                            className="textarea"
                            placeholder="What's happening?"
                            value={text}
                            onChange={this.handleChange}
                            maxLength={280}
                        />
                        {charsLeft < 100 &&
                            <div className="tweet-length">
                                {charsLeft}
                            </div>
                        }
                        <button
                            type="button"
                            className="btn"
                            onClick={this.submitTweet}
                            disabled={text.length <= 0 || this.state.inputDisabled}
                        >
                            Tweet
                        </button>
                    </form>
                </div>
            </Fragment>
        )
    }
}

export default connect()(NewTweet);
