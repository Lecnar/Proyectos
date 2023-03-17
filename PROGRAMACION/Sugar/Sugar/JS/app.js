document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')
  
    const width = 10
    let currentIndex = 0 //so first div in our grid
    let appleIndex = 0 //so first div in our grid
    let currentSnake = [2,1,0] 
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0
  
  
    //to start, and restart the game
    function startGame() {
      currentSnake.forEach(index => squares[index].classList.remove('snake'))
      squares[appleIndex].classList.remove('apple')
      clearInterval(interval)
      score = 0
      randomApple()
      direction = 1
      scoreDisplay.innerText = score
      intervalTime = 300
      currentSnake = [2,1,0]
      currentIndex = 0
      currentSnake.forEach(index => squares[index].classList.add('snake'))
      interval = setInterval(moveOutcomes, intervalTime)
    }
  
  
    //function that deals with ALL the ove outcomes of the Snake
    function moveOutcomes() {
  
      //deals with snake hitting border and snake hitting self
      if (
        (currentSnake[0] + width >= (width * width) && direction === width ) || //if snake hits bottom
        (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
        (currentSnake[0] - width < 0 && direction === -width) ||  //if snake hits the top
        squares[currentSnake[0] + direction].classList.contains('snake') //if snake goes into itself
      ) {
        return clearInterval(interval) //this will clear the interval if any of the above happen
      }
  
      const tail = currentSnake.pop() //removes last ite of the array and shows it
      squares[tail].classList.remove('snake')  //removes class of snake from the TAIL
      currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head of the array
  
      //deals with snake getting apple
      if(squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        randomApple()
        score++
        scoreDisplay.textContent = score
        clearInterval(interval)
        intervalTime = intervalTime * speed
        interval = setInterval(moveOutcomes, intervalTime)
      }
      squares[currentSnake[0]].classList.add('snake')
    }
  
  
    //generate new apple once apple is eaten
    function randomApple() {
      do{
        appleIndex = Math.floor(Math.random() * squares.length)
      } while(squares[appleIndex].classList.contains('snake')) //making sure apples dont appear on the snake
      squares[appleIndex].classList.add('apple')
    }
  
  
    //assign functions to keycodes
    function control(e) {
      squares[currentIndex].classList.remove('snake')
  
      if(e.keyCode === 39) {
        direction = 1 //if we press the right arrow on our keyboard, the snake will go right one
      } else if (e.keyCode === 38) {
        direction = -width // if we press the up arrow, the snake will go back ten divs, appearing to go up
      } else if (e.keyCode === 37) {
        direction = -1 // if we press left, the snake will go left one div
      } else if (e.keyCode === 40) {
        direction = +width //if we press down, the snake head will instantly appear in the div ten divs from where you are now
      }
    }
  
    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)
  })







/*document.addEventListener('DOMContentLoaded', () => {

    const scoreDisplay = document.getElementById('score')
    const width = 28
    let score = 0
    const grid = document.querySelector('.grid')
    const layout = [
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
      1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
      1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
      1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
      1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
      1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
      4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
      1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
      1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
      1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
      1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
      1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
      1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
      1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
      1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
      1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
      1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]
    // 0 - pac-dots
    // 1 - wall
    // 2 - ghost-lair
    // 3 - power-pellet
    // 4 - empty
  
    const squares = []
  
    //create your board
    function createBoard() {
      for (let i = 0; i < layout.length; i++) {
        const square = document.createElement('div')
        grid.appendChild(square)
        squares.push(square)
  
        //add layout to the board
        if(layout[i] === 0) {
          squares[i].classList.add('pac-dot')
        } else if (layout[i] === 1) {
          squares[i].classList.add('wall')
        } else if (layout[i] === 2) {
          squares[i].classList.add('ghost-lair')
        } else if (layout[i] === 3) {
          squares[i].classList.add('power-pellet')
        }
      }
    }
    createBoard()
  
  
    //create Characters
    //draw pacman onto the board
    let pacmanCurrentIndex = 490
    squares[pacmanCurrentIndex].classList.add('pac-man')
    //get the coordinates of pacman on the grid with X and Y axis
    // function getCoordinates(index) {
    //   return [index % width, Math.floor(index / width)]
    // }
  
    // console.log(getCoordinates(pacmanCurrentIndex))
})*/