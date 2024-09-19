import { useState, useEffect } from 'react';
import Toogle from './components/Toogle';
import Puissance4 from './components/Puissance4';

function Square({ value, onSquareClick }) {
  let className = "square";
  if (value === "X") {
    className += " X";
  } else if (value === "O") {
    className += " O";
  }

  return <button onClick={onSquareClick} className={className}>{value}</button>;
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [isVsAI, setIsVsAI] = useState(false);
  const [isTicTacToe, setIsTicTacToe] = useState(true); // État pour le Toggle

  // Fonction pour obtenir le meilleur coup avec l'algorithme Minimax
  function getBestMove(squares) {
    let bestScore = -Infinity;
    let move = null;

    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        squares[i] = "O"; // IA joue avec "O"
        let score = minimax(squares, 0, false);
        squares[i] = null;

        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  }

  // Fonction Minimax
  function minimax(squares, depth, isMaximizing) {
    const winner = calculateWinner(squares);
    if (winner === "O") return 10 - depth;  // IA gagne
    if (winner === "X") return depth - 10;  // Le joueur gagne
    if (squares.every(square => square !== null)) return 0;  // Match nul

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
          squares[i] = "O";
          let score = minimax(squares, depth + 1, false);
          squares[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
          squares[i] = "X";
          let score = minimax(squares, depth + 1, true);
          squares[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }

  useEffect(() => {
    if (!xIsNext && isVsAI && isTicTacToe && !calculateWinner(squares)) {
      const timer = setTimeout(() => {
        const bestMove = getBestMove(squares);
        const nextSquares = squares.slice();
        nextSquares[bestMove] = "O"; 
        setSquares(nextSquares);
        setXIsNext(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xIsNext, isVsAI, squares, isTicTacToe]);

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = winner + " a gagné !";
  } else if (squares.every(square => square !== null)) {
    status = "Match nul !";
  } else {
    status = "Prochain tour : " + (xIsNext ? "X" : "O");
  }

  function handlereset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  const handleToggle = () => {
    setIsTicTacToe(!isTicTacToe);
    handlereset();
  };

  return (
    <div className="board">
      <Toogle isTicTacToe={isTicTacToe} onToggle={handleToggle} />

      {isTicTacToe ? (
        <>
          <div className="status">{status}</div>
          <div>
            <button onClick={() => setIsVsAI(false)} className={`mode-button ${!isVsAI ? 'active' : ''}`}>Joueur contre Joueur</button>
            <button onClick={() => setIsVsAI(true)} className={`mode-button ${isVsAI ? 'active' : ''}`}>Joueur contre IA</button>
          </div>

          <div className="board-row">
            <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
            <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
            <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
          </div>
          <div className="board-row">
            <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
            <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
            <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
          </div>
          <div className="board-row">
            <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
            <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
            <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
          </div>
          <button className="reset" onClick={handlereset}>Rejouer</button>
        </>
      ) : (
        <div><Puissance4 /></div>
      )}
    </div>
  );
}
