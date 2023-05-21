import React, { Component } from "react";
import styles from "./App.module.css";
import ApplicationForm from "./ApplicationForm";
import VerificationForm from "./VerificationForm";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appForm: {},
      verForm: {},
    };
  }
  handleCallbackAppForm = (childState) => {
    this.setState({ appForm: childState });
  };
  handleCallbackVerForm = (childState) => {
    this.setState({ verForm: childState });
  };

  render() {
    return (
      <div className={styles.App}>
        <ApplicationForm parentCallback={this.handleCallbackAppForm} />
        <VerificationForm parentCallback={this.handleCallbackVerForm} appForm={this.state.appForm} />
        <button
          className={styles.json}
          onClick={() => {
            const JSONData = JSON.stringify(this.state);
            console.log(JSONData);
          }}
        >
          JSON
        </button>
      </div>
    );
  }
}
export default App;
