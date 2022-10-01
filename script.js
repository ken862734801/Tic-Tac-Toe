const player = (name, marker, score) => {
    return {name, marker, score}
}

const gameBoard = (() => {

    let board = Array(9).fill("");
    console.log(board);

    const getBoard = () => {
        return board
    }

    const clearBoard = () => {
        board = Array(9).fill("");
        console.log(board);
    }

    const markBoard = (marker, index) => {
        board[index] = marker;
        winConditionVertical();
        winConditionDiagonal();
        winConditionHorizontal();
        console.log(board);
    }

    const winConditionVertical = () => {
        if(board[0] == gameController.getCurrentPlayer().marker && board[0] == board[3] && board[0]== board[6]){
            console.log("Player " + gameController.getCurrentPlayer().marker + " won!");
        }else if(board[1] == gameController.getCurrentPlayer().marker && board[1] == board[4] && board[1] == board[7]){
            console.log("Player " + gameController.getCurrentPlayer().marker + " won!");
        }else if(board[2] == gameController.getCurrentPlayer().marker && board[2] == board[5] && board[2] == board[6]){
            console.log("Player " + gameController.getCurrentPlayer().marker + " won!");
        }
    }

    const winConditionHorizontal = () => {
        if(board[0] == gameController.getCurrentPlayer().marker && board[0] == board[1] && board[0]== board[2]){
            console.log("Player " + gameController.getCurrentPlayer().marker + " won!");
        }else if(board[3] == gameController.getCurrentPlayer().marker && board[3] == board[4] && board[3] == board[5]){
            console.log("Player " + gameController.getCurrentPlayer().marker + " won!");
        }else if(board[6] == gameController.getCurrentPlayer().marker && board[6] == board[7] && board[6] == board[8]){
            console.log("Player " + gameController.getCurrentPlayer().marker + " won!");
        }
    }

    const winConditionDiagonal = () => {
        if(board[0] == gameController.getCurrentPlayer().marker && board[0] == board[4] && board[0]== board[8]){
            console.log("Player " + gameController.getCurrentPlayer().marker + " won!");
        }else if(board[2] == gameController.getCurrentPlayer().marker && board[2] == board[4] && board[2] == board[6]){
            console.log("Player " + gameController.getCurrentPlayer().marker + " won!");
        }
    }

    const drawConditions = () => {
        if(!winConditionVertical && !winConditionHorizontal && !winConditionDiagonal){
            console.log("It's a draw!")
        }
    }


    return {clearBoard, getBoard, markBoard, winConditionDiagonal , winConditionHorizontal ,winConditionVertical}

})();

const gameController = (() => {
    const playerOne = player("Player", "X", 0);
    const playerTwo = player("Player", "O", 0);
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

    const resetGame = () => {
        gameBoard.clearBoard();
        currentPlayer = playerOne;
    }

    return {getCurrentPlayer, playerTurn, resetGame}
})();

const displayController = (() => {

    let messageDisplay = document.getElementById("message-display");

    let container = document.getElementById("container");
    let home = document.getElementById("home");

    let squares = document.querySelectorAll(".square");
    let refreshBtn = document.getElementById("refreshBtn");

    squares.forEach(square => {
        square.addEventListener("click", (e)=> {
            e.target.textContent = gameController.getCurrentPlayer().marker;
            changeColor(e);
            gameBoard.markBoard(gameController.getCurrentPlayer().marker, getSquareIndex(e));
            gameController.playerTurn();
            messageDisplay.textContent = "It's " + gameController.getCurrentPlayer().marker + "'s turn.";
           
        });
    });

    const getSquareIndex = (e) => {
        const squareIndex = e.target.dataset.index;
        console.log(squareIndex);
        return squareIndex
    };

    const changeColor = (e) => {
        if(e.target.textContent === "X"){
            e.target.style.color = "#e73a1f";
        }else if(e.target.textContent === "O"){
            e.target.style.color = "#02adc7";
        }
    }
    const clearGameDisplay = () => {
        for(i =0; i < squares.length; i++){
            squares[i].textContent = "";
            console.log("clear!");
            gameController.resetGame();
            messageDisplay.textContent = "It's X's turn."
        }
    };
    refreshBtn.addEventListener("click", clearGameDisplay);

  return {clearGameDisplay}

  

})();