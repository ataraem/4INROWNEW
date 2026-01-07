import {useState} from "react";
import "./GameBoard.css"




function GameBoard({switchToSettings,row,col, currentPlayer,setCurrentPlayer,colorP1,colorP2,setColorP1,setColorP2 }){
    const rows=Number(row);
    const cols=Number(col);
    const [winner,setWinner] = useState(null);
    const [scores, setScores] = useState({ p1: 0, p2: 0 });


    const moveToSettings = ()=> {
        if(winner !==null){
            return switchToSettings ();
        }
    }

    const createBoard =()=>{
        const newBoard=[];
        for (let i = 0; i < rows; i++){
            const tempRow = []
            for (let j = 0; j < cols; j++){
                tempRow.push({value:"",color:"white"});
            }
            newBoard.push(tempRow);
        }
        return newBoard;
    }

    const [board,setBoard]= useState(createBoard);


    const checkAvailabale = (rowIndex, colIndex) => {
        const newBoard = [...board];
        if (winner === null) {
            let placedRow = -1;
            let placedCol = colIndex;

            for (let i = rows - 1; i >= 0; i--) {
                if (newBoard[i][colIndex].color === "white") {
                    (newBoard[i][colIndex].color = currentPlayer === 1 ? colorP1 : colorP2);
                    placedRow = i;
                    break;
                }
            }
            if (placedRow === -1) return;
            setBoard(newBoard);
            if (chekRowWin(newBoard, placedRow)) {
                return;
            } else {
                if (chekColWin(newBoard, placedCol)) {
                    return;
                } else {
                    if (leftMainDiagonal(newBoard, placedCol,placedRow)){
                        return;
                    }
                    else {
                        if (rightMainDiagonal(newBoard)){
                            return;
                        }
                    }
                }
            }
        }
        setCurrentPlayer(p=>(p===1 ? 2:1));
    };


    const chekRowWin = (board, rowIndex) => {
        let count = 1;
        for (let j = 0; j < cols - 1; j++) {
            const currentColor = board[rowIndex][j].color;
            if (currentColor === "white") {
                count = 1;
                continue;
            }

            if (currentColor === board[rowIndex][j + 1].color) {
                count++;
                if (count === 4) {
                    setWinner(currentPlayer);
                    setScores(prev => ({...prev, [currentPlayer === 1 ? 'p1' : 'p2']: prev[currentPlayer === 1 ? 'p1' : 'p2'] + 1}));
                    return true;
                }
            } else {
                count = 1;
            }
        }
        return false;
    };


    const chekColWin = (board, colIndex) => {
        let count = 1;
        for (let i = 0; i < rows - 1; i++) {
            const currentColor = board[i][colIndex].color;
            if (currentColor === "white") {
                count = 1;
                continue;
            }

            if (currentColor === board[i+1][colIndex].color) {
                count++;
                if (count === 4) {
                    setWinner(currentPlayer);
                    setScores(prev => ({...prev, [currentPlayer === 1 ? 'p1' : 'p2']: prev[currentPlayer === 1 ? 'p1' : 'p2'] + 1}));
                    return true;
                }
            } else {
                count = 1;
            }
        }
        return false;
    };

    const leftMainDiagonal = (board) => {
        let count = 1;
        const limit = Math.min(rows, cols);
        for (let i = 0; i < limit - 1; i++) {
            const currentColor = board[i][i].color;
            if (currentColor === "white") {
                count = 1;
                continue;
            }
            if (currentColor === board[i + 1][i + 1].color) {
                count++;
                if (count === 4) {
                    setWinner(currentPlayer);
                    setScores(prev => ({...prev, [currentPlayer === 1 ? 'p1' : 'p2']: prev[currentPlayer === 1 ? 'p1' : 'p2'] + 1}));
                    return true;
                }
            } else {
                count = 1;
            }
        }
        return false;
    };

    const rightMainDiagonal = (board) => {
        let count = 1;
        const limit = Math.min(rows, cols);
        for (let i = limit - 1; i > 0; i--) {
            const j = (limit - 1) - i;
            const currentColor = board[i][j].color;
            if (currentColor === "white") {
                count = 1;
                continue;
            }
            const prevJ = (limit - 1) - (i - 1);
            if (board[i - 1][prevJ].color === currentColor) {
                count++;
                if (count === 4) {
                    setWinner(currentPlayer);
                    setScores(prev => ({...prev, [currentPlayer === 1 ? 'p1' : 'p2']: prev[currentPlayer === 1 ? 'p1' : 'p2'] + 1}));
                    return true;
                }
            } else {
                count = 1;
            }
        }

        return false;
    };


    return(

        <div>
            <h1> LET'S PLAY </h1>

            <div className="score-display">
                <div style={{color: colorP1}}>
                    Player 1: {scores.p1}
                </div>
                <div style={{color: colorP2}}>
                    Player 2: {scores.p2}
                </div>

            </div>

            <h3>
                GAME SCREEN
            </h3>

            {
                winner !== null && (
                    <h2>
                        player {winner} won!
                    </h2>
                )
            }

            <h3>Current Player:{currentPlayer}</h3>
            <div className="board">
                {board.map((row, r)=> (
                    <div className="board-row" key={r}>
                        {row.map((col,c)=> (
                            <div className="board-col"
                                 onClick={()=>checkAvailabale(r,c)}
                                 key={c}
                                 style = {{backgroundColor:col.color}}>

                                {col.value}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div>
                <br/>
                <button onClick={moveToSettings}>
                    GO TO SETTINGS
                </button>

            </div>

        </div>
    );
}
export default GameBoard;