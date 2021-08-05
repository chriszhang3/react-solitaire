const suits = ["Clubs","Diamonds","Hearts","Spades"];
const values = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"]
export const full_deck = [];
for (let s=0;s<4;s++){
  for (let v=0;v<13;v++){
    full_deck.push(values[v]+suits[s]);
  }
}

// Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

export class Deck {
  constructor() {
    this.deck = [];
    this.shuffle_cards();
  }

  shuffle_cards() {
    this.deck = full_deck.slice();
    shuffle(this.deck);
  }

  draw() {
    return this.deck.pop();
  }

  draw_n(n) {
    let drawn_cards = [];
    for(let i=0; i<n; i++){
      drawn_cards.push(this.deck.pop());
    }
    return drawn_cards;
  }
}
