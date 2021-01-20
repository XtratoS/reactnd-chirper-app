import React, { Component } from 'react'
import { connect } from 'react-redux';
import { handleAddTweet } from '../actions/tweets';

export class NewTweet extends Component {
    state = {
        text: '',
        inputDisabled: false
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
        // console.log(this.state.text);
        // Actually send the tweet
        dispatch(handleAddTweet({text, id}));
    }

    render() {
        const { text } = this.state;

        // Redirect to / if submitted

        const charsLeft = 280 - text.length;

        return (
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
        )
    }
}

export default connect()(NewTweet);
