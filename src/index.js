import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// ========================================

const two_clubs = <img src="images/2C.png"  alt="two clubs" height = "106" width = "69"></img>;

class Square extends React.Component {

  constructor(props){
    super(props);
    this.state = {card: {props.value}};
  }

  switch = () => {
    if (this.state.card == null){
      this.setState({card: two_clubs});
    } else {
      this.setState({card: null});
    }
  }

  render() {
    return (
      <div className="square" onClick = {this.switch}>
        {this.state.card}
      </div>
    );
  }
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {button: "Click me"};
  }

  renderSquare(show) {
    if (show == true) {
      return <Square />;
    } else {
      return <Square />;
    }

  }

  hi = () => {
    const button = "Clicked";
    this.setState({button: button});
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <button onClick = {this.hi}>
          {this.state.button}
        </button>
        <div className="board-row">
          {this.renderSquare(true)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">

        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
