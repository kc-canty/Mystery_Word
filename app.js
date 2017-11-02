const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const data = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
const port = 3000;
const app = express();

app.engine('mustache', mustache());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let randomWord = data[Math.floor(Math.random() * data.length)];
//thanks Nancy for ... operator to split string
let activeWord = [...randomWord];
let hiddenWord = [...randomWord];
let shownWord = hiddenWord.fill('');
let lettersGuessed = [];
let correctWords = [];
let guessesLeft = 8;
let correctGuess = 0;




app.use(session({
 secret: 'biskits',
 resave: false,
 saveUninitalized: true
}));

app.get('/', function(req, res){
 res.render('index', {activeWord, shownWord, guessesLeft});
 req.session.word = randomWord;
});

app.post('/', function(req, res){
  let guess = req.body.guess_box.toLowerCase();
  checkWord(guess);
  res.render('index', {activeWord, shownWord, lettersGuessed, guessesLeft, correctWords});

});

function gameOver() {
//working on losing
  count = "0"
};

function gameWon() {
    if (!shownWord.includes('')) {
  //working on winning
      count = 8;
    }
  };



function checkWord(guess) {
  if (activeWord.includes(guess)) {
      correctGuess++;
      let match = activeWord.indexOf(guess);
      //~ (Bitwise NOT)
      //Bitwise NOTing any number x yields -(x + 1).
      while (~match) {
      hiddenWord[match] = guess;
      match = activeWord.indexOf(guess, match + 1);
    }
 } else {
   lettersGuessed.push(guess);
   if (guessesLeft > 1) {
    guessesLeft--;
   }
   else {
    gameOver();
   }
 }
}


app.listen(port, function(req, res){
 console.log('Starting express-session login app...');
});