// Create the Sudoku board in the table
const board = document.getElementById('sudoku-board');

for (let i = 0; i < 9; i++) {
    let row = document.createElement('tr');
    for (let j = 0; j < 9; j++) {
        let cell = document.createElement('td');
        let input = document.createElement('input');
        input.type = 'text';
        input.maxLength = '1';
        input.oninput = () => {
            if (!/^[1-9]$/.test(input.value)) input.value = '';
        };
        cell.appendChild(input);
        row.appendChild(cell);
    }
    board.appendChild(row);
}

// Function to clear the board
function clearBoard() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.value = '');
}

// Check if the board is valid
function isValid(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] == num || board[x][col] == num || 
            board[3 * Math.floor(row / 3) + Math.floor(x / 3)]
                 [3 * Math.floor(col / 3) + x % 3] == num) {
            return false;
        }
    }
    return true;
}

// Solve the Sudoku board
function solveSudoku() {
    const board = [];
    for (let i = 0; i < 9; i++) {
        board[i] = [];
        for (let j = 0; j < 9; j++) {
            let value = document.querySelectorAll('tr')[i].querySelectorAll('td')[j].querySelector('input').value;
            board[i][j] = value ? parseInt(value) : 0;
        }
    }

    if (solve(board)) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                document.querySelectorAll('tr')[i].querySelectorAll('td')[j].querySelector('input').value = board[i][j] ? board[i][j] : '';
            }
        }
    } else {
        alert("No solution exists");
    }
}

function solve(board) {
    let empty = findEmpty(board);
    if (!empty) return true;

    let [row, col] = empty;

    for (let num = 1; num <= 9; num++) {
        if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solve(board)) return true;
            board[row][col] = 0;
        }
    }

    return false;
}

function findEmpty(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] == 0) return [i, j];
        }
    }
    return null;
}
