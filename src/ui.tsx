import * as React from "react";
import * as ReactDOM from "react-dom";
import "./ui.css";

declare function require(path: string): any;

class App extends React.Component {
  textbox: HTMLInputElement;

  countRef = (element: HTMLInputElement) => {
    if (element) element.value = "5";
    this.textbox = element;
  };

  onCreate = () => {
    const count = parseInt(this.textbox.value, 10);
    parent.postMessage(
      { pluginMessage: { type: "create-rectangles", count } },
      "*"
    );
  };

  onCancel = () => {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  };

  onSearch = (event) => {
    parent.postMessage(
      { pluginMessage: { type: "search", query: event.target.value } },
      "*"
    );
  };

  onType = (event) => {
    console.log("onType onChange", event.target.value);
    parent.postMessage(
      { pluginMessage: { type: "type", query: event.target.value } },
      "*"
    );
  };

  render() {
    return (
      <div>
        {/* <img src={require('./logo.svg')} /> */}
        <input onChange={this.onSearch} />
        <textarea onChange={this.onType} />
        {/* <h2>Rectangle Creator</h2>
      <p>Count: <input ref={this.countRef} /></p>
      <button id="create" onClick={this.onCreate}>Create</button>
      <button onClick={this.onCancel}>Cancel</button> */}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("react-page"));
