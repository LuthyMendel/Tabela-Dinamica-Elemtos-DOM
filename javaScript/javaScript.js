window.addEventListener('load', start);

var globalNames = ['um', 'dois', 'Três'];
var inputName = null;
var isEditing = false;
var currentIndex = null;

function start() {
  preventFormSubmit();
  inputName = document.querySelector('#inputName');
  activateInput();
  render();
}

//Anula o efeito do Action em trocar de página.
function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }
  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}
function activateInput() {
  function insertName(newName) {
    globalNames.push(newName);
    render();
  }
  function updatename(newName) {
    globalNames[currentIndex] = newName;
    render();
  }

  function handleTyping(event) {
    var hasText = !!event.target.value && event.target.value.trim() !== '';
    if (!hasText) {
      clearInput();
      return;
    }
    if (event.key === 'Enter') {
      if (isEditing) {
        updatename(event.target.value);
      } else {
        insertName(event.target.value);
      }
      isEditing = false;
      clearInput();
    }
  }

  inputName.focus();
  inputName.addEventListener('keyup', handleTyping);
}

function render() {
  function createDeleteBooton(index) {
    function deleteNome() {
      globalNames.splice(index, 1);
      render();
    }

    var button = document.createElement('button');
    button.classList.add('deleteButton');
    button.textContent = 'X';

    button.addEventListener('click', deleteNome);
    return button;
  }

  function createSpan(name, index) {
    function editItem() {
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }
    var span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = name;
    span.addEventListener('click', editItem);
    return span;
  }
  var divNames = document.querySelector('#names');
  divNames.innerHTML = '';

  var ul = document.createElement('ul');

  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];

    var li = document.createElement('li');
    var button = createDeleteBooton(i);
    var span = createSpan(currentName, i);

    li.appendChild(button);
    li.appendChild(span);

    ul.appendChild(li);
  }
  divNames.appendChild(ul);
  clearInput();
}

function clearInput() {
  inputName.value = '';
  inputName.focus();
}
