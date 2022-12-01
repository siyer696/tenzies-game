import "./App.css";
import Die from "./components/Die";
import React from "react";

function App() {
  const [dice, setDice] = React.useState(allNewDice());

  function allNewDice() {
    let diceArray = [];
    for (let i = 0; i < 10; i++) {
      diceArray.push(Math.floor(Math.random() * 6 + 1));
    }
    console.log(diceArray);
    return diceArray;
  }

  function rollDice() {
    setDice(allNewDice());
  }

  const diceElements = dice.map((die) => {
    return <Die value={die} />;
  });

  return (
    <main>
      <div className="dice--container">{diceElements}</div>
      <button onClick={rollDice} className="roll--button">Roll</button>
    </main>
  );
}

export default App;
