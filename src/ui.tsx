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
    console.log(event.target.value);
    parent.postMessage(
      { pluginMessage: { type: "search", query: event.target.value } },
      "*"
    );
  };

  render() {
    return (
      <div>
        <input onChange={this.onSearch} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("react-page"));
