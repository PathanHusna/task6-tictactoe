
import React, { useState } from "react";
import "./TicTacToe.css";

function TicTacToe() {

  const [board, setBoard] = useState([
    "", "", "",
    "", "", "",
    "", "", ""
  ]);

  const [currentPlayer, setCurrentPlayer] = useState("X");

  const [winner, setWinner] = useState(null);

  // Check winner
  function checkWinner(newBoard) {

    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let combination of winningCombinations) {

      const [a, b, c] = combination;

      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return newBoard[a];
      }
    }

    return null;
  }

  // Handle box click
  function handleClick(index) {

    if (board[index] !== "" || winner) {
      return;
    }

    const newBoard = [...board];

    newBoard[index] = currentPlayer;

    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);

    if (gameWinner) {
      setWinner(gameWinner);
    } 
    else if (newBoard.every(cell => cell !== "")) {
      setWinner("Draw");
    } 
    else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  }

  // Restart game
  function restartGame() {

    setBoard(["", "", "", "", "", "", "", "", ""]);

    setCurrentPlayer("X");

    setWinner(null);
  }

  return (
    <div className="game-container">

      <h1>XO Game</h1>

      <h2>
        {winner
          ? winner === "Draw"
            ? "Game Draw!"
            : `Winner is ${winner}!`
          : `Current Player: ${currentPlayer}`}
      </h2>

      <div className="board">

        {board.map((value, index) => (

          <button
            key={index}
            className="cell"
            onClick={() => handleClick(index)}
          >
            {value}
          </button>

        ))}

      </div>

      <button className="restart-btn" onClick={restartGame}>
        Restart Game
      </button>

    </div>
  );
}

export default TicTacToe;
