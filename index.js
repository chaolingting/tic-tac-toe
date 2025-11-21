

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


    const playRound = (row, column) => {
        console.log(`Dropping ${getActivePlayer().name}'s token into column ${column}`)

        const success = board.placeMarker(row, column, getActivePlayer().token)

        if(!success){
            console.log("Cell taken");
            return;
        }

        printBoard()
        
        if(checkWinner(board.getBoard(), activePlayer().token)){
            console.log(`${getActivePlayer().name} wins!`);
            return;
        }

        if(isTie(board.getBoard())){
            console.log("It's a tie")
        }

        switchPlayerTurn();
        console.log(`It's ${getActivePlayer().name}'s turn`);

       
        
    }


 const printBoard = () =>{
    const values = board.getBoard().map(row => row.map(cell => cell.getValue()));
    console.table(values);
 }


    return {switchPlayerTurn, playRound}

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
            board[j][0].getValue() === token &&
            board[i][1].getValue() === token &&
            board[i][2].getValue() === token
         )return true;
    }



}


function DisplayController(){}