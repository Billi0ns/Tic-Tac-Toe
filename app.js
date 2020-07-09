const gameBoard = (() => {
  const board = document.getElementById('board');
  const tiles = Array.from(document.querySelectorAll('.tile'));
  const resultPage = document.getElementById('result');
  const restartBtn = document.getElementById('restartBtn');
  const playerBtn = document.getElementById('playerBtn');
  const player1 = document.getElementById('player1');
  const player2 = document.getElementById('player2');
  const WIN_CONDITIONS = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7],
  ];

  let gameTurn = 'cross';
  let usedCell = 0;

  let init = () => {
    gameTurn = 'cross';
    usedCell = 0;
    board.classList.add(gameTurn);
    bindListener(gameTurn);
  }

  let bindListener = () => {
    tiles.map(tile => {
      tile.addEventListener('click', processEvent, {once:true})
      tile.classList.remove('rmHover');
    })
  }

  let processEvent = (e) => {
    e.target.classList.add(gameTurn);
    if (checkWin()) {
      tiles.map(tile => {
        tile.removeEventListener('click', processEvent);
        tile.classList.add('rmHover');
      })
      return;
    } else {
      checkDraw();
      changeTurn();
    }
  }

  let checkWin = () => {
    let tokens = Array.from(document.querySelectorAll(`.tile.${gameTurn}`));
    let cellNums = [];
    tokens.map(token => {
      cellNums.push(token.dataset.cellnum);
    })

    let winner = WIN_CONDITIONS.some(condition => {
      return condition.every(num => {
        return cellNums.includes(String(num));
      })
    })

    if (winner) {
      resultPage.style.display = 'grid';
      let winnerName = (gameTurn === 'cross') ? player1.textContent : player2.textContent;
      document.getElementById('result__winner').textContent = `${winnerName} Win!`;
    }

    return winner;
  }

  let checkDraw = () => {
    if (usedCell === 8) {
      resultPage.style.display = 'grid';
      document.getElementById('result__winner').textContent = `Draw!`;
    }
  }

  let changeTurn = () => {
    usedCell ++;
    board.classList.remove(gameTurn);
    gameTurn = (gameTurn === 'cross') ? 'circle' : 'cross';
    board.classList.add(gameTurn); 
  }

  let restart = (() => {
    restartBtn.addEventListener('click', e => {
      board.classList.remove(gameTurn);
      tiles.map(tile => {
        tile.classList.remove('circle', 'cross');
      })
      init();
    })
  })();

  let hideResult = (() => {
    resultPage.addEventListener('click', () => {
      resultPage.style.display = 'none';
    })
  })();

  let changeName = () => {
    player1.textContent =  prompt("Change the name for player1") || 'player 1';
    player2.textContent =  prompt("Change the name for player2") || 'player 2';
  }

  playerBtn.addEventListener('click', changeName);


  init();
})();
