const container = document.querySelector('.container');
const root = document.querySelector(':root');
// calculator display
const display = document.querySelector('.display');
display.addEventListener('input', (e) => {
    if(isNaN(e.target.value)){
        return e.target.value - e.target.value; // nie dziala
    }
})
// dark/light mode
const mode = document.querySelector('.box');
const textMode = document.querySelector('.mode p');
mode.addEventListener('click', (e) => {
    e.target.classList.toggle('move-box');    
    textMode.classList.toggle('dark-mode-text') ? textMode.textContent = 'Dark Mode' : textMode.textContent = 'LightMode';
    document.body.classList.toggle('dark-mode-body');
})
// extend/basic mode
const extendBox = document.querySelector('.extend-box .box');
const textExtend = document.querySelector('.extend-box p');
const buttons = [...document.querySelectorAll('input[type="button"]')];
extendBox.addEventListener('click', (e) => {
    e.target.classList.toggle('move-box');
    textExtend.classList.toggle('extend-mode-text') ? textExtend.textContent = 'Extend Mode' : textExtend.textContent = 'Basic Mode';
    container.classList.toggle('extend-container');
    const hideButtons = buttons.filter(button => button.classList.contains('extend'));
    hideButtons.forEach(button => button.classList.toggle('hide'));
    if(container.classList.contains('extend-container')) root.style.setProperty('--size', '8');
    else root.style.setProperty('--size', '4');
})
// Factorial method 
function factorial(number){
    if(number < 3) return number;
    else return number * factorial(number - 1);
}

// Allow to input only numbers
function validate(evt) {
    let theEvent = evt || window.event;
  
    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
    // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    let regex = /[0-9]|\./;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
  }
// Holding results in memory
const memoryArray = [];
if(document.querySelector('input[value="="]').addEventListener('click', (e) => {
    memoryArray.push(display.value);
    // show elements on website
    const copyMemoryArray = memoryArray;
    copyMemoryArray.map(number => {
        let newElement = document.createElement('span');
        newElement.textContent = number;
        document.querySelector('.animation-wrapper').appendChild(newElement);
        copyMemoryArray.splice(-1);
    });    
}));
// Return saved result
const memoryReturn = () => {return memoryArray.splice(-1);}
// Save value in display
const saveValue = () => {
    memoryArray.push(display.value);
    return '';
}