import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './ui.css';
class App extends React.Component {
    constructor() {
        super(...arguments);
        this.countRef = (element) => {
            if (element)
                element.value = '5';
            this.textbox = element;
        };
        this.onCreate = () => {
            const count = parseInt(this.textbox.value, 10);
            parent.postMessage({ pluginMessage: { type: 'create-rectangles', count } }, '*');
        };
        this.onCancel = () => {
            parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*');
        };
        this.onSearch = (event) => {
            console.log(event.target.value);
            parent.postMessage({ pluginMessage: { type: 'search', query: event.target.value } }, '*');
        };
    }
    render() {
        return React.createElement("div", null,
            React.createElement("input", { onChange: this.onSearch }));
    }
}
ReactDOM.render(React.createElement(App, null), document.getElementById('react-page'));
