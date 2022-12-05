import "./App.css";
import Die from "./components/Die";
import React from "react";
import { nanoid } from "nanoid";

function App() {
  const [dice, setDice] = React.useState(allNewDice());

  function allNewDice() {
    let diceArray = [];
    for (let i = 0; i < 10; i++) {
      diceArray.push({
        value: Math.floor(Math.random() * 6 + 1),
        isHeld: false,
        //this is included as without key, die component gives warning for map
        id: nanoid(),
      });
    }
    console.log(diceArray);
    return diceArray;
  }

  function rollDice() {
    setDice(allNewDice());
  }

  const diceElements = dice.map((die) => {
    return (<Die key={die.id} value={die.value} isHeld={die.isHeld} />);
  });

  return (
    <main>
      <div className="dice--container">{diceElements}</div>
      <button onClick={rollDice} className="roll--button">
        Roll
      </button>
    </main>
  );
}

export default App;
