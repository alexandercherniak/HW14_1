let step = 20;
let h = 100;

window.addEventListener('load', function(){
  let block = document.querySelector('.block');
  const target = block;
  let blockStyle = window.getComputedStyle(block);
  let wBlock = parseInt(blockStyle.getPropertyValue('width'));
  let hBlock = parseInt(blockStyle.getPropertyValue('height'));

  function Move(direction) {
    switch(direction) {
      case 'left':
        target.style.left = target.offsetLeft - step + 'px';
        break;
      case 'right':
        target.style.left = target.offsetLeft + step + 'px';
        break;
      case 'up':
        target.style.top = target.offsetTop - step + 'px';
        break;
      case 'down':
        target.style.top = target.offsetTop + step + 'px';
        break;
      }
  }

  function Jump(direction) {
    switch(direction) {
      case 'jumpUp':
        target.style.top = target.offsetTop - h + 'px';
        break;
      case 'jumpDown':
        target.style.top = target.offsetTop + h + 'px'; 
        break;
    } 
  }

  function JumpLikeRabbit() {
    Jump('jumpUp'), 
    setTimeout(function() { 
      Jump('jumpDown')}, 200);
  }

  function sitDown() {
    target.style.width = wBlock * 1.15 + 'px';
    target.style.height = hBlock * 0.6 + 'px';
  }
  
  function standUp() {
    target.style.width = wBlock + 'px';
    target.style.height = hBlock + 'px';
  }

document.addEventListener('keydown', function(event){
  if (event.keyCode === 37) {
    Move('left');
  } else if (event.keyCode === 38 && !event.ctrlKey) {
    Move('up');
  } else if (event.keyCode === 39) {
    Move('right');
  } else if (event.keyCode === 40 && !event.ctrlKey) {
    Move('down');
  } else if (event.keyCode === 32 && !event.ctrlKey) {
    JumpLikeRabbit();
  } else if (event.keyCode === 17) {
    sitDown();
  } 
})

document.addEventListener('keyup', function(event){
  if (event.keyCode === 17) {
    standUp();
    }
  })

const context = document.querySelector('.contextmenu-container');

let list = [
  {
    title: 'Jump',
    action: 'JumpAction'
  },
  {
    title: 'Remove',
    action: 'RemoveAction'
  },
  {
    title: 'Change Color',
    action: 'ChangeColorAction'
  },
];

let listActions = {
  JumpAction: function JumpLikeRabbit() {
    Jump('jumpUp'), 
    setTimeout(function() { 
    Jump('jumpDown')}, 200);
  },
  RemoveAction: function onClickRemove(event) {
    block.classList.add('block-remove')
  },
  ChangeColorAction: function() { 
    block.style.backgroundColor = 'rgb('+getRand(256)+', '+getRand(256)+', '+getRand(256)+')';
  }
};

function getRand(max) {
  return Math.floor(Math.random()*max);
}

renderMenu(list);

function renderMenu(source = [], target = context) {
  if (!source.length) {
      return;
    } 
  let listFragment = document.createDocumentFragment();
  source.forEach(function(listItem){
      let divItem = document.createElement('div');
      divItem.classList.add('contextmenu-item')
      divItem.innerHTML = listItem.title;
      divItem.addEventListener('click', listActions[listItem.action]);
     
      listFragment.append(divItem)
  });

  target.append(listFragment)
}

document.addEventListener('contextmenu', function(event){
  event.preventDefault();
  let clientX = event.clientX;
  let clientY = event.clientY;

  let contextStyle = window.getComputedStyle(context);
  let wContext = parseInt(contextStyle.getPropertyValue('width')) + 2*parseInt(contextStyle.getPropertyValue('border-width'));
  let hContext = parseInt(contextStyle.getPropertyValue('height')) + 2*parseInt(contextStyle.getPropertyValue('border-width'));

  let wWidth = window.innerWidth;
  let hWidth = window.innerHeight;

  if (clientX >= wWidth - wContext) {
      clientX -= wContext;
  }

  if (clientY >= hWidth - hContext) {
      clientY -= hContext;
  }
 
  context.classList.add('show');
  context.style.left = clientX + 'px';
  context.style.top = clientY + 'px';

  document.addEventListener('click', onHideContextMenu);

function onHideContextMenu(event){
  context.classList.remove('show');
  document.removeEventListener('click', onHideContextMenu);
  }
  })
})