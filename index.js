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



//cell
function Cell(){
    let value = 0;

    const addToken = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {addToken, getValue}
}






function gameController(){
    
    
    const board = gameBoard();

    const players = [
        { name: "", token: 1 },
        { name: "", token: 2 }
    ];

    let activePlayer = players[0];


    const playersNameInput = (name1, name2) =>{
        players[0].name = name1;
        players[1].name = name2;
    }

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };


    const getActivePlayer = () => activePlayer;


    //Game Over
    let gameOver = false;
    const isGameOver = () => gameOver;


    //win, lose, tie
    const checkWinner = (token) => {
    const b = board.getBoard()
    for(let i = 0; i < 3; i++){
        if(
            b[i][0].getValue() === token &&
            b[i][1].getValue() === token &&
            b[i][2].getValue() === token 
        )return true;
    }
 
    for(let j = 0; j < 3; j++){
        if(
            b[0][j].getValue() === token &&
            b[1][j].getValue() === token &&
            b[2][j].getValue() === token
         )return true;
    }


    if(
        b[0][0].getValue() === token &&
        b[1][1].getValue() === token &&
        b[2][2].getValue() === token 
    ) return true

    if(
        b[0][2].getValue() === token &&
        b[1][1].getValue() === token &&
        b[2][0].getValue() === token
    ) return true

    return false;

}

const isTie = () =>{
    const b = board.getBoard()
    return b.every(row => row.every(cell => cell.getValue() !== 0))
}



    
//
    const playRound = (row, column) => {

        if (gameOver) return; 
        
        console.log(`Dropping ${getActivePlayer().name}'s token into column ${column}`)

        const success = board.placeMarker(row, column, getActivePlayer().token)

        if(!success){
            console.log("Cell taken");
            return;
        }

 
        if(checkWinner(getActivePlayer().token)){
            console.log(`${getActivePlayer().name} wins!`);
            gameOver = true;
            return;
        }

        if(isTie()){
            console.log("It's a tie")
            gameOver = true;
            return;
        }

        switchPlayerTurn();
        console.log(`It's ${getActivePlayer().name}'s turn`);

       
        
    }


    const resetGame = () => {
        board.resetBoard();
        gameOver = false;
        activePlayer = players[0];
    }

 const printBoard = () =>{
    const values = board.getBoard().map(row => row.map(cell => cell.getValue()));
    console.table(values);
 }
        printBoard()
        


    return { playRound, 
        getActivePlayer, 
        playersNameInput,
        getPlayers: () => players,
        getBoard: board.getBoard, 
        resetBoard: board.resetBoard, 
        resetGame,
        isGameOver, 
        isTie,
    printBoard }

}






//Display UI
const DisplayController = (function (){

    const container = document.querySelector('.container');


    const h1title = document.querySelector('.title');
    rainbowText(h1title);
    
    // const footer = document.querySelector('.footer');
    // rainbowText(footer);

    function rainbowText(element){
        const text = element.textContent;
        element.textContent = "";

        text.split('').forEach(char => {
            const span = document.createElement('span');
            span.textContent = char;

            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            span.style.color = `rgb(${r}, ${g}, ${b})`;

            element.appendChild(span)

        })
    }

    const playersDiv = document.createElement('div');
    playersDiv.classList.add('players');
    container.append(playersDiv);

    const statusDiv = document.createElement('div');
    statusDiv.classList.add('status');
    container.append(statusDiv);


    const playersInputs = document.querySelector('.players-inputs')


    const board = document.createElement('div');
    board.classList.add('board')
    container.append(board)

    const game = gameController();

    const enterNames = document.querySelector('.enter-names')


    const resetBoardBtn = document.createElement('button');
    resetBoardBtn.classList.add('reset');
    resetBoardBtn.textContent = "Reset";
    

    resetBoardBtn.addEventListener('click', () => {
        game.resetGame(); 
        updateScreen();   
        
        player1Input.readOnly = false;
        player2Input.readOnly = false;

        playersInputs.style.display = 'block'



        board.style.display = "none";
        statusDiv.style.display = "none";
        playersDiv.style.display = "none";
        resetBoardBtn.style.display = "none";
        startGameBtn.style.display = "block";
        enterNames.style.display = "block";


    });
    container.append(resetBoardBtn);





//Hide before start game    
    board.style.display = "none";
    statusDiv.style.display = "none";
    playersDiv.style.display = "none";
    resetBoardBtn.style.display = "none"

//START GAME
    const startGameBtn = document.querySelector('.start');
    startGameBtn.addEventListener('click',()=>{
        board.style.display = "grid";
        statusDiv.style.display = "block";
        playersDiv.style.display = "block";
        resetBoardBtn.style.display = "block";


        player1Input.readOnly = true;
        player2Input.readOnly = true;


        playersInputs.style.display = 'none'


        startGameBtn.style.display = "none";

        enterNames.style.display = "none";
        updateScreen();


    })

    //Input names
    const player1Input = document.querySelector('#player1');
    const player2Input = document.querySelector('#player2');

    player1Input.value = player1Input.value || "Player 1";
    player2Input.value = player2Input.value || "Player 2";
    
    game.playersNameInput(player1Input.value, player2Input.value);



    player1Input.addEventListener('input', () => {
        game.playersNameInput(
            player1Input.value || "Player 1",
            player2Input.value || "Player 2"
            
        );
        updateScreen();
    })




    player2Input.addEventListener('input', () => {
        game.playersNameInput(
            player1Input.value || "Player 1",
            player2Input.value || "Player 2"
            
        );
        updateScreen();
    })

    function updateScreen(){

        const boardState = game.getBoard()

        const activePlayer = game.getActivePlayer();
        const players = game.getPlayers();

        playersDiv.textContent = `${players[0].name} vs ${players[1].name}`;

        statusDiv.classList.remove('player1-turn', 'player2-turn', 'tie-game');

        if (game.isGameOver()) {
            statusDiv.textContent = `Game Over. ${activePlayer.name} won.`
            
            
        if(game.isTie()){
            statusDiv.textContent = "It's a tie, restart to play again."
        } else {
            statusDiv.classList.add(activePlayer.token === 1 ? 'player1-turn' : 'player2-turn');
            
        }
    }   else {
            statusDiv.textContent = `It's ${activePlayer.name}'s turn`
             statusDiv.classList.add(activePlayer.token === 1 ? 'player1-turn' : 'player2-turn');
        }



        const cells = document.querySelectorAll('.cell')
        

        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j ++){
                const cellIndex = i * 3 + j;
                const value = boardState[i][j].getValue();

                cells[cellIndex].classList.remove('x-marker', 'o-marker');

                if(value === 1){
                    cells[cellIndex].textContent = "X";
                    cells[cellIndex].classList.add('x-marker');
                } else if(value === 2){
                    cells[cellIndex].textContent = "O";
                    cells[cellIndex].classList.add('o-marker')
                } else{
                    cells[cellIndex].textContent = "";
                }


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


    



})();