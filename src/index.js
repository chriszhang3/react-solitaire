import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Deck, suits, ranks} from './utils.mjs';

// ========================================

document.body.style = 'background-image: linear-gradient(to right,darkgreen,green)';

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
    <div 
      className="empty" 
      onDrop={props.drop} 
      onDragOver={(event) => 
      event.preventDefault()}
      onClick={props.onClick}
    />
  );
}

function Back(props) {
  return (
    <div className="card" onClick={props.onClick}>
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
function PileDeck(props) {
  return (
    <div className="piledeck" onClick={props.onClick}>
      {props.value}
    </div>
  );
}

function toNum(value){
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

function getSuit(card_string) {
  console.log("card_string", card_string, typeof(card_string));
  if (card_string[0] === "1"){
    return card_string.slice(2);
  } else {
    return card_string.slice(1);
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
  return ((toNum(card1[0])===toNum(card2[0])-1) && (ToColor(card1) != ToColor(card2)));
}

class Game extends React.Component {
  constructor(props){
    super(props);

    this.deck = new Deck();

    const river=[];
    river[0] = this.turn_facedown_makelist(this.deck.draw_n(1), true);
    river[1] = this.turn_facedown_makelist(this.deck.draw_n(2), true);
    river[2] = this.turn_facedown_makelist(this.deck.draw_n(3), true);
    river[3] = this.turn_facedown_makelist(this.deck.draw_n(4), true);
    river[4] = this.turn_facedown_makelist(this.deck.draw_n(5), true);
    river[5] = this.turn_facedown_makelist(this.deck.draw_n(6), true);
    river[6] = this.turn_facedown_makelist(this.deck.draw_n(7), true);

    const lake=[]
    lake[0] = [];
    lake[1] = [];
    lake[2] = [];
    lake[3] = [];

    const facedown_deck = this.turn_facedown_makelist(this.deck.deck, false);
    const deck=[facedown_deck,[]];

    this.state = {
      river: river,
      lake: lake,
      deck: deck,
    }
  }

  // In the following three functions,
  // location is a tuple:
  // location[0] === -1 means deck
  // location[0] === 1 makes river
  // location[0] === 0 means lake
  // ---------------------------------

  click(location,event){
    if (!(location[0] === -1)){
      return;
    }
    const deck = this.state.deck.slice();

    if (deck[0].length===0) {
      deck[0] = this.turn_facedown(deck[1].slice());
      deck[1] = [];
    } else {
      console.log(deck);
      const next_card = deck[0].shift();
      next_card[1] = true;
      deck[1].push(next_card);
    }
    this.setState({
      river: this.state.river,
      lake: this.state.lake,
      deck: deck,
    })
  }


  // Cardnumber is the location of the card in the array
  dragStart(cardnumber,location,event){
    event.dataTransfer.setData("lake-river", location[0]);
    event.dataTransfer.setData("pilenumber", location[1]);
    event.dataTransfer.setData("cardnumber", cardnumber);
  }
 
  drop(cardnumber2,dropped_pile,event){
    console.log("DROP")
    console.log("cardnumber2", cardnumber2)
    const river = this.state.river.slice();
    const lake = this.state.lake.slice();
    const deck = this.state.deck.slice();

    // Information on the start of the drag
    // lakeriver == 0 means card was from lake
    // lakeriver == 1 means card was from river
    const lakeriver = event.dataTransfer.getData("lake-river");
    const pilenumber = event.dataTransfer.getData("pilenumber");

    // Which card in the pile. array.length-1 is the top card.
    const cardnumber = event.dataTransfer.getData("cardnumber");

    console.log("lakerive", lakeriver);
    console.log(pilenumber);
    console.log("cardnumber", cardnumber);
    console.log("dropped_pile", dropped_pile);
    event.dataTransfer.clearData();

    // Doesn't allow dropping cards on the deck.
    if (dropped_pile[0]===-1){
      return;
    }

    let card1="";
    if (lakeriver === "0"){
      card1 = lake[pilenumber][cardnumber][0];
    } else if (lakeriver === "1"){
      card1 = river[pilenumber][cardnumber][0];
      console.log(card1);
    } else{
      console.log("cardnumber");
      console.log(cardnumber);
      console.log(deck);
      card1 = deck[1][cardnumber][0];
      console.log(card1);
    }

    let card2="";

    // If you are dropping into the lake.
    if (dropped_pile[0]===0){
      if (cardnumber2 < lake[dropped_pile[1]].length){
        return;
      }

      // If the lake pile is empty. You can only put an ace on it.
      if (cardnumber2 === 0){
        if (!(card1[0] === "A")){
          return;
        } 

      }else{

        // Check that the suit and rank is correct.
        const pile = lake[dropped_pile[1]];
        card2 = pile[pile.length-1][0];
        if ((!(toNum(card1[0])===cardnumber2+1))||(getSuit(card1) !== getSuit(card2))){
          return;
        }

        // Check
        if (lakeriver==="1"){
          console.log(cardnumber);
          if ((river[pilenumber].length-1) !== Number(cardnumber)) {
            return
          }
        }
      }
    
    // If you are dropping into the river.
    } else {
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
    
    let movingcards = [];
    if (lakeriver==="0"){
      movingcards = lake[pilenumber].splice(cardnumber);
    } else if (lakeriver === "1"){
      movingcards = river[pilenumber].splice(cardnumber);
    } else {
      movingcards = [deck[1].pop()];
    }

    // Flip backs of cards
    if (lakeriver==1){
          const index = river[pilenumber].length;
          if (index >= 1){
            river[pilenumber][index-1][1] = true;
          }
    }

    if (dropped_pile[0]===0){
      lake[dropped_pile[1]]=lake[dropped_pile[1]].concat(movingcards);
    }
    else{
      river[dropped_pile[1]]=river[dropped_pile[1]].concat(movingcards);
    }

    this.setState({
      river: river,
      lake: lake,
      deck: deck,
    })
  }

  // Turns all cards face down and makes each card into a tuple.
  // If leave_faceup is true, leaves top card faceup
  turn_facedown_makelist(card_list, leave_faceup){
    const output = Array(card_list.length);
    for(let i=0; i<card_list.length; i++){
      if (i===card_list.length-1 && leave_faceup) {
        output[i] = [card_list[i],true];
      } else {
        output[i] = [card_list[i],false];
      }
    }
    return output;
  }

  // Turns all cards facedown. Cards are already tuples.
  turn_facedown(card_list){
    for(let i=0; i<card_list.length; i++){
      card_list[i][1] = false;
    }
    return card_list;
  }

  make_cards(location,data){
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
            drop={(e) => {this.drop(cardnumber+1,location,e)}}
          />
        );
      } else {
        images.push(
          <Back value={back} onClick={(e) => this.click(location,e)}/>
        )
      }
    }
    return images;
  }
    
  // Creates game board out of this.state
  renderPile(location) {
    if (location[0] === -1){
      if (this.state.deck[location[1]].length===0){
        return (
          <Empty drop={(e) => {this.drop(0,location,e)}} onClick={(e) => this.click(location,e)}/>
        )
      } else{
        return (
          <PileDeck
            value={this.make_cards(location,this.state.deck[location[1]])}
          />
        )
      }
  } else if (location[0] === 0){
    console.log("renderPile\n", "lake", this.state.lake);
    console.log("location", location);
    console.log(this.state.lake[location[1]]);
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
  else {
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

        <div className="topRow">
          <div className="deck">
            {this.renderPile([-1,0])}
            {this.renderPile([-1,1])}
          </div>
          <div className="blank"/>
          <div className="lake">
            {this.renderPile([0,0])}
            {this.renderPile([0,1])}
            {this.renderPile([0,2])}
            {this.renderPile([0,3])}
          </div>
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
