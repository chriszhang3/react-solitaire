import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Deck, suits, ranks} from './utils.mjs';

// ========================================

const back = 
  <div className="card">
    <img
      src={`images/gray_back.png`}
      alt={`back of card`}
      height = "106"
      width = "69"
    ></img>
  </div>

const card_images = {};
for (let s=0;s<4;s++){
  for (let r=0;r<13;r++){
    let card = ranks[r]+suits[s]; 
    card_images[card] = <img
                  id={`${card}`}
                  src={`images/${card}.png`}
                  alt={`${card}`}
                  height = "106"
                  width = "69"
                  className="card"
                ></img>;
  }
}

function Empty(props) {
  return (
    <div className="empty" onDrop={props.drop} onDragOver={(event) => event.preventDefault()}>
    </div>
  );
}

function Back(props) {
  return (
    <div className="card">
      {props.value}
    </div>
  );
}

function Card(props) {
  return (
    <div className="card" draggable={true} onDragStart={props.onDragStart} onDrop={props.drop} onDragOver={(event) => event.preventDefault()}>
      {props.value}
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

class Game extends React.Component {
  constructor(props){
    super(props);

    this.deck = new Deck();
    this.number_piles = 4;

    const river = Array(this.number_piles).fill(null);
    river[0] = this.turn_facedown(this.deck.draw_n(1));
    river[1] = this.turn_facedown(this.deck.draw_n(2));
    river[2] = this.turn_facedown(this.deck.draw_n(3));
    river[3] = this.turn_facedown(this.deck.draw_n(4));

    this.state = {
      river: river,
    };
  }

  dragStart(location,event){
    console.log("start")
    console.log(location)
    event.dataTransfer.setData("text", location);
  }

  drop(i,event){
    console.log("drop")
    const start = event.dataTransfer.getData("text");
    console.log(start);
    console.log(i);
    event.dataTransfer.clearData();
    const river = this.state.river.slice();
    const card = river[start].pop();
    river[i].push(card);
    this.setState({river: river,})
  }

  turn_facedown(card_list){
    const output = Array(card_list.length);
    for(let i=0; i<card_list.length; i++){
      if (i===card_list.length-1) {
        output[i] = [card_list[i],true];
      } else {
        output[i] = [card_list[i],false];
      }
      
    }
    return output;
  }

  make_cards(location,data){
    console.log(data);
    if (data===null){
      return this.empty;
    }
    const images = [];
    for(let i=0; i<data.length;i++){
      const face_up = data[i][1];
      if (face_up) {
        images.push(
          <Card 
            value={card_images[data[i][0]]}
            onDragStart={(e) => this.dragStart(location,e)}
            drop={(e) => {this.drop(location,e)}}
          />
        );
      } else {
        images.push(
          <Back value={back}/>
        )
      }
      
    }
    return images;
  }

  renderPile(i) {
    if (this.state.river[i].length===0){
      return (
        <Empty drop={(e) => {this.drop(i,e)}}/>
      )
    } else {
      return (
        <Pile
          value={this.make_cards(i,this.state.river[i])}
        />
      )
    }
  }

  render() {
    return (
      <div className="game">
        <div className="river">
          {this.renderPile(0)}
          {this.renderPile(1)}
          {this.renderPile(2)}
          {this.renderPile(3)}
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
