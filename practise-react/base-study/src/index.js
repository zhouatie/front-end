import React from './react';
import ReactDOM from './react-dom';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };
  }
  handleClick = () => {
    console.log('handleClick', 'handleClick');
    this.setState({ number: this.state.number + 1 });
    console.log(this.state, 'this.state');
    this.setState({ number: this.state.number + 1 });
    console.log(this.state, 'this.state');
  };
  render() {
    return (
      <div>
        <p>{this.props.title}</p>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
}
const obj = <Counter title='计数器' />
console.log(obj, 'obj')
ReactDOM.render(obj, document.getElementById('root'));
