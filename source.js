console.log('test');

const X_STATE = 1;
const O_STATE = 2;

const playerFactory = function(name_p, state_p) {
    let name = name_p;
    let state = state_p;
    const getName = () => name;
    const setName = (n) => {name = n};
    const getState = () => state;
    return {
        getName,
        setName,
        getState
    }
}

const Gameboard = (function() {
    // Create player objects
    const pOne = playerFactory('pOne', X_STATE);
    const pTwo = playerFactory('pTwo', O_STATE);

    // Initialize gameboard
    const board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]

    let currentTurn = 0;
    let currentPlayer = pOne;

    const getBoard = () => board;

    // ~~ is double NOT operator, which removes all decimals to get an integer
    const updateBoard = (position, player) => {
        if(board[~~(position / 3)][position % 3] != 0) {
            console.log('ERROR: Spot taken');
            return 1;
        }
        if(position >= 0 && position <= 8) {
            board[~~(position / 3)][position % 3] = player.getState();
        } else {
            console.log('ERROR: Position out of bounds');
        }
    }

    const init = () => {

    }

    const makeMove = (position) => {
        if(updateBoard(position, currentPlayer) != 1){
            currentTurn++;
            drawState(position);
            console.log(currentPlayer.getName());

            // Swap to next player
            currentPlayer == pOne ? currentPlayer = pTwo : currentPlayer = pOne;

            let winningPlayer = checkWin();
            if(winningPlayer != 1){
                playerWin(winningPlayer);
            } else {
                if(currentTurn == 9) {
                    playerDraw();
                }
            }       
        }        
    }

    // There are 8 win conditions. 3 vertical, 3 horizontal, 2 diagonal
    // Return player object on win
    const checkWin = () => {
        // Horizontal
        if((board[0][0] == board[0][1] && board[0][1] == board[0][2]) && board[0][0] != 0) return board[0][0] == pOne.getState() ? pOne : pTwo;
        if((board[1][0] == board[1][1] && board[1][1] == board[1][2]) && board[1][0] != 0) return board[1][0] == pOne.getState() ? pOne : pTwo;
        if((board[2][0] == board[2][1] && board[2][1] == board[2][2]) && board[2][0] != 0) return board[2][0] == pOne.getState() ? pOne : pTwo;

        // Vertical
        if((board[0][0] == board[1][0] && board[1][0] == board[2][0]) && board[0][0] != 0) return board[0][0] == pOne.getState() ? pOne : pTwo;
        if((board[0][1] == board[1][1] && board[1][1] == board[2][1]) && board[0][1] != 0) return board[0][1] == pOne.getState() ? pOne : pTwo;
        if((board[0][2] == board[1][2] && board[1][2] == board[2][2]) && board[0][2] != 0) return board[0][2] == pOne.getState() ? pOne : pTwo;

        // Diagonal
        if((board[0][0] == board[1][1] && board[1][1] == board[2][2]) && board[0][0] != 0) return board[0][0] == pOne.getState() ? pOne : pTwo;
        if((board[2][0] == board[1][1] && board[1][1] == board[0][2]) && board[2][0] != 0) return board[2][0] == pOne.getState() ? pOne : pTwo;

        return 1;
    }

    const playerWin = (player) => {
        // Logic for when someone wins
        let x = player.getName();
        console.log(player.getName(), 'has won!!');
    }

    const playerDraw = () => {
        console.log('current turn: ', currentTurn);
        console.log('its a draw :(');
    }

    const drawState = (position) => {
        const boxElement = document.querySelector(`[data-box="${position}"]`);
        if(currentPlayer.getState() == X_STATE){
            boxElement.innerHTML = 'X';
        } else {
            boxElement.innerHTML = "O";
        }  
    }

    const reset = () => {
        currentTurn = 0;
        currentPlayer = pOne;
        for(let i = 0; i < 9; i++){
            board[~~(i / 3)][i % 3] = 0;
            let boxElement = document.querySelector(`[data-box="${i}"]`);
            boxElement.innerHTML = '';
        }
    }

    // Add event listeners
    const boxZero = document.querySelector('[data-box="0"]');
    boxZero.addEventListener('click', () => {
        makeMove(0);
    });
    const boxOne = document.querySelector('[data-box="1"]');
    boxOne.addEventListener('click', () => {
        makeMove(1);
    });
    const boxTwo = document.querySelector('[data-box="2"]');
    boxTwo.addEventListener('click', () => {
        makeMove(2);
    });
    const boxThree = document.querySelector('[data-box="3"]');
    boxThree.addEventListener('click', () => {
        makeMove(3);
    });
    const boxFour = document.querySelector('[data-box="4"]');
    boxFour.addEventListener('click', () => {
        makeMove(4);
    });
    const boxFive = document.querySelector('[data-box="5"]');
    boxFive.addEventListener('click', () => {
        makeMove(5);
    });
    const boxSix = document.querySelector('[data-box="6"]');
    boxSix.addEventListener('click', () => {
        makeMove(6);
    });
    const boxSeven = document.querySelector('[data-box="7"]');
    boxSeven.addEventListener('click', () => {
        makeMove(7);
    });
    const boxEight = document.querySelector('[data-box="8"]');
    boxEight.addEventListener('click', () => {
        makeMove(8);
    })

    const resetBtn = document.querySelector('#reset-btn');
    resetBtn.addEventListener('click', () => {
        reset();
    });

    const playerOneBtn = document.querySelector('[data-name="1"]');
    playerOneBtn.addEventListener('click', () => {
        console.log('p 1');
    });

    const playerTwoBtn = document.querySelector('[data-name="2"]');
    playerTwoBtn.addEventListener('click', () => {
        console.log('p 2');
    })

    return {
        pOne,
        pTwo,
        getBoard
    }
})();

Gameboard.pOne.setName('anthony');
Gameboard.pTwo.setName('sasha');

// Gameboard.updateBoard(3, Gameboard.pTwo);
// Gameboard.updateBoard(4, Gameboard.pTwo);
// Gameboard.updateBoard(5, Gameboard.pTwo);

// let winner = Gameboard.checkWin();
// console.log(winner.getName());

// console.log(Gameboard.getBoard());

// DRAW CONDITION
// Gameboard.makeMove(4); 
// Gameboard.makeMove(2);
// Gameboard.makeMove(5); 
// Gameboard.makeMove(3);
// Gameboard.makeMove(1);
// Gameboard.makeMove(7);
// Gameboard.makeMove(6);
// Gameboard.makeMove(8);
// Gameboard.makeMove(0);




console.log(Gameboard.getBoard());