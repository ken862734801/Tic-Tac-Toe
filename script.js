const player = (name, marker) => {
    return {name, marker}
}

const gameBoard = (() => {

    let board = Array(9).fill("");
    console.log(board);

    const getBoard = () => {
        return board
    }

    const clearBoard = () => {
        board = Array(9).fill("");
    }

    const markBoard = (marker, index) => {
        if(board[index] === "X" || board[index] === "O"){
            return
        }else if(board[index] === ""){
            board[index] = marker;
        }
        winConditionVertical();
        winConditionDiagonal();
        winConditionHorizontal();
        drawCondition();
        console.log(board);
    }

    let gameOver = false;
    let winner = false;

    const getGameOver = () => {
        let _gameOver = gameOver
        return _gameOver
    }
    const getWinner = () => {
        let _winner = winner 
        return winner
    }

    const winConditionVertical = () => {
        if(board[0] == gameController.getCurrentPlayer().marker && board[0] == board[3] && board[0]== board[6]){
            winner = true;
            gameOver = true;
            console.log(gameOver);
            console.log(winner);
            console.log("Player " + gameController.getCurrentPlayer().marker + " won!");
        }else if(board[1] == gameController.getCurrentPlayer().marker && board[1] == board[4] && board[1] == board[7]){
            winner = true;
            gameOver = true;
            console.log(gameOver);
            console.log(winner); 
            console.log("Player " + gameController.getCurrentPlayer().marker + " won!");
        }else if(board[2] == gameController.getCurrentPlayer().marker && board[2] == board[5] && board[2] == board[6]){
            winner = true;
            gameOver = true;
            console.log(gameOver);
            console.log(winner);
            console.log("Player " + gameController.getCurrentPlayer().marker + " won!");
        }
    }

    const winConditionHorizontal = () => {
        if(board[0] == gameController.getCurrentPlayer().marker && board[0] == board[1] && board[0]== board[2]){
            winner = true;
            gameOver = true;
            console.log(gameOver);
            console.log(winner);
            console.log("Player " + gameController.getCurrentPlayer().marker + " won!");
        }else if(board[3] == gameController.getCurrentPlayer().marker && board[3] == board[4] && board[3] == board[5]){
            winner = true;
            gameOver = true;
            console.log(gameOver);
            console.log(winner);
            console.log("Player " + gameController.getCurrentPlayer().marker + " won!");
        }else if(board[6] == gameController.getCurrentPlayer().marker && board[6] == board[7] && board[6] == board[8]){
            winner = true;
            gameOver = true;
            console.log(gameOver);
            console.log(winner);
            console.log("Player " + gameController.getCurrentPlayer().marker + " won!");
        }
    }

    const winConditionDiagonal = () => {
        if(board[0] == gameController.getCurrentPlayer().marker && board[0] == board[4] && board[0]== board[8]){
            winner = true;
            gameOver = true;
            console.log(gameOver);
            console.log(winner);
            console.log("Player " + gameController.getCurrentPlayer().marker + " won!");
        }else if(board[2] == gameController.getCurrentPlayer().marker && board[2] == board[4] && board[2] == board[6]){
            winner = true;
            gameOver = true;
            console.log(gameOver);
            console.log(winner);
            console.log("Player " + gameController.getCurrentPlayer().marker + " won!");
        }
    }

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


    return {clearBoard, getBoard, getGameOver, getWinner, markBoard, drawCondition, winConditionDiagonal , winConditionHorizontal ,winConditionVertical}

})();

const gameController = (() => {

    const playerOne = player("Player", "X");
    const playerTwo = player("Player", "O");
    let currentPlayer = playerOne;


    const getCurrentPlayer = () => {
        let _currentPlayer = currentPlayer
            return _currentPlayer
    }

    const playerTurn = () => {
        if(currentPlayer == playerOne){
            currentPlayer = playerTwo;
            console.log(currentPlayer);
        }else{
            currentPlayer = playerOne;
            console.log(currentPlayer);
        }
    };

    // const endGame = () => {
    // //     // if(gameOver is true and Winner is false){
    // //         draw,disable clicking, change message;
    // //     } else if (gameOver is false and winner is true){
    //         someone won, disabling clicking, change message
    // }
    // // }

    const resetGame = () => {
        gameBoard.clearBoard();
        currentPlayer = playerOne;
        gameBoard.getGameOver = false;
        gameBoard.getWinner = false;
    }

    return {getCurrentPlayer,playerTurn, resetGame}
})();

const displayController = (() => {

    let messageDisplay = document.getElementById("message-display");

    let squares = document.querySelectorAll(".square");
    let refreshBtn = document.getElementById("refreshBtn");

    squares.forEach(square => {
        square.addEventListener("click", (e)=> {
            drawMarker(e);
            changeColor(e);
            gameBoard.markBoard(gameController.getCurrentPlayer().marker, getSquareIndex(e));
            gameController.playerTurn();
            determineMessage(e);
           
        });
    });

    const getSquareIndex = (e) => {
        const squareIndex = e.target.dataset.index;
        console.log(squareIndex);
        return squareIndex
    };

    const drawMarker = (e) => {
        if(e.target.textContent === "X" || e.target.textContent === "O"){
            e.target.removeEventListener("click")
            return
        }else if(e.target.textContent === ""){
            e.target.textContent = gameController.getCurrentPlayer().marker;
        }
    }

    const changeColor = (e) => {
        if(e.target.textContent === "X"){
            e.target.style.color = "#e73a1f";
        }else if(e.target.textContent === "O"){
            e.target.style.color = "#02adc7";
        }
    }
    const clearGameDisplay = () => {
        for(i = 0; i < squares.length; i++){
            squares[i].textContent = "";
            gameController.resetGame();
            messageDisplay.textContent = "It's X's turn."
        }
    };

    const determineMessage = (e) => {
        if(gameBoard.getGameOver() === true && gameBoard.getWinner() === true){
            messageDisplay.textContent = e.target.textContent + " has won.";
        }else if (gameBoard.getGameOver() === true && gameBoard.getWinner() === false){
            messageDisplay.textContent = "It's a draw.";
        }else if(gameBoard.getGameOver() === false && gameBoard.getWinner() === false){
            messageDisplay.textContent = "It's " + gameController.getCurrentPlayer().marker + "'s turn.";
        }
    }

    refreshBtn.addEventListener("click", clearGameDisplay);

  return {clearGameDisplay}

  

})();