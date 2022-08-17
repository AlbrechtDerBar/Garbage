var cards = [];
var hand = '';
var discard = [];
var currPlayer = "p1";
var field1 = [];
var field2 = [];
var drawn = 0;
var gameOver = 0;

function Card(title, value) {
  this.title = title;
  this.value = value;
}

window.onload = function() {
  cardGen();
}

function cardGen() {
  var suits = ["♠", "♥", "♦", "♣"];
  var value = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

  for(i = 0; i < suits.length; i++) {
    for(j = 0; j < value.length; j++) {
      var title = suits[i] + value[j];
      var card = new Card(title, value[j]);

      cards.push(card);
    }
  }
  shuffle(cards);
  for(i = 0; i < 10; i++) {
    field1.push(cards.pop());
    field2.push(cards.pop());
  }
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function draw() {
  if(drawn == 0) {
    hand = cards.shift();
    document.getElementById("hand").innerHTML = hand.title;
    drawn = 1;
  }
  else {
    window.alert("you already drew this turn.");
  }
  if(cards.length == 0) {
    shuffle(discard);
    cards = discard;
    discard  = [];
  }
}

function turn(obj) {
  var classes = obj.classList;
  var player = classes[0];
  var slot = classes[1];

  if(currPlayer == player && validMove(slot)) {
    var tmpHand = hand;
    if(currPlayer == "p1") {
      hand = field1[slotVal(slot)];
      document.getElementById("hand").innerHTML = hand.title;
      field1[slotVal(slot)] = tmpHand;
      var parent = obj.parentElement;
      parent.firstChild.innerHTML = field1[slotVal(slot)].title;
    }
    else {
      hand = field2[slotVal(slot)];
      document.getElementById("hand").innerHTML = hand.title;
      field2[slotVal(slot)] = tmpHand;
      var parent = obj.parentElement;
      parent.firstChild.innerHTML = field2[slotVal(slot)].title;
    }
  }
  else {
    window.alert("thats not a valid move");
  }
  if (gameOver != 1) {
    checkWin();
  }
}

function takeDiscard() {
  if(!discard.length == 0 && hand == '') {
    hand = discard.pop();
    document.getElementById("hand").innerHTML = hand.title;
    document.getElementById("discPile").innerHTML = "Discard";
    drawn = 1;
  }
  else {
    window.alert("There aren't any cards in the discard pile or you need to play your hand");
  }
  
}

function endTurn() {
  if(currPlayer == "p1") {
    currPlayer = "p2";
    document.getElementById("player").innerHTML = "Player 2";
    document.documentElement.style.setProperty('--second-player', 'lightcyan');
    document.documentElement.style.setProperty('--first-player', 'lightgray');
  }
  else {
    currPlayer = "p1";
    document.getElementById("player").innerHTML = "Player 1";
    document.documentElement.style.setProperty('--first-player', 'lightcyan');
    document.documentElement.style.setProperty('--second-player', 'lightgray');
  }

  if(hand == '') {
    // document.getElementById("discPile").innerHTML = "Discard";
  }
  else {
    document.getElementById("discPile").innerHTML = hand.title;
    discard.push(hand);
  }
  document.getElementById("hand").innerHTML = "Hand";
  hand = "";
  drawn = 0;
}

function validMove(slot) {
  switch(true) {
    case hand.value == "A" && slot == "s1":
      return true;
    break;
    case hand.value == "2" && slot == "s2":
      return true;
    break;
    case hand.value == "3" && slot == "s3":
      return true;
    break;
    case hand.value == "4" && slot == "s4":
      return true;
    break;
    case hand.value == "5" && slot == "s5":
      return true;
    break;
    case hand.value == "6" && slot == "s6":
      return true;
    break;
    case hand.value == "7" && slot == "s7":
      return true;
    break;
    case hand.value == "8" && slot == "s8":
      return true;
    break;
    case hand.value == "9" && slot == "s9":
      return true;      
    break;
    case hand.value == "10" && slot == "s10":
      return true;
    break;
    case hand.value == "J":
      return false;
    break;
    case hand.value == "Q" && slot == "s6":
      return true;
    break;
    case hand.value == "K":
      return true;
    break;
    default:
      return false;
  }
}

function slotVal(slot) {
  switch(slot) {
    case "s1" :
      return 0;
    break;
    case "s2" :
      return 1;
    break;
    case "s3" :
      return 2;
    break;
    case "s4" :
      return 3;
    break;
    case "s5" :
      return 4;
    break;
    case "s6" :
      return 5;
    break;
    case "s7" :
      return 6;
    break;
    case "s8" :
      return 7;
    break;
    case "s9" :
      return 8;
    break;
    case "s10" :
      return 9;
    break;
  }
}

function checkWin() {
  if(currPlayer == "p1") {
    var array = [];
    document.querySelectorAll(".pSlot1").forEach(e => {
      array.push(e.innerHTML);
    })
    if(array.every(test) == true) {
      window.alert("player 1 wins, click restart to reload the page.");
      document.getElementById("restart").classList.remove("hidden");
      gameOver = 1;
    }
    function test(e) {
      return e != "?";
    }
  }
  else {
    var array = [];
    document.querySelectorAll(".pSlot2").forEach(e => {
      array.push(e.innerHTML);
    })
    if(array.every(test) == true) {
      window.alert("player 2 wins, click restart to reload the page.");
      document.getElementById("restart").classList.remove("hidden");
      gameOver = 1;
    }
    function test(e) {
      return e != "?";
    }
  }
}