import React from "react";
// import ReactDOM from "react-dom/client";
import "./Board.css";
import Square from "../Square/Square";
import victoryVideo1 from "../../assets/victory1.mp4";
import victoryVideo2 from "../../assets/victory2.mp4";
import victoryVideo3 from "../../assets/victory3.mp4";

class Board extends React.Component {
    calculateWinner(squares) {
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
if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
{
    return squares[a];
    }
}
return null;
}
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            winner: null,
            showVictoryVideo: false,
            currentVictoryVideo: null,
        };
        this.victoryVideos = [victoryVideo1, victoryVideo2, victoryVideo3];
    }

     handleClick(i) {
        const squares = this.state.squares.slice();
        //if (squares[i]) {
        //    return;
        //}
        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }

    
    squares[i] = this.state.xIsNext ? "X" : "O";
    const newWinner = this.calculateWinner(squares);
    this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
        winner: newWinner,
        showVictoryVideo: newWinner ? true : false,
        currentVictoryVideo: newWinner
        ? this.getRandomVictoryVideo()
        :null,
    });

    console.log(`Quadrado ${i} clicado! Novo valor: ${squares[i]}`);
    console.log("Estado atual do Board.squares:", squares);
}

getRandomVictoryVideo = () => {
            const randomIndex = Math.floor(
                Math.random() * this.victoryVideos.length
                );
                return this.victoryVideos[randomIndex];
                };

resetGame = () => {
    this.setState({
        squares: Array(9).fill(null),
        xIsNext: true,
        winner: null,
        showVictoryVideo: false,
        currentVictoryVideo: null,
    });
    console.log("Tabuleiro limpo! Novo jogo iniciado.");
};

renderSquare(i) {
    return (
        <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
        />
    );
}

render() {
    //const winner = this.calculateWinner(this.state.squares);
    const {
        winner,
        //xIsNext,
        showVictoryVideo,
        currentVictoryVideo,
        //squares,
    } = this.state;
    let status;
    if (winner) {
        status = "Vencedor: " + winner;
    } else {
        status = "Próximo jogador: " + (this.state.xIsNext ? "X" : "O");
    }
    return (
        <>
        <div className="status">
            {/* Próximo jogador: {this.state.xIsNext ? "X" : "O"*/}
            { status}
            </div>
            <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
            </div>
            <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
            </div>
            <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
            </div>

            {/* NOVO BOTÃO: Para limpar o tabuleiro / iniciar novo jogo */}
            <button className="reset-button" onClick={this.resetGame}>
                Novo Jogo
            </button>
            
            {/* Exibe o vídeo de vitória condicionalmente */}
            {showVictoryVideo &&
            winner !== "Empate" && (
                <div className="victory-video-container">
                    <video width="320" height="240" controls autoPlay loop >
                        <source src={currentVictoryVideo} type="video/mp4" />
                        Seu navegador não suporta vídeos HTML5.
                    </video>
                <p>Parabéns, {winner}!</p>
                </div>
                )}
            </>
        );
    }
}

export default Board;