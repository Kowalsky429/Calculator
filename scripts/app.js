 class Calculator{
     constructor(container,root){
        this.container = container;
        this.root = root;
        this.memoryArray = [];
     }
     showResults(){
         this.memoryArray.push(display.value);
         // show elements on website
         const copyMemoryArray = this.memoryArray;
         copyMemoryArray.map(value => {
             let newElement = document.createElement('span');
             newElement.textContent = value;
             document.querySelector('.animation-wrapper').appendChild(newElement);
             copyMemoryArray.splice(-1);
         })
     }
     saveValue(){
         this.memoryArray.push(display.value);
         return '';
     }
     showSavedValue(){
        return this.memoryArray.splice(-1);
     }
     clearMemory(){
         this.memoryArray.splice(0);
         return '';
     }
 }
 const container = document.querySelector('.container');
 const root = document.querySelector(':root');
 const display = document.querySelector('.display');

 const calculator = new Calculator(container, root);
 class Mode extends Calculator{
     constructor(container,root,themeSwitcher,themeText,extendSwitcher, extendText,buttons){
        super(container,root);
        this.themeSwitcher = themeSwitcher;
        this.themeText = themeText;
        this.extendSwitcher = extendSwitcher;
        this.extendText = extendText;
        this.buttons = buttons;
     }
     changeTheme(){
         this.themeSwitcher.classList.toggle('move-box');
         this.themeText.classList.toggle('dark-mode-text') ? this.themeText.textContent = 'Dark Mode' : this.themeText.textContent = 'Light Mode';
         document.body.classList.toggle('dark-mode-body');
     }
     changeMode(){
        this.extendSwitcher.classList.toggle('move-box');
        this.extendText.classList.toggle('extend-mode-text') ? this.extendText.textContent = 'Extend Mode' : this.extendText.textContent = 'Basic Mode';
        this.container.classList.toggle('extend-container');
        const hideButtons = this.buttons.filter(btn => btn.classList.contains('extend')).map(btn => btn.classList.toggle('hide'));
        this.container.classList.contains('extend-container') ? this.root.style.setProperty('--size', '8') : this.root.style.setProperty('--size','4');
     }
 }
 const themeSwitcher = document.querySelector('.box');
 const themeText = document.querySelector('.mode p');

 const extendSwitcher = document.querySelector('.extend-box .box');
 const extendText = document.querySelector('.extend-box p');
 const buttons = [...document.querySelectorAll('input[type="button"]')];

 const mode = new Mode(container,root,themeSwitcher, themeText, extendSwitcher, extendText, buttons);

 themeSwitcher.addEventListener('click', (e) => {
     mode.changeTheme();
 })
 extendSwitcher.addEventListener('click', (e) => {
    mode.changeMode();
 })
 const factorial = number => {
     return number < 3 ? number : number * factorial(number - 1);
 }
 // Allow to input only numbers 
 const validate = evt => {
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
 if(document.querySelector('input[value="="]').addEventListener('click', () => { calculator.showResults() }));