import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Deck, full_deck} from './utils.mjs';

// ========================================

const card_images = {};
for (let i=0;i<52;i++){
  const card = full_deck[i];
  card_images[card] = <img
                  src={`images/${card}.png`}
                  alt={`${card}`}
                  height = "106"
                  width = "69"
                  className="card"
                ></img>;
}
const deck = new Deck();

const empty = <div className="empty"></div>;

const number_piles = 3;

class Game extends React.Component {
  constructor(props){
    super(props);
    const river = Array(number_piles).fill(empty);
    river[0] = [card_images[deck.draw()], card_images[deck.draw()]];
    river[1] = [card_images[deck.draw()]];
    this.state = {
      river: river,
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
          {this.state.river[i]}
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
