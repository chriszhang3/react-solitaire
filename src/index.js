import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// ========================================

const two_clubs = <img src="images/2C.png"  alt="two clubs" height = "106" width = "69"></img>;

function Square(props) {
  return (
    <button
      className={props.border}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Hand  extends React.Component {
  render() {
    return (
      <div>
        {this.props.value}
      </div>
    )
  }
}

class Game extends React.Component {
  constructor(props){
    super(props);
    const cards = Array(3).fill(null);
    const borders = Array(3).fill("blackSquare");
    cards[0] = two_clubs;
    cards[1] = two_clubs;
    this.state = {
      cards: cards,
      hand: null,
      borders: borders
    };
  }

  renderSquare(i) {
      return (
        <Square
          value = {this.state.cards[i]}
          onClick = {() => this.handleClick(i)}
          border = {this.state.borders[i]}
        />
      );
  }

  handleClick(i){

    const borders = this.state.borders.slice();
    const cards = this.state.cards.slice();
    var hand = this.state.hand;
    if (hand === null) {
      hand = [this.state.cards[i], i];
      borders[i] = "redSquare";
    } else {
      var [hand_card, place] = hand;
      cards[place] = null;
      cards[i] = hand_card;
      hand = null;
      borders.fill("blackSquare");
    }
    this.setState({cards: cards, hand: hand, borders: borders});
  }

  render() {
    return (
      <div className="game">

        <div className="game-board">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>

        <div className="your-hand">
          <Hand value = {this.state.hand} hi = {() => this.test()} />
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
