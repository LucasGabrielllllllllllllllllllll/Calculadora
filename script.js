// Seleciona o display e a área dos botões
const display = document.querySelector('.display');
const buttons = document.querySelector('.buttons');

// Variáveis para armazenar o estado da calculadora
let firstOperand = null;
let operator = null;
let shouldResetDisplay = false;

// Escuta cliques na área de botões
buttons.addEventListener('click', (e) => {
  if (!e.target.matches('button')) return; // Verifica se o clique foi em um botão

  const button = e.target;
  const buttonContent = button.textContent;
  const action = button.dataset.action;

  // Se não tiver data-action, é número ou ponto
  if (!action) {
    appendNumber(buttonContent);
  } else {
    handleAction(action);
  }
});

// Função para adicionar números ou ponto no display
function appendNumber(num) {
  if (display.value === '0' || shouldResetDisplay) {
    display.value = num;
    shouldResetDisplay = false;
  } else {
    display.value += num;
  }
}

// Função para tratar as ações dos botões especiais e operadores
function handleAction(action) {
  switch (action) {
    case 'clear':
      clearDisplay();
      break;
    case 'sign':
      display.value = String(parseFloat(display.value) * -1);
      break;
    case 'percent':
      display.value = String(parseFloat(display.value) / 100);
      break;
    case 'divide':
    case 'multiply':
    case 'subtract':
    case 'add':
      setOperator(action);
      break;
    case 'equals':
      evaluate();
      break;
    default:
      break;
  }
}

// Função para limpar o display e resetar as variáveis
function clearDisplay() {
  display.value = '0';
  firstOperand = null;
  operator = null;
  shouldResetDisplay = false;
}

// Função para definir o operador e armazenar o primeiro operando
function setOperator(action) {
  if (operator !== null) {
    evaluate();
  }
  firstOperand = parseFloat(display.value);
  operator = action;
  shouldResetDisplay = true; // Indica que o display deve ser resetado na próxima digitação
}

// Função para realizar o cálculo e exibir o resultado
function evaluate() {
  if (operator === null || shouldResetDisplay) return;
  const secondOperand = parseFloat(display.value);
  let result;

  switch (operator) {
    case 'divide':
      result = firstOperand / secondOperand;
      break;
    case 'multiply':
      result = firstOperand * secondOperand;
      break;
    case 'subtract':
      result = firstOperand - secondOperand;
      break;
    case 'add':
      result = firstOperand + secondOperand;
      break;
    default:
      return;
  }

  display.value = String(result);
  firstOperand = result;  // Permite cálculos contínuos com o resultado
  operator = null;
  shouldResetDisplay = true;
}