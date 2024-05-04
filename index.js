 
document.addEventListener('DOMContentLoaded', function() {
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.querySelector('#status');
    const restartButton = document.querySelector('#restart-btn');
  
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];
  
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    function handleCellClick(clickedCellEvent) {
      const clickedCell = clickedCellEvent.target;
      const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
  
      if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
      }
  
      handleCellPlayed(clickedCell, clickedCellIndex);
      handleResultValidation();
    }
  
    function handleCellPlayed(clickedCell, clickedCellIndex) {
      gameState[clickedCellIndex] = currentPlayer;
      clickedCell.innerHTML = currentPlayer;
    }
  
    function handleResultValidation() {
      let roundWon = false;
      for (let i = 0; i < winConditions.length; i++) {
        const winCondition = winConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
          continue;
        }
        if (a === b && b === c) {
          roundWon = true;
          break;
        }
      }
  
      if (roundWon) {
        gameActive = false;
        statusDisplay.textContent = `Player ${currentPlayer} has won!`;
        return;
      }
  
      let roundDraw = !gameState.includes('');
      if (roundDraw) {
        gameActive = false;
        statusDisplay.textContent = "It's a draw!";
        return;
      }
  
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
  
    function handleRestartGame() {
      currentPlayer = 'X';
      gameActive = true;
      gameState = ['', '', '', '', '', '', '', '', ''];
      statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
      cells.forEach(cell => cell.innerHTML = '');
    }
  
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', handleRestartGame);
  });
  
