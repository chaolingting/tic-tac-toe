//console.log("hello world")



//layout of tic tac toe
function Gameboard(){
    const rows = 3;
    const columns = 3;
    const board = [];

   for (let i = 0; i < rows; i++){
    board[i] = [];
    for (let j = 0; j < columns; j++){
        board[i].push(cell())
    }
   }

   const getBoard = () => board;

   const dropToken = (column, player) =>{
    const availableCells = board
    .filter((row) => row[column].getValue() === 0)
    .map(row => row[column]);

    if (!availableCells.length) return;

    const lowestRow = availableCells.length - 1;
    board[lowestRow][column].addToken(player);

    const printBoard = () => {
        const boardWithCellValues = board
        .map(row => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    };

    return { getBoard, dropToken, printBoard };

   };

};


function Cell(){
    let value = 0;

    const addToken = (player) => {
        value = player;
    }

    const getValue = () => value;

    return { addToken, getValue };
}


function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
){
    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            token: 1
        },
        {
            name: playerTwoName,
            token: 2
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    }
}


//player & computer
// const player = (function(){
//     let score = 0;
//     let playRound = 0;

//     for(let i = 0; i < playRound; i++){
//         return score;
//     }
    
    

// })();



console.log(player)