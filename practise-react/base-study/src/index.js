import React from './react';
import ReactDOM from './react-dom';
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: ['A', 'B', 'C', 'D', 'E', 'F'],
      number: 1,
    };
  }
  handleClick = () => {
    this.setState({
      list: ['A', 'C', 'E', 'B', 'G'],
    });
    this.setState({
      number: this.state.number + 1,
    });
  };
  render() {
    return (
      <div>
        <ul>
          <li>static</li>
          {this.state.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div>{this.state.number}</div>
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
}
ReactDOM.render(<Counter />, document.getElementById('root'));
