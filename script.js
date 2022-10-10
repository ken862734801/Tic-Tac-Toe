// Factory function to create the players.
const player = (name, marker) => {
    return {name, marker}
};
//Variables for the players.
const playerOne = player("Player", "X");
const playerTwo = player("Player", "O");
let currentPlayer = playerOne;

//Module for variables and functions associated with the gameboard array.
const gameBoard = (() => {
    
    let gameOver = false;
    let winner = false;

    let board = new Array(9).fill("");

    const getBoard = () => {
        return board
    };

    const reset = () => board.fill("");

    const getGameOver = () => {
        return gameOver
    };
    const getWinner = () => {
        return winner
    };
    const resetWinner = () => {
        winner = false;
        return winner
    };
    const resetGameOver = () => {
        gameOver = false;
        return gameOver
    };

    const markBoard = (marker, index) => {
        if(gameOver === true ){
            return
        }else if(board[index] === "X" || board[index] === "O"){
            return
        }else {
            // Check the win and draw conditions.
            board[index] = marker; 
            winConditionVertical();
            winConditionHorizontal();
            winConditionDiagonal();
            drawCondition();
        }
    };

    const winConditionVertical = () => {
        if(board[0] == gameController.getCurrentPlayer().marker && board[0] == board[3] && board[0]== board[6]){
            winner = true;
            gameOver = true;
            return
        }else if(board[1] == gameController.getCurrentPlayer().marker && board[1] == board[4] && board[1] == board[7]){
            winner = true;
            gameOver = true;
            return
        }else if(board[2] == gameController.getCurrentPlayer().marker && board[2] == board[5] && board[2] == board[8]){
            winner = true;
            gameOver = true;
            return
        }
    };

    const winConditionHorizontal = () => {
        if(board[0] == gameController.getCurrentPlayer().marker && board[0] == board[1] && board[0]== board[2]){
            winner = true;
            gameOver = true;
        }else if(board[3] == gameController.getCurrentPlayer().marker && board[3] == board[4] && board[3] == board[5]){
            winner = true;
            gameOver = true;
        }else if(board[6] == gameController.getCurrentPlayer().marker && board[6] == board[7] && board[6] == board[8]){
            winner = true;
            gameOver = true;
        }
    };

    const winConditionDiagonal = () => {
        if(board[0] == gameController.getCurrentPlayer().marker && board[0] == board[4] && board[0]== board[8]){
            winner = true;
            gameOver = true;
        }else if(board[2] == gameController.getCurrentPlayer().marker && board[2] == board[4] && board[2] == board[6]){
            winner = true;
            gameOver = true;
        }
    };

    const drawCondition = () => {
        let space = board.indexOf("",0);
        if(space === -1){
            gameOver = true;
            console.log(gameOver)
            console.log("There are no available spaces.")
        }else if(space > 0){
            console.log(space)
            console.log("There are available spaces.")
        }
    };

    return { resetWinner,resetGameOver,reset, getBoard, getGameOver, getWinner, markBoard, drawCondition, winConditionDiagonal , winConditionHorizontal ,winConditionVertical}

})();

//Module to regulate the flow of the game.
const gameController = (() => {

    const getCurrentPlayer = () => {
            return currentPlayer
    };

    const playerTurn = () => {
        if(gameBoard.getGameOver() === true){
            return;
        }else if(currentPlayer == playerOne){
            currentPlayer = playerTwo;  
        }else{
            currentPlayer = playerOne;
        }
    };

    return {getCurrentPlayer,playerTurn}
})();

//Module to regulate the DOM aspects of the game.
const displayController = (() => {
    
    //Variables for the DOM elements.
    let messageDisplay = document.getElementById("message-display");
    let squares = document.querySelectorAll(".square");
    let refreshBtn = document.getElementById("restartBtn");

    squares.forEach(square => {
        square.addEventListener("click", (e)=> {
            drawMarker(e);
            changeColor(e);
            gameBoard.markBoard(gameController.getCurrentPlayer().marker, getSquareIndex(e));
            gameController.getCurrentPlayer();
            gameController.playerTurn();
            determineMessage();   
        });
    });

    const getSquareIndex = (e) => {
        const squareIndex = e.target.dataset.index;
        return squareIndex
    };

    const drawMarker = (e) => {
        if(gameBoard.getGameOver() === true || e.target.textContent !== ""){
            squares.forEach(square => {
                square.removeEventListener("click", gameController.playerTurn())
            });
            return
        }else{
             e.target.textContent = gameController.getCurrentPlayer().marker;
        }
     };

    const changeColor = (e) => {
        if(e.target.textContent === "X"){
            e.target.style.color = "#e73a1f";
        }else if(e.target.textContent === "O"){
            e.target.style.color = "#02adc7";
        }
    };
  
    const determineMessage = () => {
        if(gameBoard.getGameOver() === true && gameBoard.getWinner() === true){
            messageDisplay.textContent = gameController.getCurrentPlayer().marker + " has won.";
            return;
        }else if (gameBoard.getGameOver() === true && gameBoard.getWinner() === false){
            messageDisplay.textContent = "It's a draw.";
        }else if(gameBoard.getGameOver() === false && gameBoard.getWinner() === false){
            messageDisplay.textContent = "It's " + gameController.getCurrentPlayer().marker + "'s turn.";
        }
    
    };

    const clearGameDisplay = () => {
        gameBoard.resetWinner();
        gameBoard.resetGameOver();
        gameBoard.reset();
    for(i = 0; i < squares.length; i++){
        squares[i].textContent = "";
    };
        messageDisplay.textContent = "It's X's turn.";
        gameController.playerTurn();
        currentPlayer = playerOne;
    };

    refreshBtn.addEventListener("click", clearGameDisplay);

  return {clearGameDisplay}
 
})();