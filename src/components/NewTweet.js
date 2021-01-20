import React, { Component } from 'react'

export class NewTweet extends Component {
    state = {
        text: ''
    }

    handleChange = (event) => {
        const text = event.target.value;
        this.setState({text});
    }

    submitTweet = (event) => {
        const { text } = this.state;
        this.setState({text: ''})
        console.log(this.state.text);
        // Actually send the tweet
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
                        disabled={text.length <= 0}
                    >
                        Tweet
                    </button>
                </form>
            </div>
        )
    }
}

export default NewTweet
