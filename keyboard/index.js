const body = document.querySelector('body');
const container = document.createElement('div');
const textArea = document.createElement('textarea');
const keyboard = document.createElement('div');
const whatSistem = document.createElement('div');
const howChangeLang = document.createElement('div');
const keyBoardcods = [['Backspace', 'Equal', 'Minus', 'Digit0', 'Digit9', 'Digit8', 'Digit7', 'Digit6', 'Digit5', 'Digit4', 'Digit3', 'Digit2', 'Digit1', 'Backquote'],
    ['Delete', 'Backslash', 'BracketRight', 'BracketLeft', 'KeyP', 'KeyO', 'KeyI', 'KeyU', 'KeyY', 'KeyT', 'KeyR', 'KeyE', 'KeyW', 'KeyQ', 'Tab'],
    ['Enter', 'Quote', 'Semicolon', 'KeyL', 'KeyK', 'KeyJ', 'KeyH', 'KeyG', 'KeyF', 'KeyD', 'KeyS', 'KeyA', 'CapsLock'],
    ['ShiftRight', 'ArrowUp', 'Slash', 'Period', 'Comma', 'KeyM', 'KeyN', 'KeyB', 'KeyV', 'KeyC', 'KeyX', 'KeyZ', 'ShiftLeft'],
    ['ControlRight', 'ArrowRight', 'ArrowDown', 'ArrowLeft', 'AltRight', 'Space', 'AltLeft', 'MetaLeft', 'ControlLeft']];

const keyboardRaws = [['Backspace', '=', '-', '0', '9', '8', '7', '6', '5', '4', '3', '2', '1', '`'],
    ['Delete', '\\', ']', '[', 'p', 'o', 'i', 'u', 'y', 't', 'r', 'e', 'w', 'q', 'Tab'],
    ['Enter', '\'', ';', 'l', 'k', 'j', 'h', 'g', 'f', 'd', 's', 'a', 'CapsLock'],
    ['Shift', '▲', '/', '.', ',', 'm', 'n', 'b', 'v', 'c', 'x', 'z', 'Shift'],
    ['Ctrl', '►', '▼', '◄', 'Alt', ' ', 'Alt', 'Win', 'Ctrl']];

const keyboardRawsRu = [['Backspace', '=', '-', '0', '9', '8', '7', '6', '5', '4', '3', '2', '1', 'ё'],
    ['Delete', '\\', 'ъ', 'х', 'з', 'щ', 'ш', 'г', 'н', 'е', 'к', 'у', 'ц', 'й', 'Tab'],
    ['Enter', 'э', 'ж', 'д', 'л', 'о', 'р', 'п', 'а', 'в', 'ы', 'ф', 'CapsLock'],
    ['Shift', '▲', '.', 'ю', 'б', 'ь', 'т', 'и', 'м', 'с', 'ч', 'я', 'Shift'],
    ['Ctrl', '►', '▼', '◄', 'Alt', ' ', 'Alt', 'Win', 'Ctrl']];

const lettersShift = [['Backspace', '+', '_', ')', '(', '*', '&', '^', '%', '$', '#', '@', '!', '~'],
    ['Delete', '|', '{', '}', 'p', 'o', 'i', 'u', 'y', 't', 'r', 'e', 'w', 'q', 'Tab'],
    ['Enter', '\"', ':', 'l', 'k', 'j', 'h', 'g', 'f', 'd', 's', 'a', 'CapsLock'],
    ['Shift', '▲', '?', '>', '<', 'm', 'n', 'b', 'v', 'c', 'x', 'z', 'Shift'],
    ['Ctrl', '►', '▼', '◄', 'Alt', ' ', 'Alt', 'Win', 'Ctrl']];
const lettersShiftRu = [['Backspace', '+', '_', ')', '(', '*', '?', ':', '%', ';', '№', '"', '!', 'Ё'],
    ['Delete', '/', 'ъ', 'х', 'з', 'щ', 'ш', 'г', 'н', 'е', 'к', 'у', 'ц', 'й', 'Tab'],
    ['Enter', 'э', 'ж', 'д', 'л', 'о', 'р', 'п', 'а', 'в', 'ы', 'ф', 'CapsLock'],
    ['Shift', '▲', ',', 'ю', 'б', 'ь', 'т', 'и', 'м', 'с', 'ч', 'я', 'Shift'],
    ['Ctrl', '►', '▼', '◄', 'Alt', ' ', 'Alt', 'Win', 'Ctrl']];

const buttonsArr = [];
const letters = [];
let textOn = true;
let lang = false;

// BUTTONS CONSTRUCTOR
class ButClass {
    createContainer() {
        container.className = 'container';
        body.prepend(container);
        container.prepend(textArea);
        keyboard.className = 'keyboard__container';
        container.append(keyboard);
        whatSistem.innerHTML = 'Клавиатура создана в операционной системе Windows';
        container.append(whatSistem);
        howChangeLang.innerHTML = 'Для переключения языка комбинация: левыe Ctrl + Alt';
        container.append(howChangeLang);
        this.createKeyboardRaw();
    }

    createKeyboardRaw() {
        const keyboardRaw = [];
        for (let i = 0; i < keyboardRaws.length; i++) {
            keyboardRaw[i] = document.createElement('div');
            keyboardRaw[i].className = 'keyboard__raw';
            keyboard.append(keyboardRaw[i]);
            this.createButtons(keyboardRaw[i], keyboardRaws[i], keyboardRawsRu[i], keyBoardcods[i]);
        }
    }

    createButtons(keyboardRaw, keyboardRaws, keyboardRawsRu, keyBoardcods) {
        const buttons = [];
        for (let i = 0; i < keyboardRaws.length; i++) {
            buttons[i] = document.createElement('div');
            buttons[i].className = 'button';
            buttons[i].setAttribute('data-cod', keyBoardcods[i]);
            keyboardRaw.prepend(buttons[i]);
            this.createButtonsText(buttons[i], keyboardRaws[i], keyboardRawsRu[i]);
            if (keyboardRaws[i].length === 1) {
                letters.push(buttons[i]);
            }
            this.addClass(buttons[i], keyboardRaws[i]);
        }
        buttonsArr.push(buttons);
    }

    createButtonsText(button, keyboardRaw, keyboardRawRu) {
        lang ? button.innerHTML = keyboardRawRu : button.innerHTML = keyboardRaw;
    }

    changeButtonText() {
        for (let i = 0; i < keyboardRaws.length; i++) {
            for (let j = 0; j < keyboardRaws[i].length; j++) {
                lang ? buttonsArr[i][j].innerHTML = keyboardRawsRu[i][j] : buttonsArr[i][j].innerHTML = keyboardRaws[i][j];
            }
        }
    }

    addClass(button) {
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
}

const ButtonsConstructor = new ButClass();
ButtonsConstructor.createContainer();

// TYPE ANG CHANGE TEXT
letters.forEach((item) => {
    item.addEventListener('click', () => {
        textArea.value += item.textContent;
    });
});

for (const item of buttonsArr) {
    item.forEach((elem) => {
        elem.addEventListener('mousedown', () => {
            if (elem.textContent !== 'CapsLock') {
                elem.classList.add('active-button');
            }
        });
    });
}

for (const item of buttonsArr) {
    item.forEach((elem) => {
        elem.addEventListener('mouseup', () => {
            if (elem.textContent !== 'CapsLock') {
                elem.classList.remove('active-button');
            }
        });
    });
}

let langFlag = false;

document.addEventListener('keydown', (event) => {
    console.log(event.code);
    if (event.key === 'Control') {
        langFlag = true;
    }
    if (event.key === 'Alt' && langFlag) {
        lang ? lang = false : lang = true;
        ButtonsConstructor.changeButtonText();
        langFlag = false;
    }

    for (key of buttonsArr) {
        for (item of key) {
            if (item.dataset.cod === event.code && event.key != 'CapsLock') {
                item.classList.add('active-button');
                if (item.textContent.length === 1 && event.code != 'Space' && textOn) {
                    textArea.value += item.textContent;
                }
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
});

document.addEventListener('keyup', (event) => {
    for (key of buttonsArr) {
        for (item of key) {
            if (item.dataset.cod === event.code && event.key != 'CapsLock') {
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
// ADDITIONAL BUTTONS

const del = document.querySelector('.del');
const backspace = document.querySelector('.backspace');
const enter = document.querySelector('.enter');
const capsLock = document.querySelector('.caps-lock');
const space = document.querySelector('.space');
const shift = document.querySelector('.shift');
let startSub;

textArea.onfocus = function () {
    textOn = false;
};

textArea.onblur = function () {
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
    if (lang) {
        increaseTextShiftRu(event);
    } else {
        increaseTextShiftEn(event);
    }
}

function increaseTextShiftRu(event) {
    for (let i = 0; i < keyboardRaws.length; i++) {
        for (let j = 0; j < keyboardRaws[i].length; j++) {
            buttonsArr[i][j].innerHTML === lettersShiftRu[i][j] ? console.log('lol') : buttonsArr[i][j].innerHTML = lettersShiftRu[i][j];
            if ((event.type === 'mousedown' || event.type === 'keydown') && buttonsArr[i][j].innerHTML.length <= 1) {
                buttonsArr[i][j].innerHTML = buttonsArr[i][j].innerHTML.toUpperCase();
            }
            if ((event.type === 'mouseup' || event.type === 'keyup') && buttonsArr[i][j].innerHTML.length <= 1) {
                buttonsArr[i][j].innerHTML = buttonsArr[i][j].innerHTML.toLowerCase();
                buttonsArr[i][j].innerHTML === keyboardRawsRu[i][j] ? console.log('lol') : buttonsArr[i][j].innerHTML = keyboardRawsRu[i][j];
            }
        }
    }
}

function increaseTextShiftEn(event) {
    for (let i = 0; i < keyboardRaws.length; i++) {
        for (let j = 0; j < keyboardRaws[i].length; j++) {
            buttonsArr[i][j].innerHTML === lettersShift[i][j] ? console.log('lol') : buttonsArr[i][j].innerHTML = lettersShift[i][j];
            if ((event.type === 'mousedown' || event.type === 'keydown') && buttonsArr[i][j].innerHTML.length <= 1) {
                buttonsArr[i][j].innerHTML = buttonsArr[i][j].innerHTML.toUpperCase();
            }
            if ((event.type === 'mouseup' || event.type === 'keyup') && buttonsArr[i][j].innerHTML.length <= 1) {
                buttonsArr[i][j].innerHTML = buttonsArr[i][j].innerHTML.toLowerCase();
                buttonsArr[i][j].innerHTML === keyboardRaws[i][j] ? console.log('lol') : buttonsArr[i][j].innerHTML = keyboardRaws[i][j];
            }
        }
    }
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
