// Puissance4.js
import React, { useState } from 'react';
import './Puissance4.css'; // Ajouter du CSS pour styliser le jeu

export default function Puissance4() {
  const rows = 6;
  const cols = 7;
  const [board, setBoard] = useState(Array(rows).fill().map(() => Array(cols).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState('Rouge');
  const [winner, setWinner] = useState(null);

  // Fonction pour vérifier la victoire
  function checkWinner(board) {
    // Check horizontale, verticale, et diagonale pour une victoire
    const directions = [
      { x: 1, y: 0 }, // droite
      { x: 0, y: 1 }, // bas
      { x: 1, y: 1 }, // diagonale bas-droite
      { x: 1, y: -1 }, // diagonale bas-gauche
    ];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const player = board[row][col];
        if (!player) continue;

        for (let { x, y } of directions) {
          const winCondition = Array(4).fill(null).every((_, i) => {
            const newRow = row + i * y;
            const newCol = col + i * x;
            return newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && board[newRow][newCol] === player;
          });

          if (winCondition) {
            return player;
          }
        }
      }
    }
    return null;
  }

  // Fonction pour gérer le clic d'une colonne
  function handleClick(col) {
    if (winner) return;

    // Cherche la première rangée disponible (de bas en haut)
    const newBoard = board.map(row => row.slice());
    for (let row = rows - 1; row >= 0; row--) {
      if (!newBoard[row][col]) {
        newBoard[row][col] = currentPlayer;
        break;
      }
    }

    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win);
    } else {
      setCurrentPlayer(currentPlayer === 'Rouge' ? 'Jaune' : 'Rouge');
    }
    setBoard(newBoard);
  }

  function resetGame() {
    setBoard(Array(rows).fill().map(() => Array(cols).fill(null)));
    setCurrentPlayer('Rouge');
    setWinner(null);
  }

  function handlereset() {
    setBoard(Array(rows).fill().map(() => Array(cols).fill(null)));
    setCurrentPlayer('Rouge');
    setWinner(null);
  }

  return (
    <div className="puissance4-container">
      <div className="status">
        {winner ? `${winner} a gagné !` : `Tour de : ${currentPlayer}`}
      </div>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div key={colIndex} className="cell" onClick={() => handleClick(colIndex)}>
                {cell && <div className={`disc ${cell.toLowerCase()}`}></div>}
              </div>
            ))}
          </div>
        ))}
      </div>
      {winner && <button className="reset" onClick={resetGame}>Rejouer</button>}
      <button className="reset" onClick={handlereset}>Rejouer</button>
    </div>
  );
}
