import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// ========================================

const two_clubs = <img src="images/2C.png"  alt="two clubs" height = "106" width = "69"></img>;

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
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
    cards[0] = two_clubs;
    cards[1] = two_clubs;
    this.state = {
      cards: cards,
      hand: null
    };
  }

  renderSquare(i) {
      return (
        <Square
          value = {this.state.cards[i]}
          onClick = {() => this.handleClick(i)}
        />
      );
  }

  handleClick(i){
    const cards = this.state.cards.slice();
    var hand = this.state.hand;
    if(this.state.cards[i] == null && this.state.hand == null){
    } else if (this.state.cards[i] != null && this.state.hand == null) {
      hand = cards[i]
      cards[i] = null;
    } else if (this.state.cards[i] == null && this.state.hand != null) {
      cards[i] = hand;
      hand = null;
    } else {}
    this.setState({cards: cards, hand: hand});
  }

  test(){
    const cards = this.state.cards;
    const hand = "Hi"
    this.setState({cards: cards, hand: hand});
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
