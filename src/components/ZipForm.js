import React, { Component } from 'react';

class ZipForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      zipcode: ''
    };

    // bind methods
    this.inputChanged = this.inputChanged.bind(this);
    this.submitZipCode = this.submitZipCode.bind(this);
  }

  render() {
    return (
      <div className="zip-form">
        <form id="zipForm" onSubmit={this.submitZipCode}>
          <div className="flex-parent">
            <label htmlFor="zipcode">Enter Your Zip</label>
            <input className="form-control" type="input" id="zipcode" name="zipcode" value={this.state.zipcode} required 
            onChange={this.inputChanged}/>
            <button type="submit" id="submitButton" className="btn btn-success">Get the forecast!</button>
          </div>
        </form>
      </div>
    );
  }

  inputChanged(event) {
    // value variable contains user input
    const {value} = event.target;    // destructuring assignment

    // call setState
    // pass a js object containing new zipcode value
    this.setState({zipcode: value});
  }

  // add event handler to form
  submitZipCode(event) {
    event.preventDefault();   // don't submit the form
    const {zipcode} = this.state;   // get the zipcode from the state
    const {onSubmit} = this.props;  // the method from App.js that was passed through props
    onSubmit(zipcode);      // the form calls the App.js method and passes in the zipcode
    this.setState({zipcode: ''});     // clears the zipcode in the class and on the page
  }
}

export default ZipForm;