import React from 'react';
import './App.css';

interface SquareProps {
  value: string;
  onClick: () => void;
}

interface BoardState {
  squares: string[],
  steps: number,
}


function Square(props: SquareProps) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component<{},BoardState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      steps: 0
    };
  }

  handleClick(i: number) {
    const winner = getWinner(this.state.squares);
    if (winner || this.state.squares[i]) {
      return;
    }
    const squares = this.state.squares.slice();
    const steps = this.state.steps;
    squares[i] = getPlayer(steps);
    this.setState({squares: squares, steps: steps + 1});
  }

  renderSquare(i: number) {
    return (
      <Square 
        value={this.state.squares[i]} 
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = getWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = `Next player: ${getPlayer(this.state.steps)}`;
    }

    const rows = [0,1,2].map((i) => {
      return <div className="board-row">
        {[0,1,2].map((j) => 
          this.renderSquare(i * 3 + j)
        )}
      </div>
    });

    return (
      <div>
        <div className="status">{status}</div>
        {rows}
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

export default Game;


function getPlayer(steps: number): string {
  return steps % 2 === 0 ? 'X' : 'O';
}

function getWinner(squares: string[]): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
} 