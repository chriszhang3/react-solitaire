import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// ========================================

const two_clubs = <img src="images/2C.png"  alt="two clubs" height = "106" width = "69"></img>;

class Square extends React.Component {
  render() {
    return (
      <button
        className="square"
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props){
    super(props);
    const cards = Array(3).fill(null);
    cards[0] = two_clubs;
    this.state = {
      cards: cards,
    };
  }

  handleClick(i){
    const cards = this.state.cards.slice();
    if(this.state.cards[i] == null){
      cards[i] = two_clubs;
    } else {
      cards[i] = null;
    }
    this.setState({cards: cards});
  }

  renderSquare(i) {
      return (
        <Square
          value = {this.state.cards[i]}
          onClick = {() => this.handleClick(i)}
        />
      );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
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
