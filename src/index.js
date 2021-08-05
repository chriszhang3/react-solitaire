import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Deck, full_deck} from './utils.mjs';

// ========================================

function Pile(props) {
  return (
    <div className="pile" onClick={props.onClick}>
      {props.value}
    </div>
  );
}

class Game extends React.Component {
  constructor(props){
    super(props);

    this.empty = <div
                    className="empty"
                    onDrop={this.drop}
                    onDragOver={(event) => event.preventDefault()}
                  ></div>;

    this.back = <img
                    src={`images/gray_back.png`}
                    alt={`back of card`}
                    height = "106"
                    width = "69"
                    className="card"
                  ></img>;

    this.card_images = {};
    for (let i=0;i<52;i++){
      let card = full_deck[i];
      this.card_images[card] = <img
                      id={`${card}`}
                      src={`images/${card}.png`}
                      alt={`${card}`}
                      height = "106"
                      width = "69"
                      className="card"
                      draggable="true"
                      onDragStart={this.dragStart}
                    ></img>;
    }

    this.deck = new Deck();
    this.number_piles = 3;

    const river = Array(this.number_piles).fill(null);
    river[0] = this.deck.draw_n(3);
    river[1] = this.deck.draw_n(2);

    this.state = {
      river: river,
      clicked: null,
    };
  }

  dragStart = (event) => {
    console.log("start")
    event.dataTransfer.setData("text", event.target.id);
  }

  drop = (event) => {
    console.log("drop")
    if (event.target.id) {
      this.state.swap(event.dataTransfer.getData("text"), event.target.id);
      event.dataTransfer.clearData();
    }
  }

  make_cards(data){
    if (data===null){
      return this.empty;
    }
    const images = [];
    for(let i=0; i<data.length;i++){
      if (i===data.length-1){
        images.push(
          this.card_images[data[i]]
        );
      } else {
        images.push(
          this.back
        );
      }

    }
    return images;
  }

  renderPile(i) {
    return (
      <Pile
        value={this.make_cards(this.state.river[i])}
      />
    )
  }

  render() {
    return (
      <div className="game">
        <div className="river">
          {this.renderPile(0)}
        </div>

        <div className="nertz">
          {this.empty}
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
