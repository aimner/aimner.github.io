const body = document.querySelector('body');
const container = document.createElement('div');
const textArea = document.createElement('textarea');
const keyboard = document.createElement('div');
const keyboardRaws = [['Backspace', '=', '-', '0', '9', '8', '7', '6', '5', '4', '3', '2', '1', '`'],
  ['Delete', '\\', ']', '[', 'p', 'o', 'i', 'u', 'y', 't', 'r', 'e', 'w', 'q', 'Tab'],
  ['Enter', '\'', ';', 'l', 'k', 'j', 'h', 'g', 'f', 'd', 's', 'a', 'CapsLock'],
  ['Shift', 'Up', '/', '.', ',', 'm', 'n', 'b', 'v', 'c', 'x', 'z', 'Shift'],
  ['Ctrl', 'Right', 'Down', 'Left', 'Alt', ' ', 'Alt', 'Win', 'Ctrl']];
const buttonsArr = [];
const letters = [];
let textOn = true;


const ButtonsConstructor = class ButClass {
  createContainer() {
    container.className = 'container';
    body.prepend(container);
    container.prepend(textArea);
    keyboard.className = 'keyboard__container';
    container.append(keyboard);
    this.createKeyboardRaw();
  }

  createKeyboardRaw() {
    const keyboardRaw = [];
    for (let i = 0; i < keyboardRaws.length; i++) {
      keyboardRaw[i] = document.createElement('div');
      keyboardRaw[i].className = 'keyboard__raw';
      keyboard.append(keyboardRaw[i]);
      this.createButtons(keyboardRaw[i], keyboardRaws[i]);
    }
  }

  createButtons(keyboardRaw, keyboardRaws) {
    const buttons = [];
    for (let i = 0; i < keyboardRaws.length; i++) {
      buttons[i] = document.createElement('div');
      buttons[i].className = 'button';
      keyboardRaw.prepend(buttons[i]);
      buttons[i].innerHTML = keyboardRaws[i];
      if (keyboardRaws[i].length === 1) {
        letters.push(buttons[i]);
      }
      this.addClass(buttons[i], keyboardRaws[i]);
    }
    buttonsArr.push(buttons);
  }

  addClass(button, keyboardText) {
    switch (button.textContent) {
      case 'Backspace':
        button.classList.add('backspace');
        break;
      case 'Tab':
        button.classList.add('tab');
        break;
      case 'CapsLock':
        button.classList.add('caps-lock');
        break;
      case 'Shift':
        button.classList.add('shift');
        break;
      case 'Ctrl':
        button.classList.add('ctrl');
        break;
      case ' ':
        button.classList.add('space');
        break;
      case 'Enter':
        button.classList.add('enter');
        break;
      case 'Delete':
        button.classList.add('del');
        break;
    }
  }
};

new ButtonsConstructor().createContainer();


letters.forEach((item) => {
  item.addEventListener('click', () => {
    textArea.value += item.textContent;
  });
});

document.addEventListener('keydown', (event) => {
  console.log(event);
  for (key of buttonsArr) {
    for (item of key) {
      if (item.textContent === event.key && event.key != 'CapsLock') {
        item.classList.add('active-button');
      }
    }
  }
  switch (event.key) {
    case 'Delete':
            textOn ? delText() : console.log('lol');
      break;
    case 'Backspace':
            textOn ? bacText() : console.log('lol');
      break;
    case 'Enter':
            textOn ? textArea.value += '\n' : console.log('lol');
      break;
    case 'CapsLock':
            textOn ? increaseText() : console.log('lol');
      break;
    case ' ':
            textOn ? textArea.value += ' ' : console.log('lol');
      break;
    case 'Shift':
            textOn ? increaseTextShift(event) : console.log('lol');
      break;
  }


  if (event.key.length === 1 && event.code != 'Space' && textOn) {
    textArea.value += event.key;
  }
});

document.addEventListener('keyup', (event) => {
  for (key of buttonsArr) {
    for (item of key) {
      if (item.textContent === event.key && event.key != 'CapsLock') {
        item.classList.remove('active-button');
      }
    }
  }
  switch (event.key) {
    case 'Shift':
            textOn ? increaseTextShift(event) : console.log('lol');
      break;
  }
});
// /////////////////////////////////
const del = document.querySelector('.del');
const backspace = document.querySelector('.backspace');
const enter = document.querySelector('.enter');
const capsLock = document.querySelector('.caps-lock');
const space = document.querySelector('.space');
const shift = document.querySelector('.shift');
let startSub;


textArea.onfocus = function() {
  textOn = false;
};

textArea.onblur = function() {
  textOn = true;
};


del.addEventListener('click', (event) => {
  delText();
});


backspace.addEventListener('click', (event) => {
  bacText();
});

enter.addEventListener('click', (event) => {
  textArea.value += '\n';
});

capsLock.addEventListener('click', (event) => {
  increaseText();
});

shift.addEventListener('mousedown', (event) => {
  increaseTextShift(event);
});

shift.addEventListener('mouseup', (event) => {
  increaseTextShift(event);
});

space.addEventListener('click', (event) => {
  textArea.value += '';
});

function increaseText() {
  capsLock.classList.toggle('active-button');
  letters.forEach((item) => {
    if (capsLock.classList.contains('active-button')) {
      item.innerHTML = item.innerHTML.toUpperCase();
    } else {
      item.innerHTML = item.innerHTML.toLowerCase();
    }
  });
}

function increaseTextShift(event) {
  letters.forEach((item) => {
    if (event.type === 'mousedown' || event.type === 'keydown') {
      item.innerHTML = item.innerHTML.toUpperCase();
    } else {
      item.innerHTML = item.innerHTML.toLowerCase();
    }
  });
}

function bacText() {
  startSub = textArea.selectionStart;
  const finish = textArea.value.substring(textArea.selectionStart, textArea.value.length);
  const start = textArea.value.substring(textArea.value.length[0], textArea.selectionStart);
  const newStart = start.substring(0, start.length - 1);
  textArea.value = newStart + finish;
  textArea.selectionStart = textArea.selectionEnd = startSub - 1;
}

function delText() {
  startSub = textArea.selectionStart;
  const finish = textArea.value.substring(textArea.selectionStart, textArea.value.length);
  const start = textArea.value.substring(textArea.value.length[0], textArea.selectionStart);
  const newFinish = finish.substring(1, finish.length);
  textArea.value = start + newFinish;
  textArea.selectionStart = textArea.selectionEnd = startSub;
}

textArea.addEventListener('click', () => {
  // startSub = textArea.selectionStart;
  // const finish = textArea.value.substring(textArea.selectionStart, textArea.value.length);
  // const start = textArea.value.substring(textArea.value.length[0], textArea.selectionStart);
  // const newFinish = finish.substring(1, finish.length);

  // console.log(start);
  // console.log(finish);
  // console.log(newFinish);
  // textArea.value = start + newFinish;
  // textArea.selectionStart = textArea.selectionEnd = startSub

});
