document.addEventListener('DOMContentLoaded', () => {
  const steps = document.querySelectorAll('.pergunta, .quiz-step, [id^="pergunta"]');
  let currentStep = 0;

  function showStep(index) {
    steps.forEach((step, idx) => {
      if (idx === index) {
        step.style.display = 'block';
      } else {
        step.style.display = 'none';
      }
    });
  }

  // Seleção das opções
  document.querySelectorAll('.opcao, .option-btn, button').forEach(button => {
    button.addEventListener('click', (e) => {
      const parent = e.target.parentElement;
      if (parent) {
        parent.querySelectorAll('.opcao, .option-btn').forEach(btn => btn.classList.remove('selected'));
      }
      e.target.classList.add('selected');
    });
  });

  // Botões de Próxima e Voltar
  document.querySelectorAll('.btn-proxima, [data-action="next"]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
      } else {
        showResult();
      }
    });
  });

  document.querySelectorAll('.btn-voltar, [data-action="prev"]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });
  });

  function showResult() {
    const quiz = document.getElementById('questionario') || document.querySelector('.quiz-container');
    const result = document.getElementById('resultado') || document.querySelector('.resultado-container');
    if (quiz) quiz.style.display = 'none';
    if (result) result.style.display = 'block';
  }

  if (steps.length > 0) {
    showStep(0);
  }
});
