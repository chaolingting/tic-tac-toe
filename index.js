

function gameBoard(){
    const board = [];
    const rows = 3;
    const columns = 3;

//2d array
    for(let i = 0; i < rows; i ++){
        board[i] = [];
        for(let j = 0; j< columns; j ++){
            board[i].push(Cell());
        };
    };

    const getBoard = () => board;



    const placeMarker = (row, column, player) => {
        const cell = board[row][column];

        if(cell.getValue() !== 0) return false;
        cell.addToken(player);
        return true;

    }

    const resetBoard = () => {
        for(let i = 0; i < rows; i ++){
            board[i] = [];
            for(let j = 0; j< columns; j ++){
                board[i][j] = Cell();
            };
    };
    };




    return {getBoard, placeMarker, resetBoard};
}


function Cell(){
    let value = 0;

    const addToken = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {addToken, getValue}
}






function gameController(player1Name = "Player One", player2Name = "Player Two")
{
    
    
    const board = gameBoard();

    const players = [
        {
            name: player1Name,
            token: 1
        },
        {
            name: player2Name,
            token: 2
        }
    ];

    let activePlayer = players[0];
    


    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    //Game Over
    let gameOver = false;
    const isGameOver = () => gameOver;

    

    const playRound = (row, column) => {

        if (gameOver) return; 
        
        console.log(`Dropping ${getActivePlayer().name}'s token into column ${column}`)

        const success = board.placeMarker(row, column, getActivePlayer().token)

        if(!success){
            console.log("Cell taken");
            return;
        }

        printBoard()
        
        if(checkWinner(board.getBoard(), getActivePlayer().token)){
            console.log(`${getActivePlayer().name} wins!`);
            gameOver = true;
            return;
        }

        if(isTie(board.getBoard())){
            console.log("It's a tie")
            gameOver = true;
            return;
        }

        switchPlayerTurn();
        console.log(`It's ${getActivePlayer().name}'s turn`);

       
        
    }


 const printBoard = () =>{
    const values = board.getBoard().map(row => row.map(cell => cell.getValue()));
    console.table(values);
 }


    return {switchPlayerTurn, playRound, getActivePlayer, getBoard: board.getBoard, isGameOver, resetBoard: board.resetBoard }

}

function checkWinner(board, token){
    for(let i = 0; i < 3; i++){
        if(
            board[i][0].getValue() === token &&
            board[i][1].getValue() === token &&
            board[i][2].getValue() === token 
        )return true;
    }
 
    for(let j = 0; j < 3; j++){
        if(
            board[0][j].getValue() === token &&
            board[1][j].getValue() === token &&
            board[2][j].getValue() === token
         )return true;
    }


    if(
        board[0][0].getValue() === token &&
        board[1][1].getValue() === token &&
        board[2][2].getValue() === token 
    ) return true

    if(
        board[0][2].getValue() === token &&
        board[1][1].getValue() === token &&
        board[2][0].getValue() === token
    ) return true

    return false;

    

}

function isTie(board){
    return board.every(row => row.every(cell => cell.getValue() !== 0))
}






//Display
const DisplayController = (function (){
    const container = document.querySelector('.container')

    const board = document.createElement('div');
    board.classList.add('board')
    container.append(board)

    const game = gameController("Player 1", "Player 2")



    function updateScreen(){

        const boardState = game.getBoard()

        const activePlayer = game.getActivePlayer();
        activePlayer.textContent = `It's ${activePlayer}'s turn`

        const cells = document.querySelectorAll('.cell')
        

        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j ++){
                const cellIndex = i * 3 + j;
                const value = boardState[i][j].getValue();
                cells[cellIndex].textContent = 
                            value === 1 ? "X" : 
                            value === 2 ? "O" : "";

            }
        }

        

    }


    for(let i = 0; i < 3; i++){
        for(let j = 0; j <3; j++){
            const cell = document.createElement('div')
            cell.classList.add('cell')
            board.append(cell)
            cell.addEventListener('click', () => {
                game.playRound(i, j);
                updateScreen();
            })
        }
    }



    updateScreen();
    

    const resetBoardBtn = document.createElement('button');
    resetBoardBtn.classList.add('reset');
    resetBoardBtn.textContent = "Reset";

    resetBoardBtn.addEventListener('click', () => {
        game.resetBoard(); 
        updateScreen();   
    });
    container.append(resetBoardBtn);


})();