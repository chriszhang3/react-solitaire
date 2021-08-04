import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// ========================================

const two_clubs = <img
                    src="images/2C.png"
                    alt="two clubs"
                    height = "106"
                    width = "69"
                    className="card"
                  ></img>;

const two_d = <img
                    src="images/2D.png"
                    alt="two d"
                    height = "106"
                    width = "69"
                    className="card"
                  ></img>;

const empty = <div className="empty"></div>

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
    const cards = Array(3).fill(empty);
    const borders = Array(3).fill("blackSquare");
    cards[0] = [two_d];
    cards[1] = two_clubs;
    this.state = {
      cards: cards,
      borders: borders
    };
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
    this.setState({cards: cards, borders: borders});
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <div className="pile">
            {this.state.cards[0][0]}
          </div>
          <div className="pile">
            {two_clubs}
          </div>
          <div className="pile">
            {empty}
          </div>
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
