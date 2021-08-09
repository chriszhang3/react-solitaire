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
    <div className="card" draggable={true} onClick={props.onClick} onDragStart={props.onDragStart} onDrop={props.drop} onDragOver={(event) => event.preventDefault()}>
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
function PileDeck(props) {
  return (
    <div className="deck" onClick={props.onClick}>
      {props.value}
    </div>
  );
}

function ToNum(value){
  if (value === "2"){
    return 2;
  } else if (value === "3"){
    return 3;
  } else if (value === "4"){
    return 4;
  } else if (value === "5"){
    return 5;
  } else if (value === "6"){
    return 6;
  } else if (value === "7"){
    return 7;
  } else if (value === "8"){
    return 8;
  } else if (value === "9"){
    return 9;
  } else if (value === "1"){
    return 10;
  } else if (value === "J"){
    return 11;
  } else if (value === "Q"){
    return 12;
  } else if (value === "K"){
    return 13;
  } else if (value === "A"){
    return 1;
  }
}

function ToColor(card){
  if (card.includes("Clubs")){
    return "black";
  } else if (card.includes("Diamonds")){
    return "red";
  } else if (card.includes("Spades")){
    return "black";
  } else if (card.includes("Hearts")){
    return "red";
  }
}
function AllowedToStack(card1,card2){
  console.log("comparing");
  console.log(card1);
  console.log(card2);
  return ((ToNum(card1[0])===ToNum(card2[0])-1) && (ToColor(card1) != ToColor(card2)));
}

class Game extends React.Component {
  constructor(props){
    super(props);

    this.deck = new Deck();
    this.number_piles = 4;

    const river=Array(this.number_piles).fill(null);
    river[0] = this.turn_facedown(this.deck.draw_n(1));
    river[1] = this.turn_facedown(this.deck.draw_n(2));
    river[2] = this.turn_facedown(this.deck.draw_n(3));
    river[3] = this.turn_facedown(this.deck.draw_n(4));
    river[4] = this.turn_facedown(this.deck.draw_n(5));
    river[5] = this.turn_facedown(this.deck.draw_n(6));
    river[6] = this.turn_facedown(this.deck.draw_n(7));

    const lake=Array(this.number_piles).fill(null);
    
    lake[0] = [];
    lake[1] = [];
    lake[2] = [];
    lake[3] = [];

    const deck=this.turn_facedown(this.deck.deck);
    this.state = {
      river: river,
      lake: lake,
      deck: deck,
    };
  }

  click(cardnumber,location,event){
    console.log("click")
    console.log(location)
    console.log(cardnumber)
    if (!(location[0] === -1)){
      return;
    }
    const river = this.state.river.slice();
    const lake = this.state.lake.slice();
    const deck = this.state.deck.slice();
    console.log("clicked deck");
    console.log(deck);
    deck[deck.length-1][1]="false";
    const lastcard = deck.pop();
    deck.splice(0,0,lastcard);
    deck[deck.length-1][1]="true";
    console.log(deck);
    this.setState({river: river,lake: lake, deck: deck,})
  }
  dragStart(cardnumber,location,event){
    console.log("start")
    console.log(location)
    console.log(cardnumber)
    event.dataTransfer.setData("lake-river", location[0]);
    event.dataTransfer.setData("pilenumber", location[1]);
    event.dataTransfer.setData("cardnumber", cardnumber);
  }

  drop(cardnumber2,dropped_pile,event){
    console.log("drop")
    console.log(cardnumber2)
    const river = this.state.river.slice();
    const lake = this.state.lake.slice();
    const deck = this.state.deck.slice();
    const lakeriver = event.dataTransfer.getData("lake-river");
    const pilenumber = event.dataTransfer.getData("pilenumber");
    const cardnumber = event.dataTransfer.getData("cardnumber");
    console.log(lakeriver);
    console.log(pilenumber);
    console.log(cardnumber);
    console.log(dropped_pile);
    event.dataTransfer.clearData();

    if (dropped_pile[0]===-1){
      return;
    }
    let card1="";
    if (lakeriver==0){
      card1 = lake[pilenumber][cardnumber][0];
    } else if (lakeriver == 1){
      card1 = river[pilenumber][cardnumber][0];
    } else{
      card1 = deck[cardnumber][0];
    }

    let card2="";
    if (dropped_pile[0]===0){
      if (cardnumber2 < lake[dropped_pile[1]].length){
        return;
      }
      if (dropped_pile[1]===0){
        if (cardnumber2 === 0){
          if (!(card1 === "ADiamonds")){
            return;
          }
        }else{
          if (!(card1.includes("Diamonds") && ToNum(card1)===cardnumber2)){
            return;
          }
        }
      }else if (dropped_pile[1]===1){
        if (cardnumber2 === 0){
          if (!(card1 === "AClubs")){
            return;
          }
        } else{
          if (!(card1.includes("Clubs") && ToNum(card1)===cardnumber2)){
            return;
          }
        }
      } else if (dropped_pile[1]===2){
        if (cardnumber2 === 0){
          if (!(card1 === "AHearts")){
            return;
          }
        }else{
          if (!(card1.includes("Hearts") && ToNum(card1)===cardnumber2)){
            return;
          }
        }
      }else  if (dropped_pile[1]===3){
        if (cardnumber2 === 0){
          if (!(card1 === "ASpades")){
            return;
          }
        }else{
          if (!(card1.includes("Spades") && ToNum(card1)===cardnumber2)){
            return;
          }
        }
      }
    }
    else{
      if (cardnumber2 < river[dropped_pile[1]].length){
        return;
      }
      if (cardnumber2 === 0){
        if (!(card1[0] === "K")){
          return;
        }
      } else{
        card2 = river[dropped_pile[1]][river[dropped_pile[1]].length-1][0];
        if (!AllowedToStack(card1,card2)){
          return;
        }
      }
    }
    
    let movingcards = "";
    if (lakeriver==0){
      movingcards = lake[pilenumber].splice(cardnumber);
    } else if (lakeriver == 1){
      movingcards = river[pilenumber].splice(cardnumber);
    } else{
      movingcards = deck.splice(cardnumber);
    }

    // Flip backs of cards
    if (lakeriver==1){
          const index = river[pilenumber].length;
          if (index >= 1){
            river[pilenumber][index-1][1] = true;
          }
    }
   if (lakeriver==-1){
          const index = deck.length;
          console.log("pulled card from deck");
          console.log(index);
          console.log(deck);
          if (index >= 1){
            deck[index-1][1] = true;
          }
    }
    if (dropped_pile[0]===0){
      lake[dropped_pile[1]]=lake[dropped_pile[1]].concat(movingcards);
    }
    else{
      river[dropped_pile[1]]=river[dropped_pile[1]].concat(movingcards);
    }
    this.setState({river: river,lake: lake, deck: deck,})
  }

  // Turns all but the first card face down. Turns the first card face up.
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
    console.log("make_cards")
    console.log(location);
    console.log(data);
    if (data===null){
      return this.empty;
    }
    const images = [];
    for(let cardnumber=0; cardnumber<data.length;cardnumber++){
      const face_up = data[cardnumber][1];
      if (face_up) {
        images.push(
          <Card 
            value={card_images[data[cardnumber][0]]}
            onDragStart={(e) => this.dragStart(cardnumber,location,e)}
            onClick={(e) => this.click(cardnumber,location,e)}
            drop={(e) => {this.drop(cardnumber+1,location,e)}}
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
    
  // Creates a pile out this.state
  renderPile(location) {
    if (location[0] === -1){
      if (this.state.deck.length===0){
        return (
          <Empty drop={(e) => {this.drop(0,location,e)}}/>
        )
      } else{
        return (
          <PileDeck
            value={this.make_cards(location,this.state.deck)}
          />
        )
      }
  } else if (location[0] === 0){
      if (this.state.lake[location[1]].length===0){
        return (
          <Empty drop={(e) => {this.drop(0,location,e)}}/>
        )
      } else{
        return (
          <PileDeck
            value={this.make_cards(location,this.state.lake[location[1]])}
          />
        )
      }
  }
  else{
    if (this.state.river[location[1]].length===0){
      return (
        <Empty drop={(e) => {this.drop(0,location,e)}}/>
      )
    } else{
      return (
        <Pile
          value={this.make_cards(location,this.state.river[location[1]])}
        />
      )
    }

  }
}

  render() {
    return (
      <div className="game">
        <div className="deck">
          {this.renderPile([-1,0])}
        </div>
        <div className="lake">
          {this.renderPile([0,0])}
          {this.renderPile([0,1])}
          {this.renderPile([0,2])}
          {this.renderPile([0,3])}
        </div>

        <div className="river">
          {this.renderPile([1,0])}
          {this.renderPile([1,1])}
          {this.renderPile([1,2])}
          {this.renderPile([1,3])}
          {this.renderPile([1,4])}
          {this.renderPile([1,5])}
          {this.renderPile([1,6])}
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
