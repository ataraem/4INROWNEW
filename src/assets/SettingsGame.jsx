import {useState} from "react";
import './SettingsGame.css'

function SettingsGame ({switchToGame,row,col,setRow,setCol,currentPlayer,setCurrentPlayer,colorP1,colorP2,setColorP1,setColorP2 }) {

    const [colors, setColors] = useState(["red", "blue", "yellow", "pink", "green", "black"]);


    const moveToBoard = () => {
    if (colorP1 !== null && colorP2 !== null && row !=="" && col !=="" && row >= 4 && row <= 10 && col >= 4 && col <= 10) {
        switchToGame();
    }
}
    const chooseColorP1 = (chosenColor) => {
        setColorP1(chosenColor);

    }
    const chooseColorP2 = (chosenColor) => {
        setColorP2(chosenColor);

    }
    const textMessage = () => {
        if (colorP1===null){
            return "Player 1: choose your color";
        }else
            if (colorP1 !==null && colorP2 ===null){
            return "Player 2:choose your color";
            }else {
            return "Both players have chosen their colors!";
        }

    };
    const colorSelectionStatus=(chosenColor)=> {
    if (colorP1!==null && colorP2!==null)return;
    if (currentPlayer===1 &&
        colorP1===null) {
        setColorP1(chosenColor);
        setCurrentPlayer(2);
    }else {
        if (currentPlayer===2 && colorP2 ===null && colorP1!==null) {
            if (colorP1!==chosenColor)
            setColorP2(chosenColor);
        }
    }
    };

    return(

        <div>
            <h1>  WELCOME TO 4 IN ROW  </h1>
            <h4>
               SETTINGS SCREEN
            </h4>
            <h4>choose row</h4>
           <div>

               <input value={row} min={4} max={10} type={"number"} placeholder={"please enter row number"}
                      onChange={(e)=>setRow(e.target.value)}/>
           <br/>
               <label>
                   Range between 4-10
               </label>
               <br/>

           </div>

            <div>
                <h4>choose col</h4>
                <input value={col} min={4} max={10} type={"number"} placeholder={"please enter col number"}
                       onChange={(e)=>setCol(e.target.value)}/>
                <br/>
                <label>
                    Range between 4-10
                </label>
                <br/>
            </div>


         <h4>
             PANEL COLORS
         </h4>
            <p>{textMessage()}</p>
         <div className="colors-panel">
            {
                colors.map((color,  index)=> (
                            <button
                                key={index}
                                className="color-btn"
                                style={{backgroundColor:color, width:80, height:80, borderRadius:80}}
                                     onClick={() =>colorSelectionStatus (color)}
                                      disabled={colorP1 === color || colorP2 === color}/>

                ))}
         </div>
            <div>
                <br/>
                <button className="go" onClick={moveToBoard}>
                    GO TO GAME
                </button>
            </div>
        </div>

    );

}
export default SettingsGame;