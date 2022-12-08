import "./App.css";
import Die from "./components/Die";
import React from "react";
import { nanoid } from "nanoid";
// import useWindowSize from "./useWindowSize";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    let check = true;
    // we can also use .every function of array instead
    // const allHeld = dice.every(die => die.isHeld)
    for (let i = 0; i < dice.length; i++) {
      if (dice[i].isHeld == false || dice[i].value != dice[0].value) {
        check = false;
      }
    }
    if (check) {
      setTenzies(true);
      console.log("You won");
    }
    console.log("Dice state changed");
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    let diceArray = [];
    for (let i = 0; i < 10; i++) {
      diceArray.push(generateNewDie());
    }
    return diceArray;
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return {
          ...die,
          isHeld: die.isHeld | (die.id === id),
        };
      })
    );
  }

  function rollDice() {
    if (tenzies) {
      setTenzies(false);
      setDice(allNewDice());
    } else {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    }
  }

  const diceElements = dice.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        id={die.id}
        holdDice={holdDice}
      />
    );
  });

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice--container">{diceElements}</div>
      <button onClick={rollDice} className="roll--button">
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
