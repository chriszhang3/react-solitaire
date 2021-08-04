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

const empty = <div className="empty"></div>;

const number_piles = 3;

// function River(props) {
//   return (
//   )
// }

class Game extends React.Component {
  constructor(props){
    super(props);
    const cards = Array(number_piles).fill(empty);
    cards[0] = [two_d, two_clubs];
    cards[1] = [two_clubs];
    this.state = {
      cards: cards,
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
    const piles_array = [];
    for(let i=0; i<number_piles; i++){
      piles_array.push(
        <div className="pile">
          {this.state.cards[i]}
        </div>
      );
    }
    return (
      <div className="game">
        <div className="river">
          {piles_array}
        </div>

        <div className="nertz">
          {empty}
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
