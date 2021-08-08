import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Deck, suits, ranks} from './utils.mjs';

// ========================================

function Empty(props) {
  return (
    <div className="empty" onDrop={this.drop} onDragOver={(event) => event.preventDefault()}>
    </div>
  );
}

function Pile(props) {
  return (
    <div className="pile" onClick={props.onClick}>
      {props.value}
    </div>
  );
}

class Card extends React.Component {
  render(){
    return (
      <div draggable={true} onDragStart={this.props.onDragStart}>
        {this.props.value}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props){
    super(props);

    this.back = <img
                    src={`images/gray_back.png`}
                    alt={`back of card`}
                    height = "106"
                    width = "69"
                    className="card"
                  ></img>;

    this.card_images = {};
    this.refs = new Array(4);
    for (let s=0;s<4;s++){
      this.refs[s] = new Array(13);
      for (let r=0;r<13;r++){
        this.refs[s][r] = React.createRef();
        let card = ranks[r]+suits[s]; 
        this.card_images[card] = <img
                      id={`${card}`}
                      ref={this.refs[s][r]}
                      src={`images/${card}.png`}
                      alt={`${card}`}
                      height = "106"
                      width = "69"
                      className="card"
                    ></img>;
      }
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

  dragStart(location,event){
    console.log("start")
    console.log(location)
    event.dataTransfer.setData("text", location);
  }

  drop = (event) => {
    console.log("drop")
    console.log(event.target.id);
    if (event.target.id) {
      console.log("drop2")
      let data = event.dataTransfer.getData("text");
      console.log(data);
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
          <Card 
            value={this.card_images[this.deck.draw()]}
            onDragStart={(e) => this.dragStart(1,e)}
          />
        </div>

        <div className="nertz">
          <Empty
              onDragStart={(e) => this.dragStart(0,e)}
            />
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
