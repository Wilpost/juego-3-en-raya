import { useState, useEffect } from "react";
import "./App.css";
import "./index.css";

const TURNS = {
  x: "X",
  o: "O",
};

const WINNER_COMBOS = [
  [0, 3, 6],
  [1, 4, 7],
  [0, 3, 6],
  [2, 5, 8],
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Array(9).fill(null)

// const boardGame = ['X','O','X','O','X','O','O','X','X'];

// eslint-disable-next-line react/prop-types
const Square = ({ children, updateBoard, index, isSelected }) => {
  const DataSell = isSelected ? "square is-selected" : "square";

  function handleClick() {
    updateBoard(index);
  }

  return (
    // eslint-disable-next-line react/no-unknown-property
    <div onClick={handleClick} className={DataSell} index={index}>
      {children}
    </div>
  );
};

function App() {
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);

  const [turnPlayer, setUpdateBoard] = useState(TURNS.x);
  const [boardGame, updateBoardGame] = useState(Array(9).fill()); // ['null','null','null','null','null'...];
  // si es null es porque no hay ganador, y si ecs false es porque hay un empate
  const [winner, setWinner] = useState(null);

  function checkWinner(checkToWinner) {
    WINNER_COMBOS.map((item) => {
      const [a, b, c] = item;

      if (
        checkToWinner[a] &&
        checkToWinner[a] === checkToWinner[b] &&
        checkToWinner[a] === checkToWinner[c]
      ) {
        setWinner(checkToWinner[a]);

        if (checkToWinner[a] === "X") {
          setScoreX(scoreX + 1);
          localStorage.setItem(checkToWinner[a], scoreX);
        } else if (checkToWinner[a] === "O") {
          setScoreO(scoreO + 1);
          localStorage.setItem(checkToWinner[a], scoreO);
        }
        // localStorage.setItem(checkToWinner[a], scoreX);
      }
    });
  }

  function updateBoard(i) {
    setUpdateBoard(turnPlayer === TURNS.x ? TURNS.o : TURNS.x);
    const newBoard = [...boardGame];

    if (newBoard[i] || winner) {
      console.log("Se termino la ejecucion!");
      return;
    } else {
      null;
    }

    newBoard[i] = turnPlayer;
    checkWinner(newBoard);
    updateBoardGame(newBoard);
  }

  function resetBoard() {
    setWinner(null);
    updateBoardGame(Array(9).fill());
  }

  useEffect(() => {
    function WinnerModal() {
      return (
        <>
          <div className="winner">
            <div className="text">
              <h2>El ganador es:</h2>
              <div className="win">
                <Square>{winner}</Square>
              </div>
              <div className="resetBoard-container" onClick={resetBoard}>
                <strong className="resetBoard">Iniciar de nuevo</strong>
              </div>
            </div>
          </div>
        </>
      );
    }
  }, [winner])

  return (
    <>
      <h1>Tres en raya</h1>

      <section>
        <main className="board">
          <div className="game">
            {boardGame.map((cell, index) => {
              // console.log(cell[index]);
              return (
                // eslint-disable-next-line no-undef
                <Square updateBoard={updateBoard} key={index} index={index}>
                  {cell}
                </Square>
              );
            })}
          </div>
        </main>
      </section>

      <section className="turn">
        <Square isSelected={turnPlayer === TURNS.x}>{TURNS.x}</Square>
        <Square isSelected={turnPlayer === TURNS.o}>{TURNS.o}</Square>
      </section>

      <section className="userScore">
        <h2>Score</h2>
      </section>
      <div className="scoreContainer">
        <strong className="scorePlayer">{localStorage.getItem("X")}</strong>
        <span className="lineDiv"></span>
        <strong className="scorePlayer">{localStorage.getItem("O")}</strong>
      </div>
      <section>{winner ? <WinnerModal /> : null}</section>
    </>
  );
}

export default App;
