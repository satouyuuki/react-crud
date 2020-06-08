import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import auth0Client from '../Auth/Auth';

class SubmitAnswer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: '',
    };
  }

  updateAnswer(value) {
    this.setState({
      answer: value,
    });
  }

  async submit() {
    this.props.submitAnswer(this.state.answer);

    this.setState({
      answer: '',
    });
  }

  render() {
    return (
      <Fragment>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Title:</label>
          <input
            type="text"
            onChange={(e) => { this.updateAnswer(e.target.value) }}
            className="form-control"
            placeholder="Share your answer."
            value={this.state.answer}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={() => { this.submit() }}
        >
          Submit
        </button>
        <hr className="my-4" />
      </Fragment>
    );
  }
}

export default withRouter(SubmitAnswer);