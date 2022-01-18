import './App.css';
import React, {useReducer, useState} from 'react';
import Square from './Square';
import Confetti from 'react-confetti';
function calculatingWinner(squares){
    const winningLine = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
      ];
      for(let i=0; i<winningLine.length; i++){
        const [a,b,c]=winningLine[i];
        if(squares[a] && squares[a]===squares[b] && squares[b]===squares[c] ){
          return squares[a];
        }
      }
      return null;
}
function Board() {
    const [boardSquares, setBoardSqaures] = useState(Array(9).fill(null));
    const [xIsNext, setxIsNext] = useState(true);
    const handleClick = index =>{
        const squares = [...boardSquares];
        if(calculatingWinner(boardSquares)||squares[index]){
            return;
        }
        squares[index]=xIsNext?"X":"O";
        setBoardSqaures(squares);
        setxIsNext(!xIsNext);
    }
    const renderSquare = index =>{
        return <Square value={boardSquares[index]} onClick={()=>handleClick(index)}/>;
    }
    let status;
    let celebration;
    var count = 0;
    const winner = calculatingWinner(boardSquares);
    if(winner){
        celebration=true;
    }
    if(count==2){
        status="Tie";
        return;
        
    }
    status = winner?`Player ${winner} is the Winner`:`Player ${xIsNext?"X":"O"} Turn`
    const handleOnClick = ()=>{
        window.location.reload(false);
    }
  return(
      <div>
          <img src="https://wheelercreek.com/js-course/tictactoe/images/title.jpg" width={400}/>
          <div>{renderSquare(0)}{renderSquare(1)}{renderSquare(2)}</div>
          <div>{renderSquare(3)}{renderSquare(4)}{renderSquare(5)}</div>
          <div>{renderSquare(6)}{renderSquare(7)}{renderSquare(8)}</div>
          <h3>{status}</h3>
          {celebration==true? <Confetti width={1350} height={550}/>:''}
          <button className='button' onClick={handleOnClick}>Play Again</button>
      </div>
  );
}

export default Board;

