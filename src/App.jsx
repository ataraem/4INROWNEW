import { useState } from 'react'
import './App.css'
import GameBoard from "./assets/GameBoard.jsx";
import SettingsGame from "./assets/SettingsGame.jsx";



function App() {
    const [screen, setScreen] = useState("SettingsGame");
    const [row, setRow] = useState("4");
    const [col, setCol] = useState("4");
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [colorP1, setColorP1] = useState(null);
    const [colorP2, setColorP2] = useState(null);




    const switchToSettings = ()=> {
        setScreen("SettingsGame")
    }

   const switchToGame=()=>{
        setCurrentPlayer(1);
        setScreen("GameBoard");
    };


    return(
        <>
            {screen ==="SettingsGame"&& (
                <SettingsGame switchToGame={switchToGame}
                  row={row}
                  col={col}
                  setRow={setRow}
                  setCol={setCol}
                  currentPlayer={currentPlayer}
                  setCurrentPlayer={setCurrentPlayer}
                              colorP1={colorP1}
                              setColorP1={setColorP1}
                              colorP2={colorP2}
                              setColorP2={setColorP2}

                />
    )}
            {screen ==="GameBoard" &&(
                <GameBoard switchToSettings={switchToSettings}
                 row={row}
                 col={col}
                 currentPlayer={currentPlayer}
                 setCurrentPlayer={setCurrentPlayer}
                           colorP1={colorP1}
                           setColorP1={setColorP1}
                           colorP2={colorP2}
                           setColorP2={setColorP2}

                />
            )}
            </>
    );
    }
export default App;
