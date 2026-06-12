// ===================================================
// REFERÊNCIAS DOS ELEMENTOS
// ===================================================
const screens = {
  password: document.getElementById('screen-password'),
  loading: document.getElementById('screen-loading'),
  troll: document.getElementById('screen-troll'),
  reveal: document.getElementById('screen-reveal'),
};

const hiddenClue = document.getElementById('hidden-clue');

const passwordInput = document.getElementById('password-input');
const submitBtn = document.getElementById('submit-btn');
const errorMsg = document.getElementById('error-msg');
const loadingText = document.getElementById('loading-text');

// Senha correta (em minúsculas, sem espaços extras)
const CORRECT_PASSWORD = 'bobbie goods';

// ===================================================
// FUNÇÃO: troca de tela com fade
// ===================================================
function showScreen(name) {
  Object.values(screens).forEach(screen => screen.classList.remove('active'));
  screens[name].classList.add('active');
}

// ===================================================
// VALIDAÇÃO DA SENHA
// ===================================================
submitBtn.addEventListener('click', checkPassword);

// Permite usar "Enter" no campo de senha
passwordInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') checkPassword();
});

function checkPassword() {
  const typed = passwordInput.value.trim().toLowerCase();

  if (typed === CORRECT_PASSWORD) {
  errorMsg.textContent = '';

  hiddenClue.style.opacity = '0';

  startLoadingSequence();
}
}

// ===================================================
// SEQUÊNCIA DE "CARREGAMENTO" (gera expectativa)
// ===================================================
function startLoadingSequence() {
  showScreen('loading');

  const messages = [
    'Validando resposta...',
    'Verificando se você realmente merece a recompensa...',
    'Calculando o nível de sorte...',
    'Processando...',
    'Quase lá...'
  ];

  let i = 0;
  loadingText.textContent = messages[i];

  const interval = setInterval(() => {
    i++;
    if (i < messages.length) {
      loadingText.textContent = messages[i];
    } else {
      clearInterval(interval);
      showScreen('troll');
    }
  }, 1300);
}

// ===================================================
// ETAPAS DA TROLLAGEM (recompensa = batata)
// ===================================================
const complainBtn = document.getElementById('complain-btn');
const managerBtn = document.getElementById('manager-btn');
const insistBtn = document.getElementById('insist-btn');
const revealBtn = document.getElementById('reveal-btn');

const complainStep = document.getElementById('complain-step');
const managerStep = document.getElementById('manager-step');
const insistStep = document.getElementById('insist-step');

// Etapa 1: reclamar da recompensa
complainBtn.addEventListener('click', () => {
  complainStep.classList.add('show');
  complainBtn.disabled = true;
});

// Etapa 2: falar com o gerente
managerBtn.addEventListener('click', () => {
  managerStep.classList.add('show');
  managerBtn.disabled = true;
});

// Etapa 3: insistir mesmo assim
insistBtn.addEventListener('click', () => {
  insistStep.classList.add('show');
  insistBtn.disabled = true;
});

// Etapa final: revelação romântica
revealBtn.addEventListener('click', () => {
  triggerRomanticReveal();
});

// ===================================================
// TRANSIÇÃO PARA A REVELAÇÃO ROMÂNTICA
// ===================================================
function triggerRomanticReveal() {
  // Efeito de fade out suave antes da troca
  screens.troll.style.transition = 'opacity 0.8s ease';
  screens.troll.style.opacity = '0';

  setTimeout(() => {
    screens.troll.style.opacity = '1'; // reset para futuras renderizações
    showScreen('reveal');

    // Muda o fundo da página para o modo romântico, suavemente
    document.body.classList.add('romantic-mode');
  }, 800);
}
