// 👉 TASK 1 - Understand the existing code 👈
function moduleProject2() {
  // 👇 WORK WORK BELOW THIS LINE 👇
  let startTime = new Date().getTime() // Record start time

  function getTimeElapsed() { // To be used at end of game to get elapsed time
    let currentTime = new Date().getTime()
    return currentTime - startTime
  }

  // Setting up the footer content
  let footer = document.querySelector('footer')
  let currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`
 
  let keys = { // To easily check `event.key` on keyboard events
    space: ' ',
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
    left: 'ArrowLeft',
  }
 
  // Helper function to grab all squares
  const getAllSquares = () => document.querySelectorAll('.square')
  
  // Populating the grid with rows and squares
  for (let n = 0; n < 5; n++) {
    // Creating the rows
    let row = document.createElement('div')
    document.querySelector('#grid').appendChild(row)
    row.classList.add('row')
    // Creating the squares
    for (let m = 0; m < 5; m++) {
      let square = document.createElement('div')
      square.classList.add('square')
      row.appendChild(square)
      square.addEventListener('click', () => {
        // 👉 TASK 2 - Use a click handler to target a square 👈
        document.querySelector('.targeted').classList.remove('targeted')
        square.classList.add('targeted')
        //console.log(document.querySelector('.targeted').previousElementSibling)
      })
    }
  }
  document.querySelector('.row:nth-child(3)')
    .children[2].classList.add('targeted') // Initial square being targeted

  // Helper function to obtain 5 random indices (0-24) to put mosquitoes in
  function generateRandomIntegers() {
    let randomInts = []
    while (randomInts.length < 5) {
      let randomInt = Math.floor(Math.random() * 25)
      if (!randomInts.includes(randomInt)) {
        randomInts.push(randomInt)
      }
    }
    return randomInts
  }
  let allSquares = getAllSquares()
  generateRandomIntegers().forEach(randomInt => { // Puts live mosquitoes in 5 random squares
    let mosquito = document.createElement('img')
    mosquito.src = './mosquito.png'
    mosquito.style.transform = `rotate(${Math.floor(Math.random() * 359)}deg) scale(${Math.random() * 0.4 + 0.8})`
    mosquito.dataset.status = 'alive'
    allSquares[randomInt].appendChild(mosquito)
  })
  let restart = document.createElement('button')
  restart.textContent = 'Restart'
  document.addEventListener('keydown', evt => {
    // 👉 TASK 3 - Use the arrow keys to highlight a new square 👈
    console.log(evt)
    let newTarget
    let bug = document.querySelector('.targeted').firstChild 
    if(evt.key === "ArrowRight" && 
    document.querySelector('.targeted').nextElementSibling !== null ){

      newTarget = document.querySelector('.targeted').nextElementSibling
      document.querySelector('.targeted').classList.remove('targeted')
      newTarget.classList.add('targeted')
      
    }
    if(evt.key === "ArrowLeft" &&
    document.querySelector('.targeted').previousElementSibling !== null){
      newTarget = document.querySelector('.targeted').previousElementSibling
      document.querySelector('.targeted').classList.remove('targeted')
      newTarget.classList.add('targeted')
      
    }
    if(evt.key === "ArrowUp" &&
    document.querySelector('.targeted').parentElement.previousElementSibling !==null){
      //console.log(document.querySelector('.targeted').parentElement.previousElementSibling)
      //console.log(document.querySelector('.targeted').parentElement.children.length)
      for(let i = 0; i < document.querySelector('.targeted').parentElement.children.length; i++){
        if(document.querySelector('.targeted') === 
        document.querySelector('.targeted').parentElement.children[i] ){
          newTarget = document.querySelector('.targeted').parentElement.previousElementSibling.children[i]
          document.querySelector('.targeted').classList.remove('targeted')
          newTarget.classList.add('targeted')
        }
      }
    }
    if(evt.key === "ArrowDown" &&
    document.querySelector('.targeted').parentElement.nextElementSibling !==null){
      //console.log(document.querySelector('.targeted').parentElement.nextElementSibling)
      for(let i = 0; i < document.querySelector('.targeted').parentElement.children.length; i++){
        if(document.querySelector('.targeted') === 
        document.querySelector('.targeted').parentElement.children[i] ){
          newTarget = document.querySelector('.targeted').parentElement.nextElementSibling.children[i]
          document.querySelector('.targeted').classList.remove('targeted')
          newTarget.classList.add('targeted')
          
    }}}
    // 👉 TASK 4 - Use the space bar to exterminate a mosquito 👈
    
      let counter = 0
      if(evt.key === ' ' && bug !== null){
        
        document.querySelector('.targeted').style.backgroundColor = "red";
        bug.dataset.status = "dead"
         
          allSquares.forEach( square => {
            if(square.firstChild !== null){
              if(square.firstChild.dataset.status === "dead"){
                counter++
              } if(counter === 5){document.querySelector('.info').textContent =
               `Extermination completed in ${getTimeElapsed()/1000} seconds!`;
              
              document.querySelector('h2').appendChild(restart)
              }
            }
              
            })
       
      }
    
    // 👉 TASK 5 - End the game 👈
  })
  restart.addEventListener('click', () => {
    window.location.reload()
  })
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject2 }
else moduleProject2()
