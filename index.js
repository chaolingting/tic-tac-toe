// //console.log("hello world")



// function Gameboard(){
//     const rows = 3;
//     const columns = 3;
//     const board = [];

//    for (let i = 0; i < rows; i++){
//     board[i] = [];
//     for (let j = 0; j < columns; j++){
//         board[i].push(cell())
//     }
//    }

//    const getBoard = () => board;

//    const dropToken = (column, player) =>{
//     const availableCells = board
//     .filter((row) => row[column].getValue() === 0)
//     .map(row => row[column]);

//     if (!availableCells.length) return;

//     const lowestRow = availableCells.length - 1;
//     board[lowestRow][column].addToken(player);

//     const printBoard = () => {
//         const boardWithCellValues = board
//         .map(row => row.map((cell) => cell.getValue()));
//         console.log(boardWithCellValues);
//     };

//     return { getBoard, dropToken, printBoard };

//    };

// };


// function Cell(){
//     let value = 0;

//     const addToken = (player) => {
//         value = player;
//     }

//     const getValue = () => value;

//     return { addToken, getValue };
// }


// function GameController(
//     playerOneName = "Player One",
//     playerTwoName = "Player Two"
// ){
//     const board = Gameboard();

//     const players = [
//         {
//             name: playerOneName,
//             token: 1
//         },
//         {
//             name: playerTwoName,
//             token: 2
//         }
//     ];

//     let activePlayer = players[0];

//     const switchPlayerTurn = () => {
//         activePlayer = activePlayer === players[0] ? players[1] : players[0];
//     };
//     const getActivePlayer = () => activePlayer;

//     const printNewRound = () => {
//         board.printBoard();
//         console.log(`${getActivePlayer().name}'s turn.`);
//     }

//     switchPlayerTurn()
//     printNewRound()

//     return{playRound, getActivePlayer}
// }

// const game = GameController()





function gameBoard(){
    const board = [];
    const rows = 3;
    const columns = 3;

//2d array
    for(let i = 0; i < rows; i ++){
        board[i] = [];
        for(let j = 0; i< columns; j ++){
            board[i].push(Cell());
        };
    };

    const getBoard = () => board;

    // const placeMarker = (column, player) =>{
    //     const availableCells = board.filter((row) => row[column].getValue()===0).map(row => row[column]);
    // };

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



// function player(name, marker){
//     const getName = () => name;
//     const getMarker = () => marker;
    
//     return {getName, getMarker};
// }




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
    
    // const switchPlayer = () => {
    //     if (activePlayer === player1){
    //         player1
    //     } else{
    //         activePlayer === player2
    //     }
    // }

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    // const printNewRound = () => {
    //     board.printBoard();
    //     console.log(`${getActivePlayer().name}'s turn.`);

    // };

    const playRound = (row, column) => {
        console.log(`Dropping ${getActivePlayer().name}'s token into column ${column}`)
        const success = board.placeMarker(row, column, getActivePlayer().token)
        
        
        board.dropToken(column, getActivePlayer().token);
    }

    return {switchPlayerTurn, playRound}

}