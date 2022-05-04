window.addEventListener('DOMContentLoaded', () => {
  const espacos = Array.from(document.querySelectorAll('.espaco'));
  const playerDisplay = document.querySelector('.display-player');
  const resetButton = document.querySelector('#reset');
  const announcer = document.querySelector('.announcer');

  let board = ['', '', '', '', '', '', '', '', ''];
  let currentPlayer = 'X';
  let isGameActive = true;

  const PLAYERX_WON = 'PLAYERX_WON';
  const PLAYERO_WON = 'PLAYERO_WON';
  const TIE = 'EMPATE';


  const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
  ];

  function handleResultValidation() {
      let roundWon = false;
      for (let i = 0; i <= 7; i++) {
          const winCondition = winningConditions[i];
          const a = board[winCondition[0]];
          const b = board[winCondition[1]];
          const c = board[winCondition[2]];
          if (a === '' || b === '' || c === '') {
              continue;
          }
          if (a === b && b === c) {
              roundWon = true;
              break;
          }
      }

  if (roundWon) {
          announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
          isGameActive = false;
          return;
      }

  if (!board.includes(''))
      announce(TIE);
  }

  const announce = (type) => {
      switch(type){
          case PLAYERO_WON:
              announcer.innerHTML = 'Jogador <span class="playerO">O</span> ganhou!';
              break;
          case PLAYERX_WON:
              announcer.innerHTML = 'Jogador <span class="playerX">X</span> ganhou!';
              break;
          case TIE:
              announcer.innerText = 'Empate!';
      }
      announcer.classList.remove('hide');
  };

  const isValidAction = (espaco) => {
      if (espaco.innerText === 'X' || espaco.innerText === 'O'){
          return false;
      }

      return true;
  };

  const updateBoard =  (index) => {
      board[index] = currentPlayer;
  }

  const changePlayer = () => {
      playerDisplay.classList.remove(`player${currentPlayer}`);
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      playerDisplay.innerText = currentPlayer;
      playerDisplay.classList.add(`player${currentPlayer}`);
  }

  const userAction = (espaco, index) => {
      if(isValidAction(espaco) && isGameActive) {
          espaco.innerText = currentPlayer;
          espaco.classList.add(`player${currentPlayer}`);
          updateBoard(index);
          handleResultValidation();
          changePlayer();
      }
  }
  
  const resetBoard = () => {
      board = ['', '', '', '', '', '', '', '', ''];
      isGameActive = true;
      announcer.classList.add('hide');

      if (currentPlayer === 'O') {
          changePlayer();
      }

      espacos.forEach(espaco => {
          espaco.innerText = '';
          espaco.classList.remove('playerX');
          espaco.classList.remove('playerO');
      });
  }

  espacos.forEach( (espaco, index) => {
      espaco.addEventListener('click', () => userAction(espaco, index));
  });

  resetButton.addEventListener('click', resetBoard);
});